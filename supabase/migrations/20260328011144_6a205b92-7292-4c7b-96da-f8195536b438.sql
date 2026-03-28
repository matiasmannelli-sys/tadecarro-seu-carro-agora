
-- Add user_id column to customers
ALTER TABLE public.customers ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id column to orders
ALTER TABLE public.orders ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Drop all permissive policies on customers
DROP POLICY IF EXISTS "Anyone can select customers" ON public.customers;
DROP POLICY IF EXISTS "Anyone can insert customers" ON public.customers;
DROP POLICY IF EXISTS "Anyone can update customers" ON public.customers;

-- Drop permissive INSERT on orders
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;

-- Customers: authenticated users can only access their own record
CREATE POLICY "Users can select own customer data"
ON public.customers FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own customer data"
ON public.customers FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own customer data"
ON public.customers FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Orders: authenticated users can insert with their user_id
CREATE POLICY "Users can insert own orders"
ON public.orders FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

-- Update orders SELECT to allow authenticated users to see their own orders
DROP POLICY IF EXISTS "Orders are not publicly readable" ON public.orders;
CREATE POLICY "Users can select own orders"
ON public.orders FOR SELECT TO authenticated
USING (user_id = auth.uid());
