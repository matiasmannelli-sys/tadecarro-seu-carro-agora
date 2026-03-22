import carImage from "@/assets/car-default.png";

const CarDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      <div className="relative">
        <div className="animate-float car-glow">
          <img
            src={carImage}
            alt="Seu carro"
            className="w-72 h-auto max-w-full object-contain"
            draggable={false}
          />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-4 bg-gold/10 rounded-full blur-xl" />
      </div>
      <p className="text-xs text-muted-foreground mt-2">Toyota Corolla 2024 — Preto</p>
    </div>
  );
};

export default CarDisplay;
