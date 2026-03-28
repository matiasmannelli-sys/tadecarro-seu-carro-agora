import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCustomer } from "@/contexts/CustomerContext";
import { formatCurrency, getInstallmentPrice } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const checkoutSchema = z.object({
  nome: z.string().min(3, "Informe seu nome completo"),
  cpf: z.string().min(11, "CPF inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  email: z.string().email("E-mail inválido"),
  placa: z.string().min(7, "Informe a placa do veículo"),
  cep: z.string().min(8, "CEP inválido"),
  endereco: z.string().min(3, "Informe o endereço"),
  numero: z.string().min(1, "Informe o número"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Informe o bairro"),
  cidade: z.string().min(2, "Informe a cidade"),
  observacoes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { customer, session, isLoggedIn, createOrUpdateCustomer } = useCustomer();
  const [submitting, setSubmitting] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/loja/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nome: customer?.nome || "",
      cpf: customer?.cpf || "",
      whatsapp: customer?.whatsapp || "",
      email: customer?.email || "",
      placa: customer?.placa || "",
      cep: customer?.cep || "",
      endereco: customer?.endereco || "",
      numero: customer?.numero || "",
      complemento: customer?.complemento || "",
      bairro: customer?.bairro || "",
      cidade: customer?.cidade || "",
    },
  });

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-sm text-[#F6F5F3]/50 mb-4">Seu carrinho está vazio.</p>
        <Link to="/loja" className="text-[#E5541C] text-sm font-semibold">Ver produtos</Link>
      </div>
    );
  }

  const totalInstallment = getInstallmentPrice(totalPrice, 24);

  const onSubmit = async (data: CheckoutForm) => {
    setSubmitting(true);
    try {
      // 1. Create/update customer (auto-creates account)
      const customerResult = await createOrUpdateCustomer({
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        whatsapp: data.whatsapp,
        endereco: data.endereco,
        numero: data.numero,
        complemento: data.complemento || "",
        bairro: data.bairro,
        cidade: data.cidade,
        cep: data.cep,
        placa: data.placa,
      });

      // 2. Save order to database
      const orderItems = items.map(({ product, quantity }) => ({
        sku: product.sku,
        name: product.name,
        price: product.price,
        quantity,
        subtotal: product.price * quantity,
      }));

      const { error: orderError } = await supabase.from("orders").insert({
        customer_id: customerResult?.id || null,
        user_id: session?.user?.id || null,
        customer_nome: data.nome,
        customer_cpf: data.cpf,
        customer_email: data.email,
        customer_whatsapp: data.whatsapp,
        customer_placa: data.placa.toUpperCase().replace(/[^A-Z0-9]/g, ""),
        endereco_entrega: data.endereco,
        numero: data.numero,
        complemento: data.complemento || null,
        bairro: data.bairro,
        cidade: data.cidade,
        cep: data.cep,
        observacoes: data.observacoes || null,
        total: totalPrice,
        status: "pendente",
        items: orderItems,
      });

      if (orderError) {
        console.error("Order error:", orderError);
        toast.error("Erro ao salvar pedido. Tente novamente.");
        setSubmitting(false);
        return;
      }

      clearCart();
      navigate("/loja/confirmacao");
    } catch (err) {
      console.error(err);
      toast.error("Erro inesperado. Tente novamente.");
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#F6F5F3] placeholder:text-[#F6F5F3]/25 focus:outline-none focus:border-[#E5541C]/50 transition-colors";
  const labelClass = "block text-xs font-medium text-[#F6F5F3]/60 mb-1";
  const errorClass = "text-[10px] text-red-400 mt-0.5";

  return (
    <div className="bg-[#090A2E] min-h-screen px-4 py-4">
      <Link to="/loja/carrinho" className="flex items-center gap-1.5 text-[#F6F5F3]/50 text-sm mb-4">
        <ArrowLeft className="w-4 h-4" /> Voltar ao carrinho
      </Link>

      <h1 className="text-lg font-extrabold text-[#F6F5F3] mb-5">Finalizar pedido</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal data */}
        <section>
          <h2 className="text-xs font-bold text-[#E5541C] uppercase tracking-wider mb-3">Seus dados</h2>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Nome completo</label>
              <input {...register("nome")} className={inputClass} />
              {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>CPF</label>
                <input {...register("cpf")} className={inputClass} />
                {errors.cpf && <p className={errorClass}>{errors.cpf.message}</p>}
              </div>
              <div>
                <label className={labelClass}>WhatsApp</label>
                <input {...register("whatsapp")} className={inputClass} placeholder="(00) 00000-0000" />
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
              <input {...register("placa")} className={`${inputClass} uppercase`} placeholder="ABC1D23" maxLength={7} />
              {errors.placa && <p className={errorClass}>{errors.placa.message}</p>}
            </div>
          </div>
        </section>

        {/* Address */}
        <section>
          <h2 className="text-xs font-bold text-[#E5541C] uppercase tracking-wider mb-3">Endereço de entrega</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className={labelClass}>CEP</label>
                <input {...register("cep")} className={inputClass} placeholder="00000-000" />
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
          <h2 className="text-xs font-bold text-[#E5541C] uppercase tracking-wider mb-3">Resumo do pedido</h2>
          <div className="bg-[#2D2774]/20 rounded-xl p-3 border border-white/5 space-y-2">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-xs">
                <span className="text-[#F6F5F3]/70">
                  {quantity}x {product.name}
                </span>
                <span className="text-[#F6F5F3] font-medium">
                  {formatCurrency(product.price * quantity)}
                </span>
              </div>
            ))}
            <div className="border-t border-white/5 pt-2 mt-2">
              <div className="flex justify-between text-sm font-extrabold">
                <span className="text-[#F6F5F3]">Total</span>
                <span className="text-[#E5541C]">{formatCurrency(totalPrice)}</span>
              </div>
              <p className="text-[10px] text-[#F6F5F3]/40 text-right mt-0.5">
                ou 24x de {formatCurrency(totalInstallment)} no boleto semanal
              </p>
            </div>
          </div>
          <p className="text-[10px] text-[#F6F5F3]/30 mt-2 leading-snug">
            O valor será incorporado à sua cobrança recorrente (boleto semanal) junto da parcela do carro.
          </p>
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#E5541C] text-white active:scale-95 transition-all shadow-lg shadow-[#E5541C]/25 disabled:opacity-60"
        >
          {submitting ? "Salvando pedido..." : "Confirmar pedido"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
