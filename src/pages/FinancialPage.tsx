import { Receipt, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const payments = [
  { period: "Semana 10/03 – 16/03", value: "R$ 875,00", status: "paid", date: "10/03/2025" },
  { period: "Semana 17/03 – 23/03", value: "R$ 875,00", status: "paid", date: "17/03/2025" },
  { period: "Semana 24/03 – 30/03", value: "R$ 875,00", status: "overdue", dueDate: "24/03/2025" },
  { period: "Semana 31/03 – 06/04", value: "R$ 875,00", status: "pending", dueDate: "31/03/2025" },
  { period: "Semana 07/04 – 13/04", value: "R$ 875,00", status: "upcoming", dueDate: "07/04/2025" },
];

const statusConfig = {
  paid: { icon: CheckCircle2, label: "Pago", color: "text-emerald-400" },
  overdue: { icon: AlertTriangle, label: "Atrasado", color: "text-red-400" },
  pending: { icon: Clock, label: "Pendente", color: "text-amber-400" },
  upcoming: { icon: Clock, label: "A vencer", color: "text-muted-foreground" },
};

const FinancialPage = () => {
  const overduePayments = payments.filter((p) => p.status === "overdue");

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <Receipt className="w-5 h-5 text-brand" />
        <h1 className="text-lg font-bold text-foreground">Financeiro</h1>
      </div>

      {/* Overdue alert */}
      {overduePayments.length > 0 && (
        <div className="glass-card p-4 mb-4 border-red-500/30">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400">Pagamento atrasado</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {overduePayments[0].period} — {overduePayments[0].value}
          </p>
          <button className="w-full mt-3 py-2.5 text-sm font-semibold rounded-lg brand-gradient text-primary-foreground active:scale-95 transition-transform">
            Pagar agora
          </button>
        </div>
      )}

      {/* Pending payments */}
      {payments.filter((p) => p.status === "pending").length > 0 && (
        <div className="glass-card p-4 mb-4 border-amber-500/30">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Próximo pagamento</span>
          </div>
          {payments.filter((p) => p.status === "pending").map((p) => (
            <p key={p.period} className="text-xs text-muted-foreground">{p.period} — {p.value}</p>
          ))}
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-2 text-xs font-medium rounded-lg brand-gradient text-primary-foreground active:scale-95 transition-transform">
              Pagar via PIX
            </button>
            <button className="flex-1 py-2 text-xs font-medium rounded-lg bg-secondary text-foreground border border-border active:scale-95 transition-transform">
              Ver boleto
            </button>
          </div>
        </div>
      )}

      {/* Payment history */}
      <h2 className="text-sm font-semibold text-foreground mb-3">Histórico</h2>
      <div className="space-y-2">
        {payments.map((payment) => {
          const config = statusConfig[payment.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;
          return (
            <div key={payment.period} className={`glass-card p-3 flex items-center justify-between ${payment.status === "overdue" ? "border-red-500/20" : ""}`}>
              <div>
                <p className="text-sm font-medium text-foreground">{payment.period}</p>
                <p className="text-xs text-muted-foreground">{payment.value}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <StatusIcon className={`w-4 h-4 ${config.color}`} />
                <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinancialPage;
