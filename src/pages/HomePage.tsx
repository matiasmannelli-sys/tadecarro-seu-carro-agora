import CarDisplay from "@/components/CarDisplay";
import { LifeBuoy, Shield, Store } from "lucide-react";

const WHATSAPP = "5547999999999";

const HomePage = () => {
  const weeksCurrent = 34;
  const weeksTotal = 156;
  const weeksLeft = weeksTotal - weeksCurrent;
  const percentage = Math.round((weeksCurrent / weeksTotal) * 100);

  const openWA = (msg: string) => {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const actions = [
    { emoji: "🛟", label: "Suporte", icon: LifeBuoy, msg: "Olá, preciso de suporte. Cliente: João Silva, Contrato #1042" },
    { emoji: "🛡️", label: "Seguro", icon: Shield, msg: "Olá, tenho uma dúvida sobre o seguro. Cliente: João Silva, Contrato #1042" },
    { emoji: "🏪", label: "Comercial", icon: Store, msg: "Olá, quero falar com o comercial. Cliente: João Silva, Contrato #1042" },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Battery-style progress */}
      <div className="px-4 pt-4 pb-2 opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-brand">{percentage}%</span>
                <span className="text-[10px] text-muted-foreground">Semana {weeksCurrent}/{weeksTotal}</span>
              </div>
              {/* Battery bar */}
              <div className="relative w-full h-7 bg-secondary rounded-md overflow-hidden border border-border/60">
                <div
                  className="h-full brand-gradient rounded-sm transition-all duration-1000 ease-out relative"
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer bg-[length:200%_100%]" />
                </div>
                {/* Battery cap */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1.5 w-2 h-4 bg-border/60 rounded-r-sm" />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Semana <span className="text-brand font-semibold">{weeksCurrent}</span> de{" "}
            <span className="text-brand font-semibold">{weeksTotal}</span> — faltam{" "}
            <span className="text-brand font-semibold">{weeksLeft} semanas</span> para o carro ser seu!
          </p>
        </div>
      </div>

      {/* Car */}
      <div className="opacity-0 animate-fade-up flex-1 flex items-center justify-center" style={{ animationDelay: "250ms", animationFillMode: "forwards" }}>
        <CarDisplay />
      </div>

      {/* 3 Action Buttons */}
      <div className="opacity-0 animate-fade-up px-4 pb-5" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
        <div className="grid grid-cols-3 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => openWA(action.msg)}
              className="glass-card p-4 flex flex-col items-center gap-2 active:scale-[0.95] transition-transform"
            >
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
