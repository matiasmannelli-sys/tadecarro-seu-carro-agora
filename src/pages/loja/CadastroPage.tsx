import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCustomer } from "@/contexts/CustomerContext";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const cadastroSchema = z.object({
  nome: z.string().min(3, "Informe seu nome completo"),
  cpf: z.string().min(11, "CPF inválido"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  cep: z.string().min(8, "CEP inválido"),
  endereco: z.string().min(3, "Informe o endereço"),
  numero: z.string().min(1, "Informe o número"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Informe o bairro"),
  cidade: z.string().min(2, "Informe a cidade"),
  placa: z.string().min(7, "Informe a placa do veículo"),
});

type CadastroForm = z.infer<typeof cadastroSchema>;

const CadastroPage = () => {
  const navigate = useNavigate();
  const { createOrUpdateCustomer } = useCustomer();
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
  });

  const onSubmit = async (data: CadastroForm) => {
    setSubmitting(true);
    const customer = await createOrUpdateCustomer({
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      whatsapp: data.whatsapp,
      cep: data.cep,
      endereco: data.endereco,
      numero: data.numero,
      complemento: data.complemento || "",
      bairro: data.bairro,
      cidade: data.cidade,
      placa: data.placa,
    });
    setSubmitting(false);
    if (customer) {
      toast.success("Conta criada com sucesso!");
      navigate("/loja");
    } else {
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-[#F6F5F3] placeholder:text-[#F6F5F3]/25 focus:outline-none focus:border-[#E5541C]/50 transition-colors";
  const labelClass = "block text-xs font-medium text-[#F6F5F3]/60 mb-1";
  const errorClass = "text-[10px] text-red-400 mt-0.5";

  return (
    <div className="bg-[#090A2E] min-h-screen px-4 py-4">
      <Link to="/loja" className="flex items-center gap-1.5 text-[#F6F5F3]/50 text-sm mb-4">
        <ArrowLeft className="w-4 h-4" /> Voltar à loja
      </Link>

      <h1 className="text-lg font-extrabold text-[#F6F5F3] mb-1">Criar minha conta</h1>
      <p className="text-xs text-[#F6F5F3]/40 mb-5">Preencha seus dados para facilitar suas compras.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section>
          <h2 className="text-xs font-bold text-[#E5541C] uppercase tracking-wider mb-3">Dados pessoais</h2>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Nome completo</label>
              <input {...register("nome")} className={inputClass} />
              {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>CPF</label>
                <input {...register("cpf")} className={inputClass} placeholder="000.000.000-00" />
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

        <section>
          <h2 className="text-xs font-bold text-[#E5541C] uppercase tracking-wider mb-3">Endereço</h2>
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
          </div>
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#E5541C] text-white active:scale-95 transition-all shadow-lg shadow-[#E5541C]/25 disabled:opacity-60"
        >
          {submitting ? "Criando conta..." : "Criar minha conta"}
        </button>
      </form>
    </div>
  );
};

export default CadastroPage;
