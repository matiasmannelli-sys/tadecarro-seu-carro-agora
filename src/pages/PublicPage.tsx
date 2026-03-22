import { MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import carImage from "@/assets/car-default.png";

const cars = [
  { model: "Toyota Corolla GLi 2024", price: "R$ 1.890/mês", category: "Sedan" },
  { model: "Hyundai HB20 1.0 2024", price: "R$ 1.490/mês", category: "Hatch" },
  { model: "Chevrolet Onix Plus 2024", price: "R$ 1.590/mês", category: "Sedan" },
  { model: "Fiat Argo 1.0 2024", price: "R$ 1.390/mês", category: "Hatch" },
];

const WHATSAPP_COMMERCIAL = "5511999999999";

const PublicPage = () => {
  const openWhatsApp = () => {
    const msg = encodeURIComponent("Olá! Quero saber mais sobre locação de carros para motorista de aplicativo.");
    window.open(`https://wa.me/${WHATSAPP_COMMERCIAL}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <img src={logo} alt="TaDeCarro" className="h-8" />
        <a href="/login" className="text-sm font-medium text-gold active:scale-95 transition-transform">
          Entrar
        </a>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-foreground leading-tight" style={{ lineHeight: "1.2" }}>
          Seu carro para rodar no <span className="gold-text-gradient">app está aqui</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          Alugue um carro e ao final do contrato ele é seu. Sem entrada, sem burocracia.
        </p>
        <div className="animate-float car-glow mt-4">
          <img src={carImage} alt="Carro disponível" className="w-64 h-auto" />
        </div>
      </section>

      {/* Cars */}
      <section className="px-4 pb-6">
        <h2 className="text-base font-semibold text-foreground mb-3">Carros disponíveis</h2>
        <div className="space-y-3">
          {cars.map((car) => (
            <div key={car.model} className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{car.model}</p>
                <p className="text-xs text-muted-foreground">{car.category}</p>
              </div>
              <span className="text-sm font-bold text-gold">{car.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="sticky bottom-0 p-4 bg-background/90 backdrop-blur-md border-t border-border/50">
        <button
          onClick={openWhatsApp}
          className="w-full py-3.5 rounded-xl gold-gradient text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          Quero meu carro!
        </button>
      </div>
    </div>
  );
};

export default PublicPage;
