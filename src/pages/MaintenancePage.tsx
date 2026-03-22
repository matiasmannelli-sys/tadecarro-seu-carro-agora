import { Wrench, CheckCircle2, AlertTriangle, Camera, Clock } from "lucide-react";

const currentKm = 47600;
const nextRevisionKm = 50000;
const kmToNext = nextRevisionKm - currentKm;
const kmProgress = Math.round((currentKm / nextRevisionKm) * 100);

const checklist = [
  { item: "Óleo do motor", status: "ok" as const },
  { item: "Pneus", status: "ok" as const },
  { item: "Freios", status: "warning" as const },
  { item: "Ar condicionado", status: "ok" as const },
];

const maintenanceHistory = [
  { date: "13/01/2026", km: "45.000 km", description: "Revisão completa — troca de óleo e filtros" },
];

const MaintenancePage = () => {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="w-5 h-5 text-brand" />
        <h1 className="text-lg font-bold text-foreground">Manutenção</h1>
      </div>

      {/* Next revision */}
      <div className="glass-card p-5 mb-4 border-brand/30">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-brand" />
          <span className="text-sm font-semibold text-brand">Próxima revisão em {kmToNext.toLocaleString("pt-BR")} km</span>
        </div>
        <div className="w-full h-4 bg-secondary rounded-full overflow-hidden mb-2">
          <div
            className="h-full brand-gradient rounded-full transition-all duration-1000 relative"
            style={{ width: `${kmProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer bg-[length:200%_100%]" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{currentKm.toLocaleString("pt-BR")} km atual</span>
          <span>{nextRevisionKm.toLocaleString("pt-BR")} km</span>
        </div>
      </div>

      {/* Checklist */}
      <h2 className="text-sm font-semibold text-foreground mb-3">Checklist do veículo</h2>
      <div className="space-y-2 mb-5">
        {checklist.map((c) => (
          <div key={c.item} className="glass-card p-3 flex items-center justify-between">
            <span className="text-sm text-foreground">{c.item}</span>
            {c.status === "ok" ? (
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400">OK</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-amber-400">Verificar</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Photo verification */}
      <h2 className="text-sm font-semibold text-foreground mb-3">Verificação fotográfica</h2>
      <div className="glass-card p-4 mb-5">
        <p className="text-xs text-muted-foreground mb-3">
          Envie 4 fotos do veículo: frente, traseira, lateral esquerda e painel/km.
        </p>
        <button className="w-full py-3 text-sm font-semibold rounded-xl brand-gradient text-primary-foreground active:scale-[0.96] transition-transform flex items-center justify-center gap-2">
          <Camera className="w-4 h-4" />
          Enviar fotos do veículo
        </button>
      </div>

      {/* History */}
      <h2 className="text-sm font-semibold text-foreground mb-3">Histórico de manutenções</h2>
      <div className="space-y-2">
        {maintenanceHistory.map((m) => (
          <div key={m.date} className="glass-card p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">{m.km}</span>
              <span className="text-xs text-muted-foreground">{m.date}</span>
            </div>
            <p className="text-xs text-muted-foreground">{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenancePage;
