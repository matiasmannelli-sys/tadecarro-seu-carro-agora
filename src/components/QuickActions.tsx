import { Headphones, Shield, DollarSign, Briefcase } from "lucide-react";

const actions = [
  {
    icon: Headphones,
    label: "Suporte",
    message: "Olá, preciso de suporte! Meu nome é",
    color: "from-emerald-900/50 to-emerald-800/30",
  },
  {
    icon: Shield,
    label: "Seguro",
    message: "Olá, gostaria de informações sobre seguro. Meu nome é",
    color: "from-blue-900/50 to-blue-800/30",
  },
  {
    icon: DollarSign,
    label: "Financeiro",
    message: "Olá, preciso falar sobre financeiro. Meu nome é",
    color: "from-amber-900/50 to-amber-800/30",
  },
  {
    icon: Briefcase,
    label: "Comercial",
    message: "Olá, tenho interesse comercial. Meu nome é",
    color: "from-purple-900/50 to-purple-800/30",
  },
];

const WHATSAPP_NUMBER = "5511999999999";

interface QuickActionsProps {
  userName?: string;
}

const QuickActions = ({ userName = "Cliente" }: QuickActionsProps) => {
  const openWhatsApp = (message: string) => {
    const fullMessage = `${message} ${userName}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="grid grid-cols-4 gap-3 px-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => openWhatsApp(action.message)}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/80 border border-border/50 
                     active:scale-95 transition-transform duration-150"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
            <action.icon className="w-5 h-5 text-foreground" />
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
