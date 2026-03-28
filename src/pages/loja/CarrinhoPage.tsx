import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency, formatWeekly, getWeeklyPrice } from "@/data/products";
import CreditBar from "@/components/loja/CreditBar";

const CarrinhoPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, creditRemaining, totalCredit, creditExceeded } = useCart();
  const totalWeekly = getWeeklyPrice(totalPrice);
  const creditApplied = Math.min(totalPrice, totalCredit);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="mb-4 w-12 h-12 text-muted-foreground/40" />
        <h2 className="mb-2 text-lg font-bold text-foreground">Carrinho vazio</h2>
        <p className="mb-6 text-xs text-muted-foreground">Escolha produtos para começar.</p>
        <Link
          to="/loja"
          className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-4">
      <Link to="/loja" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowLeft className="w-4 h-4" /> Continuar comprando
      </Link>

      <h1 className="mb-4 text-lg font-extrabold text-foreground">Seu carrinho</h1>

      <div className="mb-4">
        <CreditBar compact />
      </div>

      <div className="space-y-3 mb-6">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex gap-3 rounded-xl border border-border/60 bg-card/70 p-3">
            <div className={`product-surface product-surface--${product.category} h-16 w-16 shrink-0 rounded-lg p-1.5`}>
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="line-clamp-1 text-xs font-semibold text-foreground">{product.name}</h3>
              <div className="mt-0.5 text-sm font-extrabold text-primary">
                {formatCurrency(product.price * quantity)}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {formatWeekly(product.price * quantity)}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-foreground active:scale-90"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-xs font-bold text-foreground">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground active:scale-90"
                >
                  <Plus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeItem(product.id)}
                  className="ml-auto p-1.5 text-destructive/70 hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mb-4 rounded-2xl border border-border/60 bg-card/80 p-4">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        {creditExceeded > 0 && (
          <>
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>No crédito</span>
              <span>{formatCurrency(creditApplied)}</span>
            </div>
            <div className="mb-2 flex justify-between text-xs text-primary">
              <span>Excedente no Pix</span>
              <span>{formatCurrency(creditExceeded)}</span>
            </div>
          </>
        )}
        <div className="mb-1 flex justify-between text-sm font-extrabold text-foreground">
          <span>Total</span>
          <span className="text-primary">{formatCurrency(totalPrice)}</span>
        </div>
        <div className="mb-3 text-right text-[10px] text-muted-foreground">
          ou 24x de {formatCurrency(totalInstallment)}
        </div>
        <div className="border-t border-border/60 pt-2 text-[10px]">
          {creditExceeded > 0 ? (
            <div className="space-y-1 text-muted-foreground">
              <div className="flex justify-between">
                <span>Limite usado</span>
                <span>{formatCurrency(totalCredit)}</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>Valor a pagar por Pix na finalização</span>
                <span>{formatCurrency(creditExceeded)}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between text-muted-foreground">
              <span>Limite restante após compra</span>
              <span className="text-foreground">{formatCurrency(Math.max(0, creditRemaining))}</span>
            </div>
          )}
        </div>
      </div>

      <Link
        to="/loja/checkout"
        className="block w-full rounded-xl bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground transition-transform shadow-lg shadow-primary/25 active:scale-95"
      >
        Finalizar pedido
      </Link>
    </div>
  );
};

export default CarrinhoPage;
