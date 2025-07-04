// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Direct credentials (use only in dev/testing)
const supabaseUrl = "https://vhdsdvfeqpcnyhbhigjz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZHNkdmZlcXBjbnloYmhpZ2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MjA1OTQsImV4cCI6MjA2NzA5NjU5NH0.HsUQfjWJ1ce1ITICi2qcrSF6F3mj-Brvt2CEihtvTlI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
