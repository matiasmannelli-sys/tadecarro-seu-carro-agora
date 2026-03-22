interface ProgressBarProps {
  percentage: number;
  monthsLeft: number;
}

const ProgressBar = ({ percentage, monthsLeft }: ProgressBarProps) => {
  return (
    <div className="w-full px-4 py-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Progresso do contrato</span>
        <span className="text-sm font-semibold text-gold-light">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full gold-gradient rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-1.5 text-center">
        Faltam <span className="text-gold font-medium">{monthsLeft} meses</span> para o carro ser seu!
      </p>
    </div>
  );
};

export default ProgressBar;
