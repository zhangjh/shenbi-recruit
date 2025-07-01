
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import JobAnalysis from "./pages/JobAnalysis";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import InterviewPrep from "./pages/InterviewPrep";
import MockInterview from "./pages/MockInterview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/job-analysis" element={<JobAnalysis />} />
          <Route path="/resume-analysis" element={<ResumeAnalysis />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
