import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, Receipt, ShoppingBag, TrendingUp, Wrench, User, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import logoIcon from "@/assets/logo-icon-orange.png";

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
    <div className="min-h-screen max-w-6xl mx-auto relative flex flex-col bg-[#090A2E]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#090A2E]/95 backdrop-blur-md border-b border-white/5">
        {isHome ? (
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg active:scale-95 transition-transform"
          >
            <Menu className="w-5 h-5 text-[#F6F5F3]" />
          </button>
        ) : (
          <button
            onClick={() => navigate("/home")}
            className="w-9 h-9 flex items-center justify-center rounded-lg active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 text-[#F6F5F3]" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <img src={logoIcon} alt="TaDeCarro" className="h-7 w-7 object-contain" />
          <span className="text-lg font-extrabold text-[#F6F5F3]">
            TaDe<span className="text-[#E5541C]">Carro</span>
          </span>
        </div>

        <div className="w-9" />
      </header>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        >
          <nav
            className="w-72 h-full bg-[#090A2E] border-r border-white/5 flex flex-col animate-fade-up"
            style={{ animationDuration: "200ms" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <img src={logoIcon} alt="TaDeCarro" className="h-6 w-6 object-contain" />
                <span className="text-base font-extrabold text-[#F6F5F3]">
                  TaDe<span className="text-[#E5541C]">Carro</span>
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg active:scale-95"
              >
                <X className="w-5 h-5 text-[#F6F5F3]/50" />
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
                        ? "text-[#E5541C] bg-[#E5541C]/10 border-r-2 border-[#E5541C]"
                        : "text-[#F6F5F3]/50 hover:text-[#F6F5F3] hover:bg-white/5"
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
