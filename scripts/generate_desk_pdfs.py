"""Generate silver buying procedures + institutional brochure PDFs."""

from __future__ import annotations

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
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

W, H = A4
INK = (0.07, 0.07, 0.07)
MUTED = (0.42, 0.42, 0.42)
RULE = (0.86, 0.86, 0.86)
PAPER = (1, 1, 1)


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Aulm", FONT_REG))
    pdfmetrics.registerFont(TTFont("Aulm-Bold", FONT_BOLD))


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


def draw_header(c: Canvas) -> None:
    c.drawImage(logo_reader(), 36, H - 78, width=52, height=52, mask="auto")
    c.setFillColorRGB(*MUTED)
    c.setFont("Aulm", 8)
    c.drawRightString(W - 40, H - 42, "AULM Trading FZCO")
    c.drawRightString(W - 40, H - 54, "IFZA Licensed — Dubai, UAE")
    c.drawRightString(W - 40, H - 66, "www.aulmtrading.com")
    c.setStrokeColorRGB(*RULE)
    c.setLineWidth(0.6)
    c.line(36, H - 88, W - 36, H - 88)


def draw_footer(c: Canvas, page: int, pages: int) -> None:
    c.setStrokeColorRGB(*RULE)
    c.setLineWidth(0.6)
    c.line(36, 42, W - 36, 42)
    c.setFillColorRGB(*MUTED)
    c.setFont("Aulm", 7)
    c.drawString(36, 28, "AULM Trading FZCO — IFZA Licensed — Dubai, UAE — www.aulmtrading.com")
    c.drawRightString(W - 36, 28, f"Page {page} / {pages}")


def draw_title(c: Canvas, title: str) -> None:
    c.setFillColorRGB(*INK)
    c.setFont("Aulm-Bold", 18)
    c.drawCentredString(W / 2, H - 118, title)


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
        y -= 11 * max(1, len(wrap(c, value, "Aulm", 8.5, W - value_x - 48))) + 6
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
        y -= 11 * len(lines) + 8
    return y


def write_silver_pdf() -> None:
    path = OUT / "aulm-silver-buying-procedures-en-2026.pdf"
    c = Canvas(str(path), pagesize=A4)
    c.setTitle("AULM Silver Buying Procedures EN 2026")
    c.setAuthor("AULM Trading FZCO")

    draw_header(c)
    draw_title(c, "SILVER BUYING PROCEDURES")

    y = H - 148
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

    y -= 10
    c.setFont("Aulm-Bold", 10)
    c.drawString(48, y, "COMMODITY SPECIFICATIONS")
    y -= 18
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
    y -= 16
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
    y = H - 150
    c.setFont("Aulm-Bold", 10)
    c.setFillColorRGB(*INK)
    c.drawString(48, y, "DOCUMENTS PRIOR TO DEPARTURE")
    y -= 16
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

    y -= 10
    c.setFont("Aulm-Bold", 10)
    c.drawString(48, y, "RESPONSIBILITY")
    y -= 16
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
    y -= 16
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


