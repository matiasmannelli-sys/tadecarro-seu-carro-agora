import { Trophy, Lock } from "lucide-react";

interface AchievementCardProps {
  title: string;
  description: string;
  unlocked: boolean;
  icon?: React.ReactNode;
}

const AchievementCard = ({ title, description, unlocked, icon }: AchievementCardProps) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
        unlocked
          ? "border-gold/40 bg-gold-muted/30"
          : "border-border/30 bg-secondary/40 opacity-60"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
          unlocked ? "gold-gradient" : "bg-secondary"
        }`}
      >
        {unlocked ? (
          icon || <Trophy className="w-6 h-6 text-primary-foreground" />
        ) : (
          <Lock className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0">
        <h4 className={`text-sm font-semibold ${unlocked ? "text-gold-light" : "text-muted-foreground"}`}>
          {title}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
};

export default AchievementCard;
