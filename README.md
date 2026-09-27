# Provoxi — Production-style E-commerce Starter

Provoxi is a full-stack e-commerce application built with React, Express, MongoDB/Mongoose and optional Redis, Razorpay, Cloudinary and email integrations.

## Included
- JWT authentication in HTTP-only cookies
- Refresh tokens, email verification/reset-password token flows
- RBAC for user/admin
- Product/category CRUD, search, filters, sorting and pagination
- Cart, wishlist, addresses and coupons
- Checkout and order lifecycle
- Razorpay integration with server-side signature verification + webhook endpoint
- Reviews with verified-purchase detection
- Notifications and optional email delivery
- Redis cache-aside layer with invalidation
- Admin dashboard, products, users, orders, reviews and coupons
- Helmet, CORS, rate limiting, validation, centralized errors and audit logs
- React responsive UI with protected routes and admin area

## Run
1. Copy `backend/.env.example` to `backend/.env` and fill MongoDB credentials at minimum.
2. Install backend dependencies: `cd backend && npm install`.
3. Run backend: `npm run dev`.
4. Install frontend dependencies: `cd ../frontend && npm install`.
5. Run frontend: `npm run dev`.
6. API defaults to `http://localhost:5000/api`; frontend defaults to `http://localhost:5173`.

## Seed data
From `backend`:
`npm run seed`

Seeded admin:
- email: `admin@provoxi.local`
- password: `Admin@12345`

Change it immediately outside local development.

## Optional services
The app still boots if Redis, Cloudinary, Razorpay or SMTP are not configured. Their production features will be disabled with clear server logs.

## Architecture
Frontend: React/Vite -> Axios API client -> Express REST API -> Services -> Mongoose/MongoDB. Redis is used as an optional cache/session-support layer. Payment and email providers are isolated behind services.

## Production checklist
- Set strong secrets and `NODE_ENV=production`
- Configure a real MongoDB replica set if using transactions
- Configure HTTPS and secure cookies
- Configure Razorpay webhook URL and secret
- Configure Redis, SMTP and Cloudinary
- Rotate seeded admin credentials
- Add centralized logs/monitoring
- Review CORS allow-list and rate limits
