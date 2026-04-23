# 3D Print Store - Setup Guide

## Overview

This is a Next.js + Sanity CMS based e-commerce website for selling 3D printed products internationally.

## Tech Stack

- **Frontend**: Next.js 16 (App Router)
- **CMS**: Sanity.io (Headless CMS)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (Free tier available)

## Project Structure

```
3d-print-store/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage
│   │   ├── products/
│   │   │   └── page.tsx      # Products listing
│   │   ├── about/
│   │   │   └── page.tsx      # About page
│   │   └── contact/
│   │       └── page.tsx      # Contact page
│   └── sanity/
│       └── client.ts         # Sanity API client
├── sanity/
│   ├── config.ts             # Sanity configuration
│   └── schema/               # Content schemas
│       ├── product.ts        # Product schema
│       └── siteSettings.ts   # Site settings schema
└── .env.local               # Environment variables
```

## Getting Started

### 1. Set up Sanity CMS

1. Go to [sanity.io](https://www.sanity.io/) and create a free account
2. Create a new project (select "Start from scratch")
3. Copy your Project ID from the project settings
4. Create a dataset named "production" (or use default)

### 2. Configure Environment Variables

Create or update `.env.local` with your credentials. You will also need to add these to your Vercel project settings:

```bash
# Sanity CMS (Get these from sanity.io project settings)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Stripe (Get these from stripe.com dashboard -> Developers -> API keys)
# Use 'Test Mode' keys first!
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Start Development

```bash
npm run dev
```

## Deployment

### Step 1: Push to GitHub
1. Create a new repository on GitHub.
2. Link your local project:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Click "Add New" -> "Project".
3. Import your GitHub repository.
4. **Crucial**: Add the 4 environment variables listed above in the "Environment Variables" section during setup.
5. Click "Deploy".

## Maintenance

- **Adding Products**: Use `npm run sanity` or log in to the Sanity.io dashboard.
- **Changing UI**: This project uses Tailwind CSS and Next.js App Router. Most layout changes can be made in `src/app/layout.tsx` or individual page files.
- **Zero Cost**: Your hosting (Vercel) and CMS (Sanity) are free for small to medium traffic. Stripe only charges a fee per successful transaction.
