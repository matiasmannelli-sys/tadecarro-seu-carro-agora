import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCustomer } from "@/contexts/CustomerContext";
import { formatCurrency, getWeeklyPrice, formatWeekly, getCashPrice } from "@/data/products";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const maskCPF = (v: string) =>
  v.replace(/\D/g, "").slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.replace(/(\d{2})/, "($1");
  if (d.length <= 7) return d.replace(/(\d{2})(\d+)/, "($1) $2");
  return d.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
};

const maskCEP = (v: string) =>
  v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d+)/, "$1-$2");

const maskPlaca = (v: string) =>
  v.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 7);

const checkoutSchema = z.object({
  nome: z.string().min(3, "Informe seu nome completo"),
  cpf: z.string().refine(v => v.replace(/\D/g, "").length === 11, "CPF inválido"),
  whatsapp: z.string().refine(v => v.replace(/\D/g, "").length >= 10, "WhatsApp inválido"),
  email: z.string().email("E-mail inválido"),
  placa: z.string().min(7, "Informe a placa do veículo"),
  cep: z.string().refine(v => v.replace(/\D/g, "").length === 8, "CEP inválido"),
  endereco: z.string().min(3, "Informe o endereço"),
  numero: z.string().min(1, "Informe o número"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Informe o bairro"),
  cidade: z.string().min(2, "Informe a cidade"),
  observacoes: z.string().optional(),
  acceptPixExcedente: z.boolean().optional(),
});

const stripMask = (v: string) => v.replace(/\D/g, "");

type CheckoutForm = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart, totalCredit, creditExceeded, payAVista, setPayAVista, totalPriceAVista, finalTotal } = useCart();
  const { customer, isLoggedIn } = useCustomer();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nome: customer?.nome || "",
      cpf: customer?.cpf ? maskCPF(customer.cpf) : "",
      whatsapp: customer?.whatsapp ? maskPhone(customer.whatsapp) : "",
      email: customer?.email || "",
      placa: customer?.placa ? maskPlaca(customer.placa) : "",
      cep: customer?.cep ? maskCEP(customer.cep) : "",
      endereco: customer?.endereco || "",
      numero: customer?.numero || "",
      complemento: customer?.complemento || "",
      bairro: customer?.bairro || "",
      cidade: customer?.cidade || "",
      acceptPixExcedente: false,
    },
  });

  const handleMaskedChange = (field: keyof CheckoutForm, mask: (v: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = mask(e.target.value);
      e.target.value = masked;
      setValue(field, masked, { shouldValidate: true });
    };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="mb-4 text-sm text-muted-foreground">Seu carrinho está vazio.</p>
        <Link to="/loja" className="text-sm font-semibold text-primary">Ver produtos</Link>
      </div>
    );
  }

  const totalWeekly = getWeeklyPrice(totalPrice);
  const creditApplied = Math.min(totalPrice, totalCredit);
  const requiresPixAcceptance = creditExceeded > 0;

  const onSubmit = async (data: CheckoutForm) => {
    if (requiresPixAcceptance && !data.acceptPixExcedente) {
      toast.error("Confirme o pagamento do excedente via Pix para continuar.");
      return;
    }

    setSubmitting(true);
    try {
      const orderItems = items.map(({ product, quantity }) => ({
        sku: product.sku,
        name: product.name,
        price: product.price,
        quantity,
        subtotal: product.price * quantity,
      }));

      const { data: orderId, error: orderError } = await (supabase as any).rpc("create_checkout_order", {
        _nome: data.nome,
        _cpf: stripMask(data.cpf),
        _email: data.email,
        _whatsapp: stripMask(data.whatsapp),
        _placa: data.placa,
        _cep: stripMask(data.cep),
        _endereco: data.endereco,
        _numero: data.numero,
        _complemento: data.complemento || null,
        _bairro: data.bairro,
        _cidade: data.cidade,
        _observacoes: data.observacoes || null,
        _items: orderItems,
        _total: totalPrice,
        _credit_limit: totalCredit,
        _accept_pix_excedente: !!data.acceptPixExcedente,
      });

      if (orderError) {
        console.error("Order error:", orderError);
        toast.error("Erro ao salvar pedido. Tente novamente.");
        setSubmitting(false);
        return;
      }

      clearCart();
      navigate("/loja/confirmacao", {
        state: {
          orderId,
          creditExceeded,
          paymentMethod: creditExceeded > 0 ? "credito_pix" : "boleto_semanal",
          customerName: data.nome,
          cartItems: items.map(({ product, quantity }) => ({
            name: product.name,
            quantity,
          })),
          totalPrice,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Erro inesperado. Tente novamente.");
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-input bg-card/70 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40";
  const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";
  const errorClass = "mt-0.5 text-[10px] text-destructive";

  return (
    <div className="min-h-screen bg-background px-4 py-4">
      <Link to="/loja/carrinho" className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowLeft className="w-4 h-4" /> Voltar ao carrinho
      </Link>

      <h1 className="mb-2 text-lg font-extrabold text-foreground">Finalizar pedido</h1>
      <p className="mb-5 text-xs text-muted-foreground">
        {isLoggedIn ? "Seus dados foram preenchidos automaticamente, se disponíveis." : "Você pode concluir a compra sem criar conta."}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal data */}
        <section>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">Seus dados</h2>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Nome completo</label>
              <input {...register("nome")} className={inputClass} />
              {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>CPF</label>
                <input {...register("cpf")} onChange={handleMaskedChange("cpf", maskCPF)} className={inputClass} placeholder="000.000.000-00" inputMode="numeric" />
                {errors.cpf && <p className={errorClass}>{errors.cpf.message}</p>}
              </div>
              <div>
                <label className={labelClass}>WhatsApp</label>
                <input {...register("whatsapp")} onChange={handleMaskedChange("whatsapp", maskPhone)} className={inputClass} placeholder="(00) 00000-0000" inputMode="tel" />
                {errors.whatsapp && <p className={errorClass}>{errors.whatsapp.message}</p>}
              </div>
            </div>
            <div>
              <label className={labelClass}>E-mail</label>
              <input {...register("email")} type="email" className={inputClass} />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Placa do veículo</label>
              <input {...register("placa")} onChange={handleMaskedChange("placa", maskPlaca)} className={`${inputClass} uppercase`} placeholder="ABC1D23" maxLength={7} />
              {errors.placa && <p className={errorClass}>{errors.placa.message}</p>}
            </div>
          </div>
        </section>

        {/* Address */}
        <section>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">Endereço de entrega</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className={labelClass}>CEP</label>
                <input {...register("cep")} onChange={handleMaskedChange("cep", maskCEP)} className={inputClass} placeholder="00000-000" inputMode="numeric" />
                {errors.cep && <p className={errorClass}>{errors.cep.message}</p>}
              </div>
            </div>
            <div>
              <label className={labelClass}>Endereço</label>
              <input {...register("endereco")} className={inputClass} placeholder="Rua, Avenida..." />
              {errors.endereco && <p className={errorClass}>{errors.endereco.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Número</label>
                <input {...register("numero")} className={inputClass} />
                {errors.numero && <p className={errorClass}>{errors.numero.message}</p>}
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Complemento</label>
                <input {...register("complemento")} className={inputClass} placeholder="Apto, Bloco..." />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Bairro</label>
                <input {...register("bairro")} className={inputClass} />
                {errors.bairro && <p className={errorClass}>{errors.bairro.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Cidade</label>
                <input {...register("cidade")} className={inputClass} />
                {errors.cidade && <p className={errorClass}>{errors.cidade.message}</p>}
              </div>
            </div>
            <div>
              <label className={labelClass}>Observações de entrega</label>
              <textarea
                {...register("observacoes")}
                rows={2}
                className={`${inputClass} resize-none`}
                placeholder="Instruções especiais..."
              />
            </div>
          </div>
        </section>

        {/* Order summary */}
        <section>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">Resumo do pedido</h2>
          <div className="space-y-2 rounded-xl border border-border/60 bg-card/70 p-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {quantity}x {product.name}
                </span>
                <span className="font-medium text-foreground">
                  {formatCurrency(product.price * quantity)}
                </span>
              </div>
            ))}
            <div className="mt-2 border-t border-border/60 pt-2">
              {creditExceeded > 0 && (
                <>
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>No crédito</span>
                    <span>{formatCurrency(creditApplied)}</span>
                  </div>
                  <div className="mb-2 flex justify-between text-xs text-primary">
                    <span>Excedente no Pix</span>
                    <span>{formatCurrency(creditExceeded)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-sm font-extrabold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">{formatCurrency(totalPrice)}</span>
              </div>
              <p className="mt-0.5 text-right text-[10px] text-muted-foreground">
                104 semanas de {formatCurrency(totalWeekly)}/sem
              </p>
            </div>
          </div>
          {creditExceeded > 0 ? (
            <div className="mt-3 rounded-xl border border-primary/30 bg-primary/10 p-3">
              <label className="flex items-start gap-3 text-xs text-foreground">
                <input type="checkbox" {...register("acceptPixExcedente")} className="mt-0.5" />
                <span>
                  Aceito pagar {formatCurrency(creditExceeded)} de excedente via Pix; o restante continua no boleto semanal ({formatCurrency(getWeeklyPrice(totalPrice - creditExceeded))}/semana).
                </span>
              </label>
              {errors.acceptPixExcedente && <p className={errorClass}>{errors.acceptPixExcedente.message}</p>}
            </div>
          ) : (
            <p className="mt-2 text-[10px] leading-snug text-muted-foreground">
              O valor será incorporado à sua cobrança recorrente (boleto semanal) junto do valor do carro.
            </p>
          )}
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all shadow-lg shadow-primary/25 active:scale-95 disabled:opacity-60"
        >
          {submitting ? "Salvando pedido..." : requiresPixAcceptance ? "Confirmar pedido com Pix excedente" : "Confirmar pedido"}
        </button>

        {!isLoggedIn && (
          <p className="text-center text-xs text-muted-foreground">
            Quer acompanhar compras depois? <Link to="/loja/cadastro" className="font-semibold text-primary">Criar conta é opcional</Link>.
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutPage;
