import carImage from "@/assets/car-argo.png";

const CarDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-4">
      <div className="relative">
        {/* Glow behind car */}
        <div className="absolute inset-0 bg-[#E5541C]/5 rounded-full blur-[60px] scale-150 pointer-events-none" />
        <div className="animate-float relative">
          <img
            src={carImage}
            alt="Fiat Argo Branco"
            className="w-72 h-auto max-w-full object-contain"
            draggable={false}
          />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-4 bg-[#E5541C]/10 rounded-full blur-xl" />
      </div>
      <p className="text-xs text-[#F6F5F3]/50 mt-2">Fiat Argo Branco — Confort</p>
    </div>
  );
};

export default CarDisplay;
