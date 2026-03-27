import { Link } from "react-router-dom";
import { ShoppingCart, Check } from "lucide-react";
import { Product, formatCurrency, getInstallmentPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.some((i) => i.product.id === product.id);
  const installment = getInstallmentPrice(product.price, product.installments);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      to={`/loja/produto/${product.id}`}
      className="group bg-[#F6F5F3] rounded-2xl overflow-hidden flex flex-col transition-transform active:scale-[0.98]"
    >
      <div className="relative bg-white p-4 flex items-center justify-center aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full">
              Indisponível
            </span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <h3 className="text-xs font-semibold text-[#090A2E] leading-tight line-clamp-2 min-h-[2rem]">
          {product.name}
        </h3>
        <div className="mt-auto">
          <span className="text-[10px] text-[#090A2E]/40 line-through">
            {formatCurrency(product.price)}
          </span>
          <div className="text-sm font-extrabold text-[#E5541C]">
            {product.installments}x de {formatCurrency(installment)}
          </div>
          <span className="text-[10px] text-[#090A2E]/50">
            ou {formatCurrency(product.price)} à vista
          </span>
        </div>
        <button
          onClick={handleAdd}
          disabled={!product.available}
          className={`mt-2 w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            added || inCart
              ? "bg-green-600 text-white"
              : "bg-[#E5541C] text-white hover:bg-[#E5541C]/90"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {added || inCart ? (
            <>
              <Check className="w-3.5 h-3.5" /> No carrinho
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" /> Adicionar
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
