import { User, FileText, Calendar, Car, MessageCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WHATSAPP_COMMERCIAL = "5511999999999";

const ProfilePage = () => {
  const navigate = useNavigate();

  const userData = {
    name: "João Silva",
    cpf: "123.456.789-00",
    category: "Uber X",
    contractStart: "15/09/2024",
    car: "Toyota Corolla GLi 2024",
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Olá, gostaria de solicitar troca de categoria. Cliente: ${userData.name}, CPF: ${userData.cpf}`
    );
    window.open(`https://wa.me/${WHATSAPP_COMMERCIAL}?text=${msg}`, "_blank");
  };

  const details = [
    { icon: User, label: "Nome", value: userData.name },
    { icon: FileText, label: "CPF", value: userData.cpf },
    { icon: Car, label: "Categoria", value: userData.category },
    { icon: Calendar, label: "Início do contrato", value: userData.contractStart },
    { icon: Car, label: "Veículo", value: userData.car },
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
          <span className="text-2xl font-bold text-primary-foreground">
            {userData.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
        </div>
        <h2 className="text-base font-bold text-foreground">{userData.name}</h2>
        <span className="text-xs text-brand font-medium">{userData.category}</span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-5">
        {details.map((detail) => (
          <div key={detail.label} className="glass-card p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-muted/50 flex items-center justify-center shrink-0">
              <detail.icon className="w-4 h-4 text-brand" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{detail.label}</p>
              <p className="text-sm font-medium text-foreground">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <button
        onClick={openWhatsApp}
        className="w-full py-3 text-sm font-medium rounded-xl bg-secondary text-foreground border border-border active:scale-[0.97] transition-transform flex items-center justify-center gap-2 mb-3"
      >
        <MessageCircle className="w-4 h-4" />
        Solicitar troca de categoria
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
