import { ShoppingBag, Lock } from "lucide-react";

const products = [
  { name: "Geladeira Consul 340L", price: "R$ 89,90/mês", image: "🧊", available: true },
  { name: "Fogão 4 Bocas Atlas", price: "R$ 49,90/mês", image: "🔥", available: true },
  { name: "Micro-ondas Electrolux", price: "R$ 34,90/mês", image: "📡", available: true },
  { name: "Air Fryer Mondial 4L", price: "R$ 29,90/mês", image: "🍟", available: false },
  { name: "Máquina de Lavar 11kg", price: "R$ 79,90/mês", image: "🫧", available: true },
  { name: "Smart TV 43\" Samsung", price: "R$ 69,90/mês", image: "📺", available: true },
];

const StorePage = () => {
  const monthsPaid = 4; // Mock
  const hasAccess = monthsPaid >= 3;

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Loja bloqueada</h2>
        <p className="text-sm text-muted-foreground">
          Complete 3 meses de contrato para desbloquear a Loja de Crediário.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="w-5 h-5 text-gold" />
        <h1 className="text-lg font-bold text-foreground">Loja de Crediário</h1>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Parcele em até 24x direto no seu contrato.</p>

      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <div
            key={product.name}
            className={`glass-card p-4 flex flex-col items-center text-center gap-2
              ${!product.available ? "opacity-50" : "active:scale-[0.97] transition-transform"}`}
          >
            <span className="text-3xl">{product.image}</span>
            <h3 className="text-sm font-medium text-foreground leading-tight">{product.name}</h3>
            <span className="text-xs text-gold font-semibold">{product.price}</span>
            {product.available ? (
              <button className="w-full mt-1 py-1.5 text-xs font-medium rounded-lg gold-gradient text-primary-foreground active:scale-95 transition-transform">
                Quero este
              </button>
            ) : (
              <span className="text-[10px] text-muted-foreground">Indisponível</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
