-- 1. Add UPDATE policy for orders (owner only)
CREATE POLICY "Users can update own orders"
  ON public.orders
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 2. Add DELETE policy for orders (owner only)
CREATE POLICY "Users can delete own orders"
  ON public.orders
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- 3. Add DELETE policy for customers (owner only)
CREATE POLICY "Users can delete own customer data"
  ON public.customers
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());