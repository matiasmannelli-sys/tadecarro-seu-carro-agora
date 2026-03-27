import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import ProgressPage from "./pages/ProgressPage";
import StorePage from "./pages/StorePage";
import FinancialPage from "./pages/FinancialPage";
import ProfilePage from "./pages/ProfilePage";
import MaintenancePage from "./pages/MaintenancePage";
import NotFound from "./pages/NotFound";

// Landing page / e-commerce
import LojaLayout from "./pages/loja/LojaLayout";
import LojaHomePage from "./pages/loja/LojaHomePage";
import ProdutoPage from "./pages/loja/ProdutoPage";
import CarrinhoPage from "./pages/loja/CarrinhoPage";
import CheckoutPage from "./pages/loja/CheckoutPage";
import ConfirmacaoPage from "./pages/loja/ConfirmacaoPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/loja" replace />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Landing page e-commerce */}
          <Route path="/loja" element={<LojaLayout />}>
            <Route index element={<LojaHomePage />} />
            <Route path="produto/:id" element={<ProdutoPage />} />
            <Route path="carrinho" element={<CarrinhoPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="confirmacao" element={<ConfirmacaoPage />} />
          </Route>

          {/* App interno */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/financial" element={<FinancialPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
