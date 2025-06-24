
-- Create a table for chaos reports
CREATE TABLE public.chaos_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  danger_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_verified BOOLEAN DEFAULT false
);

-- Create a table for panic alerts
CREATE TABLE public.panic_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  emergency_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Enable Row Level Security for chaos reports
ALTER TABLE public.chaos_reports ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security for panic alerts  
ALTER TABLE public.panic_alerts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view chaos reports (public safety data)
CREATE POLICY "Anyone can view chaos reports" 
  ON public.chaos_reports 
  FOR SELECT 
  USING (true);

-- Create policy to allow anyone to insert chaos reports
CREATE POLICY "Anyone can create chaos reports" 
  ON public.chaos_reports 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow anyone to view panic alerts (for emergency response)
CREATE POLICY "Anyone can view panic alerts" 
  ON public.panic_alerts 
  FOR SELECT 
  USING (true);

-- Create policy to allow anyone to insert panic alerts
CREATE POLICY "Anyone can create panic alerts" 
  ON public.panic_alerts 
  FOR INSERT 
  WITH CHECK (true);

-- Enable realtime for chaos reports
ALTER TABLE public.chaos_reports REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chaos_reports;

-- Enable realtime for panic alerts
ALTER TABLE public.panic_alerts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.panic_alerts;
