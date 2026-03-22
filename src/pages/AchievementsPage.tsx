import { Trophy, Gift, Fuel, Star } from "lucide-react";
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

const AchievementsPage = () => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-1">
        <Trophy className="w-5 h-5 text-gold" />
        <h1 className="text-lg font-bold text-foreground">Conquistas</h1>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        {unlockedCount} de {achievements.length} desbloqueadas
      </p>

      <div className="space-y-3">
        {achievements.map((achievement, i) => (
          <div
            key={achievement.title}
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
          >
            <AchievementCard {...achievement} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
