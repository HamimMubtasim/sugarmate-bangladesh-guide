-- Create food_logs table for tracking food consumption
CREATE TABLE public.food_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  food_name TEXT NOT NULL,
  brand TEXT,
  portion_percentage DECIMAL(5,2) NOT NULL DEFAULT 100.00,
  calories_per_100g DECIMAL(8,2) NOT NULL DEFAULT 0,
  carbs_per_100g DECIMAL(8,2) NOT NULL DEFAULT 0,
  protein_per_100g DECIMAL(8,2) NOT NULL DEFAULT 0,
  fat_per_100g DECIMAL(8,2) NOT NULL DEFAULT 0,
  fiber_per_100g DECIMAL(8,2) DEFAULT 0,
  sodium_per_100g DECIMAL(8,2) DEFAULT 0,
  actual_calories DECIMAL(8,2) GENERATED ALWAYS AS (calories_per_100g * portion_percentage / 100) STORED,
  actual_carbs DECIMAL(8,2) GENERATED ALWAYS AS (carbs_per_100g * portion_percentage / 100) STORED,
  actual_protein DECIMAL(8,2) GENERATED ALWAYS AS (protein_per_100g * portion_percentage / 100) STORED,
  actual_fat DECIMAL(8,2) GENERATED ALWAYS AS (fat_per_100g * portion_percentage / 100) STORED,
  barcode TEXT,
  image_url TEXT,
  logged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for food_logs
CREATE POLICY "Users can view their own food logs" 
ON public.food_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own food logs" 
ON public.food_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food logs" 
ON public.food_logs 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food logs" 
ON public.food_logs 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_food_logs_updated_at
BEFORE UPDATE ON public.food_logs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();