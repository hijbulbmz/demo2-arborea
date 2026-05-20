# Arborea Personal Care Storefront

Modern mobile-first ecommerce frontend foundation for a premium personal care brand.

## Stack

- React + Vite
- Tailwind CSS
- React Router
- Framer Motion
- Zustand
- Lucide React icons

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Structure

- `src/components` reusable UI, navigation, and commerce components
- `src/pages` route surfaces
- `src/layouts` mobile and desktop shells
- `src/routes` router configuration
- `src/store` Zustand app store
- `src/data` dummy JSON data
- `src/hooks` shared hooks
- `src/utils` helpers and animation presets

## Demo Auth

The authentication flow is frontend-only. Any email and password will sign in visually, with the demo session stored in localStorage or sessionStorage depending on the Remember me checkbox.

Demo credentials displayed in the UI:

- Email: `demo@brand.com`
- Password: `123456`
