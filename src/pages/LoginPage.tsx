import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="opacity-0 animate-fade-up w-full max-w-sm" style={{ animationDelay: "0ms", animationFillMode: "forwards" }}>
        <img src={logo} alt="TaDeCarro" className="h-14 mx-auto mb-8" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50"
                required
              />
            </div>
          )}

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              placeholder="000.000.000-00"
              inputMode="numeric"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50"
              required
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl brand-gradient text-primary-foreground font-semibold text-sm active:scale-[0.97] transition-transform disabled:opacity-60"
          >
            {loading ? "Entrando..." : isSignup ? "Criar conta" : "Entrar"}
          </button>
        </form>

        <button
          onClick={() => setIsSignup(!isSignup)}
          className="w-full text-center text-xs text-muted-foreground mt-4 py-2 active:scale-95 transition-transform"
        >
          {isSignup ? "Já tenho conta — entrar" : "Não tenho conta — criar agora"}
        </button>

        <a
          href="/"
          className="block text-center text-xs text-brand mt-2 active:scale-95 transition-transform"
        >
          ← Voltar para vitrine
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
