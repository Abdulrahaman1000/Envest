import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Auth Pages
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import CreateAccount from "./pages/CreateAccount";
import VerifyEmail from "./pages/VerifyEmail";
import KYC from "./pages/KYC";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FaceID from "./pages/FaceID";

// App Pages
import Home from "./pages/Home";
import FundNGNWallet from "./pages/FundNGNWallet";
import DepositUSDWallet from "./pages/DepositUSDWallet";
import PaymentGateway from "./pages/PaymentGateway";
import InvestStocks from "./pages/InvestStocks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Splash & Onboarding */}
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Auth Routes */}
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/face-id" element={<FaceID />} />

          {/* App Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/fund-ngn-wallet" element={<FundNGNWallet />} />
          <Route path="/deposit-usd-wallet" element={<DepositUSDWallet />} />
          <Route path="/payment-gateway" element={<PaymentGateway />} />
          <Route path="/invest-stocks" element={<InvestStocks />} />

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
