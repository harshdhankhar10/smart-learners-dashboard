
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AttendancePage from "./pages/attendance/Index";
import ClassroomsPage from "./pages/classrooms/Index";
import MaterialsPage from "./pages/materials/Index";
import AssignmentsPage from "./pages/assignments/Index";
import PerformancePage from "./pages/performance/Index";
import DiscussionsPage from "./pages/discussions/Index";
import ProfilePage from "./pages/profile/Index";
import ExamsPage from "./pages/exams/Index";
import SupportPage from "./pages/support/Index";
import PaymentsPage from "./pages/payments/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/classrooms" element={<ClassroomsPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/discussions" element={<DiscussionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
