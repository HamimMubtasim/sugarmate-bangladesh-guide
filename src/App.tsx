
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import GlucoseLog from "./pages/GlucoseLog";
import FoodScanner from "./pages/FoodScanner";
import FoodLogs from "./pages/FoodLogs";
import Medicine from "./pages/Medicine";
import Profile from "./pages/Profile";
import PersonalInformation from "./pages/PersonalInformation";
import MedicalRecords from "./pages/MedicalRecords";
import Notifications from "./pages/Notifications";
import LanguageRegion from "./pages/LanguageRegion";
import AppSettings from "./pages/AppSettings";
import Weight from "./pages/Weight";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/glucose" element={<GlucoseLog />} />
          <Route path="/weight" element={<Weight />} />
        <Route path="/scanner" element={<FoodScanner />} />
        <Route path="/food-logs" element={<FoodLogs />} />
        <Route path="/medicine" element={<Medicine />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/personal-information" element={<PersonalInformation />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/language-region" element={<LanguageRegion />} />
          <Route path="/app-settings" element={<AppSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
