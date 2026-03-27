import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency, getInstallmentPrice } from "@/data/products";
import CreditBar from "@/components/loja/CreditBar";

const CarrinhoPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, creditRemaining } = useCart();
  const totalInstallment = getInstallmentPrice(totalPrice, 24);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="w-12 h-12 text-[#F6F5F3]/20 mb-4" />
        <h2 className="text-lg font-bold text-[#F6F5F3] mb-2">Carrinho vazio</h2>
        <p className="text-xs text-[#F6F5F3]/40 mb-6">Escolha produtos para começar.</p>
        <Link
          to="/loja"
          className="bg-[#E5541C] text-white px-6 py-3 rounded-xl text-sm font-bold active:scale-95 transition-transform"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#090A2E] min-h-screen px-4 py-4">
      <Link to="/loja" className="flex items-center gap-1.5 text-[#F6F5F3]/50 text-sm mb-4">
        <ArrowLeft className="w-4 h-4" /> Continuar comprando
      </Link>

      <h1 className="text-lg font-extrabold text-[#F6F5F3] mb-4">Seu carrinho</h1>

      <div className="mb-4">
        <CreditBar compact />
      </div>

      <div className="space-y-3 mb-6">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="bg-[#2D2774]/20 rounded-xl p-3 border border-white/5 flex gap-3">
            <div className="w-16 h-16 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold text-[#F6F5F3] line-clamp-1">{product.name}</h3>
              <div className="text-sm font-extrabold text-[#E5541C] mt-0.5">
                {formatCurrency(product.price * quantity)}
              </div>
              <div className="text-[10px] text-[#F6F5F3]/40">
                24x de {formatCurrency(getInstallmentPrice(product.price * quantity, 24))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#F6F5F3] active:scale-90"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-[#F6F5F3] w-5 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#F6F5F3] active:scale-90"
                >
                  <Plus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeItem(product.id)}
                  className="ml-auto p-1.5 text-red-400/60 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-[#2D2774]/30 rounded-2xl p-4 border border-white/5 mb-4">
        <div className="flex justify-between text-xs text-[#F6F5F3]/50 mb-2">
          <span>Subtotal</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm font-extrabold text-[#F6F5F3] mb-1">
          <span>Total</span>
          <span className="text-[#E5541C]">{formatCurrency(totalPrice)}</span>
        </div>
        <div className="text-right text-[10px] text-[#F6F5F3]/40 mb-3">
          ou 24x de {formatCurrency(totalInstallment)}
        </div>
        <div className="flex justify-between text-[10px] text-[#F6F5F3]/40 pt-2 border-t border-white/5">
          <span>Limite restante após compra</span>
          <span className={creditRemaining - totalPrice < 0 ? "text-red-400" : "text-green-400"}>
            {formatCurrency(Math.max(0, creditRemaining))}
          </span>
        </div>
      </div>

      <Link
        to="/loja/checkout"
        className="block w-full py-3.5 rounded-xl text-sm font-bold text-center bg-[#E5541C] text-white active:scale-95 transition-transform shadow-lg shadow-[#E5541C]/25"
      >
        Finalizar pedido
      </Link>
    </div>
  );
};

export default CarrinhoPage;
