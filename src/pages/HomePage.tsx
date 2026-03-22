import ProgressBar from "@/components/ProgressBar";
import CarDisplay from "@/components/CarDisplay";
import { LifeBuoy, Shield, Wallet, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WHATSAPP_SUPPORT = "5511999999999";
const WHATSAPP_INSURANCE = "5511999999998";

const HomePage = () => {
  const navigate = useNavigate();
  const contractProgress = 67;
  const monthsLeft = 8;

  const openWhatsApp = (number: string, msg: string) => {
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const actions = [
    {
      icon: LifeBuoy,
      label: "Suporte",
      emoji: "🛟",
      onClick: () => openWhatsApp(WHATSAPP_SUPPORT, "Olá, preciso de suporte. Cliente: João Silva, CPF: 123.456.789-00"),
    },
    {
      icon: Shield,
      label: "Seguro",
      emoji: "🛡️",
      onClick: () => openWhatsApp(WHATSAPP_INSURANCE, "Olá, tenho uma dúvida sobre o seguro. Cliente: João Silva"),
    },
    {
      icon: Wallet,
      label: "Financeiro",
      emoji: "💰",
      onClick: () => navigate("/financial"),
    },
    {
      icon: Store,
      label: "Loja",
      emoji: "🏪",
      onClick: () => navigate("/store"),
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
        <ProgressBar percentage={contractProgress} monthsLeft={monthsLeft} />
      </div>

      <div className="opacity-0 animate-fade-up flex-1 flex items-center justify-center" style={{ animationDelay: "250ms", animationFillMode: "forwards" }}>
        <CarDisplay />
      </div>

      <div className="opacity-0 animate-fade-up px-4 pb-4" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="glass-card p-4 flex flex-col items-center gap-2 active:scale-[0.96] transition-transform"
            >
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-sm font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
