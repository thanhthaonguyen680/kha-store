# Kha

An online store (storefront + admin panel) built with Next.js, Supabase (auth & database), and Stripe (payments).

🔗 **Live demo:** [https://kha-six.vercel.app/](https://kha-six.vercel.app/)

## Features

- Storefront with product listing, cart, and Stripe checkout
- User sign up/sign in via Supabase Auth
- Admin dashboard for managing products

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Environment Variables

Create a `.env.local` file in the project root with the variables required for Supabase and Stripe (see `lib/` and `supabase/` for the keys in use), for example:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
```

## Repo & Public Sharing Workflow

This repo is public on GitHub at [github.com/thanhthaonguyen680/brand](https://github.com/thanhthaonguyen680/brand).

Workflow for sharing / contributing:

1. **Clone the repo:**
   ```bash
   git clone https://github.com/thanhthaonguyen680/brand.git
   cd brand
   ```
2. **Create a new branch for your changes:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit & push:**
   ```bash
   git push origin feature/your-feature-name
   ```
4. **Open a Pull Request** on GitHub for review before merging into `main`.
5. Once merged into `main`, Vercel automatically deploys the new version to [https://kha-six.vercel.app/](https://kha-six.vercel.app/).

## Deploy

The project is automatically deployed on [Vercel](https://vercel.com) on every change to the `main` branch.
