ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'boleto_semanal',
ADD COLUMN IF NOT EXISTS credit_applied numeric NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS pix_excedente numeric NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS guest_checkout boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.create_checkout_order(
  _nome text,
  _cpf text,
  _email text,
  _whatsapp text,
  _placa text,
  _cep text,
  _endereco text,
  _numero text,
  _complemento text,
  _bairro text,
  _cidade text,
  _observacoes text,
  _items jsonb,
  _total numeric,
  _credit_limit numeric,
  _accept_pix_excedente boolean DEFAULT false
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _new_order_id uuid;
  _normalized_placa text;
  _payment_method text;
  _credit_applied numeric;
  _pix_excedente numeric;
BEGIN
  IF coalesce(trim(_nome), '') = '' THEN
    RAISE EXCEPTION 'Nome é obrigatório';
  END IF;

  IF coalesce(trim(_cpf), '') = '' THEN
    RAISE EXCEPTION 'CPF é obrigatório';
  END IF;

  IF coalesce(trim(_email), '') = '' THEN
    RAISE EXCEPTION 'E-mail é obrigatório';
  END IF;

  IF coalesce(trim(_whatsapp), '') = '' THEN
    RAISE EXCEPTION 'WhatsApp é obrigatório';
  END IF;

  IF coalesce(trim(_placa), '') = '' THEN
    RAISE EXCEPTION 'Placa é obrigatória';
  END IF;

  IF coalesce(trim(_cep), '') = '' THEN
    RAISE EXCEPTION 'CEP é obrigatório';
  END IF;

  IF coalesce(trim(_endereco), '') = '' THEN
    RAISE EXCEPTION 'Endereço é obrigatório';
  END IF;

  IF coalesce(trim(_numero), '') = '' THEN
    RAISE EXCEPTION 'Número é obrigatório';
  END IF;

  IF coalesce(trim(_bairro), '') = '' THEN
    RAISE EXCEPTION 'Bairro é obrigatório';
  END IF;

  IF coalesce(trim(_cidade), '') = '' THEN
    RAISE EXCEPTION 'Cidade é obrigatória';
  END IF;

  IF _items IS NULL OR jsonb_typeof(_items) <> 'array' OR jsonb_array_length(_items) = 0 THEN
    RAISE EXCEPTION 'Pedido sem itens';
  END IF;

  IF coalesce(_total, 0) <= 0 THEN
    RAISE EXCEPTION 'Total inválido';
  END IF;

  _normalized_placa := upper(regexp_replace(coalesce(_placa, ''), '[^A-Z0-9]', '', 'g'));
  _credit_applied := LEAST(_total, GREATEST(coalesce(_credit_limit, 0), 0));
  _pix_excedente := GREATEST(_total - _credit_applied, 0);

  IF _pix_excedente > 0 AND NOT coalesce(_accept_pix_excedente, false) THEN
    RAISE EXCEPTION 'É necessário aceitar o pagamento do excedente via Pix';
  END IF;

  _payment_method := CASE
    WHEN _pix_excedente > 0 THEN 'credito_pix'
    ELSE 'boleto_semanal'
  END;

  INSERT INTO public.orders (
    customer_id,
    user_id,
    customer_nome,
    customer_cpf,
    customer_email,
    customer_whatsapp,
    customer_placa,
    endereco_entrega,
    numero,
    complemento,
    bairro,
    cidade,
    cep,
    observacoes,
    total,
    status,
    items,
    payment_method,
    credit_applied,
    pix_excedente,
    guest_checkout
  )
  VALUES (
    NULL,
    auth.uid(),
    trim(_nome),
    trim(_cpf),
    lower(trim(_email)),
    trim(_whatsapp),
    _normalized_placa,
    trim(_endereco),
    trim(_numero),
    nullif(trim(coalesce(_complemento, '')), ''),
    trim(_bairro),
    trim(_cidade),
    trim(_cep),
    nullif(trim(coalesce(_observacoes, '')), ''),
    _total,
    'pendente',
    _items,
    _payment_method,
    _credit_applied,
    _pix_excedente,
    auth.uid() IS NULL
  )
  RETURNING id INTO _new_order_id;

  RETURN _new_order_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_checkout_order(
  text, text, text, text, text, text, text, text, text, text, text, text, jsonb, numeric, numeric, boolean
) TO anon, authenticated;