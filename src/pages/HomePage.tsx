import CarDisplay from "@/components/CarDisplay";
import { LifeBuoy, Shield, Store } from "lucide-react";

const WHATSAPP = "5554984480006";

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
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#090A2E] relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E5541C]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Battery-style progress */}
      <div className="px-4 pt-4 pb-2 opacity-0 animate-fade-up relative z-10" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-extrabold text-[#E5541C]">{percentage}% concluído</span>
                <span className="text-[10px] text-[#F6F5F3]/50">Semana {weeksCurrent}/{weeksTotal}</span>
              </div>
              {/* Battery bar */}
              <div className="relative w-full h-7 bg-white/10 rounded-md overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all duration-1000 ease-out relative"
                  style={{
                    width: `${percentage}%`,
                    background: "linear-gradient(90deg, #E5541C, rgba(229,84,28,0.8))",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer bg-[length:200%_100%]" />
                </div>
                {/* Battery cap */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1.5 w-2 h-4 bg-white/20 rounded-r-sm" />
              </div>
            </div>
          </div>
          <p className="text-xs text-[#F6F5F3]/50 text-center">
            Semana <span className="text-[#E5541C] font-semibold">{weeksCurrent}</span> de{" "}
            <span className="text-[#E5541C] font-semibold">{weeksTotal}</span> — faltam{" "}
            <span className="text-[#E5541C] font-semibold">{weeksLeft} semanas</span> para o carro ser seu!
          </p>
        </div>
      </div>

      {/* Car */}
      <div className="opacity-0 animate-fade-up flex-1 flex items-center justify-center relative z-10" style={{ animationDelay: "250ms", animationFillMode: "forwards" }}>
        <CarDisplay />
      </div>

      {/* 3 Action Buttons */}
      <div className="opacity-0 animate-fade-up px-4 pb-5 relative z-10" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
        <div className="grid grid-cols-3 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => openWA(action.msg)}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-all hover:bg-white/[0.08]"
            >
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-xs font-medium text-[#F6F5F3]">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
