CREATE POLICY "Block guest order reads"
  ON public.orders AS RESTRICTIVE
  FOR SELECT
  TO authenticated
  USING (guest_checkout = false OR user_id = auth.uid());