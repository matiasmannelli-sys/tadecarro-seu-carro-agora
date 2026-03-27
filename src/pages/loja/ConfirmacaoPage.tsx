import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ConfirmacaoPage = () => {
  return (
    <div className="bg-[#090A2E] min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-5">
        <CheckCircle2 className="w-8 h-8 text-green-400" />
      </div>

      <h1 className="text-xl font-extrabold text-[#F6F5F3] mb-2">
        Pedido recebido com sucesso!
      </h1>

      <p className="text-sm text-[#F6F5F3]/50 mb-6 max-w-xs leading-relaxed">
        Agora vamos seguir com a confirmação e envio. Você receberá a atualização pelos nossos canais de atendimento.
      </p>

      <div className="bg-[#2D2774]/20 rounded-xl p-4 border border-white/5 w-full max-w-sm mb-6">
        <h3 className="text-xs font-bold text-[#F6F5F3]/60 mb-2 uppercase tracking-wider">Próximos passos</h3>
        <ul className="text-xs text-[#F6F5F3]/50 space-y-2 text-left">
          <li className="flex gap-2">
            <span className="text-[#E5541C] font-bold">1.</span> Vamos confirmar a disponibilidade dos produtos
          </li>
          <li className="flex gap-2">
            <span className="text-[#E5541C] font-bold">2.</span> Enviaremos o prazo de entrega pelo WhatsApp
          </li>
          <li className="flex gap-2">
            <span className="text-[#E5541C] font-bold">3.</span> O valor será adicionado ao seu boleto semanal
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <a
          href="https://wa.me/5547999999999?text=Olá, acabei de fazer um pedido no crediário e quero acompanhar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm font-bold active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4" /> Falar com atendimento
        </a>
        <Link
          to="/loja"
          className="flex items-center justify-center gap-2 bg-white/5 text-[#F6F5F3] py-3 rounded-xl text-sm font-medium active:scale-95 transition-transform"
        >
          Voltar à loja <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-[10px] text-[#F6F5F3]/20 mt-8">
        Tá de Carro — Seu crédito, sua conquista.
      </p>
    </div>
  );
};

export default ConfirmacaoPage;
