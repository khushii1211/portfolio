# Khushi Chauhan — Modeling Portfolio

A modern, responsive fashion and commercial modeling portfolio for Khushi Chauhan. Built with React, Vite, Express and custom CSS.

## Local development

```bash
npm install
npm run dev
```

The website runs at `http://localhost:5173` and the local booking API at `http://localhost:3001`.

## Production on Vercel

The production booking endpoint is the Vercel function at `api/bookings.js`. It sends each inquiry through [Resend](https://resend.com).

Configure these environment variables in the Vercel project before deploying:

```text
RESEND_API_KEY=re_...
BOOKING_TO_EMAIL=chauhan.khushi.1211@gmail.com
BOOKING_FROM_EMAIL=Portfolio Bookings <bookings@your-verified-domain.com>
```

`BOOKING_TO_EMAIL` and `BOOKING_FROM_EMAIL` have defaults, but a Resend API key is required. For production delivery, use a sender address on a domain verified in Resend. Redeploy after changing environment variables.

Build the site with:

```bash
npm run build
```
