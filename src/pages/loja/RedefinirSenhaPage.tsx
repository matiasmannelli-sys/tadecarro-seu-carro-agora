import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const RedefinirSenhaPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if we have a recovery session from the URL hash
    const hash = window.location.hash;
    if (hash && hash.includes("type=recovery")) {
      setReady(true);
    }

    // Listen for auth events - PASSWORD_RECOVERY means the token was valid
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (password !== confirm) {
      toast.error("As senhas não coincidem");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error("Erro ao redefinir senha. Tente novamente.");
    } else {
      toast.success("Senha redefinida com sucesso!");
      navigate("/loja");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F6F5F3] placeholder:text-[#F6F5F3]/25 focus:outline-none focus:border-[#E5541C]/50 transition-colors";

  if (!ready) {
    return (
      <div className="bg-[#090A2E] min-h-screen px-4 py-4">
        <Link to="/loja/login" className="flex items-center gap-1.5 text-[#F6F5F3]/50 text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar ao login
        </Link>
        <div className="max-w-sm mx-auto text-center">
          <div className="w-16 h-16 bg-[#E5541C]/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-[#E5541C]" />
          </div>
          <h1 className="text-xl font-extrabold text-[#F6F5F3] mb-2">Link inválido</h1>
          <p className="text-sm text-[#F6F5F3]/50 mb-6">
            Este link expirou ou é inválido. Solicite um novo link de redefinição.
          </p>
          <Link
            to="/loja/esqueci-senha"
            className="text-[#E5541C] text-sm font-semibold"
          >
            Solicitar novo link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#090A2E] min-h-screen px-4 py-4">
      <Link to="/loja/login" className="flex items-center gap-1.5 text-[#F6F5F3]/50 text-sm mb-8">
        <ArrowLeft className="w-4 h-4" /> Voltar ao login
      </Link>

      <div className="max-w-sm mx-auto text-center">
        <div className="w-16 h-16 bg-[#E5541C]/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Lock className="w-8 h-8 text-[#E5541C]" />
        </div>

        <h1 className="text-xl font-extrabold text-[#F6F5F3] mb-2">Nova senha</h1>
        <p className="text-sm text-[#F6F5F3]/50 mb-8">
          Escolha uma nova senha para sua conta.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha"
            className={inputClass}
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirme a nova senha"
            className={inputClass}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#E5541C] text-white active:scale-95 transition-all shadow-lg shadow-[#E5541C]/25 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Redefinir senha"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RedefinirSenhaPage;
