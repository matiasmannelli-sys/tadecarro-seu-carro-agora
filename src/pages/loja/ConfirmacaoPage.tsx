import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, ShoppingBag } from "lucide-react";

const WHATSAPP_NUMBER = "5547999999999";

const ConfirmacaoPage = () => {
  const whatsappMsg = encodeURIComponent(
    "Olá, acabei de fazer um pedido na loja TaDeCarro e quero confirmar meu atendimento."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <div className="bg-[#090A2E] min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mb-5">
        <CheckCircle2 className="w-8 h-8 text-green-400" />
      </div>

      <h1 className="text-xl font-extrabold text-[#F6F5F3] mb-2">Pedido recebido com sucesso!</h1>
      <p className="text-sm text-[#F6F5F3]/50 mb-6 max-w-sm leading-relaxed">
        Agora vamos seguir com a confirmação e envio. Você receberá a atualização pelos nossos canais de atendimento.
      </p>

      <div className="bg-[#2D2774]/20 rounded-xl p-4 border border-white/5 mb-6 w-full max-w-sm">
        <p className="text-xs text-[#F6F5F3]/60 mb-1">Próximos passos:</p>
        <ul className="text-xs text-[#F6F5F3]/80 space-y-1.5 text-left">
          <li>✓ Seu pedido foi salvo automaticamente</li>
          <li>✓ Nossa equipe já foi notificada</li>
          <li>✓ Entraremos em contato para confirmar</li>
          <li>✓ O valor será incluído no seu boleto semanal</li>
        </ul>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-sm py-3.5 rounded-xl text-sm font-bold bg-green-600 text-white flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-green-600/25 mb-3"
      >
        <MessageCircle className="w-4 h-4" /> Falar com atendente no WhatsApp
      </a>

      <Link
        to="/loja"
        className="w-full max-w-sm py-3.5 rounded-xl text-sm font-bold bg-[#E5541C] text-white flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-[#E5541C]/25"
      >
        <ShoppingBag className="w-4 h-4" /> Continuar comprando
      </Link>
    </div>
  );
};

export default ConfirmacaoPage;
