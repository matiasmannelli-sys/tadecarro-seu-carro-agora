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
      className="group bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden hover:border-[#E5541C]/30 transition-all active:scale-[0.98]"
    >
      <div className="bg-white rounded-t-2xl p-3 aspect-square flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        {product.voltage && (
          <span className="text-[9px] font-semibold text-[#2D2774] bg-[#2D2774]/15 px-1.5 py-0.5 rounded-md inline-block w-fit">
            {product.voltage}
          </span>
        )}
        <h3 className="text-xs font-bold text-[#F6F5F3] line-clamp-2 leading-tight min-h-[2rem]">
          {product.name}
        </h3>
        <p className="text-[10px] text-[#F6F5F3]/40">SKU: {product.sku}</p>
        <div className="mt-auto">
          <span className="text-[10px] text-[#F6F5F3]/40">{formatCurrency(product.price)} à vista</span>
          <div className="text-sm font-extrabold text-[#E5541C]">
            {product.installments}x {formatCurrency(installment)}
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={!product.available}
          className={`mt-1 w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            added || inCart
              ? "bg-green-600 text-white"
              : "bg-[#E5541C] text-white hover:bg-[#E5541C]/90"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {added || inCart ? (
            <><Check className="w-3.5 h-3.5" /> No carrinho</>
          ) : (
            <><ShoppingCart className="w-3.5 h-3.5" /> Adicionar</>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
