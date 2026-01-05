# EnVest - Mobile Investment App

A modern, mobile-first investment application built with React, TypeScript, and cutting-edge technologies.

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **UI Components**: shadcn/ui + Radix UI
- **Routing**: React Router 6
- **Backend**: Express.js
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📁 Project Structure

```
client/
├── pages/               # Page components for all screens
│   ├── Splash.tsx      # Splash screen
│   ├── Onboarding.tsx  # Onboarding flow
│   ├── CreateAccount.tsx
│   ├── VerifyEmail.tsx
│   ├── KYC.tsx         # Know Your Customer verification
│   ├── Login.tsx
│   ├── ForgotPassword.tsx
│   ├── ResetPassword.tsx
│   ├── FaceID.tsx
│   ├── Home.tsx        # Main dashboard
│   ├── FundNGNWallet.tsx
│   ├── DepositUSDWallet.tsx
│   ├── PaymentGateway.tsx
│   └── InvestStocks.tsx
├── stores/             # Zustand state management
│   ├── authStore.ts    # Authentication state
│   ├── investmentStore.ts  # Investment portfolio state
│   └── onboardingStore.ts  # Onboarding flow state
├── components/         # Reusable UI components
│   └── ui/            # shadcn/ui components
├── App.tsx            # Main routing setup
├── global.css         # Global styles & theme
└── vite-env.d.ts

server/
├── index.ts           # Express server setup
└── routes/            # API endpoints

shared/
└── api.ts             # Shared types between client & server
```

## 🎨 Features

### Authentication Flow
- **Splash Screen**: Welcome screen with auto-redirect
- **Onboarding**: Introduction carousel
- **Account Creation**: Email, password, personal info
- **Email Verification**: OTP verification
- **KYC Verification**: Multi-step Know Your Customer verification
- **Login**: Email/password with Face ID option
- **Password Reset**: Email-based password recovery

### App Features
- **Dashboard**: Portfolio overview with balance and investments
- **Wallet Management**: 
  - Fund NGN (Nigerian Naira) Wallet
  - Deposit USD (US Dollar) Wallet
- **Payment Gateway**: Card payment processing with OTP
- **Stock Investing**: Browse and invest in Nigerian stocks
- **Transaction History**: View all transactions

### State Management
- **Auth Store**: User authentication and profile
- **Investment Store**: Portfolio, wallet balances, investments
- **Onboarding Store**: Multi-step form state during signup

## 🛠️ Development

### Installation

```bash
# Install dependencies
pnpm install
```

### Running the Development Server

```bash
# Start dev server (client + server)
pnpm dev
```

The app will be available at `http://localhost:8080`

### Building for Production

```bash
# Build both client and server
pnpm build

# Start production server
pnpm start
```

### Type Checking

```bash
pnpm typecheck
```

### Testing

```bash
pnpm test
```

## 📱 Mobile-First Design

The entire application is built with mobile-first design principles:
- Responsive layout optimized for mobile screens
- Touch-friendly buttons and controls
- Single-column layout for mobile
- Optimized for viewport widths from 320px to 480px

## 🔐 Security Features

- Password-protected accounts
- Email verification
- OTP authentication for payments
- KYC verification process
- Face ID authentication option
- Bank account validation

## 💱 Multi-Currency Support

- **NGN (Nigerian Naira)**: Primary currency for local investments
- **USD (US Dollar)**: For international transactions

## 📊 Investment Features

- Browse Nigerian stocks with real-time prices
- Track portfolio performance
- View investment gains/losses
- Multi-step investment purchase process
- Payment gateway integration

## 🎯 User Flows

### Signup Flow
1. Onboarding → Create Account → Verify Email → KYC → Success

### Login Flow
1. Login with Email/Password or Face ID
2. Dashboard access

### Investment Flow
1. View Stocks → Select Stock → Enter Amount → Payment → Success

### Wallet Top-up
1. Select Currency (NGN/USD) → Enter Amount → Select Payment Method → Payment Gateway → Success

## 🚀 Deployment

The app is ready for deployment to:
- **Netlify**: Via MCP integration
- **Vercel**: Via MCP integration
- **AWS**: Traditional hosting
- **DigitalOcean**: VPS deployment

## 📦 Dependencies

### Core
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.30.1
- typescript: ^5.9.2

### State & Data
- zustand: ^5.0.9
- @tanstack/react-query: ^5.84.2
- zod: ^3.25.76

### UI & Styling
- tailwindcss: ^3.4.17
- tailwindcss-animate: ^1.0.7
- @radix-ui/* (various UI components)
- lucide-react: ^0.539.0
- shadcn/ui components

### Server
- express: ^5.1.0
- cors: ^2.8.5

## 🌈 Customization

### Colors & Theme
Edit `client/global.css` and `tailwind.config.ts` to customize:
- Primary color (currently yellow: #FBBF24)
- Background colors
- Text colors
- Component styles

### Forms & Validation
Forms use React Hook Form + Zod for:
- Input validation
- Error handling
- Type-safe form submission

## 📝 Notes

- The app uses Zustand for simple, efficient state management
- TanStack Query can be integrated for API data fetching
- Shadcn/ui components are pre-installed and ready to use
- All pages are fully responsive and mobile-optimized
- The backend is optional - API calls can be configured as needed

## 🤝 Contributing

Feel free to extend this template with additional features:
- Add more pages
- Integrate with real APIs
- Add more payment methods
- Implement real authentication
- Connect to actual investment APIs

## 📄 License

This project is open source and available under the MIT license.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Shadcn/UI Documentation](https://ui.shadcn.com)
- [React Router Documentation](https://reactrouter.com)

---

**Happy investing! 🚀📈**
