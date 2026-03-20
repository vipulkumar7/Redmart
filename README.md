
# Redmart

Redmart is a modern e-commerce web application built with React, TypeScript, Redux, and Vite. It features a robust shopping experience including product browsing, cart management, checkout, payment integration, user authentication, and order tracking.

## Features

- Product listing and details
- Shopping cart and checkout
- Stripe payment integration
- User authentication (Google, Github, Email)
- Order history and details
- Address management
- Profile management
- Responsive UI with Bootstrap
- Redux for state management
- Toast notifications
- Analytics and speed insights (Vercel)

## Project Structure

- `src/Component/Pages/` — Main pages (Home, Products, Cart, Checkout, Orders, Profile, About, Contact, etc.)
- `src/redux/` — Redux actions, reducers, store, and sagas
- `src/firebase/` — Firebase authentication setup
- `src/axiosInstance/` — Axios configuration for API calls
- `src/config/` — API endpoint configuration
- `src/utils/` — Utility functions and image paths
- `public/` — Static assets

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn

### Installation
```bash
git clone https://github.com/vipulkumar7/Redmart.git
cd Redmart
npm install
```

### Running Locally
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## Deployment

Deploy using Vercel, Netlify, or GitHub Pages. See `vercel.json` and `netlify.toml` for configuration.

## Authentication

Supports Google, Github, and Email authentication via Firebase. See `src/firebase/auth.ts` for setup.

## Payment

Stripe integration for secure payments. See `src/Component/Pages/Payment.tsx`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
