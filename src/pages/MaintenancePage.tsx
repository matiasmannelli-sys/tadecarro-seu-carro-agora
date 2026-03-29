import { Wrench, CheckCircle2, AlertTriangle, Camera, Clock } from "lucide-react";

const WHATSAPP = "5554984480006";
const currentKm = 47600;
const nextRevisionKm = 50000;
const kmToNext = nextRevisionKm - currentKm;
const kmProgress = Math.round((currentKm / nextRevisionKm) * 100);
const isCloseToRevision = kmToNext < 3000;

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
  const openWA = (msg: string) => {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="px-4 py-4 bg-[#090A2E] min-h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#E5541C]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "50ms", animationFillMode: "forwards" }}>
          <Wrench className="w-5 h-5 text-[#E5541C]" />
          <h1 className="text-lg font-extrabold text-[#F6F5F3]">Manutenção</h1>
        </div>

        {/* Urgent warning */}
        {isCloseToRevision && (
          <div className="bg-[#E5541C]/15 border border-[#E5541C]/30 rounded-xl p-3 mb-4 flex items-center gap-2 opacity-0 animate-fade-up" style={{ animationDelay: "80ms", animationFillMode: "forwards" }}>
            <AlertTriangle className="w-5 h-5 text-[#E5541C] shrink-0" />
            <span className="text-xs font-semibold text-[#E5541C]">
              Atenção: faltam apenas {kmToNext.toLocaleString("pt-BR")} km para a próxima revisão!
            </span>
          </div>
        )}

        {/* Next revision */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "120ms", animationFillMode: "forwards" }}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-[#E5541C]" />
            <span className="text-sm font-semibold text-[#E5541C]">Próxima revisão em {kmToNext.toLocaleString("pt-BR")} km</span>
          </div>
          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-1000 relative"
              style={{
                width: `${kmProgress}%`,
                background: "linear-gradient(90deg, #E5541C, rgba(229,84,28,0.8))",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer bg-[length:200%_100%]" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-[#F6F5F3]/50">
            <span>{currentKm.toLocaleString("pt-BR")} km atual</span>
            <span>{nextRevisionKm.toLocaleString("pt-BR")} km</span>
          </div>
        </div>

        {/* Schedule maintenance button */}
        <button
          onClick={() => openWA("Olá, gostaria de agendar uma manutenção. Cliente: João Silva, Contrato #1042")}
          className="w-full py-3 text-sm font-bold rounded-xl bg-[#E5541C] text-white shadow-lg shadow-[#E5541C]/25 active:scale-95 transition-transform flex items-center justify-center gap-2 mb-5 opacity-0 animate-fade-up"
          style={{ animationDelay: "160ms", animationFillMode: "forwards" }}
        >
          <Wrench className="w-4 h-4" />
          Agendar manutenção
        </button>

        {/* Checklist */}
        <h2 className="text-sm font-semibold text-[#F6F5F3] mb-3 opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>Checklist do veículo</h2>
        <div className="space-y-2 mb-5">
          {checklist.map((c, i) => (
            <div key={c.item} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between hover:bg-white/[0.08] transition-colors opacity-0 animate-fade-up" style={{ animationDelay: `${240 + i * 60}ms`, animationFillMode: "forwards" }}>
              <span className="text-sm text-[#F6F5F3]">{c.item}</span>
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
        <h2 className="text-sm font-semibold text-[#F6F5F3] mb-3 opacity-0 animate-fade-up" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>Verificação fotográfica</h2>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "540ms", animationFillMode: "forwards" }}>
          <p className="text-xs text-[#F6F5F3]/50 mb-3">
            Envie 4 fotos do veículo: frente, traseira, lateral esquerda e painel/km.
          </p>
          <button className="w-full py-3 text-sm font-bold rounded-xl bg-[#E5541C] text-white shadow-lg shadow-[#E5541C]/25 active:scale-95 transition-transform flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" />
            Enviar fotos do veículo
          </button>
        </div>

        {/* History */}
        <h2 className="text-sm font-semibold text-[#F6F5F3] mb-3 opacity-0 animate-fade-up" style={{ animationDelay: "580ms", animationFillMode: "forwards" }}>Histórico de manutenções</h2>
        <div className="space-y-2">
          {maintenanceHistory.map((m, i) => (
            <div key={m.date} className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/[0.08] transition-colors opacity-0 animate-fade-up" style={{ animationDelay: `${620 + i * 60}ms`, animationFillMode: "forwards" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#F6F5F3]">{m.km}</span>
                <span className="text-xs text-[#F6F5F3]/50">{m.date}</span>
              </div>
              <p className="text-xs text-[#F6F5F3]/50">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
