import { Trophy, Gift, Fuel, Star, TrendingUp } from "lucide-react";
import AchievementCard from "@/components/AchievementCard";

const achievements = [
  {
    title: "Primeiros 3 meses!",
    description: "R$500 de crédito na Loja de Crediário",
    unlocked: true,
    icon: <Gift className="w-6 h-6 text-primary-foreground" />,
  },
  {
    title: "6 meses de jornada",
    description: "Cupom de combustível desbloqueado",
    unlocked: false,
    icon: <Fuel className="w-6 h-6 text-primary-foreground" />,
  },
  {
    title: "1 ano completo!",
    description: "Prêmio surpresa — continue pagando em dia!",
    unlocked: false,
    icon: <Star className="w-6 h-6 text-primary-foreground" />,
  },
  {
    title: "Motorista Exemplar",
    description: "Todos os pagamentos em dia por 6 meses",
    unlocked: true,
    icon: <Trophy className="w-6 h-6 text-primary-foreground" />,
  },
];

const ProgressPage = () => {
  const contractProgress = 67;
  const monthsLeft = 8;
  const monthsPaid = 4;
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-brand" />
        <h1 className="text-lg font-bold text-foreground">Progresso</h1>
      </div>

      {/* Large progress bar */}
      <div className="glass-card p-5 mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Contrato</span>
          <span className="text-lg font-bold text-brand">{contractProgress}%</span>
        </div>
        <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full brand-gradient rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${contractProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          <span className="text-brand font-semibold">{monthsPaid} meses pagos</span> — faltam{" "}
          <span className="text-brand font-semibold">{monthsLeft} meses</span> para o carro ser seu!
        </p>
      </div>

      {/* Achievements */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground">Conquistas</h2>
        <span className="text-xs text-muted-foreground">{unlockedCount}/{achievements.length}</span>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement, i) => (
          <div
            key={achievement.title}
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 100 + 200}ms`, animationFillMode: "forwards" }}
          >
            <AchievementCard {...achievement} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPage;
