import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Clock, 
  Search, 
  Filter, 
  Play,
  CheckCircle,
  Circle,
  Target,
  Package,
  FileText,
  ArrowLeft
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

interface Lesson {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  levelId: string;
  order: number;
  duration: number;
  objectives: string[];
  objectivesAr: string[];
  materials: string[];
  materialsAr: string[];
  instructions: string;
  instructionsAr: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Level {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  grades: string;
  gradesAr: string;
  gradesMin: number;
  gradesMax: number;
  lessonsCount: number;
}

export default function TeacherLessons() {
  const { user, isAuthenticated, isLoading, error } = useAuth();
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const { data: levelsData } = useQuery({
    queryKey: ["/api/public/levels"],
    retry: false,
  });

  const { data: lessonsData } = useQuery({
    queryKey: ["/api/lessons"],
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const levels: Level[] = levelsData?.levels || [
    {
      id: '1',
      nameEn: 'Starter Kit',
      nameAr: 'مجموعة المبتدئين',
      descriptionEn: 'Focus: Problem-solving and engineering thinking.',
      descriptionAr: 'التركيز: حل المشكلات والتفكير الهندسي.',
      grades: 'Grades 1–3',
      gradesAr: 'الصفوف 1-3',
      gradesMin: 1,
      gradesMax: 3,
      lessonsCount: 30
    },
    {
      id: '2',
      nameEn: 'Builder Kit',
      nameAr: 'مجموعة البناة',
      descriptionEn: 'Focus: Mechanics, systems, and structured problem-solving.',
      descriptionAr: 'التركيز: الميكانيكا والأنظمة وحل المشكلات المنظم.',
      grades: 'Grades 4–6',
      gradesAr: 'الصفوف 4-6',
      gradesMin: 4,
      gradesMax: 6,
      lessonsCount: 30
    },
    {
      id: '3',
      nameEn: 'Engineer Kit',
      nameAr: 'مجموعة المهندسين',
      descriptionEn: 'Focus: Real-world mechanisms, robotics, and innovation.',
      descriptionAr: 'التركيز: الآليات الواقعية والروبوتات والابتكار.',
      grades: 'Grades 7–9',
      gradesAr: 'الصفوف 7-9',
      gradesMin: 7,
      gradesMax: 9,
      lessonsCount: 30
    }
  ];

  const lessons: Lesson[] = lessonsData?.lessons || [];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = language === 'ar' 
      ? lesson.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.descriptionAr.toLowerCase().includes(searchTerm.toLowerCase())
      : lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === "all" || lesson.levelId === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const getLevelName = (levelId: string) => {
    const level = levels.find(l => l.id === levelId);
    return level ? (language === 'ar' ? level.nameAr : level.nameEn) : 'Unknown Level';
  };

  const getLevelColor = (levelId: string) => {
    switch (levelId) {
      case '1': return 'bg-green-100 text-green-800 border-green-200';
      case '2': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '3': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between h-16 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLesson(null)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {language === 'ar' ? 'العودة للدروس' : 'Back to Lessons'}
                </Button>
                <h1 className="text-2xl font-bold text-blue-900 dark:text-white">
                  {language === 'ar' ? selectedLesson.titleAr : selectedLesson.title}
                </h1>
              </div>
              <Badge className={getLevelColor(selectedLesson.levelId)}>
                {getLevelName(selectedLesson.levelId)}
              </Badge>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6">
            {/* Lesson Overview */}
            <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                  <BookOpen className="h-5 w-5" />
                  {language === 'ar' ? 'نظرة عامة على الدرس' : 'Lesson Overview'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' ? selectedLesson.descriptionAr : selectedLesson.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedLesson.duration} {language === 'ar' ? 'دقيقة' : 'minutes'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {language === 'ar' ? 'الدرس رقم' : 'Lesson'} {selectedLesson.order}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                  <Target className="h-5 w-5" />
                  {language === 'ar' ? 'أهداف التعلم' : 'Learning Objectives'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {(language === 'ar' ? selectedLesson.objectivesAr : selectedLesson.objectives).map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Required Materials */}
            <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                  <Package className="h-5 w-5" />
                  {language === 'ar' ? 'المواد المطلوبة' : 'Required Materials'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(language === 'ar' ? selectedLesson.materialsAr : selectedLesson.materials).map((material, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <Circle className="h-3 w-3 text-blue-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{material}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                  <FileText className="h-5 w-5" />
                  {language === 'ar' ? 'تعليمات الدرس' : 'Lesson Instructions'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {language === 'ar' ? selectedLesson.instructionsAr : selectedLesson.instructions}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Play className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'بدء الدرس' : 'Start Lesson'}
              </Button>
              <Button variant="outline" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'تحميل خطة الدرس' : 'Download Lesson Plan'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between h-16 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900 dark:text-white">
                {language === 'ar' ? 'مكتبة الدروس' : 'Lesson Library'}
              </h1>
            </div>
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'ar' ? `${filteredLessons.length} درس متاح` : `${filteredLessons.length} lessons available`}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = "/teacher/dashboard"}
              >
                {language === 'ar' ? 'العودة للوحة' : 'Back to Dashboard'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={language === 'ar' ? 'البحث في الدروس...' : 'Search lessons...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${language === 'ar' ? 'pr-10 text-right' : 'pl-10'} bg-white/70 dark:bg-gray-800/70`}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-md"
              >
                <option value="all">{language === 'ar' ? 'جميع المستويات' : 'All Levels'}</option>
                {levels.map(level => (
                  <option key={level.id} value={level.id}>
                    {language === 'ar' ? level.nameAr : level.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Level Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {levels.map(level => (
            <Card key={level.id} className="glassmorphism bg-white/70 dark:bg-gray-800/70 border-blue-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 dark:text-white">
                  {language === 'ar' ? level.nameAr : level.nameEn}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' ? level.gradesAr : level.grades}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'ar' ? level.descriptionAr : level.descriptionEn}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{level.lessonsCount}</span>
                  <span className="text-sm text-gray-500">{language === 'ar' ? 'درس' : 'lessons'}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid gap-6">
          {filteredLessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="glassmorphism bg-white/70 dark:bg-gray-800/70 border-blue-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedLesson(lesson)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-blue-900 dark:text-white mb-2">
                      {language === 'ar' ? lesson.titleAr : lesson.title}
                    </CardTitle>
                    <CardDescription>
                      {language === 'ar' ? lesson.descriptionAr : lesson.description}
                    </CardDescription>
                  </div>
                  <Badge className={getLevelColor(lesson.levelId)}>
                    {getLevelName(lesson.levelId)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'} text-sm text-gray-600 dark:text-gray-400`}>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lesson.duration} {language === 'ar' ? 'دقيقة' : 'min'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {language === 'ar' ? 'الدرس' : 'Lesson'} {lesson.order}
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {lesson.materials.length} {language === 'ar' ? 'مادة' : 'materials'}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    {language === 'ar' ? 'عرض' : 'View'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'لا توجد دروس' : 'No lessons found'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'ar' ? 'جرب تغيير مصطلح البحث أو المرشح' : 'Try adjusting your search term or filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}