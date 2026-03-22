import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PublicPage from "./pages/PublicPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import FinancialPage from "./pages/FinancialPage";
import MyCarPage from "./pages/MyCarPage";
import AchievementsPage from "./pages/AchievementsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/financial" element={<FinancialPage />} />
            <Route path="/my-car" element={<MyCarPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
