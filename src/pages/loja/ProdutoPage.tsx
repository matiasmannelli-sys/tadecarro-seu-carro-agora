import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, Truck, Shield } from "lucide-react";
import { products, formatCurrency, getInstallmentPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import CreditBar from "@/components/loja/CreditBar";
import { useState } from "react";

const ProdutoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, items, creditRemaining } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <p className="text-[#F6F5F3]/50 mb-4">Produto não encontrado</p>
        <Link to="/loja" className="text-[#E5541C] text-sm font-semibold">
          Voltar à loja
        </Link>
      </div>
    );
  }

  const installment = getInstallmentPrice(product.price, product.installments);
  const inCart = items.some((i) => i.product.id === product.id);
  const canAfford = creditRemaining >= product.price;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[#090A2E] min-h-screen">
      {/* Back button */}
      <div className="px-4 pt-3 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[#F6F5F3]/50 hover:text-[#F6F5F3] text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>

      {/* Product image */}
      <div className="bg-white mx-4 rounded-2xl p-6 flex items-center justify-center aspect-square max-h-72">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product info */}
      <div className="px-4 pt-5 pb-8">
        <h1 className="text-lg font-extrabold text-[#F6F5F3] mb-2">{product.name}</h1>
        <p className="text-xs text-[#F6F5F3]/50 leading-relaxed mb-5">{product.description}</p>

        {/* Pricing */}
        <div className="bg-[#2D2774]/30 rounded-2xl p-4 mb-4 border border-white/5">
          <div className="text-[#F6F5F3]/40 text-xs line-through mb-0.5">
            {formatCurrency(product.price)}
          </div>
          <div className="text-2xl font-extrabold text-[#E5541C] mb-0.5">
            {product.installments}x de {formatCurrency(installment)}
          </div>
          <div className="text-xs text-[#F6F5F3]/50">
            ou {formatCurrency(product.price)} à vista
          </div>
        </div>

        {/* Credit impact */}
        <div className="bg-[#2D2774]/20 rounded-xl p-3 mb-4 border border-white/5">
          {canAfford ? (
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-xs text-green-400 font-medium">
                Seu limite cobre este produto. Após a compra, restam {formatCurrency(creditRemaining - product.price)}
              </span>
            </div>
          ) : (
            <span className="text-xs text-[#E5541C] font-medium">
              Este produto ultrapassa seu limite disponível de {formatCurrency(creditRemaining)}
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#E5541C]/70" />
            <span className="text-[10px] text-[#F6F5F3]/40">
              Entrega em até {product.deliveryDays} dias úteis
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#E5541C]/70" />
            <span className="text-[10px] text-[#F6F5F3]/40">Garantia inclusa</span>
          </div>
        </div>

        {/* Credit bar */}
        <div className="mb-5">
          <CreditBar compact />
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          disabled={!product.available || !canAfford}
          className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
            added || inCart
              ? "bg-green-600 text-white"
              : "bg-[#E5541C] text-white shadow-lg shadow-[#E5541C]/25"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {added || inCart ? (
            <>
              <Check className="w-4 h-4" /> Adicionado ao carrinho
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Adicionar ao carrinho
            </>
          )}
        </button>

        {inCart && (
          <Link
            to="/loja/carrinho"
            className="block mt-3 text-center text-xs text-[#E5541C] font-semibold"
          >
            Ir para o carrinho →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProdutoPage;
