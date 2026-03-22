import { ShoppingBag, Lock, Car, MessageCircle } from "lucide-react";
import { useState } from "react";

const WHATSAPP_COMMERCIAL = "5511999999999";

const products = [
  { name: "Geladeira Consul 340L", priceVista: "R$ 2.199", installment: "24x de R$ 89,90", image: "🧊", available: true },
  { name: "Fogão 4 Bocas Atlas", priceVista: "R$ 1.199", installment: "24x de R$ 49,90", image: "🔥", available: true },
  { name: "Micro-ondas Electrolux", priceVista: "R$ 849", installment: "24x de R$ 34,90", image: "📡", available: true },
  { name: "Air Fryer Mondial 4L", priceVista: "R$ 699", installment: "24x de R$ 29,90", image: "🍟", available: true },
  { name: "Churrasqueira Elétrica", priceVista: "R$ 549", installment: "24x de R$ 22,90", image: "🍖", available: true },
  { name: "Máquina de Lavar 11kg", priceVista: "R$ 1.899", installment: "24x de R$ 79,90", image: "🫧", available: true },
];

const carCategories = [
  { name: "Uber X", price: "R$ 875/semana", description: "Carros econômicos para Uber X", models: "HB20, Onix, Argo" },
  { name: "Confort", price: "R$ 990/semana", description: "Carros premium para Uber Confort", models: "Corolla, Civic, Cruze" },
];

type Tab = "crediario" | "carros";

const StorePage = () => {
  const [tab, setTab] = useState<Tab>("crediario");
  const monthsPaid = 4;
  const hasAccess = monthsPaid >= 3;
  const availableCredit = 5000;

  const openWhatsApp = (msg: string) => {
    window.open(`https://wa.me/${WHATSAPP_COMMERCIAL}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Loja bloqueada</h2>
        <p className="text-sm text-muted-foreground">
          Complete 3 meses de contrato para desbloquear a Loja.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="w-5 h-5 text-brand" />
        <h1 className="text-lg font-bold text-foreground">Loja</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("crediario")}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors active:scale-[0.97] ${
            tab === "crediario" ? "brand-gradient text-primary-foreground" : "bg-secondary text-foreground"
          }`}
        >
          🏪 Crediário
        </button>
        <button
          onClick={() => setTab("carros")}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors active:scale-[0.97] ${
            tab === "carros" ? "brand-gradient text-primary-foreground" : "bg-secondary text-foreground"
          }`}
        >
          🚗 Carros
        </button>
      </div>

      {tab === "crediario" && (
        <>
          {/* Credit display */}
          <div className="glass-card p-4 mb-4 border-brand/30 text-center">
            <p className="text-xs text-muted-foreground mb-1">Crédito disponível</p>
            <p className="text-2xl font-bold text-brand">R$ {availableCredit.toLocaleString("pt-BR")}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Parcele em até 24x direto no seu contrato</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <div
                key={product.name}
                className="glass-card p-4 flex flex-col items-center text-center gap-2 active:scale-[0.97] transition-transform"
              >
                <span className="text-3xl">{product.image}</span>
                <h3 className="text-sm font-medium text-foreground leading-tight">{product.name}</h3>
                <span className="text-[10px] text-muted-foreground line-through">{product.priceVista}</span>
                <span className="text-xs text-brand font-semibold">{product.installment}</span>
                <button
                  onClick={() => openWhatsApp(`Olá, tenho interesse no produto: ${product.name}. Cliente: João Silva`)}
                  className="w-full mt-1 py-1.5 text-xs font-medium rounded-lg brand-gradient text-primary-foreground active:scale-95 transition-transform flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  Quero
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "carros" && (
        <div className="space-y-3">
          {carCategories.map((cat) => (
            <div key={cat.name} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-brand" />
                  <h3 className="text-base font-bold text-foreground">{cat.name}</h3>
                </div>
                <span className="text-sm font-bold text-brand">{cat.price}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{cat.description}</p>
              <p className="text-[10px] text-muted-foreground mb-3">Modelos: {cat.models}</p>
              <button
                onClick={() => openWhatsApp(`Olá, quero fazer upgrade/downgrade para a categoria ${cat.name}. Cliente: João Silva`)}
                className="w-full py-2 text-xs font-medium rounded-lg bg-secondary text-foreground border border-border active:scale-95 transition-transform flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                Quero upgrade/downgrade
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorePage;
