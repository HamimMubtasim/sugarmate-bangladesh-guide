
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  diabetes_type TEXT CHECK (diabetes_type IN ('type1', 'type2', 'gestational')),
  diagnosis_year INTEGER,
  phone TEXT,
  healthcare_provider_name TEXT,
  healthcare_provider_contact TEXT,
  preferred_language TEXT DEFAULT 'english' CHECK (preferred_language IN ('english', 'bengali')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create glucose logs table
CREATE TABLE public.glucose_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  glucose_level DECIMAL(5,2) NOT NULL,
  unit TEXT DEFAULT 'mg/dL' CHECK (unit IN ('mg/dL', 'mmol/L')),
  meal_context TEXT,
  notes TEXT,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medicines table
CREATE TABLE public.medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT,
  type TEXT, -- tablet, injection, etc.
  manufacturer TEXT,
  current_stock INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  expiry_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medicine schedules table
CREATE TABLE public.medicine_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  time_of_day TIME NOT NULL,
  days_of_week INTEGER[] DEFAULT '{1,2,3,4,5,6,7}', -- 1=Monday, 7=Sunday
  is_active BOOLEAN DEFAULT true,
  reminder_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medicine intake logs table
CREATE TABLE public.medicine_intake_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE CASCADE,
  schedule_id UUID REFERENCES public.medicine_schedules(id) ON DELETE SET NULL,
  taken_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'taken' CHECK (status IN ('taken', 'missed', 'skipped')),
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glucose_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicine_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicine_intake_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for glucose_logs
CREATE POLICY "Users can view their own glucose logs" ON public.glucose_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own glucose logs" ON public.glucose_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own glucose logs" ON public.glucose_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own glucose logs" ON public.glucose_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for medicines
CREATE POLICY "Users can view their own medicines" ON public.medicines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medicines" ON public.medicines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medicines" ON public.medicines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medicines" ON public.medicines
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for medicine_schedules
CREATE POLICY "Users can view their own medicine schedules" ON public.medicine_schedules
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medicine schedules" ON public.medicine_schedules
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medicine schedules" ON public.medicine_schedules
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medicine schedules" ON public.medicine_schedules
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for medicine_intake_logs
CREATE POLICY "Users can view their own medicine intake logs" ON public.medicine_intake_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medicine intake logs" ON public.medicine_intake_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medicine intake logs" ON public.medicine_intake_logs
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medicines_updated_at
  BEFORE UPDATE ON public.medicines
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
