import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, Truck, Shield } from "lucide-react";
import { products, formatCurrency, getInstallmentPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import CreditBar from "@/components/loja/CreditBar";
import { useState } from "react";

const ProdutoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, items, creditRemaining, creditExceeded, updateQuantity } = useCart();
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
  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;
  const inCart = quantity > 0;
  const projectedExceeded = Math.max(0, product.price - Math.max(creditRemaining, 0));

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
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>

      {/* Product image */}
        <div className={`product-surface product-surface--${product.category} mx-4 max-h-72 rounded-2xl p-6`}>
        <img
          src={product.image}
          alt={product.name}
            className="w-full h-full object-contain"
        />
      </div>

      {/* Product info */}
      <div className="px-4 pt-5 pb-8">
          <h1 className="mb-2 text-lg font-extrabold text-foreground">{product.name}</h1>
          <p className="mb-5 text-xs leading-relaxed text-muted-foreground">{product.description}</p>

        {/* Pricing */}
          <div className="mb-4 rounded-2xl border border-border/60 bg-card/80 p-4">
            <div className="mb-0.5 text-xs text-muted-foreground line-through">
            {formatCurrency(product.price)}
          </div>
            <div className="mb-0.5 text-2xl font-extrabold text-primary">
            {product.installments}x de {formatCurrency(installment)}
          </div>
            <div className="text-xs text-muted-foreground">
            ou {formatCurrency(product.price)} à vista
          </div>
        </div>

        {/* Credit impact */}
          <div className="mb-4 rounded-xl border border-border/60 bg-secondary/50 p-3">
            {projectedExceeded === 0 ? (
            <div className="flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0 text-primary" />
                <span className="text-xs font-medium text-foreground">
                Seu limite cobre este produto. Após a compra, restam {formatCurrency(creditRemaining - product.price)}
              </span>
            </div>
          ) : (
              <span className="text-xs font-medium text-foreground">
                Este item pode ser comprado mesmo acima do limite: o excedente de {formatCurrency(projectedExceeded)} será pago via Pix na finalização.
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-primary/70" />
            <span className="text-[10px] text-muted-foreground">
              Entrega em até {product.deliveryDays} dias úteis
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-primary/70" />
            <span className="text-[10px] text-muted-foreground">Garantia inclusa</span>
          </div>
        </div>

        {/* Credit bar */}
        <div className="mb-5">
          <CreditBar compact />
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button
            onClick={handleAdd}
            disabled={!product.available}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all active:scale-95 ${
              added || inCart
                ? "bg-secondary text-foreground"
                : "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            } disabled:cursor-not-allowed disabled:opacity-40`}
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
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/70 px-3 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Quantidade</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground transition-transform active:scale-90"
                >
                  −
                </button>
                <span className="min-w-6 text-center text-sm font-bold text-foreground">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform active:scale-90"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {(creditExceeded > 0 || projectedExceeded > 0) && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              Se o pedido passar do limite, você conclui normalmente e paga o excedente por Pix na etapa final.
            </p>
          )}
        </div>

        {inCart && (
          <Link
            to="/loja/carrinho"
            className="mt-3 block text-center text-xs font-semibold text-primary"
          >
            Ir para o carrinho →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProdutoPage;
