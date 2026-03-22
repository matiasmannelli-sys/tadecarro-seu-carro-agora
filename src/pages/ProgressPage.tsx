import { TrendingUp, Check, Lock, Gift, Fuel, Star, ArrowUpCircle, PartyPopper } from "lucide-react";

const weeksCurrent = 34;
const weeksTotal = 156;
const percentage = Math.round((weeksCurrent / weeksTotal) * 100);

const achievements = [
  { title: "1ª semana paga", description: "Bem-vindo à jornada!", unlocked: true, icon: <Check className="w-5 h-5 text-primary-foreground" /> },
  { title: "1 mês completo", description: "4 semanas consecutivas!", unlocked: true, icon: <Check className="w-5 h-5 text-primary-foreground" /> },
  { title: "3 meses", description: "R$500 de crédito na loja desbloqueado", unlocked: true, icon: <Gift className="w-5 h-5 text-primary-foreground" /> },
  { title: "6 meses", description: "Cupom combustível R$150", unlocked: false, icon: <Fuel className="w-5 h-5 text-primary-foreground" /> },
  { title: "12 meses", description: "Prêmio surpresa", unlocked: false, icon: <Star className="w-5 h-5 text-primary-foreground" /> },
  { title: "18 meses", description: "Upgrade de categoria grátis", unlocked: false, icon: <ArrowUpCircle className="w-5 h-5 text-primary-foreground" /> },
  { title: "36 meses", description: "🎉 O carro é seu!", unlocked: false, icon: <PartyPopper className="w-5 h-5 text-primary-foreground" /> },
];

const ProgressPage = () => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-brand" />
        <h1 className="text-lg font-bold text-foreground">Progresso</h1>
      </div>

      {/* Large progress */}
      <div className="glass-card p-5 mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Contrato</span>
          <span className="text-lg font-bold text-brand">{percentage}%</span>
        </div>
        <div className="w-full h-5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full brand-gradient rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          <span className="text-brand font-semibold">{weeksCurrent} semanas pagas</span> — faltam{" "}
          <span className="text-brand font-semibold">{weeksTotal - weeksCurrent} semanas</span> para o carro ser seu!
        </p>
      </div>

      {/* Achievements */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground">Conquistas</h2>
        <span className="text-xs text-muted-foreground">{unlockedCount}/{achievements.length}</span>
      </div>

      <div className="space-y-3">
        {achievements.map((a, i) => (
          <div
            key={a.title}
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 80 + 150}ms`, animationFillMode: "forwards" }}
          >
            <div
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                a.unlocked
                  ? "border-brand/40 bg-brand-muted/30"
                  : "border-border/30 bg-secondary/40 opacity-60"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                  a.unlocked ? "brand-gradient" : "bg-secondary"
                }`}
              >
                {a.unlocked ? a.icon : <Lock className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div className="min-w-0">
                <h4 className={`text-sm font-semibold ${a.unlocked ? "text-brand" : "text-muted-foreground"}`}>
                  {a.unlocked ? "✅" : "🔒"} {a.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPage;
