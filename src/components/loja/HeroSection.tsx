import { ArrowDown, CreditCard, Sparkles, Zap } from "lucide-react";
import CreditBar from "./CreditBar";

const HeroSection = () => {
  return (
    <section className="relative bg-[#090A2E] overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5541C]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2D2774]/40 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#E5541C]/15 border border-[#E5541C]/30 rounded-full px-3 py-1 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#E5541C]" />
          <span className="text-[11px] font-semibold text-[#E5541C]">Crédito pré-aprovado</span>
        </div>

        {/* Headline */}
        <h1 className="text-[28px] leading-[1.15] font-extrabold text-[#F6F5F3] mb-3 max-w-md mx-auto">
          Seu limite já está{" "}
          <span className="text-[#E5541C]">liberado.</span>
          <br />
          Agora é só escolher.
        </h1>

        <p className="text-sm text-[#F6F5F3]/60 mb-6 max-w-sm mx-auto leading-relaxed">
          Escolha seus eletrodomésticos, parcele em até 24x e o valor entra direto no seu boleto semanal. Simples assim.
        </p>

        {/* Credit display */}
        <div className="mb-6 max-w-sm mx-auto">
          <CreditBar />
        </div>

        {/* CTA */}
        <button
          onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center gap-2 bg-[#E5541C] hover:bg-[#E5541C]/90 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-[#E5541C]/30 text-base"
        >
          Ver produtos
          <ArrowDown className="w-4 h-4" />
        </button>

        {/* Trust badges */}
        <div className="flex gap-4 mt-8 justify-center flex-wrap">
          {[
            { icon: CreditCard, text: "Até 24x" },
            { icon: Zap, text: "Sem burocracia" },
            { icon: Sparkles, text: "Aprovado na hora" },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-1.5">
              <badge.icon className="w-3.5 h-3.5 text-[#E5541C]/70" />
              <span className="text-[11px] text-[#F6F5F3]/50 font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