def write_brochure() -> None:
    path = OUT / "aulm-institutional-brochure-2026.pdf"
    c = Canvas(str(path), pagesize=A4)
    c.setTitle("AULM Institutional Brochure 2026")
    c.setAuthor("AULM Trading FZCO")

    # 1 Cover
    bleed_photo(c, ROOT / "public/africa/africa-hero.jpg", 0.38)
    c.drawImage(logo_reader(True), 40, H - 96, width=72, height=72, mask="auto")
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Aulm", 9)
    c.drawString(40, 86, "IFZA 85927  ·  DUBAI")
    c.setFont("Aulm-Bold", 28)
    y = 210
    for line in ["Precious metals.", "Institutional desk."]:
        c.drawString(40, y, line)
        y -= 34
    c.setFont("Aulm", 11)
    c.drawString(40, 128, "Gold  ·  Silver  ·  Copper")
    c.showPage()

    # 2 The desk
    c.setFillColorRGB(0.965, 0.965, 0.968)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    left = cover_reader(ROOT / "public/company/locations/switzerland.jpg", W / 2, H)
    right = cover_reader(ROOT / "public/company/locations/uae.jpg", W / 2, H)
    c.drawImage(left, 0, 0, width=W / 2, height=H)
    c.drawImage(right, W / 2, 0, width=W / 2, height=H)
    c.setFillColorRGB(0, 0, 0)
    c.setFillAlpha(0.45)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillAlpha(1)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Aulm", 8)
    c.drawString(40, H - 52, "WHO WE ARE")
    c.setFont("Aulm-Bold", 26)
    c.drawString(40, H - 92, "Swiss–German roots.")
    c.drawString(40, H - 122, "Dubai desk.")
    body = (
        "AULM is an IFZA-licensed B2B precious metals trader — family offices, funds and qualified counterparties only. "
        "We buy doré and scrap at LBMA-linked terms and sell LBMA bullion, with documented chain of custody and bank-to-bank settlement. "
        "One counterparty from origination to delivery."
    )
    y = 160
    c.setFont("Aulm", 10)
    for line in wrap(c, body, "Aulm", 10, W - 80):
        c.drawString(40, y, line)
        y -= 14
    c.showPage()

    # 3 On the ground
    portraits = [
        ROOT / "public/people/01.jpg",
        ROOT / "public/people/02.jpg",
        ROOT / "public/people/03.jpg",
        ROOT / "public/people/04.jpg",
    ]
    col = W / 4
    for i, p in enumerate(portraits):
        c.drawImage(cover_reader(p, col, H), i * col, 0, width=col, height=H)
    c.setFillColorRGB(0, 0, 0)
    c.setFillAlpha(0.28)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillAlpha(1)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Aulm-Bold", 32)
    c.drawString(32, H * 0.42, "On the ground")
    c.setFont("Aulm", 10)
    c.drawString(32, 48, "Africa  ·  Asia  ·  Europe  ·  Dubai intake")
    c.showPage()

    # 4 Sourcing
    bleed_photo(c, ROOT / "public/sourcing/responsible-sourcing.jpg", 0.4)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Aulm", 8)
    c.drawString(40, H - 52, "ORIGIN")
    c.setFont("Aulm-Bold", 26)
    c.drawString(40, H - 92, "Responsible sourcing")
    copy = (
        "Origin is the mandate. Inspected, state-approved mines — documented lots before a price, not after the metal has already moved. "
        "OECD due diligence starts at the pit. Chain of custody from the ground, not from a Dubai spreadsheet."
    )
    y = 140
    c.setFont("Aulm", 11)
    for line in wrap(c, copy, "Aulm", 11, W - 80):
        c.drawString(40, y, line)
        y -= 15
    c.showPage()

    # 5 Supply
    c.drawImage(cover_reader(ROOT / "public/logistics/supply-sea.jpg", W, H / 2), 0, H / 2, width=W, height=H / 2)
    c.drawImage(cover_reader(ROOT / "public/logistics/supply-air.jpg", W, H / 2), 0, 0, width=W, height=H / 2)
    c.setFillColorRGB(0, 0, 0)
    c.setFillAlpha(0.35)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillAlpha(1)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Aulm-Bold", 28)
    c.drawString(40, H / 2 + 28, "Supply chain")
    c.setFont("Aulm", 10)
    c.drawString(40, 56, "Insured ocean freight  ·  Air into Dubai  ·  One desk")
    c.showPage()

    # 6 Refinery
    bleed_photo(c, ROOT / "public/refinery/refinery-still.jpg", 0.4)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Aulm-Bold", 28)
    c.drawCentredString(W / 2, H / 2 + 24, "Assayed. Weighed. Settled.")
    c.setFont("Aulm", 10)
    line = "48-hour fire assay  ·  Partner refineries  ·  Bank-only settlement"
    c.drawCentredString(W / 2, H / 2 - 8, line)
    c.showPage()

    # 7 Metals
    c.setFillColorRGB(0.07, 0.07, 0.08)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Aulm", 8)
    c.drawString(40, H - 52, "THE BOOK")
    c.setFont("Aulm-Bold", 26)
    c.drawString(40, H - 90, "Gold. Silver. Copper.")
    metals = [
        ("Gold", "Doré, bullion, nuggets, dust. Core book. 500g–2t / month on continuous mandates."),
        ("Silver", "Bars, grain, industrial. Same desk, same KYC, allocated metal."),
        ("Copper", "Institutional offtake. Documented origin. Write with volume and delivery city."),
    ]
    y = H - 150
    for title, body in metals:
        c.setFont("Aulm-Bold", 14)
        c.drawString(40, y, title)
        y -= 18
        c.setFont("Aulm", 10)
        for line in wrap(c, body, "Aulm", 10, W - 80):
            c.drawString(40, y, line)
            y -= 14
        y -= 22
    c.setFont("Aulm", 9)
    c.setFillColorRGB(0.75, 0.75, 0.75)
    c.drawString(40, 56, "B2B institutional counterparties only. No retail.")
    c.showPage()

    # 8 Contact / slots
    bleed_photo(c, ROOT / "public/company/locations/uae.jpg", 0.55)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Aulm", 8)
    c.drawString(40, H - 52, "2026")
    c.setFont("Aulm-Bold", 26)
    c.drawString(40, H - 92, "Work with the desk")
    points = [
        "28 gold purchase slots remaining in 2026 — reserve with the desk.",
        "We do not accept bank guarantees, SBLCs, letters of credit, or third-party financiers.",
        "Settlement is SWIFT MT103 after assay. Bank-to-bank only.",
        "Open an account to start trading. KYC/KYB and an e-meeting first.",
    ]
    y = H - 150
    c.setFont("Aulm", 11)
    for point in points:
        for line in wrap(c, point, "Aulm", 11, W - 80):
            c.drawString(40, y, line)
            y -= 15
        y -= 10
    c.setFont("Aulm-Bold", 12)
    c.drawString(40, 88, "contact@aulmtrading.com")
    c.setFont("Aulm", 9)
    c.drawString(40, 70, "Building A1, Dubai Digital Park  ·  IFZA License 85927")
    c.showPage()

    c.save()
    print("wrote", path)


if __name__ == "__main__":
    register_fonts()
    OUT.mkdir(parents=True, exist_ok=True)
    write_silver_pdf()
    write_brochure()
