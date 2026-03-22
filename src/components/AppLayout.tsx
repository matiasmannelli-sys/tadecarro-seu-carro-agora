import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, TrendingUp, Receipt, ShoppingBag, User } from "lucide-react";
import logo from "@/assets/logo.png";

const tabs = [
  { icon: Home, label: "Início", path: "/home" },
  { icon: TrendingUp, label: "Progresso", path: "/progress" },
  { icon: Receipt, label: "Financeiro", path: "/financial" },
  { icon: ShoppingBag, label: "Loja", path: "/store" },
  { icon: User, label: "Perfil", path: "/profile" },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen max-w-md mx-auto relative flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-center px-4 py-3 bg-background/90 backdrop-blur-md border-b border-border/50">
        <img src={logo} alt="TaDeCarro" className="h-7" />
      </header>

      {/* Content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-30 bg-card/95 backdrop-blur-md border-t border-border/50">
        <div className="flex items-stretch">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 pt-3 transition-colors active:scale-[0.95] ${
                  active ? "text-brand" : "text-muted-foreground"
                }`}
              >
                <tab.icon className={`w-5 h-5 ${active ? "text-brand" : ""}`} />
                <span className={`text-[10px] ${active ? "font-semibold" : ""}`}>{tab.label}</span>
                {active && (
                  <div className="absolute top-0 w-10 h-0.5 rounded-b-full bg-brand" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
