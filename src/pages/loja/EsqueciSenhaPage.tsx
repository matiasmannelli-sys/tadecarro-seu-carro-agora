import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EsqueciSenhaPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Informe seu e-mail");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/loja/redefinir-senha`,
    });
    setLoading(false);
    if (error) {
      toast.error("Erro ao enviar e-mail. Tente novamente.");
    } else {
      setSent(true);
      toast.success("E-mail enviado!");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F6F5F3] placeholder:text-[#F6F5F3]/25 focus:outline-none focus:border-[#E5541C]/50 transition-colors";

  return (
    <div className="bg-[#090A2E] min-h-screen px-4 py-4">
      <Link to="/loja/login" className="flex items-center gap-1.5 text-[#F6F5F3]/50 text-sm mb-8">
        <ArrowLeft className="w-4 h-4" /> Voltar ao login
      </Link>

      <div className="max-w-sm mx-auto text-center">
        <div className="w-16 h-16 bg-[#E5541C]/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Mail className="w-8 h-8 text-[#E5541C]" />
        </div>

        {sent ? (
          <>
            <h1 className="text-xl font-extrabold text-[#F6F5F3] mb-2">Verifique seu e-mail</h1>
            <p className="text-sm text-[#F6F5F3]/50 mb-4">
              Enviamos um link para <strong className="text-[#F6F5F3]/70">{email}</strong>.
              Clique no link do e-mail para redefinir sua senha.
            </p>
            <p className="text-xs text-[#F6F5F3]/35 mb-6">
              Não recebeu? Verifique a caixa de spam ou tente novamente.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-[#E5541C] text-sm font-semibold"
            >
              Tentar novamente
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-extrabold text-[#F6F5F3] mb-2">Esqueci minha senha</h1>
            <p className="text-sm text-[#F6F5F3]/50 mb-8">
              Informe seu e-mail e enviaremos um link para redefinir sua senha.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className={inputClass}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#E5541C] text-white active:scale-95 transition-all shadow-lg shadow-[#E5541C]/25 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar link"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EsqueciSenhaPage;
