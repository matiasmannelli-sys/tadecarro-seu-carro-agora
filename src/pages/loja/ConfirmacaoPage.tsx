import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, MessageCircle, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/data/products";

const WHATSAPP_URL = "https://wa.me/qr/FEIURWZ6B4QSG1";

const ConfirmacaoPage = () => {
  const location = useLocation();
  const creditExceeded = Number(location.state?.creditExceeded || 0);
  const hasPix = creditExceeded > 0;
  const whatsappUrl = WHATSAPP_URL;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
        <CheckCircle2 className="w-8 h-8 text-primary" />
      </div>

      <h1 className="mb-2 text-xl font-extrabold text-foreground">Pedido recebido com sucesso!</h1>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Agora vamos seguir com a confirmação e envio. Você receberá a atualização pelos nossos canais de atendimento.
      </p>

      <div className="mb-6 w-full max-w-sm rounded-xl border border-border/60 bg-card/70 p-4">
        <p className="mb-1 text-xs text-muted-foreground">Próximos passos:</p>
        <ul className="space-y-1.5 text-left text-xs text-foreground">
          <li>✓ Seu pedido foi salvo automaticamente</li>
          <li>✓ Nossa equipe já foi notificada</li>
          <li>✓ Entraremos em contato para confirmar</li>
          <li>✓ {hasPix ? `O crédito foi aplicado e o excedente de ${formatCurrency(creditExceeded)} será pago via Pix` : "O valor será incluído no seu boleto semanal"}</li>
        </ul>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-sm font-bold text-foreground transition-all active:scale-95"
      >
        <MessageCircle className="w-4 h-4" /> Finalize sua compra
      </a>

      <Link
        to="/loja"
          className="flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all shadow-lg shadow-primary/25 active:scale-95"
      >
        <ShoppingBag className="w-4 h-4" /> Continuar comprando
      </Link>
    </div>
  );
};

export default ConfirmacaoPage;
