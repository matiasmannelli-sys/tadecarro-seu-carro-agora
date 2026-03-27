import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Car, UserPlus } from "lucide-react";
import { useCustomer } from "@/contexts/CustomerContext";
import { toast } from "sonner";

const LoginPlacaPage = () => {
  const navigate = useNavigate();
  const { loginByPlaca } = useCustomer();
  const [placa, setPlaca] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (placa.length < 7) {
      toast.error("Informe a placa completa do veículo");
      return;
    }
    setLoading(true);
    const customer = await loginByPlaca(placa);
    setLoading(false);
    if (customer) {
      toast.success(`Bem-vindo de volta, ${customer.nome}!`);
      navigate("/loja");
    } else {
      toast.error("Placa não encontrada. Crie sua conta ou finalize uma compra.");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg text-[#F6F5F3] text-center font-bold uppercase tracking-widest placeholder:text-[#F6F5F3]/25 placeholder:font-normal placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:border-[#E5541C]/50 transition-colors";

  return (
    <div className="bg-[#090A2E] min-h-screen px-4 py-4">
      <Link to="/loja" className="flex items-center gap-1.5 text-[#F6F5F3]/50 text-sm mb-8">
        <ArrowLeft className="w-4 h-4" /> Voltar à loja
      </Link>

      <div className="max-w-sm mx-auto text-center">
        <div className="w-16 h-16 bg-[#E5541C]/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Car className="w-8 h-8 text-[#E5541C]" />
        </div>

        <h1 className="text-xl font-extrabold text-[#F6F5F3] mb-2">Entrar com a placa</h1>
        <p className="text-sm text-[#F6F5F3]/50 mb-8">
          Informe a placa do seu veículo para acessar sua conta e seus dados.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase().slice(0, 7))}
            placeholder="ABC1D23"
            maxLength={7}
            className={inputClass}
          />
          <button
            type="submit"
            disabled={loading || placa.length < 7}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#E5541C] text-white active:scale-95 transition-all shadow-lg shadow-[#E5541C]/25 disabled:opacity-50"
          >
            {loading ? "Buscando..." : "Entrar"}
          </button>
        </form>

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
