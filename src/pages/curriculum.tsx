import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { interpolate } from "@/lib/i18n";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Eye,
  ChevronRight,
  Download,
  Star,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Level {
  id: string;
  name: string;
  nameAr: string;
  gradesMin: number;
  gradesMax: number;
  color: string;
}

interface Lesson {
  id: string;
  levelId: string;
  weekNumber: number;
  title: string;
  titleAr: string;
  objective: string;
  objectiveAr: string;
  buildType: string;
  thumbnailUrl: string;
  createdAt: string;
}

export default function Curriculum() {
  const { t, language } = useLanguage();
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: levels, isLoading: isLevelsLoading } = useQuery<Level[]>({
    queryKey: ['/api/public/levels'],
  });

  const { data: lessons, isLoading: isLessonsLoading, error } = useQuery<Lesson[]>({
    queryKey: ['/api/lessons', selectedLevel],
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

  useEffect(() => {
    if (levels && levels.length > 0 && !selectedLevel) {
      setSelectedLevel(levels[0].id);
    }
  }, [levels, selectedLevel]);

  const filteredLessons = lessons?.filter(lesson => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    const title = language === 'ar' ? lesson.titleAr : lesson.title;
    const objective = language === 'ar' ? lesson.objectiveAr : lesson.objective;
    return title?.toLowerCase().includes(searchLower) || 
           objective?.toLowerCase().includes(searchLower) ||
           lesson.buildType?.toLowerCase().includes(searchLower);
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ocean-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">{t('loading')}</p>
        </div>
      </div>
    );
  }

  const levelColors = [
    { bg: 'from-accent-500 to-green-600', text: 'text-accent-400', badge: 'bg-accent-500/20 text-accent-400' },
    { bg: 'from-orange-500 to-amber-600', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-400' },
    { bg: 'from-red-500 to-pink-600', text: 'text-red-400', badge: 'bg-red-500/20 text-red-400' }
  ];

  return (
    <div className="min-h-screen bg-ocean-900 text-white">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Curriculum Library
                </h1>
                <p className="text-xl text-gray-300">
                  Access comprehensive lesson plans and teaching resources
                </p>
              </div>
              <Button className="bg-gradient-to-r from-teal-500 to-accent-500 hover:from-teal-600 hover:to-accent-600">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search lessons, objectives, or build types..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                />
              </div>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Level Tabs */}
          {levels && (
            <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="mb-8">
              <TabsList className="glassmorphism bg-white/10 border border-white/20 p-1">
                {levels.map((level, index) => {
                  const color = levelColors[index] || levelColors[0];
                  return (
                    <TabsTrigger
                      key={level.id}
                      value={level.id}
                      className={`data-[state=active]:bg-white/20 data-[state=active]:${color.text} text-gray-300 hover:text-white`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 bg-gradient-to-br ${color.bg} rounded-full`}></div>
                        <span className="font-medium">
                          {language === 'ar' ? level.nameAr : level.name}
                        </span>
                        <Badge variant="secondary" className={`${color.badge} text-xs`}>
                          {interpolate(t('curriculum.grades'), {
                            min: level.gradesMin.toString(),
                            max: level.gradesMax.toString()
                          })}
                        </Badge>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {levels.map((level, levelIndex) => (
                <TabsContent key={level.id} value={level.id} className="mt-8">
                  <Card className="glassmorphism bg-transparent border-white/20 mb-6">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${levelColors[levelIndex]?.bg || levelColors[0].bg} rounded-xl flex items-center justify-center`}>
                            <span className="text-white font-bold text-lg">{levelIndex + 1}</span>
                          </div>
                          <div>
                            <CardTitle className="text-2xl text-white">
                              {language === 'ar' ? level.nameAr : level.name}
                            </CardTitle>
                            <p className="text-gray-300">
                              {interpolate(t('curriculum.grades'), {
                                min: level.gradesMin.toString(),
                                max: level.gradesMax.toString()
                              })} • 24 Lessons
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-teal-400">
                            {filteredLessons?.length || 0}
                          </div>
                          <div className="text-gray-400 text-sm">Available Lessons</div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Lessons Grid */}
                  {isLessonsLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-300">{t('loading')}</p>
                    </div>
                  ) : filteredLessons && filteredLessons.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredLessons.map((lesson) => (
                        <Card key={lesson.id} className="glassmorphism bg-transparent border-white/20 hover:scale-105 transition-all duration-300 group">
                          <CardContent className="p-0">
                            {/* Lesson Thumbnail */}
                            <div className="relative">
                              <img
                                src={lesson.thumbnailUrl || 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'}
                                alt={language === 'ar' ? lesson.titleAr : lesson.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                              />
                              <div className="absolute top-4 left-4">
                                <Badge className={`${levelColors[levelIndex]?.badge || levelColors[0].badge}`}>
                                  {interpolate(t('lesson.week'), { number: lesson.weekNumber.toString() })}
                                </Badge>
                              </div>
                              <div className="absolute top-4 right-4">
                                <div className="flex space-x-2">
                                  <Badge variant="secondary" className="bg-black/50 text-white">
                                    <Clock className="w-3 h-3 mr-1" />
                                    60 min
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="p-6">
                              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                                {language === 'ar' ? lesson.titleAr : lesson.title}
                              </h3>
                              
                              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                {language === 'ar' ? lesson.objectiveAr : lesson.objective}
                              </p>

                              {lesson.buildType && (
                                <div className="flex items-center space-x-2 mb-4">
                                  <Badge variant="outline" className="border-white/20 text-gray-300">
                                    {lesson.buildType}
                                  </Badge>
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                  <div className="flex items-center space-x-1">
                                    <Users className="w-4 h-4" />
                                    <span>2-4 students</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <span>4.8</span>
                                  </div>
                                </div>
                                <Link href={`/curriculum/lesson/${lesson.id}`}>
                                  <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="glassmorphism bg-transparent border-white/20">
                      <CardContent className="p-12 text-center">
                        <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Lessons Found</h3>
                        <p className="text-gray-400 mb-6">
                          {searchTerm ? 
                            `No lessons match your search "${searchTerm}"` : 
                            "No lessons available for this level yet."
                          }
                        </p>
                        {searchTerm && (
                          <Button 
                            onClick={() => setSearchTerm("")}
                            variant="outline" 
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            Clear Search
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Additional Resources */}
          <Card className="glassmorphism bg-transparent border-white/20 mt-12">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Teacher Guide</h4>
                  <p className="text-gray-400 text-sm mb-4">Complete implementation guide for all levels</p>
                  <Button size="sm" variant="ghost" className="text-teal-400 hover:bg-white/10 p-0">
                    Download PDF
                  </Button>
                </div>

                <div className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Assessment Tools</h4>
                  <p className="text-gray-400 text-sm mb-4">Rubrics and evaluation criteria</p>
                  <Button size="sm" variant="ghost" className="text-teal-400 hover:bg-white/10 p-0">
                    View Tools
                  </Button>
                </div>

                <div className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Training Videos</h4>
                  <p className="text-gray-400 text-sm mb-4">Professional development resources</p>
                  <Button size="sm" variant="ghost" className="text-teal-400 hover:bg-white/10 p-0">
                    Watch Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
