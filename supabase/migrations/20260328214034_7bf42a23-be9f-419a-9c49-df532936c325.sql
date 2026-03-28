DROP POLICY "Block guest order reads" ON public.orders;

CREATE POLICY "Restrict order reads to owner"
  ON public.orders AS RESTRICTIVE
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());