import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCustomer } from "@/contexts/CustomerContext";
import logoIcon from "@/assets/logo-icon-orange.png";

const LojaHeader = () => {
  const { itemCount } = useCart();
  const { customer, isLoggedIn, logout } = useCustomer();

  return (
    <header className="sticky top-0 z-50 bg-[#090A2E]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/loja" className="flex items-center gap-2">
          <img src={logoIcon} alt="TaDeCarro" className="h-8 w-8 object-contain" />
          <span className="text-lg font-extrabold text-[#F6F5F3]">
            TaDe<span className="text-[#E5541C]">Carro</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#F6F5F3]/50 hidden sm:block">
                {customer?.nome?.split(" ")[0]}
              </span>
              <button onClick={() => logout()} className="text-[#F6F5F3]/40 hover:text-[#F6F5F3] transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/loja/login"
              className="flex items-center gap-1 text-[#F6F5F3]/50 hover:text-[#F6F5F3] text-xs transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Entrar</span>
            </Link>
          )}

          <Link
            to="/loja/carrinho"
            className="relative flex items-center gap-1 text-[#F6F5F3]/70 hover:text-[#F6F5F3] transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#E5541C] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LojaHeader;
