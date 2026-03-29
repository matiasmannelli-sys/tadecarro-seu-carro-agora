import { TrendingUp, Check, Lock, Gift, Fuel, Star, ArrowUpCircle, PartyPopper } from "lucide-react";

const weeksCurrent = 34;
const weeksTotal = 156;
const percentage = Math.round((weeksCurrent / weeksTotal) * 100);

const achievements = [
  { title: "1ª semana paga", description: "Bem-vindo à jornada!", unlocked: true, icon: <Check className="w-5 h-5" /> },
  { title: "1 mês completo", description: "4 semanas consecutivas!", unlocked: true, icon: <Check className="w-5 h-5" /> },
  { title: "3 meses", description: "R$500 de crédito na loja desbloqueado", unlocked: true, icon: <Gift className="w-5 h-5" /> },
  { title: "6 meses", description: "Cupom combustível R$150", unlocked: false, icon: <Fuel className="w-5 h-5" /> },
  { title: "12 meses", description: "Prêmio surpresa", unlocked: false, icon: <Star className="w-5 h-5" /> },
  { title: "18 meses", description: "Upgrade de categoria grátis", unlocked: false, icon: <ArrowUpCircle className="w-5 h-5" /> },
  { title: "36 meses", description: "🎉 O carro é seu!", unlocked: false, icon: <PartyPopper className="w-5 h-5" /> },
];

const ProgressPage = () => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="px-4 py-4 bg-[#090A2E] min-h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#E5541C]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "50ms", animationFillMode: "forwards" }}>
          <TrendingUp className="w-5 h-5 text-[#E5541C]" />
          <h1 className="text-lg font-extrabold text-[#F6F5F3]">Progresso</h1>
        </div>

        {/* Large progress */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#F6F5F3]/50">Contrato</span>
            <span className="text-lg font-extrabold text-[#E5541C]">{percentage}%</span>
          </div>
          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out relative"
              style={{
                width: `${percentage}%`,
                background: "linear-gradient(90deg, #E5541C, rgba(229,84,28,0.8))",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
            </div>
          </div>
          <p className="text-xs text-[#F6F5F3]/50 mt-2 text-center">
            <span className="text-[#E5541C] font-semibold">{weeksCurrent} semanas pagas</span> — faltam{" "}
            <span className="text-[#E5541C] font-semibold">{weeksTotal - weeksCurrent} semanas</span> para o carro ser seu!
          </p>
        </div>

        {/* Achievements */}
        <div className="flex items-center justify-between mb-3 opacity-0 animate-fade-up" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
          <h2 className="text-sm font-semibold text-[#F6F5F3]">Conquistas</h2>
          <span className="text-xs text-[#F6F5F3]/50">{unlockedCount}/{achievements.length}</span>
        </div>

        <div className="space-y-3">
          {achievements.map((a, i) => (
            <div
              key={a.title}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 80 + 200}ms`, animationFillMode: "forwards" }}
            >
              <div
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:bg-white/[0.08] ${
                  a.unlocked
                    ? "border-[#E5541C]/30 bg-[#E5541C]/10"
                    : "border-white/5 bg-white/5 opacity-60"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    a.unlocked ? "bg-[#E5541C] text-white" : "bg-white/10 text-[#F6F5F3]/30"
                  }`}
                >
                  {a.unlocked ? a.icon : <Lock className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <h4 className={`text-sm font-semibold ${a.unlocked ? "text-[#E5541C]" : "text-[#F6F5F3]/30"}`}>
                    {a.unlocked ? "✅" : "🔒"} {a.title}
                  </h4>
                  <p className="text-xs text-[#F6F5F3]/50 mt-0.5">{a.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
