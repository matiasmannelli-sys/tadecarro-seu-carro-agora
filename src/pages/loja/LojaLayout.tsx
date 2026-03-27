import { Outlet } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { CustomerProvider } from "@/contexts/CustomerContext";
import LojaHeader from "@/components/loja/LojaHeader";

const LojaLayout = () => {
  return (
    <CustomerProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#090A2E] flex flex-col">
          <LojaHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="bg-[#090A2E] border-t border-white/10 py-6 px-4 text-center">
            <p className="text-xs text-[#F6F5F3]/30">
              Tá de Carro © {new Date().getFullYear()} — Seu carro, sua conquista.
            </p>
          </footer>
        </div>
      </CartProvider>
    </CustomerProvider>
  );
};

export default LojaLayout;
