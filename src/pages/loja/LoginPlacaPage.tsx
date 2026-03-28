import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Mail, UserPlus } from "lucide-react";
import { useCustomer } from "@/contexts/CustomerContext";
import { toast } from "sonner";

const LoginPlacaPage = () => {
  const navigate = useNavigate();
  const { signIn, isLoggedIn } = useCustomer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (isLoggedIn) {
    navigate("/loja", { replace: true });
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha e-mail e senha");
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error("E-mail ou senha incorretos");
    } else {
      toast.success("Bem-vindo de volta!");
      navigate("/loja");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F6F5F3] placeholder:text-[#F6F5F3]/25 focus:outline-none focus:border-[#E5541C]/50 transition-colors";

  return (
    <div className="bg-[#090A2E] min-h-screen px-4 py-4">
      <Link to="/loja" className="flex items-center gap-1.5 text-[#F6F5F3]/50 text-sm mb-8">
        <ArrowLeft className="w-4 h-4" /> Voltar à loja
      </Link>

      <div className="max-w-sm mx-auto text-center">
        <div className="w-16 h-16 bg-[#E5541C]/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Mail className="w-8 h-8 text-[#E5541C]" />
        </div>

        <h1 className="text-xl font-extrabold text-[#F6F5F3] mb-2">Entrar na sua conta</h1>
        <p className="text-sm text-[#F6F5F3]/50 mb-8">
          Use seu e-mail e senha para acessar sua conta.
        </p>
        <p className="text-xs text-[#F6F5F3]/35 mb-6">
          Criar conta é opcional: você também pode finalizar a compra sem login.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className={inputClass}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            className={inputClass}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#E5541C] text-white active:scale-95 transition-all shadow-lg shadow-[#E5541C]/25 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <Link
          to="/loja/esqueci-senha"
          className="block text-xs text-[#F6F5F3]/40 mt-4 hover:text-[#F6F5F3]/60 transition-colors"
        >
          Esqueci minha senha
        </Link>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-[#F6F5F3]/40 mb-3">Primeira vez aqui?</p>
          <Link
            to="/loja/cadastro"
            className="inline-flex items-center gap-2 text-[#E5541C] text-sm font-semibold"
          >
            <UserPlus className="w-4 h-4" /> Criar minha conta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPlacaPage;
