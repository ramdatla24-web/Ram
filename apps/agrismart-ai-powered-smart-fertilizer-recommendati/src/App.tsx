import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LandingLayout } from "@/components/layouts/LandingLayout";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { RecommendationPage } from "@/pages/RecommendationPage";
import { SoilAnalysisPage } from "@/pages/SoilAnalysisPage";
import { CropsPage } from "@/pages/CropsPage";
import { WeatherPage } from "@/pages/WeatherPage";
import { FertilizersPage } from "@/pages/FertilizersPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";
import { FarmsPage } from "@/pages/FarmsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<LandingLayout><LandingPage /></LandingLayout>} path="/" />
      <Route element={<LandingLayout><LoginPage /></LandingLayout>} path="/login" />
      <Route element={<LandingLayout><RegisterPage /></LandingLayout>} path="/register" />
      <Route element={<LandingLayout><FertilizersPage /></LandingLayout>} path="/fertilizers" />

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/farms" element={<FarmsPage />} />
        <Route path="/soil-analysis" element={<SoilAnalysisPage />} />
        <Route path="/crops" element={<CropsPage />} />
        <Route path="/recommendation" element={<RecommendationPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
