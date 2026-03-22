import { Receipt, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const payments = [
  { month: "Jan/2025", value: "R$ 1.890,00", status: "paid", date: "05/01/2025" },
  { month: "Fev/2025", value: "R$ 1.890,00", status: "paid", date: "05/02/2025" },
  { month: "Mar/2025", value: "R$ 1.890,00", status: "pending", dueDate: "05/03/2025" },
  { month: "Abr/2025", value: "R$ 1.890,00", status: "upcoming", dueDate: "05/04/2025" },
];

const statusConfig = {
  paid: { icon: CheckCircle2, label: "Pago", color: "text-emerald-400" },
  pending: { icon: AlertTriangle, label: "Pendente", color: "text-amber-400" },
  upcoming: { icon: Clock, label: "A vencer", color: "text-muted-foreground" },
};

const FinancialPage = () => {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <Receipt className="w-5 h-5 text-gold" />
        <h1 className="text-lg font-bold text-foreground">Financeiro</h1>
      </div>

      {/* Pending alert */}
      <div className="glass-card p-4 mb-4 border-amber-500/30">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-amber-400">Boleto pendente</span>
        </div>
        <p className="text-xs text-muted-foreground">Parcela de Março vence em 05/03/2025</p>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-2 text-xs font-medium rounded-lg gold-gradient text-primary-foreground active:scale-95 transition-transform">
            Pagar via PIX
          </button>
          <button className="flex-1 py-2 text-xs font-medium rounded-lg bg-secondary text-foreground border border-border active:scale-95 transition-transform">
            Ver boleto
          </button>
        </div>
      </div>

      {/* Payment history */}
      <h2 className="text-sm font-semibold text-foreground mb-3">Histórico</h2>
      <div className="space-y-2">
        {payments.map((payment) => {
          const config = statusConfig[payment.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;
          return (
            <div key={payment.month} className="glass-card p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{payment.month}</p>
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
