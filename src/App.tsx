import { Switch, Route } from "wouter";
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
import { Chatbot } from "@/components/chatbot";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/samples" component={Landing} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Home} />
          <Route path="/curriculum" component={Curriculum} />
          <Route path="/curriculum/lesson/:id" component={LessonDetail} />
          <Route path="/teacher/dashboard" component={TeacherDashboard} />
          <Route path="/teacher/lessons" component={TeacherLessons} />
          <Route path="/teacher/resources" component={TeacherResources} />
          <Route path="/files" component={FileManager} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <Chatbot />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
