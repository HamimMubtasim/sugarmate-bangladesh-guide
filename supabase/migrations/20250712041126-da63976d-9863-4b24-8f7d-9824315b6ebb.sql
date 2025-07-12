-- Update profiles table to include height and weight columns
ALTER TABLE public.profiles 
ADD COLUMN height INTEGER,
ADD COLUMN weight NUMERIC(5,2),
ADD COLUMN weight_unit TEXT DEFAULT 'kg';

-- Create weight_logs table for tracking weight changes
CREATE TABLE public.weight_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  weight NUMERIC(5,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  logged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Enable RLS on weight_logs
ALTER TABLE public.weight_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for weight_logs
CREATE POLICY "Users can view their own weight logs" 
ON public.weight_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own weight logs" 
ON public.weight_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weight logs" 
ON public.weight_logs 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own weight logs" 
ON public.weight_logs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates on weight_logs
CREATE TRIGGER update_weight_logs_updated_at
BEFORE UPDATE ON public.weight_logs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();