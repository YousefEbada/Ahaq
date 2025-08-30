import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  PlayCircle, 
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Bell,
  Wrench,
  Settings,
  Upload
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

interface DashboardStats {
  totalLessons: number;
  completedLessons: number;
  activeStudents: number;
  averageProgress: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  progress?: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export default function TeacherDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { language, t } = useLanguage();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: dashboardData, isLoading: isDashboardLoading, error } = useQuery({
    queryKey: ["/api/dashboard"],
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: lessonsData } = useQuery({
    queryKey: ["/api/teacher/lessons"],
    retry: false,
    enabled: isAuthenticated,
  });

  const { data: announcementsData } = useQuery({
    queryKey: ["/api/teacher/announcements"],
    retry: false,
    enabled: isAuthenticated,
  });

  // Handle unauthorized errors
  useEffect(() => {
    if (error && isUnauthorizedError(error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [error, toast]);

  if (isLoading || isDashboardLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }



  // const recentLessons: Lesson[] = lessonsData?.lessons || [
  //   {
  //     id: '1',
  //     title: 'Introduction to Robotics',
  //     description: 'Basic concepts of robotics and automation',
  //     duration: 45,
  //     level: 'Starter',
  //     progress: 100,
  //     status: 'completed'
  //   },
  //   {
  //     id: '2',
  //     title: 'Building Simple Machines',
  //     description: 'Levers, pulleys, and mechanical advantage',
  //     duration: 60,
  //     level: 'Builder',
  //     progress: 75,
  //     status: 'in_progress'
  //   },
  //   {
  //     id: '3',
  //     title: 'Electronics Fundamentals',
  //     description: 'Circuits, voltage, and current basics',
  //     duration: 50,
  //     level: 'Engineer',
  //     progress: 0,
  //     status: 'not_started'
  //   }
  // ];

  // const announcements: Announcement[] = announcementsData?.announcements || [
  //   {
  //     id: '1',
  //     title: 'New STEM Kits Available',
  //     message: 'Advanced robotics kits are now available for Engineer level classes.',
  //     date: '2025-08-10',
  //     priority: 'high'
  //   },
  //   {
  //     id: '2',
  //     title: 'Teacher Training Session',
  //     message: 'Join us for a professional development session on August 15th.',
  //     date: '2025-08-08',
  //     priority: 'medium'
  //   }
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between h-16 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900 dark:text-white">
                {t('teacher.dashboard')}
              </h1>
            </div>
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {t('teacher.welcome')}, {/*user?.firstName || 'Teacher'*/}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = "/api/logout"}
              >
                {t('teacher.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Main Content Tabs */}
        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <TabsTrigger value="lessons">
              {t('teacher.lessons')}
            </TabsTrigger>
            <TabsTrigger value="resources">
              {t('teacher.resources')}
            </TabsTrigger>
            <TabsTrigger value="announcements">
              {t('teacher.announcements')}
            </TabsTrigger>
          </TabsList>

          {/* Quick Access Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-blue-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => window.location.href = "/teacher/lessons"}>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">{language === 'ar' ? 'المناهج' : 'Lessons'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'الوصول إلى جميع الدروس' : 'Access all lessons'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-blue-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => window.location.href = "/teacher/resources"}>
              <CardContent className="p-6 text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">{language === 'ar' ? 'الموارد' : 'Resources'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'أدوات التدريس والمواد' : 'Teaching tools & materials'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-blue-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => window.location.href = "/files"}>
              <CardContent className="p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">{language === 'ar' ? 'إدارة الملفات' : 'File Manager'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'رفع وإدارة الملفات للاستضافة' : 'Upload & manage hosting files'}
                </p>
              </CardContent>
            </Card>
          </div>

          <TabsContent value="lessons">
            <div className="grid gap-6">
              {/* {recentLessons.map((lesson) => (
                <Card key={lesson.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-blue-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                        <Badge variant={lesson.level === 'Engineer' ? 'default' : lesson.level === 'Builder' ? 'secondary' : 'outline'}>
                          {lesson.level}
                        </Badge>
                        <Badge variant={
                          lesson.status === 'completed' ? 'default' : 
                          lesson.status === 'in_progress' ? 'secondary' : 'outline'
                        }>
                          {lesson.status === 'completed' ? t('teacher.completed') :
                           lesson.status === 'in_progress' ? t('teacher.inProgress') :
                           t('teacher.notStarted')}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'} text-sm text-gray-600 dark:text-gray-400`}>
                        <div className="flex items-center">
                          <Clock className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                          {lesson.duration} {t('teacher.minute')}
                        </div>
                        {lesson.progress !== undefined && (
                          <div className="flex items-center">
                            <TrendingUp className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                            {lesson.progress}% {t('teacher.complete')}
                          </div>
                        )}
                      </div>
                      <div className={`${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                        <Button variant="outline" size="sm">
                          <PlayCircle className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                          {t('teacher.startLesson')}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                          {t('teacher.lessonPlan')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))} */}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-blue-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  {language === 'ar' ? 'موارد المعلم الشاملة' : 'Comprehensive Teacher Resources'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' 
                    ? 'اكتشف جميع الموارد التعليمية، أدلة التدريب، جداول الاجتماعات، وحلول المشاكل'
                    : 'Access all teaching materials, training guides, meeting schedules, and troubleshooting solutions'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">{language === 'ar' ? 'جداول التدريب' : 'Training Schedule'}</h4>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">{language === 'ar' ? 'أدلة المجموعات' : 'Kit Guides'}</h4>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <Wrench className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">{language === 'ar' ? 'حل المشاكل' : 'Troubleshooting'}</h4>
                  </div>
                </div>
                <Button 
                  className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3"
                  onClick={() => window.location.href = "/teacher/resources"}
                >
                  <Users className="h-5 w-5 mr-2" />
                  {language === 'ar' ? 'عرض جميع الموارد' : 'View All Resources'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements">
            <div className="space-y-4">
              {/* {announcements.map((announcement) => (
                <Card key={announcement.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-blue-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-blue-600" />
                        {announcement.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          announcement.priority === 'high' ? 'destructive' :
                          announcement.priority === 'medium' ? 'default' : 'outline'
                        }>
                          {announcement.priority === 'high' ? (language === 'ar' ? 'عاجل' : 'High') :
                           announcement.priority === 'medium' ? (language === 'ar' ? 'متوسط' : 'Medium') :
                           (language === 'ar' ? 'منخفض' : 'Low')}
                        </Badge>
                        <span className="text-sm text-gray-500">{announcement.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">{announcement.message}</p>
                  </CardContent>
                </Card>
              ))} */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}