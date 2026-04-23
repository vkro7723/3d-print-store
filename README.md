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

Update `.env.local` with your Sanity credentials:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Start Development

```bash
cd 3d-print-store
npm run dev
```

### 4. Access Sanity Studio (Content Management)

```bash
npm run sanity
```

This will open Sanity Studio where you can:
- Add/edit products
- Update site settings
- Manage all content

## Features

- [x] Homepage with hero banner
- [x] Products listing page with category filters
- [x] About page
- [x] Contact page
- [ ] Shopping cart
- [ ] Payment integration (Stripe/PayPal)
- [ ] Order management

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Customization

### Changing Colors/Fonts

Edit `src/app/globals.css` for global styles.

### Adding New Pages

Create new folders in `src/app/` directory.

### Modifying Product Schema

Edit `sanity/schema/product.ts` to add/remove product fields.
