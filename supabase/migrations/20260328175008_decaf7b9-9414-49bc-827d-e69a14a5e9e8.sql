CREATE POLICY "Anon can select orders" ON public.orders FOR SELECT TO anon USING (true);
CREATE POLICY "Anon can update orders" ON public.orders FOR UPDATE TO anon USING (true) WITH CHECK (true);