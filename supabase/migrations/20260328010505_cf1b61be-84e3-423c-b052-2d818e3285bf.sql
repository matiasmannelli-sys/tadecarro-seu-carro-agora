
DROP POLICY "Anyone can select orders" ON public.orders;

CREATE POLICY "Orders are not publicly readable"
ON public.orders
FOR SELECT
TO anon, authenticated
USING (false);
