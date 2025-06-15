
-- 1. Create table for storing admin credentials
CREATE TABLE IF NOT EXISTS public.admin_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- store only the password hash, never plaintext!
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. RLS: Only allow service role (edge function) access
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;

-- Allow only service role to select for secure lookup (from edge function)
CREATE POLICY "Only service role can select admin credentials"
  ON public.admin_credentials
  FOR SELECT
  TO authenticated    -- We'll lock down further in code (or could restrict to function)
  USING (
    (SELECT current_setting('request.jwt.claim.role', true)) = 'service_role'
  );

-- (No insert/update/delete needed from frontend. Manage via SQL or admin UI.)

