import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, ShoppingBag, Receipt, Car, Trophy, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";

const menuItems = [
  { icon: Home, label: "Início", path: "/home" },
  { icon: ShoppingBag, label: "Loja de Crediário", path: "/store" },
  { icon: Receipt, label: "Financeiro", path: "/financial" },
  { icon: Car, label: "Meu Carro", path: "/my-car" },
  { icon: Trophy, label: "Conquistas", path: "/achievements" },
];

const AppLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background/90 backdrop-blur-md border-b border-border/50">
        <button onClick={() => setMenuOpen(true)} className="active:scale-90 transition-transform">
          <Menu className="w-6 h-6 text-foreground" />
        </button>
        <img src={logo} alt="TaDeCarro" className="h-7" />
        <div className="w-6" />
      </header>

      {/* Content */}
      <main>
        <Outlet />
      </main>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-72 bg-card z-50 border-r border-border/50 transform transition-transform duration-300 ease-out flex flex-col ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border/50">
          <img src={logo} alt="TaDeCarro" className="h-7" />
          <button onClick={() => setMenuOpen(false)} className="active:scale-90 transition-transform">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 py-3">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => goTo(item.path)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-colors active:scale-[0.98] ${
                  active
                    ? "text-gold bg-gold-muted/30 border-r-2 border-gold"
                    : "text-foreground/80 hover:bg-secondary/50"
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? "text-gold" : ""}`} />
                <span className={active ? "font-semibold" : ""}>{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => goTo("/")}
          className="flex items-center gap-3 px-5 py-4 text-sm text-destructive border-t border-border/50 active:scale-[0.98] transition-transform"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </nav>
    </div>
  );
};

export default AppLayout;
