import { ShoppingBag, Car, MessageCircle } from "lucide-react";
import { useState } from "react";

const WHATSAPP = "5547999999999";
const CLIENT_NAME = "João Silva";
const CONTRACT = "#1042";

const products = [
  { name: "Geladeira Britânia 300L", price: "R$ 1.800", installment: "24x de R$ 99", emoji: "🧊" },
  { name: "Fogão Britânia 4 bocas", price: "R$ 800", installment: "24x de R$ 44", emoji: "🔥" },
  { name: "Micro-ondas Britânia 30L", price: "R$ 500", installment: "24x de R$ 28", emoji: "📡" },
  { name: "Air Fryer Britânia 4L", price: "R$ 400", installment: "24x de R$ 22", emoji: "🍟" },
  { name: "Churrasqueira Britânia", price: "R$ 350", installment: "24x de R$ 19", emoji: "🍖" },
  { name: "Lava-louças Britânia", price: "R$ 1.200", installment: "24x de R$ 66", emoji: "🫧" },
  { name: "Smart TV 42\" Multilaser", price: "R$ 1.500", installment: "24x de R$ 83", emoji: "📺" },
  { name: "Máquina de lavar Britânia 11kg", price: "R$ 1.300", installment: "24x de R$ 72", emoji: "🧺" },
];

const carCategories = [
  { name: "Uber X", price: "R$ 875/semana", models: "Kwid ou Uno" },
  { name: "Confort", price: "R$ 990/semana", models: "Argo ou Peugeot 208" },
];

type Tab = "crediario" | "carros";

const StorePage = () => {
  const [tab, setTab] = useState<Tab>("crediario");
  const availableCredit = 5000;

  const openWA = (msg: string) => {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

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
          className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors active:scale-[0.97] ${
            tab === "crediario" ? "brand-gradient text-primary-foreground" : "bg-secondary text-foreground"
          }`}
        >
          🏪 Crediário
        </button>
        <button
          onClick={() => setTab("carros")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors active:scale-[0.97] ${
            tab === "carros" ? "brand-gradient text-primary-foreground" : "bg-secondary text-foreground"
          }`}
        >
          🚗 Carros
        </button>
      </div>

      {tab === "crediario" && (
        <>
          <div className="glass-card p-4 mb-4 border-brand/30 text-center">
            <p className="text-xs text-muted-foreground mb-1">Seu crédito disponível</p>
            <p className="text-2xl font-bold text-brand">R$ {availableCredit.toLocaleString("pt-BR")}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Parcele em até 24x direto no seu contrato</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <div key={product.name} className="glass-card p-4 flex flex-col items-center text-center gap-2">
                <span className="text-3xl">{product.emoji}</span>
                <h3 className="text-xs font-medium text-foreground leading-tight">{product.name}</h3>
                <span className="text-[10px] text-muted-foreground line-through">{product.price}</span>
                <span className="text-xs text-brand font-semibold">{product.installment}</span>
                <button
                  onClick={() =>
                    openWA(
                      `Olá TaDeCarro, sou ${CLIENT_NAME} (Contrato ${CONTRACT}) e quero adquirir ${product.name} pelo crediário`
                    )
                  }
                  className="w-full mt-1 py-1.5 text-[11px] font-medium rounded-lg brand-gradient text-primary-foreground active:scale-95 transition-transform flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  Quero este produto
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "carros" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">Quer mudar de categoria?</p>
          {carCategories.map((cat) => (
            <div key={cat.name} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-brand" />
                  <h3 className="text-base font-bold text-foreground">{cat.name}</h3>
                </div>
                <span className="text-sm font-bold text-brand">{cat.price}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Modelos: {cat.models}</p>
              <button
                onClick={() =>
                  openWA(`Olá, quero solicitar troca para categoria ${cat.name}. Cliente: ${CLIENT_NAME}, Contrato ${CONTRACT}`)
                }
                className="w-full py-2.5 text-xs font-medium rounded-xl bg-secondary text-foreground border border-border active:scale-95 transition-transform flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                Solicitar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorePage;
