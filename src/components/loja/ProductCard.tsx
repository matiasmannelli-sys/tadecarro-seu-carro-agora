import { Link } from "react-router-dom";
import { ShoppingCart, Check } from "lucide-react";
import { Product, formatCurrency, formatWeekly } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem, items, updateQuantity } = useCart();
  const [added, setAdded] = useState(false);
  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;
  const inCart = quantity > 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleQuantityChange = (e: React.MouseEvent, nextQuantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, nextQuantity);
  };

  return (
    <Link
      to={`/loja/produto/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#F5F3EF] transition-all active:scale-[0.98] hover:border-primary/40"
    >
      <div className={`product-surface product-surface--${product.category}`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
          style={{ filter: "contrast(1.1) saturate(1.1)" }}
        />
      </div>
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        {product.voltage && (
          <span className="inline-block w-fit rounded-md bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-gray-700">
            {product.voltage}
          </span>
        )}
        <h3 className="min-h-[2rem] text-xs font-bold leading-tight text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-500">SKU: {product.sku}</p>
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <span className="text-[10px] text-gray-500">{formatCurrency(product.price)} à vista</span>
            <div className="text-sm font-extrabold text-primary">
              {formatWeekly(product.price)}
            </div>
            <span className="text-[9px] text-gray-400">em 104 semanas</span>
          </div>

          {inCart ? (
            <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1">
              <button
                onClick={(e) => handleQuantityChange(e, quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-gray-800 transition-transform active:scale-90"
                aria-label={`Diminuir quantidade de ${product.name}`}
              >
                −
              </button>
              <span className="min-w-6 text-center text-xs font-bold text-gray-800">{quantity}</span>
              <button
                onClick={(e) => handleQuantityChange(e, quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform active:scale-90"
                aria-label={`Aumentar quantidade de ${product.name}`}
              >
                +
              </button>
            </div>
          ) : null}
        </div>
        <button
          onClick={handleAdd}
          disabled={!product.available}
          className={`mt-1 w-full rounded-xl py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            added || inCart
              ? "bg-gray-200 text-gray-700"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {added || inCart ? (
            <><Check className="w-3.5 h-3.5" /> {inCart ? "Ajustar quantidade" : "No carrinho"}</>
          ) : (
            <><ShoppingCart className="w-3.5 h-3.5" /> Adicionar</>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
