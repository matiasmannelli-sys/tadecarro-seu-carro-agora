import { CreditCard, ShoppingBag, PackageCheck, Receipt } from "lucide-react";

const steps = [
  {
    icon: CreditCard,
    title: "Limite liberado",
    desc: "Você já tem até R$ 7.500 de crédito disponível para usar agora.",
  },
  {
    icon: ShoppingBag,
    title: "Escolha os produtos",
    desc: "Navegue pela vitrine e adicione o que precisa ao carrinho.",
  },
  {
    icon: PackageCheck,
    title: "Finalize o pedido",
    desc: "Confirme seus dados, endereço de entrega e pronto.",
  },
  {
    icon: Receipt,
    title: "Pague no boleto",
    desc: "O valor entra no seu boleto semanal, junto do valor do carro.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#F6F5F3] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-extrabold text-[#090A2E] mb-1 text-center">
          Como funciona
        </h2>
        <p className="text-xs text-[#090A2E]/50 text-center mb-8">
          Simples, rápido e direto — do jeito que tem que ser.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#E5541C]/10 flex items-center justify-center">
                <step.icon className="w-5 h-5 text-[#E5541C]" />
              </div>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-[40px] font-extrabold text-[#090A2E]/[0.04] leading-none">
                {i + 1}
              </span>
              <h3 className="text-xs font-bold text-[#090A2E] mb-1">{step.title}</h3>
              <p className="text-[10px] text-[#090A2E]/50 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
