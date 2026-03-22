import { User, FileText, Calendar, Car, MessageCircle, LogOut, LifeBuoy, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WHATSAPP = "5547999999999";

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
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-brand" />
        <h1 className="text-lg font-bold text-foreground">Perfil</h1>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-5">
        <div className="w-20 h-20 rounded-full brand-gradient flex items-center justify-center mb-2">
          <span className="text-2xl font-bold text-primary-foreground">JS</span>
        </div>
        <h2 className="text-base font-bold text-foreground">{userData.name}</h2>
        <span className="text-xs text-brand font-medium">{userData.category}</span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-5">
        {details.map((d) => (
          <div key={d.label} className="glass-card p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-muted/50 flex items-center justify-center shrink-0">
              <d.icon className="w-4 h-4 text-brand" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{d.label}</p>
              <p className="text-sm font-medium text-foreground">{d.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <button
        onClick={() => openWA(`Olá, quero solicitar troca de categoria. Cliente: ${userData.name}, Contrato #1042`)}
        className="w-full py-3 text-sm font-medium rounded-xl bg-secondary text-foreground border border-border active:scale-[0.97] transition-transform flex items-center justify-center gap-2 mb-3"
      >
        <MessageCircle className="w-4 h-4" />
        Trocar categoria
      </button>

      <button
        onClick={() => openWA(`Olá, preciso de suporte. Cliente: ${userData.name}, Contrato #1042`)}
        className="w-full py-3 text-sm font-medium rounded-xl bg-secondary text-foreground border border-border active:scale-[0.97] transition-transform flex items-center justify-center gap-2 mb-3"
      >
        <LifeBuoy className="w-4 h-4" />
        Falar com suporte
      </button>

      <button
        onClick={() => navigate("/")}
        className="w-full py-3 text-sm font-medium rounded-xl text-destructive border border-destructive/30 active:scale-[0.97] transition-transform flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Sair
      </button>
    </div>
  );
};

export default ProfilePage;
