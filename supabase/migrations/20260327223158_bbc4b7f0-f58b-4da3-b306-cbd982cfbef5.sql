
CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cpf text NOT NULL,
  email text,
  whatsapp text,
  endereco text,
  numero text,
  complemento text,
  bairro text,
  cidade text,
  cep text,
  placa text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert customers" ON public.customers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can select customers" ON public.customers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can update customers" ON public.customers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES public.customers(id),
  customer_nome text,
  customer_cpf text,
  customer_email text,
  customer_whatsapp text,
  customer_placa text,
  endereco_entrega text,
  numero text,
  complemento text,
  bairro text,
  cidade text,
  cep text,
  observacoes text,
  total numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pendente',
  items jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can select orders" ON public.orders FOR SELECT TO anon, authenticated USING (true);
