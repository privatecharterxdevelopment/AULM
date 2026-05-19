# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Form email (Postmark on Vercel)

All forms POST to `/api/send-inquiry`. **If emails never arrive**, check Vercel env vars first.

### Vercel setup (required for automatic delivery)

1. [Postmark](https://postmarkapp.com) → **Servers** → your server → **API Tokens**
2. Copy the **Server API token** (not the Account API token)
3. Vercel → Project **AULM** → **Settings** → **Environment Variables**:
   - `POSTMARK_API_TOKEN` = Server API token
   - `FROM_EMAIL` = a **verified sender** in Postmark (e.g. `contact@aulmtrading.com`)
4. **Redeploy** after changing variables

Verify domain/sender in Postmark under **Sender Signatures**.

### Test production API

```bash
curl -X POST https://www.aulmtrading.com/api/send-inquiry \
  -H "Content-Type: application/json" \
  -d '{"formType":"test","subject":"Test","data":{"Name":"Test","Email":"you@example.com"}}'
```

- `{"ok":true}` → Postmark works
- `valid Server token` → wrong token in Vercel; use Server API token
- `501` → `POSTMARK_API_TOKEN` not set

Without Postmark, forms open the visitor’s mail app (user must press **Send**).

Treat KYC data as PII.
