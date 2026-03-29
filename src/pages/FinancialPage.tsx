import { Receipt, AlertTriangle, CheckCircle2, Clock, CreditCard } from "lucide-react";

const CREDIARIO_ITEM = { name: "Geladeira Britânia 300L", weekly: 99 };
const CAR_WEEKLY = 990;
const HAS_CREDIARIO = true;

const nextPayments = [
  { date: "Segunda 24/03", value: CAR_WEEKLY, status: "next" as const },
  { date: "Segunda 31/03", value: CAR_WEEKLY, status: "upcoming" as const },
  { date: "Segunda 07/04", value: CAR_WEEKLY, status: "upcoming" as const },
  { date: "Segunda 14/04", value: CAR_WEEKLY, status: "upcoming" as const },
];

const history = [
  { date: "17/03/2025", value: CAR_WEEKLY, status: "paid" as const },
  { date: "10/03/2025", value: CAR_WEEKLY, status: "paid" as const },
  { date: "03/03/2025", value: CAR_WEEKLY, status: "paid" as const },
  { date: "24/02/2025", value: CAR_WEEKLY, status: "overdue" as const },
  { date: "17/02/2025", value: CAR_WEEKLY, status: "paid" as const },
];

const FinancialPage = () => {
  const total = HAS_CREDIARIO ? CAR_WEEKLY + CREDIARIO_ITEM.weekly : CAR_WEEKLY;

  return (
    <div className="px-4 py-4 bg-[#090A2E] min-h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#E5541C]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "50ms", animationFillMode: "forwards" }}>
          <Receipt className="w-5 h-5 text-[#E5541C]" />
          <h1 className="text-lg font-extrabold text-[#F6F5F3]">Financeiro</h1>
        </div>

        {/* Next payment highlight */}
        <div className="bg-[#E5541C]/10 border border-[#E5541C]/30 rounded-xl p-5 mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-4 h-4 text-[#E5541C]" />
            <span className="text-sm font-semibold text-[#E5541C]">Próximo pagamento</span>
          </div>
          <p className="text-lg font-extrabold text-[#F6F5F3] mb-1">{nextPayments[0].date}</p>

          {HAS_CREDIARIO ? (
            <div className="space-y-1 mb-3">
              <p className="text-xs text-[#F6F5F3]/50">
                Carro: <span className="text-[#F6F5F3] font-medium">R$ {CAR_WEEKLY.toLocaleString("pt-BR")}</span>
              </p>
              <p className="text-xs text-[#F6F5F3]/50">
                Crediário ({CREDIARIO_ITEM.name}): <span className="text-[#F6F5F3] font-medium">R$ {CREDIARIO_ITEM.weekly}</span>
              </p>
              <p className="text-sm font-extrabold text-[#E5541C]">
                Total: R$ {total.toLocaleString("pt-BR")},00
              </p>
            </div>
          ) : (
            <p className="text-2xl font-extrabold text-[#E5541C] mb-3">R$ {CAR_WEEKLY.toLocaleString("pt-BR")},00</p>
          )}

          <button className="w-full py-3 text-sm font-bold rounded-xl bg-[#E5541C] text-white shadow-lg shadow-[#E5541C]/25 active:scale-95 transition-transform">
            Pagar via PIX
          </button>
        </div>

        {/* Upcoming payments */}
        <h2 className="text-sm font-semibold text-[#F6F5F3] mb-3 opacity-0 animate-fade-up" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>Próximos pagamentos</h2>
        <div className="space-y-2 mb-5">
          {nextPayments.slice(1).map((p, i) => (
            <div key={p.date} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between hover:bg-white/[0.08] transition-colors opacity-0 animate-fade-up" style={{ animationDelay: `${200 + i * 60}ms`, animationFillMode: "forwards" }}>
              <div>
                <p className="text-sm font-medium text-[#F6F5F3]">{p.date}</p>
                <p className="text-xs text-[#F6F5F3]/50">R$ {total.toLocaleString("pt-BR")},00</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F6F5F3]/50" />
                <span className="text-xs text-[#F6F5F3]/50">A vencer</span>
              </div>
            </div>
          ))}
        </div>

        {/* History */}
        <h2 className="text-sm font-semibold text-[#F6F5F3] mb-3 opacity-0 animate-fade-up" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>Histórico</h2>
        <div className="space-y-2">
          {history.map((p, i) => {
            const isOverdue = p.status === "overdue";
            return (
              <div
                key={p.date}
                className={`bg-white/5 border rounded-xl p-3 flex items-center justify-between hover:bg-white/[0.08] transition-colors opacity-0 animate-fade-up ${
                  isOverdue ? "border-red-500/30" : "border-white/10"
                }`}
                style={{ animationDelay: `${450 + i * 60}ms`, animationFillMode: "forwards" }}
              >
                <div>
                  <p className="text-sm font-medium text-[#F6F5F3]">{p.date}</p>
                  <p className="text-xs text-[#F6F5F3]/50">R$ {p.value.toLocaleString("pt-BR")},00</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {isOverdue ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="bg-red-500/20 text-red-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">Atrasado</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400">Pago</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FinancialPage;
