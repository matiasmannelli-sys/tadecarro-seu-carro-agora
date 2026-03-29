import { User, FileText, Calendar, Car, MessageCircle, LogOut, LifeBuoy, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WHATSAPP = "5554984480006";

const ProfilePage = () => {
  const navigate = useNavigate();

  const userData = {
    name: "João Silva",
    cpf: "*.456.789-**",
    category: "Confort",
    car: "Fiat Argo Branco",
    contractStart: "15/07/2025",
    weeksPaid: 34,
  };

  const openWA = (msg: string) => {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const details = [
    { icon: User, label: "Nome", value: userData.name },
    { icon: FileText, label: "CPF", value: userData.cpf },
    { icon: Car, label: "Categoria", value: userData.category },
    { icon: Car, label: "Veículo", value: userData.car },
    { icon: Calendar, label: "Contrato desde", value: userData.contractStart },
    { icon: Hash, label: "Semanas pagas", value: String(userData.weeksPaid) },
  ];

  return (
    <div className="px-4 py-4 bg-[#090A2E] min-h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#E5541C]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "50ms", animationFillMode: "forwards" }}>
          <User className="w-5 h-5 text-[#E5541C]" />
          <h1 className="text-lg font-extrabold text-[#F6F5F3]">Perfil</h1>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <div className="w-20 h-20 rounded-full bg-[#E5541C] flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-white">JS</span>
          </div>
          <h2 className="text-base font-extrabold text-[#F6F5F3]">{userData.name}</h2>
          <span className="bg-[#E5541C]/15 border border-[#E5541C]/30 rounded-full px-3 py-0.5 text-xs text-[#E5541C] font-medium mt-1">
            {userData.category}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-5">
          {details.map((d, i) => (
            <div
              key={d.label}
              className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3 hover:bg-white/[0.08] transition-colors opacity-0 animate-fade-up"
              style={{ animationDelay: `${150 + i * 60}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-9 h-9 rounded-lg bg-[#E5541C]/10 flex items-center justify-center shrink-0">
                <d.icon className="w-4 h-4 text-[#E5541C]" />
              </div>
              <div>
                <p className="text-xs text-[#F6F5F3]/50">{d.label}</p>
                <p className="text-sm font-medium text-[#F6F5F3]">{d.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <button
          onClick={() => openWA(`Olá, quero solicitar troca de categoria. Cliente: ${userData.name}, Contrato #1042`)}
          className="w-full py-3 text-sm font-bold rounded-xl bg-[#E5541C] text-white shadow-lg shadow-[#E5541C]/25 active:scale-95 transition-transform flex items-center justify-center gap-2 mb-3 opacity-0 animate-fade-up"
          style={{ animationDelay: "520ms", animationFillMode: "forwards" }}
        >
          <MessageCircle className="w-4 h-4" />
          Trocar categoria
        </button>

        <button
          onClick={() => openWA(`Olá, preciso de suporte. Cliente: ${userData.name}, Contrato #1042`)}
          className="w-full py-3 text-sm font-medium rounded-xl bg-white/5 border border-white/10 text-[#F6F5F3] active:scale-95 transition-transform flex items-center justify-center gap-2 mb-3 hover:bg-white/[0.08] opacity-0 animate-fade-up"
          style={{ animationDelay: "560ms", animationFillMode: "forwards" }}
        >
          <LifeBuoy className="w-4 h-4" />
          Falar com suporte
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full py-3 text-sm font-medium rounded-xl bg-red-500/20 text-red-400 active:scale-95 transition-transform flex items-center justify-center gap-2 opacity-0 animate-fade-up"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
