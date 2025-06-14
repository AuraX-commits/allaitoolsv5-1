
-- Drop the admin-related RLS policy from career_applications
DROP POLICY IF EXISTS "Admins can select career applications" ON public.career_applications;

-- Now, drop the admin_users table
DROP TABLE IF EXISTS public.admin_users;
