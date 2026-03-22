import { Car, Gauge, Wrench, Calendar } from "lucide-react";
import carImage from "@/assets/car-default.png";

const MyCarPage = () => {
  const carData = {
    model: "Toyota Corolla GLi 2024",
    color: "Preto Infinito",
    plate: "ABC-1D23",
    km: "12.450 km",
    nextService: "15.000 km",
    nextServiceDate: "Mai/2025",
    contractStart: "Set/2024",
    contractEnd: "Set/2026",
  };

  const details = [
    { icon: Gauge, label: "Quilometragem", value: carData.km },
    { icon: Wrench, label: "Próxima revisão", value: `${carData.nextService} — ${carData.nextServiceDate}` },
    { icon: Calendar, label: "Início do contrato", value: carData.contractStart },
    { icon: Calendar, label: "Fim do contrato", value: carData.contractEnd },
  ];

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <Car className="w-5 h-5 text-gold" />
        <h1 className="text-lg font-bold text-foreground">Meu Carro</h1>
      </div>

      <div className="glass-card p-4 mb-4 flex flex-col items-center">
        <img src={carImage} alt={carData.model} className="w-52 h-auto car-glow mb-3" />
        <h2 className="text-base font-bold text-foreground">{carData.model}</h2>
        <p className="text-xs text-muted-foreground">{carData.color} — Placa {carData.plate}</p>
      </div>

      <div className="space-y-2">
        {details.map((detail) => (
          <div key={detail.label} className="glass-card p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold-muted/50 flex items-center justify-center shrink-0">
              <detail.icon className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{detail.label}</p>
              <p className="text-sm font-medium text-foreground">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCarPage;
