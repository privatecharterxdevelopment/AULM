"""Generate gold/silver buying procedures + institutional brochure PDFs."""

from __future__ import annotations

import subprocess
import tempfile
from io import BytesIO
from pathlib import Path

from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "procedure"
FONT_DIR = Path(__file__).resolve().parent / "fonts"
FONT_REG = FONT_DIR / "DMSans-Regular.ttf"
FONT_MED = FONT_DIR / "DMSans-Medium.ttf"
FONT_BOLD = FONT_DIR / "DMSans-Bold.ttf"

W, H = A4
INK = (0.07, 0.07, 0.07)
MUTED = (0.42, 0.42, 0.42)
RULE = (0.86, 0.86, 0.86)
PAPER = (1, 1, 1)


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Aulm", str(FONT_REG)))
    pdfmetrics.registerFont(TTFont("Aulm-Medium", str(FONT_MED)))
    pdfmetrics.registerFont(TTFont("Aulm-Bold", str(FONT_BOLD)))


def cover_reader(path: Path, tw: float, th: float) -> ImageReader:
    im = Image.open(path).convert("RGB")
    src_w, src_h = im.size
    target_ratio = tw / th
    src_ratio = src_w / src_h
    if src_ratio > target_ratio:
        nw = int(src_h * target_ratio)
        x0 = (src_w - nw) // 2
        im = im.crop((x0, 0, x0 + nw, src_h))
    else:
        nh = int(src_w / target_ratio)
        y0 = (src_h - nh) // 2
        im = im.crop((0, y0, src_w, y0 + nh))
    im = im.resize((int(tw * 2), int(th * 2)), Image.Resampling.LANCZOS)
    buf = BytesIO()
    im.save(buf, format="JPEG", quality=88, optimize=True)
    buf.seek(0)
    return ImageReader(buf)


def logo_reader(white: bool = False) -> ImageReader:
    name = "aulm-logo-white.png" if white else "aulm-logo.png"
    return ImageReader(str(ROOT / "public" / name))


FOOTER_LOGOS = [
    ROOT / "public/refinery/partners/government-of-dubai.svg",
    ROOT / "public/refinery/partners/ifza.png",
    ROOT / "public/compliance/oecd-logo.png",
    ROOT / "public/compliance/uaefiu-logo.png",
]


_logo_cache: dict[str, Image.Image] = {}


def _open_logo(path: Path) -> Image.Image:
    key = str(path)
    if key in _logo_cache:
        return _logo_cache[key].copy()
    if path.suffix.lower() == ".svg":
        with tempfile.TemporaryDirectory() as tmp:
            subprocess.run(
                ["qlmanage", "-t", "-s", "900", "-o", tmp, str(path)],
                check=False,
                capture_output=True,
            )
            rendered = next(
                (p for p in Path(tmp).iterdir() if p.suffix.lower() in {".png", ".jpg", ".jpeg"}),
                None,
            )
            if rendered is None:
                raise FileNotFoundError(f"Could not rasterize {path}")
            im = Image.open(rendered).convert("RGBA")
    else:
        im = Image.open(path).convert("RGBA")
    bbox = im.getbbox()
    im = im.crop(bbox) if bbox else im
    _logo_cache[key] = im
    return im.copy()


def fit_logo(path: Path, max_w: float, max_h: float) -> tuple[ImageReader, float, float]:
    im = _open_logo(path)
    src_w, src_h = im.size
    scale = min(max_w / src_w, max_h / src_h)
    dw, dh = src_w * scale, src_h * scale
    resized = im.resize((max(1, int(dw * 2)), max(1, int(dh * 2))), Image.Resampling.LANCZOS)
    buf = BytesIO()
    resized.save(buf, format="PNG")
    buf.seek(0)
    return ImageReader(buf), dw, dh


def draw_footer_logos(c: Canvas, y: float, height: float = 22) -> None:
    gap = 22
    fitted: list[tuple[ImageReader, float, float]] = []
    for path in FOOTER_LOGOS:
        if not path.exists():
            continue
        try:
            fitted.append(fit_logo(path, 92, height))
        except (FileNotFoundError, OSError, StopIteration):
            continue
    if not fitted:
        return
    total = sum(w for _, w, _ in fitted) + gap * (len(fitted) - 1)
    x = (W - total) / 2
    for reader, w, h in fitted:
        c.drawImage(reader, x, y + (height - h) / 2, width=w, height=h, mask="auto")
        x += w + gap


def draw_header(c: Canvas) -> None:
    c.drawImage(logo_reader(), 36, H - 78, width=52, height=52, mask="auto")
    c.setFillColorRGB(*MUTED)
    c.setFont("Aulm-Medium", 8)
    c.drawRightString(W - 40, H - 42, "AULM Trading FZCO")
    c.drawRightString(W - 40, H - 54, "IFZA Licensed — Dubai, UAE")
    c.drawRightString(W - 40, H - 66, "www.aulmtrading.com")
    c.setStrokeColorRGB(*RULE)
    c.setLineWidth(0.6)
    c.line(36, H - 88, W - 36, H - 88)


def draw_footer(c: Canvas, page: int, pages: int) -> None:
    draw_footer_logos(c, 36, 20)
    c.setStrokeColorRGB(*RULE)
    c.setLineWidth(0.6)
    c.line(36, 32, W - 36, 32)
    c.setFillColorRGB(*MUTED)
    c.setFont("Aulm", 7)
    c.drawString(36, 18, "AULM Trading FZCO — IFZA Licensed — Dubai, UAE — www.aulmtrading.com")
    c.drawRightString(W - 36, 18, f"Page {page} / {pages}")


def draw_title(c: Canvas, title: str) -> None:
    c.setFillColorRGB(*INK)
    c.setFont("Aulm-Bold", 18)
    c.drawCentredString(W / 2, H - 118, title)


