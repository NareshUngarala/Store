# StoreOS Admin Portal

A modern admin portal built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ⚡ Next.js 14 with App Router
- 🔷 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🧩 shadcn/ui components
- 📁 Organized admin portal structure

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── admin/          # Admin portal routes
│   │   ├── users/      # User management
│   │   ├── products/   # Product management
│   │   ├── orders/     # Order management
│   │   └── settings/   # Settings
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   └── ui/             # shadcn/ui components
├── lib/
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## Admin Portal Routes

- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/settings` - Settings

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

