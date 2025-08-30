// import { Switch, Route } from "wouter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/language-context";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Curriculum from "@/pages/curriculum";
import LessonDetail from "@/pages/lesson-detail";
import TeacherDashboard from "@/pages/teacher-dashboard";
import TeacherLessons from "@/pages/teacher-lessons";
import TeacherResources from "@/pages/teacher-resources";
import FileManager from "@/pages/file-manager";
import NotFound from "@/pages/not-found";
// import { Chatbot } from "@/components/chatbot";
import Register from "./pages/register";
import { HeroSection } from "./components/hero-section";

function Router() {
  // const { isAuthenticated, isLoading } = useAuth();

  return (
    // <Switch>
    //   {isLoading || !isAuthenticated ? (
    //     <>
    //       <Route path="/" component={Landing} />
    //       <Route path="/samples" component={Landing} />
    //     </>
    //   ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/curriculum/lesson/:id" element={<LessonDetail />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/lessons" element={<TeacherLessons />} />
        <Route path="/teacher/resources" element={<TeacherResources />} />
        <Route path="/files" element={<FileManager />} />
        {/* fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
{
  /* <Route component={NotFound} />
    </Switch> */
}
{
  /* );
} */
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          {/* <Chatbot /> */}
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
