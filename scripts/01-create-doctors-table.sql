-- Create the doctors_form_data table to store healthcare professional registrations
CREATE TABLE IF NOT EXISTS public.doctors_form_data (
  doctor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  medical_role TEXT NOT NULL,
  specialty TEXT NOT NULL,
  work_preference TEXT NOT NULL,
  availability TEXT,
  phone TEXT,
  photo_url TEXT,
  createdat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved BOOLEAN DEFAULT FALSE
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_doctors_email ON public.doctors_form_data(email);

-- Create an index on approved status for filtering
CREATE INDEX IF NOT EXISTS idx_doctors_approved ON public.doctors_form_data(approved);

-- Enable Row Level Security
ALTER TABLE public.doctors_form_data ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (register)
CREATE POLICY "Anyone can register as a doctor" 
  ON public.doctors_form_data 
  FOR INSERT 
  WITH CHECK (true);

-- Create a policy that allows reading all approved doctors
CREATE POLICY "Anyone can view approved doctors" 
  ON public.doctors_form_data 
  FOR SELECT 
  USING (approved = true);

-- Create a policy for authenticated users to view all doctors (for admin dashboard)
CREATE POLICY "Authenticated users can view all doctors" 
  ON public.doctors_form_data 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create a policy for authenticated users to update doctors (for admin approval)
CREATE POLICY "Authenticated users can update doctors" 
  ON public.doctors_form_data 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');
