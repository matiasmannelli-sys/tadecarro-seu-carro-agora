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
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <Receipt className="w-5 h-5 text-brand" />
        <h1 className="text-lg font-bold text-foreground">Financeiro</h1>
      </div>

      {/* Next payment highlight */}
      <div className="glass-card p-5 mb-4 border-brand/30">
        <div className="flex items-center gap-2 mb-1">
          <CreditCard className="w-4 h-4 text-brand" />
          <span className="text-sm font-semibold text-brand">Próximo pagamento</span>
        </div>
        <p className="text-lg font-bold text-foreground mb-1">{nextPayments[0].date}</p>

        {HAS_CREDIARIO ? (
          <div className="space-y-1 mb-3">
            <p className="text-xs text-muted-foreground">
              Carro: <span className="text-foreground font-medium">R$ {CAR_WEEKLY.toLocaleString("pt-BR")}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Crediário ({CREDIARIO_ITEM.name}): <span className="text-foreground font-medium">R$ {CREDIARIO_ITEM.weekly}</span>
            </p>
            <p className="text-sm font-bold text-brand">
              Total: R$ {total.toLocaleString("pt-BR")},00
            </p>
          </div>
        ) : (
          <p className="text-2xl font-bold text-brand mb-3">R$ {CAR_WEEKLY.toLocaleString("pt-BR")},00</p>
        )}

        <button className="w-full py-3 text-sm font-semibold rounded-xl brand-gradient text-primary-foreground active:scale-[0.96] transition-transform">
          Pagar via PIX
        </button>
      </div>

      {/* Upcoming payments */}
      <h2 className="text-sm font-semibold text-foreground mb-3">Próximos pagamentos</h2>
      <div className="space-y-2 mb-5">
        {nextPayments.slice(1).map((p) => (
          <div key={p.date} className="glass-card p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{p.date}</p>
              <p className="text-xs text-muted-foreground">R$ {total.toLocaleString("pt-BR")},00</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">A vencer</span>
            </div>
          </div>
        ))}
      </div>

      {/* History */}
      <h2 className="text-sm font-semibold text-foreground mb-3">Histórico</h2>
      <div className="space-y-2">
        {history.map((p) => {
          const isOverdue = p.status === "overdue";
          return (
            <div
              key={p.date}
              className={`glass-card p-3 flex items-center justify-between ${isOverdue ? "border-destructive/30" : ""}`}
            >
              <div>
                <p className="text-sm font-medium text-foreground">{p.date}</p>
                <p className="text-xs text-muted-foreground">R$ {p.value.toLocaleString("pt-BR")},00</p>
              </div>
              <div className="flex items-center gap-1.5">
                {isOverdue ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-xs font-medium text-destructive">Atrasado</span>
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
  );
};

export default FinancialPage;
