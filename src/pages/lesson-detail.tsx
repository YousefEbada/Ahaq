import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { interpolate } from "@/lib/i18n";
import steamKitImage from "@assets/3d6eda70-9a41-439f-b7c5-d303f49416f8_1754863007760.png"; 

import { 
  ArrowLeft,
  Clock, 
  Users, 
  Target,
  Download,
  PlayCircle,
  FileText,
  Lightbulb,
  MessageSquare,
  Star,
  Share2,
  Bookmark,
  CheckCircle
} from "lucide-react";

interface Lesson {
  id: string;
  levelId: string;
  weekNumber: number;
  title: string;
  titleAr: string;
  objective: string;
  objectiveAr: string;
  buildType: string;
  teacherNotes: string;
  teacherNotesAr: string;
  challenge: string;
  challengeAr: string;
  reflections: string;
  reflectionsAr: string;
  thumbnailUrl: string;
  createdAt: string;
}

export default function LessonDetail() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  const { data: lesson, isLoading: isLessonLoading, error } = useQuery<Lesson>({
    queryKey: [`/api/lessons/${id}`],
    enabled: isAuthenticated && !!id,
  });

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

  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
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

  if (isLoading || isLessonLoading) {
    return (
      <div className="min-h-screen bg-ocean-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-ocean-900 text-white">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="glassmorphism bg-transparent border-white/20">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Lesson Not Found</h3>
                <p className="text-gray-400 mb-6">
                  The lesson you're looking for doesn't exist or has been removed.
                </p>
                <Link href="/curriculum">
                  <Button className="bg-gradient-to-r from-teal-500 to-accent-500 hover:from-teal-600 hover:to-accent-600">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Curriculum
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const lessonSteps = [
    {
      title: "Introduction & Setup",
      titleAr: "المقدمة والإعداد",
      duration: "10 min",
      description: "Introduce the lesson objectives and prepare materials",
      descriptionAr: "تقديم أهداف الدرس وإعداد المواد"
    },
    {
      title: "Building Phase",
      titleAr: "مرحلة البناء",
      duration: "30 min", 
      description: "Students work in teams to construct the model",
      descriptionAr: "يعمل الطلاب في فرق لبناء النموذج"
    },
    {
      title: "Testing & Iteration",
      titleAr: "الاختبار والتطوير",
      duration: "15 min",
      description: "Test the model and make improvements",
      descriptionAr: "اختبار النموذج وإجراء التحسينات"
    },
    {
      title: "Reflection & Discussion",
      titleAr: "التفكير والمناقشة",
      duration: "5 min",
      description: "Share discoveries and discuss learning outcomes",
      descriptionAr: "مشاركة الاكتشافات ومناقشة نتائج التعلم"
    }
  ];

  const resources = [
    {
      type: "PDF",
      title: "Teacher Guide",
      titleAr: "دليل المعلم",
      size: "2.4 MB",
      icon: FileText,
      color: "from-red-500 to-pink-600"
    },
    {
      type: "PDF", 
      title: "Student Worksheet",
      titleAr: "ورقة عمل الطالب",
      size: "1.8 MB",
      icon: FileText,
      color: "from-blue-500 to-cyan-600"
    },
    {
      type: "VIDEO",
      title: "Building Demo",
      titleAr: "عرض البناء",
      size: "45 MB",
      icon: PlayCircle,
      color: "from-accent-500 to-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-ocean-900 text-white">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <Link href="/curriculum" className="hover:text-teal-400 transition-colors">
              Curriculum
            </Link>
            <span>/</span>
            <span className="text-white">
              {interpolate(t('lesson.week'), { number: lesson.weekNumber.toString() })}
            </span>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <Link href="/curriculum">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Curriculum
                  </Button>
                </Link>
                <Badge className="bg-teal-500/20 text-teal-400">
                  {interpolate(t('lesson.week'), { number: lesson.weekNumber.toString() })}
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                {language === 'ar' ? lesson.titleAr : lesson.title}
              </h1>

              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>60 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>2-4 students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>4.8 rating</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-6">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-gradient-to-r from-teal-500 to-accent-500 hover:from-teal-600 hover:to-accent-600">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Lesson Image */}
              <Card className="glassmorphism bg-transparent border-white/20 overflow-hidden">
                <div className="relative">
                  <img
                    src={lesson.thumbnailUrl || steamKitImage}
                    alt={language === 'ar' ? lesson.titleAr : lesson.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30">
                      <PlayCircle className="w-6 h-6 mr-2" />
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Objective */}
              <Card className="glassmorphism bg-transparent border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Target className="w-5 h-5 mr-3 text-teal-400" />
                    Learning Objective
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {language === 'ar' ? lesson.objectiveAr : lesson.objective}
                  </p>
                </CardContent>
              </Card>

              {/* Lesson Steps */}
              <Card className="glassmorphism bg-transparent border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-3 text-teal-400" />
                    Lesson Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lessonSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">
                              {language === 'ar' ? step.titleAr : step.title}
                            </h4>
                            <Badge variant="secondary" className="bg-white/10 text-gray-300">
                              {step.duration}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {language === 'ar' ? step.descriptionAr : step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Teacher Notes */}
              {lesson.teacherNotes && (
                <Card className="glassmorphism bg-transparent border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Lightbulb className="w-5 h-5 mr-3 text-teal-400" />
                      Teacher Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                      <p className="text-gray-300 leading-relaxed">
                        {language === 'ar' ? lesson.teacherNotesAr : lesson.teacherNotes}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Challenge */}
              {lesson.challenge && (
                <Card className="glassmorphism bg-transparent border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Target className="w-5 h-5 mr-3 text-teal-400" />
                      Extension Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <p className="text-gray-300 leading-relaxed">
                        {language === 'ar' ? lesson.challengeAr : lesson.challenge}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reflection Questions */}
              {lesson.reflections && (
                <Card className="glassmorphism bg-transparent border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <MessageSquare className="w-5 h-5 mr-3 text-teal-400" />
                      Reflection Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
                      <p className="text-gray-300 leading-relaxed">
                        {language === 'ar' ? lesson.reflectionsAr : lesson.reflections}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="glassmorphism bg-transparent border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Lesson Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">60 minutes</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Group Size</span>
                    <span className="text-white">2-4 students</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Build Type</span>
                    <Badge variant="outline" className="border-white/20 text-gray-300">
                      {lesson.buildType}
                    </Badge>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Difficulty</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= 3 ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="glassmorphism bg-transparent border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {resources.map((resource, index) => {
                    const Icon = resource.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                        <div className={`w-10 h-10 bg-gradient-to-br ${resource.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">
                            {language === 'ar' ? resource.titleAr : resource.title}
                          </h4>
                          <p className="text-gray-400 text-xs">
                            {resource.type} • {resource.size}
                          </p>
                        </div>
                        <Download className="w-4 h-4 text-gray-400" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Related Lessons */}
              <Card className="glassmorphism bg-transparent border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Related Lessons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { week: lesson.weekNumber - 1, title: "Simple Machines" },
                    { week: lesson.weekNumber + 1, title: "Advanced Gears" }
                  ].filter(item => item.week > 0 && item.week <= 24).map((item, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium text-sm">{item.title}</h4>
                          <p className="text-gray-400 text-xs">Week {item.week}</p>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