def wrap(c: Canvas, text: str, font: str, size: float, max_w: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def bullet_block(c: Canvas, y: float, items: list[tuple[str, str]]) -> float:
    label_x = 48
    value_x = 168
    for label, value in items:
        c.setFillColorRGB(*INK)
        c.setFont("Aulm-Bold", 8.5)
        c.drawString(label_x, y, label)
        c.setFont("Aulm", 8.5)
        c.setFillColorRGB(0.18, 0.18, 0.18)
        for i, line in enumerate(wrap(c, value, "Aulm", 8.5, W - value_x - 48)):
            c.drawString(value_x, y - i * 11, line)
        y -= 11 * max(1, len(wrap(c, value, "Aulm", 8.5, W - value_x - 48))) + 8
    return y


def numbered(c: Canvas, y: float, items: list[str], max_w: float) -> float:
    for i, item in enumerate(items, 1):
        c.setFillColorRGB(*INK)
        c.setFont("Aulm-Bold", 8.5)
        c.drawString(48, y, f"{i:02d}")
        c.setFont("Aulm", 8.5)
        lines = wrap(c, item, "Aulm", 8.5, max_w)
        for j, line in enumerate(lines):
            c.drawString(72, y - j * 11, line)
        y -= 11 * len(lines) + 10
    return y


def write_gold_pdf() -> None:
    path = OUT / "aulm-gold-buying-procedures-en-2026.pdf"
    c = Canvas(str(path), pagesize=A4)
    c.setTitle("AULM Gold Buying Procedures EN 2026")
    c.setAuthor("AULM Trading FZCO")

    draw_header(c)
    draw_title(c, "GOLD BUYING PROCEDURES")

    y = H - 182
    c.setFillColorRGB(*INK)
    c.setFont("Aulm", 9.2)
    intro = (
        "Firstly, we require a FULL CORPORATE OFFER (FCO) from the Seller detailing requested "
        "Procedure, Terms and Conditions for their Gold Bar (AU Metal) supply. The FCO should "
        "include all of the following information."
    )
    for line in wrap(c, intro, "Aulm", 9.2, W - 96):
        c.drawString(48, y, line)
        y -= 13

    y -= 18
    c.setFont("Aulm-Bold", 10)
    c.drawString(48, y, "COMMODITY SPECIFICATIONS")
    y -= 24
    y = bullet_block(
        c,
        y,
        [
            ("COMMODITY", "Gold (AU Metal) Origin"),
            ("FORM", "XX"),
            ("PURITY", "XX%"),
            ("QUANTITY", "XX kg"),
            ("TRIAL TRANCHE", "To be discussed"),
            ("ACCEPTED FORMS", "Gold Doré, Gold Nuggets, Dust, Bullions (semi-melted)"),
            ("DELIVERY", "CIF"),
            ("PRICE", "TBD"),
            ("CURRENCY", "United States Dollars, United Arab Emirates Dirham, Euros"),
            ("PAYMENT", "Swift Bank to Bank wire transfer (MT103)"),
            ("PACKAGING", "International Standard Export Package Boxes"),
        ],
    )

    y -= 8
    c.setFont("Aulm-Bold", 10)
    c.setFillColorRGB(*INK)
    c.drawString(48, y, "TRANSACTION PROCEDURES")
    y -= 22
    y = numbered(
        c,
        y,
        [
            "Complete KYC and client verification.",
            "Buyer and Seller will sign all initial documents such as the FCO and then the full SPA thereafter.",
            "A representative of the Seller side must be present throughout the entire transaction. Duration is approximately 72 hours.",
            "Upon arrival at the destination airport, the Seller’s representative will be present for the handover. AULM then assumes full responsibility for customs clearance, security handling via Transguard, and delivery to the designated refinery.",
            "An independent assay will be conducted at the refinery to determine final weight and purity. The assay report will be reviewed with the Seller’s representative at AULM’s office upon completion.",
            "Pricing will be finalized based on the confirmed assay result and final weight.",
            "A Final Purchase Agreement reflecting the final assay weight and agreed price will be prepared and signed on-site at AULM’s office. A copy will be sent to the Seller’s registered email address.",
            "Payment will be made Bank to Bank via SWIFT MT103 based on the Final Purchase Agreement.",
            "Upon Seller’s confirmation of funds received, a Payment Receipt will be issued and signed by both parties. Transaction complete.",
        ],
        W - 120,
    )
    draw_footer(c, 1, 2)
    c.showPage()

    draw_header(c)
    draw_title(c, "GOLD BUYING PROCEDURES")
    y = H - 184
    c.setFont("Aulm-Bold", 10)
    c.setFillColorRGB(*INK)
    c.drawString(48, y, "DOCUMENTS PRIOR TO DEPARTURE")
    y -= 22
    c.setFont("Aulm", 9)
    c.drawString(48, y, "Seller will provide Buyer with the following documents before the product leaves country of origin:")
    y -= 18
    for item in [
        "Proof of Ownership",
        "Certificate of Origin",
        "Tax Clearance Certificate",
        "Export Permit",
        "AWB Copy",
        "Commercial Invoices",
    ]:
        c.circle(54, y + 3, 1.4, fill=1, stroke=0)
        c.drawString(64, y, item)
        y -= 14

    y -= 18
    c.setFont("Aulm-Bold", 10)
    c.drawString(48, y, "RESPONSIBILITY")
    y -= 22
    c.setFont("Aulm", 9)
    for para in [
        "Seller is responsible for freight, insurance and delivery DPU up to destination airport.",
        "Buyer is responsible for customs clearance, transportation and insurance from destination airport to Buyer refinery and all taxes, customs, security, assaying cost at Buyer refinery and logistics.",
    ]:
        for line in wrap(c, para, "Aulm", 9, W - 96):
            c.drawString(48, y, line)
            y -= 12
        y -= 6

    y -= 6
    c.setFont("Aulm-Bold", 10)
    c.drawString(48, y, "NOTES")
    y -= 22
    notes = [
        "Upon management approval on a case-by-case basis, AULM may provide accommodation and a budgeted daily expense allowance for the Seller’s designated representative during the transaction period in Dubai, UAE.",
        "We do not deal with third-party financiers. We do not issue instruments to third-party financier banks.",
        "We do not accept bank guarantees, SBLCs, letters of credit, or similar paper. Settlement is SWIFT MT103 after assay, bank-to-bank only.",
        "We do not deal with unverifiable intermediaries or brokers without direct principal authorization.",
    ]
    y = numbered(c, y, notes, W - 120)
    draw_footer(c, 2, 2)
    c.save()
    print("wrote", path)


def write_silver_pdf() -> None:
    path = OUT / "aulm-silver-buying-procedures-en-2026.pdf"
    c = Canvas(str(path), pagesize=A4)
    c.setTitle("AULM Silver Buying Procedures EN 2026")
    c.setAuthor("AULM Trading FZCO")

    draw_header(c)
    draw_title(c, "SILVER BUYING PROCEDURES")

    y = H - 182
    c.setFillColorRGB(*INK)
    c.setFont("Aulm", 9.2)
    intro = (
        "Firstly, we require a FULL CORPORATE OFFER (FCO) from the Seller detailing requested "
        "Procedure, Terms and Conditions for their Silver (AG Metal) supply. The FCO should "
        "include all of the following information."
    )
    for line in wrap(c, intro, "Aulm", 9.2, W - 96):
        c.drawString(48, y, line)
        y -= 13

    y -= 18
    c.setFont("Aulm-Bold", 10)
    c.drawString(48, y, "COMMODITY SPECIFICATIONS")
    y -= 24
    y = bullet_block(
        c,
        y,
        [
            ("COMMODITY", "Silver (AG Metal) Origin"),
            ("FORM", "XX"),
            ("PURITY", "XX%"),
            ("QUANTITY", "XX kg"),
            ("TRIAL TRANCHE", "As agreed — typically 25–100 kg"),
            ("ACCEPTED FORMS", "Silver bars, grain, industrial, scrap (semi-melted)"),
            ("DELIVERY", "CIF"),
            ("PRICE", "LBMA with Discount XX% or Fixed Price per kg"),
            ("CURRENCY", "United States Dollars, United Arab Emirates Dirham, Euros"),
            ("PAYMENT", "Swift Bank to Bank wire transfer (MT103)"),
            ("PACKAGING", "International Standard Export Package Boxes"),
        ],
    )

    y -= 8
    c.setFont("Aulm-Bold", 10)
    c.setFillColorRGB(*INK)
    c.drawString(48, y, "TRANSACTION PROCEDURES")
    y -= 22
    y = numbered(
        c,
        y,
        [
            "Buyer and Seller will sign all initial documents such as the FCO and then the full SPA thereafter.",
            "A representative of the Seller side must be present throughout the entire transaction. Duration is approximately 72 hours.",
            "Upon arrival at the destination airport, the Seller’s representative will be present for the handover. AULM then assumes full responsibility for customs clearance, security handling via Transguard, and delivery to the designated refinery.",
            "An independent assay will be conducted at the refinery to determine final weight and purity. The assay report will be reviewed with the Seller’s representative at AULM’s office upon completion.",
            "Pricing will be finalized based on the confirmed assay result and final weight, in accordance with the agreed LBMA-based pricing terms.",
            "A Final Purchase Agreement reflecting the final assay weight and agreed price will be prepared and signed on-site at AULM’s office. A copy will be sent to the Seller’s registered email address.",
            "Payment will be made Bank to Bank via SWIFT MT103 based on the Final Purchase Agreement.",
            "Upon Seller’s confirmation of funds received, a Payment Receipt will be issued and signed by both parties. Transaction complete.",
        ],
        W - 120,
    )
    draw_footer(c, 1, 2)
    c.showPage()

    draw_header(c)
    draw_title(c, "SILVER BUYING PROCEDURES")
    y = H - 184
    c.setFont("Aulm-Bold", 10)
    c.setFillColorRGB(*INK)
    c.drawString(48, y, "DOCUMENTS PRIOR TO DEPARTURE")
    y -= 22
    c.setFont("Aulm", 9)
    c.drawString(48, y, "Seller will provide Buyer with the following documents before the product leaves country of origin:")
    y -= 18
    for item in [
        "Proof of Ownership",
        "Certificate of Origin",
        "Tax Clearance Certificate",
        "Export Permit",
        "AWB Copy",
        "Commercial Invoices",
    ]:
        c.circle(54, y + 3, 1.4, fill=1, stroke=0)
        c.drawString(64, y, item)
        y -= 14

    y -= 18
    c.setFont("Aulm-Bold", 10)
    c.drawString(48, y, "RESPONSIBILITY")
    y -= 22
    c.setFont("Aulm", 9)
    for para in [
        "Seller is responsible for freight, insurance and delivery DPU up to destination airport.",
        "Buyer is responsible for customs clearance, transportation and insurance from destination airport to Buyer refinery and all taxes, customs, security, assaying cost at Buyer refinery and logistics.",
    ]:
        for line in wrap(c, para, "Aulm", 9, W - 96):
            c.drawString(48, y, line)
            y -= 12
        y -= 6

    y -= 6
    c.setFont("Aulm-Bold", 10)
    c.drawString(48, y, "NOTES")
    y -= 22
    notes = [
        "Upon management approval on a case-by-case basis, AULM may provide accommodation and a budgeted daily expense allowance for the Seller’s designated representative during the transaction period in Dubai, UAE.",
        "We do not deal with third-party financiers. We do not issue instruments to third-party financier banks.",
        "We do not accept bank guarantees, SBLCs, letters of credit, or similar paper. Settlement is SWIFT MT103 after assay, bank-to-bank only.",
        "We do not deal with unverifiable intermediaries or brokers without direct principal authorization.",
    ]
    y = numbered(c, y, notes, W - 120)
    draw_footer(c, 2, 2)
    c.save()
    print("wrote", path)


def bleed_photo(c: Canvas, path: Path, shade: float = 0.42) -> None:
    c.drawImage(cover_reader(path, W, H), 0, 0, width=W, height=H, preserveAspectRatio=False, mask="auto")
    c.setFillColorRGB(0, 0, 0)
    c.setFillAlpha(shade)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillAlpha(1)


ML = 54
MR = W - 54
BW = W - 108
Y_BOT = 78
LEAD = 14.4
SIZE = 10.2


class Brochure:
    def __init__(self, dest, toc: list[tuple[str, int]] | None = None) -> None:
        self.c = Canvas(str(dest) if not hasattr(dest, "write") else dest, pagesize=A4)
        self.c.setTitle("AULM Institutional Brochure 2026")
        self.c.setAuthor("AULM Trading FZCO")
        self.page = 0
        self.toc: list[tuple[str, int]] = []
        self.toc_in = toc
        self.y = 0.0
        self.section_kicker = ""
        self.section_title = ""

    def save(self) -> None:
        self.c.save()

    def _footer(self) -> None:
        draw_footer_logos(self.c, 38, 18)
        self.c.setStrokeColorRGB(*RULE)
        self.c.setLineWidth(0.55)
        self.c.line(ML, 32, MR, 32)
        self.c.setFillColorRGB(*MUTED)
        self.c.setFont("Aulm", 7.5)
        self.c.drawString(ML, 18, "AULM Trading FZCO  ·  Institutional brochure 2026")
        self.c.drawRightString(MR, 18, f"{self.page:02d}")

    def _photo_num(self, light: bool = True) -> None:
        self.c.setFillColorRGB(1, 1, 1) if light else self.c.setFillColorRGB(*MUTED)
        self.c.setFont("Aulm", 8)
        self.c.drawRightString(MR, 28, f"{self.page:02d}")

    def mark(self, title: str) -> None:
        self.toc.append((title, self.page + 1))

    def cover(self) -> None:
        self.page = 1
        bleed_photo(self.c, ROOT / "public/africa/africa-hero.jpg", 0.38)
        self.c.drawImage(logo_reader(True), 40, H - 96, width=72, height=72, mask="auto")
        self.c.setFillColorRGB(1, 1, 1)
        self.c.setFont("Aulm-Medium", 9)
        self.c.drawString(40, 86, "IFZA 85927  ·  DUBAI")
        self.c.setFont("Aulm-Bold", 28)
        y = 210
        for line in ["Precious metals.", "Institutional desk."]:
            self.c.drawString(40, y, line)
            y -= 34
        self.c.setFont("Aulm", 11)
        self.c.drawString(40, 128, "Gold  ·  Silver  ·  Copper")
        self.c.setFont("Aulm", 9)
        self.c.drawString(40, 70, "Institutional brochure  ·  2026")
        self._photo_num()
        self.c.showPage()

    def contents(self) -> None:
        self.page += 1
        self.c.setFillColorRGB(*PAPER)
        self.c.rect(0, 0, W, H, fill=1, stroke=0)
        draw_header(self.c)
        self._footer()
        self.c.setFillColorRGB(*MUTED)
        self.c.setFont("Aulm-Medium", 8)
        self.c.drawString(ML, H - 112, "CONTENTS")
        self.c.setFillColorRGB(*INK)
        self.c.setFont("Aulm-Bold", 22)
        self.c.drawString(ML, H - 148, "Index")
        rows = self.toc_in if self.toc_in else [("—", 0)]
        y = H - 192
        for title, num in rows:
            if title == "—":
                self.c.setFillColorRGB(*MUTED)
                self.c.setFont("Aulm", 10)
                self.c.drawString(ML, y, "Generating…")
                break
            self.c.setFillColorRGB(*INK)
            self.c.setFont("Aulm", 10.5)
            left = title
            right = f"{num:02d}"
            self.c.drawString(ML, y, left)
            self.c.drawRightString(MR, y, right)
            lw = self.c.stringWidth(left, "Aulm", 10.5)
            rw = self.c.stringWidth(right, "Aulm", 10.5)
            self.c.setStrokeColorRGB(*RULE)
            self.c.setLineWidth(0.5)
            self.c.setDash(0.8, 2.2)
            self.c.line(ML + lw + 8, y + 3, MR - rw - 8, y + 3)
            self.c.setDash()
            y -= 22
        self.c.showPage()

    def white(self, kicker: str, title: str, index_title: str | None = None) -> None:
        if index_title is not None:
            self.mark(index_title)
        elif kicker:
            self.mark(title)
        self.page += 1
        self.section_kicker = kicker
        self.section_title = title
        self.c.setFillColorRGB(*PAPER)
        self.c.rect(0, 0, W, H, fill=1, stroke=0)
        draw_header(self.c)
        self._footer()
        self.c.setFillColorRGB(*MUTED)
        self.c.setFont("Aulm-Medium", 8)
        self.c.drawString(ML, H - 112, kicker.upper())
        self.c.setFillColorRGB(*INK)
        self.c.setFont("Aulm-Bold", 20)
        for i, line in enumerate(wrap(self.c, title, "Aulm-Bold", 20, BW)):
            self.c.drawString(ML, H - 140 - i * 24, line)
        lines = wrap(self.c, title, "Aulm-Bold", 20, BW)
        self.y = H - 140 - len(lines) * 24 - 34

    def _continue(self) -> None:
        self.c.showPage()
        self.page += 1
        self.c.setFillColorRGB(*PAPER)
        self.c.rect(0, 0, W, H, fill=1, stroke=0)
        draw_header(self.c)
        self._footer()
        self.c.setFillColorRGB(*MUTED)
        self.c.setFont("Aulm-Medium", 8)
        self.c.drawString(ML, H - 112, f"{self.section_kicker.upper()}  ·  CONTINUED")
        self.y = H - 136

    def _need(self, h: float) -> None:
        if self.y - h < Y_BOT:
            self._continue()

    def paras(self, texts: list[str], size: float = SIZE, lead: float = LEAD) -> None:
        self.c.setFillColorRGB(*INK)
        self.c.setFont("Aulm", size)
        for text in texts:
            lines = wrap(self.c, text, "Aulm", size, BW)
            self._need(lead * len(lines) + 8)
            self.c.setFont("Aulm", size)
            self.c.setFillColorRGB(*INK)
            for line in lines:
                if self.y < Y_BOT:
                    self._continue()
                    self.c.setFont("Aulm", size)
                    self.c.setFillColorRGB(*INK)
                self.c.drawString(ML, self.y, line)
                self.y -= lead
            self.y -= 14

    def sub(self, title: str) -> None:
        self._need(28)
        self.c.setFillColorRGB(*INK)
        self.c.setFont("Aulm-Bold", 11.5)
        self.c.drawString(ML, self.y, title)
        self.y -= 24

    def bullets(self, items: list[str]) -> None:
        self.c.setFillColorRGB(*INK)
        for item in items:
            lines = wrap(self.c, item, "Aulm", SIZE, BW - 16)
            self._need(LEAD * len(lines) + 6)
            self.c.setFont("Aulm-Bold", SIZE)
            self.c.drawString(ML, self.y, "·")
            self.c.setFont("Aulm", SIZE)
            for i, line in enumerate(lines):
                if self.y < Y_BOT:
                    self._continue()
                    self.c.setFont("Aulm", SIZE)
                self.c.drawString(ML + 14, self.y, line)
                self.y -= LEAD
            self.y -= 4
        self.y -= 6

    def facts(self, rows: list[tuple[str, str]]) -> None:
        self._need(22 * len(rows) + 8)
        for label, value in rows:
            self.c.setFillColorRGB(*MUTED)
            self.c.setFont("Aulm-Medium", 8.5)
            self.c.drawString(ML, self.y, label.upper())
            self.c.setFillColorRGB(*INK)
            self.c.setFont("Aulm-Bold", 10.5)
            self.c.drawString(ML + 130, self.y, value)
            self.y -= 20
        self.y -= 8

    def close_white(self) -> None:
        self.c.showPage()

    def photo_split_desk(self) -> None:
        self.mark("The desk")
        self.page += 1
        left = cover_reader(ROOT / "public/company/locations/switzerland.jpg", W / 2, H)
        right = cover_reader(ROOT / "public/company/office.jpg", W / 2, H)
        self.c.drawImage(left, 0, 0, width=W / 2, height=H)
        self.c.drawImage(right, W / 2, 0, width=W / 2, height=H)
        self.c.setFillColorRGB(0, 0, 0)
        self.c.setFillAlpha(0.45)
        self.c.rect(0, 0, W, H, fill=1, stroke=0)
        self.c.setFillAlpha(1)
        self.c.setFillColorRGB(1, 1, 1)
        self.c.setFont("Aulm-Medium", 8)
        self.c.drawString(40, H - 52, "WHO WE ARE")
        self.c.setFont("Aulm-Bold", 26)
        self.c.drawString(40, H - 92, "Swiss–German roots.")
        self.c.drawString(40, H - 122, "Dubai desk.")
        self._photo_num()
        self.c.showPage()

    def photo_people(self) -> None:
        self.mark("On the ground")
        self.page += 1
        portraits = [
            ROOT / "public/people/01.jpg",
            ROOT / "public/people/02.jpg",
            ROOT / "public/people/03.jpg",
            ROOT / "public/people/04.jpg",
        ]
        col = W / 4
        for i, p in enumerate(portraits):
            self.c.drawImage(cover_reader(p, col, H), i * col, 0, width=col, height=H)
        self.c.setFillColorRGB(0, 0, 0)
        self.c.setFillAlpha(0.28)
        self.c.rect(0, 0, W, H, fill=1, stroke=0)
        self.c.setFillAlpha(1)
        self.c.setFillColorRGB(1, 1, 1)
        self.c.setFont("Aulm-Bold", 32)
        self.c.drawString(32, H * 0.42, "On the ground")
        self.c.setFont("Aulm", 10)
        self.c.drawString(32, 48, "Africa  ·  Asia  ·  Europe  ·  Dubai intake")
        self._photo_num()
        self.c.showPage()

    def photo_sourcing(self) -> None:
        self.mark("Origin")
        self.page += 1
        bleed_photo(self.c, ROOT / "public/sourcing/responsible-sourcing.jpg", 0.4)
        self.c.setFillColorRGB(1, 1, 1)
        self.c.setFont("Aulm-Medium", 8)
        self.c.drawString(40, H - 52, "ORIGIN")
        self.c.setFont("Aulm-Bold", 26)
        self.c.drawString(40, H - 92, "Responsible sourcing")
        self._photo_num()
        self.c.showPage()

    def photo_supply(self) -> None:
        self.mark("Supply chain")
        self.page += 1
        self.c.drawImage(
            cover_reader(ROOT / "public/logistics/supply-sea.jpg", W, H / 2),
            0,
            H / 2,
            width=W,
            height=H / 2,
        )
        self.c.drawImage(
            cover_reader(ROOT / "public/logistics/supply-air.jpg", W, H / 2),
            0,
            0,
            width=W,
            height=H / 2,
        )
        self.c.setFillColorRGB(0, 0, 0)
        self.c.setFillAlpha(0.35)
        self.c.rect(0, 0, W, H, fill=1, stroke=0)
        self.c.setFillAlpha(1)
        self.c.setFillColorRGB(1, 1, 1)
        self.c.setFont("Aulm-Bold", 28)
        self.c.drawString(40, H / 2 + 28, "Supply chain")
        self.c.setFont("Aulm", 10)
        self.c.drawString(40, 56, "Insured ocean freight  ·  Air into Dubai  ·  Secure road")
        self._photo_num()
        self.c.showPage()

    def photo_refinery(self) -> None:
        self.mark("Refinery")
        self.page += 1
        bleed_photo(self.c, ROOT / "public/refinery/refinery-still.jpg", 0.4)
        self.c.setFillColorRGB(1, 1, 1)
        self.c.setFont("Aulm-Bold", 28)
        self.c.drawCentredString(W / 2, H / 2 + 24, "Assayed. Weighed. Settled.")
        self.c.setFont("Aulm", 10)
        self.c.drawCentredString(
            W / 2, H / 2 - 8, "48-hour fire assay  ·  Partner refineries  ·  Bank-only settlement"
        )
        self._photo_num()
        self.c.showPage()

    def photo_close(self) -> None:
        self.mark("Contact")
        self.page += 1
        bleed_photo(self.c, ROOT / "public/company/office.jpg", 0.48)
        self.c.setFillColorRGB(1, 1, 1)
        self.c.setFont("Aulm-Medium", 8)
        self.c.drawString(40, H - 52, "2026")
        self.c.setFont("Aulm-Bold", 26)
        self.c.drawString(40, H - 92, "Work with the desk")
        self.c.setFont("Aulm-Bold", 13)
        self.c.drawString(40, 108, "contact@aulmtrading.com")
        self.c.setFont("Aulm", 9)
        self.c.drawString(40, 88, "Building A1, Dubai Digital Park")
        self.c.drawString(40, 74, "IFZA License 85927  ·  www.aulmtrading.com")
        self._photo_num()
        self.c.showPage()


def fill_brochure(b: Brochure) -> None:
    b.cover()
    b.contents()

    b.white("Company", "Who we are", "Who we are")
    b.facts(
        [
            ("License", "IFZA 85927 — Dubai, UAE"),
            ("Mandate", "B2B institutional counterparties only"),
            ("Metals", "Gold · silver · copper"),
            ("Network", "Dubai · Switzerland · Liechtenstein · Hong Kong"),
            ("Hours", "Monday – Friday, 8am – 5pm GST"),
        ]
    )
    b.paras(
        [
            "AULM Precious Metal Trader is an IFZA-licensed B2B desk in Dubai. We work with family offices, licensed commodity traders, investment funds, refiners and other qualified counterparties. We do not take retail clients, walk-in buyers, or undocumented metal.",
            "The company is Swiss–German in origin, backed by Liechtenstein, and licensed in the UAE. The operating desk sits in Dubai Digital Park. Trading, compliance, origination and settlement are run as one book — not as a chain of brokers who never see the lot.",
            "We buy doré and scrap at LBMA-linked terms when the papers clear. We sell allocated LBMA bullion. Every accepted mandate carries documented chain of custody and bank-to-bank settlement. One counterparty from origination to delivery.",
            "From African corridors to assay, partner refining and secure delivery worldwide, the same desk is on the file. Custody is arranged to client specification — TransGuard, Brinks, Loomis and partners — with interim storage in Dubai where the mandate requires it.",
            "New counterparties complete KYC/KYB, identity verification and an e-meeting before any appointment at the Dubai office and before any lot is priced as a firm trade. Procedure, not theatre.",
        ]
    )
    b.close_white()

    b.white("Company", "What we do", "What we do")
    b.paras(
        [
            "AULM is a physical metals desk. We source, inspect, move, assay and settle gold, silver and copper for institutional books. We are not a bank, not a payment institution, and not a retail coin shop. We do not hold client funds. We do not issue instruments to third-party financiers.",
            "The work is end-to-end when the relationship is mandated that way: origination and collection, OECD due diligence on origin, independent assay, partner refining in Dubai, insured movement, and delivery into a named vault or plant. Counterparties deal with AULM — not a stack of intermediaries taking a spread on a lot they never touched.",
        ]
    )
    b.sub("Desk capabilities")
    b.bullets(
        [
            "Physical gold trading — doré, bullion, nuggets, dust and scrap on documented lots.",
            "Silver — bars, grain and industrial form; same KYC stack as gold.",
            "Copper — cathode and wire rod for industrial offtake, documented origin.",
            "Structured procurement and offtake on continuous mandates.",
            "Partner refining, 48-hour fire assay, LBMA-linked or non-LBMA exit as the mandate requires.",
            "Import and export documentation, certificates of origin, insurance.",
            "Insured sea, air and secure road into Dubai and onward to custody.",
            "Custody worldwide via TransGuard, Brinks, Loomis and partners.",
            "Advisory for Europe, Switzerland, the UK, the US and Asia — still B2B, still physical metal.",
        ]
    )
    b.paras(
        [
            "Initial trades on CIF. FOB is available once the institutional relationship is established. Pricing is not a live ticker on the website. The desk quotes on assay-confirmed weight and fineness, less a small institutional discount on cleared lots.",
        ]
    )
    b.close_white()

    b.white("Company", "How a mandate works", "How a mandate works")
    b.paras(
        [
            "A mandate with AULM is a written relationship, not a chat. Metal form, origin, approximate weight and the papers you already hold come first. The desk tells you what is missing. Nothing is “priced firm” on a photograph of a bar in a hotel room.",
            "Onboarding is the gate. Company KYB, beneficial owners, the stamped onboarding pack, and identity checks sit on file before a lot moves. An e-meeting follows. After compliance clears, the SPA and operational procedure are the trade — not a side letter from a broker.",
        ]
    )
    b.sub("Typical sequence")
    b.bullets(
        [
            "Write — form, origin, weight, documents. The desk replies with the intake pack.",
            "KYC / KYB — onboarding, e-meeting, identity verification of beneficial owners.",
            "Documents — FCO then SPA. A seller representative is present through the transaction.",
            "Movement — CIF into Dubai on first trades. AULM takes clearance, TransGuard handling and delivery to the named refinery once the lot is ours to handle.",
            "Assay — independent fire assay; weight and fineness agreed with the representative at the office.",
            "Final purchase agreement on assay figures, then SWIFT MT103 bank-to-bank.",
            "Payment receipt signed both sides. Transaction complete.",
        ]
    )
    b.paras(
        [
            "We do not accept bank guarantees, SBLCs, letters of credit, proof-of-funds theatre or third-party financiers. Settlement is SWIFT MT103 after assay, between approved accounts only. We do not deal with unverifiable intermediaries or brokers without direct principal authorisation.",
        ]
    )
    b.close_white()

    b.photo_split_desk()

    b.white("The book", "Gold", "Gold")
    b.paras(
        [
            "Gold is the core book. We buy doré and scrap. We sell LBMA bullion. Intake lots are assayed and documented before a price is firm. Onward sale is allocated bars with a named stamp — not a paper claim.",
            "Accepted forms include doré, bullion, nuggets, dust and scrap. Doré, scrap and bullion are not the same filing. An undocumented melt does not become Good Delivery because someone asked for a London price.",
            "Who we deal with: family offices, licensed traders, funds and refiners. B2B only. Minimum 500 grams. Maximum two tonnes per month per client from Q2 2026 on continuous mandates.",
            "Every gold mandate carries OECD due diligence, chain of custody and bank-to-bank settlement. No cash, no crypto, no third-party payment agents. Europe and Switzerland on this desk are refined bars only — 99.999 percent. No doré, no scrap, no artisanal intake in Europe.",
        ]
    )
    b.close_white()

    b.white("The book", "Silver and copper", "Silver and copper")
    b.sub("Silver")
    b.paras(
        [
            "Silver sits next to gold on the same desk: documented origin, assay where the form requires it, and delivery loco London or to a named vault. Bars, grain and industrial form. Industrial offtake and investment bars are different filings — say which book you are filling.",
            "Same onboarding as gold. No trade before identity verification and an e-meeting. Settlement bank-to-bank on allocated metal. Custody via TransGuard, Brinks, Loomis or your vault.",
        ]
    )
    b.sub("Copper")
    b.paras(
        [
            "Copper is a physical industrial book, not a retail coin. Cathode and wire rod for manufacturers and traders. Pricing is benchmark-linked. Documentation follows the lot — origin, assay and export papers before anything is booked.",
            "Delivery is specified on the mandate: port, plant or warehouse. AULM is the desk and counterparty, not a freight forwarder you hire after the goods have left. Same KYC stack as precious metals. Structured lots — write with grade, volume and destination.",
        ]
    )
    b.close_white()

    b.photo_people()

    b.white("Presence", "Where we work", "Where we work")
    b.paras(
        [
            "Africa, Asia, Europe — and South America when that corridor is documented end to end. One desk. Documented metal. Arbitrary agents extract the margin and leave the mine with the risk. Local and artisanal operators get more value and more security when they sell to a documented desk: fair terms, OECD due diligence, and a path into Dubai that does not depend on whoever shows up with cash.",
        ]
    )
    b.sub("Africa")
    b.paras(
        [
            "Mine interests, collection warehouses and artisanal gold from inspected, state-approved mines. Presence means stakes, people on site, and a counterparty the mine can call again — West, Central, North and East Africa included. Lots are received, checked and held under chain of custody before they move.",
            "We are working toward our own export licence so gold won locally can move in a closed loop: origin, warehouse, assay, export and Dubai intake under one responsible counterparty. The licence is not granted yet. Until it is, every lot still moves under existing permits, OECD due diligence and bank-to-bank settlement.",
        ]
    )
    b.sub("Asia")
    b.paras(
        [
            "Corridors into Dubai for documented intake. Same OECD screen, same chain of custody — no informal melt, no arbitrary agents.",
        ]
    )
    b.sub("Europe / Switzerland")
    b.paras(
        [
            "Trading of refined bars only. No doré, no scrap, no artisanal intake in Europe. The Swiss and European leg is allocated, refined metal.",
        ]
    )
    b.sub("South America")
    b.paras(
        [
            "We are not originating in South America yet. When the corridor is documented end to end, it will sit on the book. Not before.",
        ]
    )
    b.close_white()

    b.photo_sourcing()

    b.white("Origin", "Responsible sourcing", "Responsible sourcing")
    b.paras(
        [
            "AULM is committed to high-quality product and to ethical standards on origin. Extraction, trading, handling and export of minerals from conflict-affected and high-risk areas can carry serious harm. We respect human rights and we do not contribute to conflict. Origin is the mandate — inspected, state-approved mines, documented lots before a price, not after the metal has already moved.",
            "OECD due diligence starts at the pit. Chain of custody from the ground, not from a Dubai spreadsheet. Supplier contracts carry our responsible-sourcing policy. CAHRA screening on origin corridors, including West, Central, North and East Africa.",
        ]
    )
    b.sub("How every lot is treated")
    b.bullets(
        [
            "OECD due diligence on the supplier and the corridor — not an optional add-on.",
            "Independent assay and lot documentation before a firm price.",
            "Certificate of origin, customs and insurance on every accepted mandate.",
            "SWIFT MT103 between approved accounts. No cash, crypto or third-party payers.",
            "Grievances to contact@aulmtrading.com — logged, investigated, retained five years.",
        ]
    )
    b.close_white()

    b.white("Origin", "Due diligence and compliance", "Due diligence")
    b.paras(
        [
            "We adopt and put into supplier contracts a policy on responsible sourcing from CAHRAs. We will not finance conflict. We comply with United Nations sanctions and applicable domestic law. We do not tolerate torture, forced labour, the worst forms of child labour, widespread sexual violence, war crimes, crimes against humanity or genocide in the supply chain we accept.",
            "We will not support non-state armed groups through extraction, transport, trade or export. We will not support public or private security forces who illegally control mine sites or extort along the route. Where security is contracted, engagement follows the Voluntary Principles on Security and Human Rights.",
            "No bribes to conceal origin or to misrepresent taxes, fees and royalties. We support the elimination of money laundering tied to illegal taxation in mineral supply chains. Taxes and royalties from CAHRAs are paid to governments and disclosed in line with EITI principles where they apply.",
            "AULM adheres to UAE and international sanctions, including relevant UNSCRs, UAE Cabinet Decision No. 74 of 2020, and FATF Recommendations 6 and 7. Customers, transactions and beneficial owners are screened. Listed persons are frozen without delay. Suspicious activity is reported via goAML.",
            "This is how every mandate works — not a separate product. KYC/KYB, documented chain of custody, bank-to-bank settlement only.",
        ]
    )
    b.close_white()

    b.white("Origin", "Climate on the desk", "Climate")
    b.paras(
        [
            "We try to go as green as possible on the ounces we move. Solar arrays at origin warehouses power lighting and machinery — crushers, pumps, assay lamps. Diesel last. The desk reports on climate in line with the EU conversation our counterparties already have. African corridors where the grid is already going renewable are preferred when the papers and the metal both clear.",
            "Lower CO₂ is not a substitute for origin. A green warehouse on an undocumented lot is still an undocumented lot. Climate sits next to OECD due diligence, not instead of it.",
        ]
    )
    b.close_white()

    b.photo_supply()

    b.white("Movement", "From pit to vault", "From pit to vault")
    b.paras(
        [
            "AULM runs physical gold, silver and copper from African and global corridors into Dubai. Every lot is subject to origin verification, KYC/KYB and documented chain of custody before it moves — not as an add-on, as the operating model.",
            "The same desk coordinates assay, partner refining, insured freight and custody worldwide. Counterparties deal with one IFZA-licensed trader in Dubai.",
        ]
    )
    b.sub("Four steps")
    b.bullets(
        [
            "Sourcing — OECD due diligence on origin, CAHRA screening, supplier contracts that carry the policy.",
            "Assay and origin — independent assay, certification of origin, lot papers before purchase.",
            "Movement — insured ocean freight, air into Dubai, secure road. Corridors sit in the procedure library.",
            "Custody — delivery to client specification worldwide. Interim storage in Dubai where required.",
        ]
    )
    b.paras(
        [
            "AULM coordinates the mandate. Licensed carriers and security partners execute the physical move. We are not a public logistics product page. Movement is part of the trade file.",
        ]
    )
    b.close_white()

    b.photo_refinery()

    b.white("Refinery", "Assay, refining, settlement", "Assay and settlement")
    b.paras(
        [
            "AULM coordinates institutional refining and offtake for doré gold, alluvial dust, nuggets and non-LBMA bullion bars — documented supply chain, 48-hour fire assay and bank-only settlement. Refining is performed by independent licensed partner refineries. AULM coordinates intake, compliance routing and settlement instructions. Assay timelines, pricing and acceptance follow partner terms, material condition and the jurisdiction.",
        ]
    )
    b.sub("What we take")
    b.bullets(
        [
            "Doré — unrefined bars from licensed producers, origin and chain of custody before intake.",
            "Dust — alluvial and concentrate, weighed, sealed, fire-assayed within 48 hours.",
            "Nuggets — verified sources only; enhanced due diligence before purchase.",
            "Non-LBMA bullion — re-melt or structured exit after assay and compliance clearance.",
        ]
    )
    b.paras(
        [
            "Sellers receive best market value on assay-confirmed weight and fineness, less a small institutional discount on cleared lots. MT103 on T+1 after the assay is agreed. Mandates can be structured for LBMA good delivery or non-LBMA product for re-melting or tax-free transport where jurisdiction and papers allow.",
            "We will not purchase anonymous or non-compliant flows. Traceable provenance, AML clearance, partner refinery acceptance and bank rails are required. Prior written approval from compliance on every mandate.",
        ]
    )
    b.close_white()

    b.white("Desk", "Working with AULM", "Working with AULM")
    b.paras(
        [
            "Open an account on aulmtrading.com. Download the onboarding pack, complete it, stamp it, and submit it with the KYC flow. Beneficial owners complete passport and face checks. Compliance writes back. There is no public client dashboard — the desk contacts you.",
            "Documents, gold and silver buying procedures, and this brochure sit on the Documents page. Read the procedure that matches the metal before you write.",
        ]
    )
    b.sub("What we will not do")
    b.bullets(
        [
            "Bank guarantees, SBLCs, letters of credit, or similar paper.",
            "Third-party financiers or instruments issued to someone else’s bank.",
            "Cash, crypto, or payment agents who are not the named counterparty.",
            "Undocumented melt, informal agents, or lots without origin.",
            "Retail, walk-in, or “proof of funds” theatre in place of KYC.",
        ]
    )
    b.paras(
        [
            "Confidential correspondence: contact@aulmtrading.com. Building A1, Dubai Digital Park, IFZA Business Park, Dubai Silicon Oasis, Dubai, United Arab Emirates. IFZA License No. 85927.",
        ]
    )
    b.close_white()

    b.photo_close()


def write_brochure() -> None:
    path = OUT / "aulm-institutional-brochure-2026.pdf"
    probe = BytesIO()
    first = Brochure(probe, toc=None)
    fill_brochure(first)
    toc = list(first.toc)
    first.save()

    second = Brochure(path, toc=toc)
    fill_brochure(second)
    second.save()
    print("wrote", path, f"({second.page} pages)")


if __name__ == "__main__":
    register_fonts()
    OUT.mkdir(parents=True, exist_ok=True)
    write_gold_pdf()
    write_silver_pdf()
    write_brochure()
