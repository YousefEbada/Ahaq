import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Download,
  School,
  GraduationCap,
  Trophy,
  Atom,
  ChevronRight,
  Clock,
  Star
} from "lucide-react";

interface DashboardData {
  stats: {
    schoolCount: number;
    studentCount: number;
    lessonCount: number;
    teacherCount: number;
  };
  levels: Array<{
    id: string;
    name: string;
    nameAr: string;
    gradesMin: number;
    gradesMax: number;
    color: string;
  }>;
}

export default function Home() {
  const { t, language } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  const { data: dashboardData, isLoading: isDashboardLoading, error } = useQuery<DashboardData>({
    queryKey: ['/api/dashboard'],
    enabled: isAuthenticated,
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

  if (isLoading || isDashboardLoading) {
    return (
      <div className="min-h-screen bg-ocean-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">{t('loading')}</p>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: t('dashboard.curriculum'),
      titleAr: "استعراض المناهج",
      description: "Browse and access lesson plans",
      descriptionAr: "استعرض واحصل على خطط الدروس",
      icon: BookOpen,
      href: "/curriculum",
      color: "from-teal-500 to-cyan-600"
    },
    {
      title: t('dashboard.resources'),
      titleAr: "موارد التدريس",
      description: "Download teaching materials",
      descriptionAr: "تحميل مواد التدريس",
      icon: Download,
      href: "#",
      color: "from-accent-500 to-green-600"
    },
    {
      title: t('dashboard.feedback'),
      titleAr: "إرسال التقييم",
      description: "Submit lesson feedback",
      descriptionAr: "إرسال تقييم الدروس",
      icon: MessageSquare,
      href: "#",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-ocean-900 text-white">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-accent-500 rounded-2xl flex items-center justify-center">
                <Atom className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {t('dashboard.welcome')}
                </h1>
                <p className="text-xl text-gray-300">
                  Welcome back, {/*user?.firstName || user?.email || 'Teacher'}!*/}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          {dashboardData?.stats && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="glassmorphism bg-transparent border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <School className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-teal-400 mb-1">
                    {dashboardData.stats.schoolCount.toLocaleString()}
                  </div>
                  <div className="text-gray-300 text-sm">{t('stats.partner.schools')}</div>
                </CardContent>
              </Card>

              <Card className="glassmorphism bg-transparent border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-accent-500 mb-1">
                    {dashboardData.stats.studentCount.toLocaleString()}
                  </div>
                  <div className="text-gray-300 text-sm">{t('stats.students.reached')}</div>
                </CardContent>
              </Card>

              <Card className="glassmorphism bg-transparent border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {dashboardData.stats.teacherCount.toLocaleString()}
                  </div>
                  <div className="text-gray-300 text-sm">{t('stats.trained.teachers')}</div>
                </CardContent>
              </Card>

              <Card className="glassmorphism bg-transparent border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-orange-400 mb-1">95</div>
                  <div className="text-gray-300 text-sm">{t('stats.satisfaction')}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="glassmorphism bg-transparent border-white/20 hover:scale-105 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {language === 'ar' ? action.titleAr : action.title}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {language === 'ar' ? action.descriptionAr : action.description}
                    </p>
                    <Link href={action.href}>
                      <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 group-hover:border-white/40 transition-all duration-300">
                        Get Started HHIIIIII
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Curriculum Levels */}
          {dashboardData?.levels && (
            <Card className="glassmorphism bg-transparent border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-teal-400" />
                  Curriculum Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {dashboardData.levels.map((level, index) => {
                    const colors = [
                      { bg: 'from-accent-500 to-green-600', text: 'text-accent-400', border: 'border-accent-500/30' },
                      { bg: 'from-orange-500 to-amber-600', text: 'text-orange-400', border: 'border-orange-500/30' },
                      { bg: 'from-red-500 to-pink-600', text: 'text-red-400', border: 'border-red-500/30' }
                    ];
                    const color = colors[index] || colors[0];

                    return (
                      <div key={level.id} className={`bg-white/5 rounded-xl p-6 border ${color.border} hover:bg-white/10 transition-colors`}>
                        <div className={`w-12 h-12 bg-gradient-to-br ${color.bg} rounded-xl flex items-center justify-center mb-4`}>
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <h4 className={`text-lg font-bold ${color.text} mb-2`}>
                          {language === 'ar' ? level.nameAr : level.name}
                        </h4>
                        <p className="text-gray-300 text-sm mb-4">
                          Grades {level.gradesMin}-{level.gradesMax}
                        </p>
                        <Link href="/curriculum">
                          <Button size="sm" variant="ghost" className={`${color.text} hover:bg-white/10`}>
                            View Lessons
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            <Card className="glassmorphism bg-transparent border-white/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-teal-400" />
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white font-medium">New lesson materials added</p>
                      <p className="text-gray-400 text-sm">Level 2 - Week 8: Advanced Gears</p>
                      <p className="text-gray-500 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-accent-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white font-medium">Curriculum updates available</p>
                      <p className="text-gray-400 text-sm">Jordan MOE alignment improvements</p>
                      <p className="text-gray-500 text-xs">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white font-medium">Training webinar scheduled</p>
                      <p className="text-gray-400 text-sm">Advanced robotics techniques</p>
                      <p className="text-gray-500 text-xs">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism bg-transparent border-white/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <Star className="w-5 h-5 mr-3 text-teal-400" />
                  Featured Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="text-white font-medium mb-2">Building Techniques Guide</h4>
                    <p className="text-gray-400 text-sm mb-3">Comprehensive manual for LEGO Technic construction</p>
                    <Button size="sm" variant="ghost" className="text-teal-400 hover:bg-white/10 p-0">
                      Download PDF
                    </Button>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="text-white font-medium mb-2">Assessment Rubrics</h4>
                    <p className="text-gray-400 text-sm mb-3">Standardized evaluation criteria for all levels</p>
                    <Button size="sm" variant="ghost" className="text-teal-400 hover:bg-white/10 p-0">
                      View Templates
                    </Button>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="text-white font-medium mb-2">Video Tutorials</h4>
                    <p className="text-gray-400 text-sm mb-3">Step-by-step building instructions</p>
                    <Button size="sm" variant="ghost" className="text-teal-400 hover:bg-white/10 p-0">
                      Watch Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
