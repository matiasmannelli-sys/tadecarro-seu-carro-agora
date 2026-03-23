import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<LoginPage />} />
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
