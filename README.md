# Now Open - Come Visit Us!

A modern web application built with Next.js for managing and discovering local spots and businesses.

## Tech Stack

### Core Framework

- **Next.js 15.4.2** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Build & Development

- **Turbopack** - Next-generation bundler (used in dev mode)
- **ESLint 9** - Code linting with Next.js configuration

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **@tailwindcss/forms** - Form styling plugin
- **Geist & Geist Mono** - Google Fonts for typography

### Authentication & Session Management

- **iron-session 8.0.4** - Secure, stateless session management
- **Cookie-based authentication** - Server-side session handling
- **Next.js Middleware** - Route protection and authentication checks

### Form Handling & Validation

- **Zod 4.0.5** - Schema validation library
- **React Server Actions** - Server-side form processing
- **useFormStatus** - Form state management

### UI Components & Icons

- **@heroicons/react 2.2.0** - Icon library
- **Custom form components** - Reusable form inputs, buttons, and selects
- **Next.js Image** - Optimized image handling

### Architecture Patterns

- **App Router** - Next.js 13+ routing system
- **Server Actions** - Server-side mutations ("use server")
- **Client Components** - Interactive UI components ("use client")
- **Route Groups** - Organized routing with `(auth)` and `(nav-bar)` groups
- **Custom API wrapper** - Centralized fetch utilities for authenticated and public requests

### Key Features

- **Session Management** - Secure cookie-based authentication
- **Protected Routes** - Middleware-based route protection
- **Form Validation** - Client and server-side validation with Zod
- **File Upload** - Image handling for spot photos
- **Google Maps Integration** - Embedded maps for location display
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## Project Structure

```
app/
  (auth)/          # Authentication routes (sign-in, create-account)
  (nav-bar)/       # Protected routes with navigation (home, spots)
components/        # Reusable React components
lib/              # Utility functions (session, fetch wrapper, etc.)
middleware.ts     # Route protection middleware
```

## Development

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Variables

Required environment variables:

- `COOKIE_PASSWORD` - Secret key for iron-session cookie encryption

## Type Safety

The project uses TypeScript with strict mode enabled, ensuring type safety across:

- Server actions
- API responses
- Session data
- Form validation schemas
- Component props

## Code Quality

- **ESLint** - Configured with Next.js recommended rules
- **TypeScript** - Strict type checking enabled
- **Path aliases** - `@/*` for cleaner imports
