import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, Receipt, ShoppingBag, TrendingUp, Wrench, User, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const menuItems = [
  { icon: Home, label: "Início", path: "/home" },
  { icon: Receipt, label: "Financeiro", path: "/financial" },
  { icon: ShoppingBag, label: "Loja", path: "/store" },
  { icon: TrendingUp, label: "Progresso", path: "/progress" },
  { icon: Wrench, label: "Manutenção", path: "/maintenance" },
  { icon: User, label: "Perfil", path: "/profile" },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isHome = location.pathname === "/home";

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen max-w-md mx-auto relative flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur-md border-b border-border/50">
        {isHome ? (
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg active:scale-95 transition-transform"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        ) : (
          <button
            onClick={() => navigate("/home")}
            className="w-9 h-9 flex items-center justify-center rounded-lg active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        )}
        <img src={logo} alt="TaDeCarro" className="h-7" />
        <div className="w-9" />
      </header>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        >
          <nav
            className="w-72 h-full bg-card border-r border-border/50 flex flex-col animate-fade-up"
            style={{ animationDuration: "200ms" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <img src={logo} alt="TaDeCarro" className="h-6" />
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg active:scale-95"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 py-3">
              {menuItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors active:scale-[0.98] ${
                      active
                        ? "text-brand bg-brand-muted/50 border-r-2 border-brand"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className={`text-sm ${active ? "font-semibold" : "font-medium"}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
