import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const LojaHeader = () => {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#090A2E] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/loja" className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-[#F6F5F3] tracking-tight">
            Tá de <span className="text-[#E5541C]">Carro</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/loja/carrinho"
            className="relative p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-[#F6F5F3]" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#E5541C] text-[#F6F5F3] text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors md:hidden"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-[#F6F5F3]" />
            ) : (
              <Menu className="w-5 h-5 text-[#F6F5F3]" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-[#090A2E] border-t border-white/10 px-4 py-3 space-y-2">
          <Link
            to="/loja"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm text-[#F6F5F3]/80 hover:text-[#E5541C] transition-colors"
          >
            Produtos
          </Link>
          <Link
            to="/loja/carrinho"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm text-[#F6F5F3]/80 hover:text-[#E5541C] transition-colors"
          >
            Carrinho
          </Link>
        </nav>
      )}
    </header>
  );
};

export default LojaHeader;
