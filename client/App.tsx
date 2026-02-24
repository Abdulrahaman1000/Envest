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
import CompleteProfile from "./pages/CompleteProfile";
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
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/Dashboard/Overview";
import KYCManagement from "./pages/Dashboard/KYCManagement";
import UserManagement from "./pages/Dashboard/UserManagement";
import UserDetail from "./pages/Dashboard/UserDetail";
import Transactions from "./pages/Dashboard/Transactions";
import TransactionDetail from "./pages/Dashboard/TransactionDetail";
import TransactionFilter from "./pages/Dashboard/TransactionFilter";
import InvestmentProducts from "./pages/Dashboard/InvestmentProducts";
import StockDetail from "./pages/Dashboard/StockDetail";
import AddStock from "./pages/Dashboard/AddStock";
import PortfolioManagement from "./pages/Dashboard/PortfolioManagement";
import PortfolioOverview from "./pages/Dashboard/PortfolioOverview";
import InvestmentBreakdown from "./pages/Dashboard/InvestmentBreakdown";
import PortfolioTransactionDetail from "./pages/Dashboard/PortfolioTransactionDetail";
import InvestmentNoteBill from "./pages/Dashboard/InvestmentNoteBill";
import Learn from "./pages/Dashboard/Learn";
import Support from "./pages/Dashboard/Support";
import Settings from "./pages/Dashboard/Settings";

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
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/face-id" element={<FaceID />} />

          {/* Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/kyc" element={<KYCManagement />} />

            {/* Users */}
            <Route path="/dashboard/users" element={<UserManagement />} />
            <Route path="/dashboard/users/:userId" element={<UserDetail />} />

            {/* Transactions */}
            <Route path="/dashboard/transactions" element={<Transactions />} />
            <Route path="/dashboard/transactions/filter" element={<TransactionFilter />} />
            <Route path="/dashboard/transactions/:transactionId" element={<TransactionDetail />} />

            {/* Investment Products */}
            <Route path="/dashboard/investments" element={<InvestmentProducts />} />
            <Route path="/dashboard/investments/:stockId" element={<StockDetail />} />
            <Route path="/dashboard/investments/:stockId/add" element={<AddStock />} />
            <Route path="/dashboard/investments/:stockId/edit" element={<AddStock />} />

            {/* Portfolio Management */}
            <Route path="/dashboard/portfolio" element={<PortfolioManagement />} />
            <Route path="/dashboard/portfolio/transaction/:txId" element={<PortfolioTransactionDetail />} />
            <Route path="/dashboard/portfolio/:userId" element={<PortfolioOverview />} />
            <Route path="/dashboard/portfolio/:userId/investment/:investmentId" element={<InvestmentBreakdown />} />
            <Route path="/dashboard/portfolio/:userId/investment/:investmentId/bill" element={<InvestmentNoteBill />} />

            {/* Administration */}
            <Route path="/dashboard/learn" element={<Learn />} />
             <Route path="/dashboard/support" element={<Support />}/>
            <Route path="/dashboard/settings" element={<Settings />} /> 
          </Route>

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