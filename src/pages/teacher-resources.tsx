import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, BookOpen, Wrench, AlertTriangle, Clock, Users, Target, Lightbulb, Download, Play } from "lucide-react";

export default function TeacherResources() {
  const { t, language } = useLanguage();

  const meetingSchedule = [
    {
      date: "2025-08-15",
      time: "9:00 AM - 11:00 AM",
      topic: "Introduction to Afaq Al-ʿIlm Platform",
      topicAr: "مقدمة لمنصة آفاق العلم",
      type: "orientation",
      materials: ["Teacher Guide", "Platform Overview", "Access Credentials"]
    },
    {
      date: "2025-08-22",
      time: "9:00 AM - 12:00 PM",
      topic: "Starter Kit Training (Grades 1-3)",
      topicAr: "تدريب مجموعة المبتدئين (الصفوف 1-3)",
      type: "hands-on",
      materials: ["Starter Kit", "Building Instructions", "Assessment Rubrics"]
    },
    {
      date: "2025-08-29",
      time: "9:00 AM - 12:00 PM",
      topic: "Builder Kit Training (Grades 4-6)",
      topicAr: "تدريب مجموعة البناة (الصفوف 4-6)",
      type: "hands-on",
      materials: ["Builder Kit", "Advanced Techniques", "Project Templates"]
    },
    {
      date: "2025-09-05",
      time: "9:00 AM - 12:00 PM",
      topic: "Engineer Kit Training (Grades 7-9)",
      topicAr: "تدريب مجموعة المهندسين (الصفوف 7-9)",
      type: "hands-on",
      materials: ["Engineer Kit", "Problem-Solving Strategies", "Innovation Projects"]
    },
    {
      date: "2025-09-12",
      time: "10:00 AM - 11:00 AM",
      topic: "Assessment & Progress Tracking",
      topicAr: "التقييم وتتبع التقدم",
      type: "workshop",
      materials: ["Assessment Tools", "Progress Sheets", "Digital Portfolio"]
    }
  ];

  const brickTypes = [
    {
      name: "Basic Bricks",
      nameAr: "القطع الأساسية",
      description: "2x2, 2x4, 2x6, 2x8 building blocks in various colors",
      descriptionAr: "قطع البناء الأساسية بأحجام مختلفة وألوان متنوعة",
      uses: ["Foundation building", "Structural support", "Color coding"],
      usesAr: ["بناء الأساسات", "الدعم الهيكلي", "الترميز بالألوان"]
    },
    {
      name: "Technic Beams",
      nameAr: "العوارض التقنية",
      description: "Structural beams with connection holes for complex builds",
      descriptionAr: "عوارض هيكلية مع فتحات الاتصال للبناء المعقد",
      uses: ["Framework construction", "Mechanical connections", "Moving parts"],
      usesAr: ["بناء الإطار", "الاتصالات الميكانيكية", "الأجزاء المتحركة"]
    },
    {
      name: "Gears & Wheels",
      nameAr: "التروس والعجلات",
      description: "Various sized gears, wheels, and axles for movement",
      descriptionAr: "تروس وعجلات ومحاور بأحجام مختلفة للحركة",
      uses: ["Power transmission", "Speed control", "Directional change"],
      usesAr: ["نقل القوة", "التحكم في السرعة", "تغيير الاتجاه"]
    },
    {
      name: "Connectors",
      nameAr: "الموصلات",
      description: "Pins, bushings, and connectors for joint assembly",
      descriptionAr: "دبابيس وحلقات وموصلات لتجميع المفاصل",
      uses: ["Flexible joints", "Rotating connections", "Pivot points"],
      usesAr: ["المفاصل المرنة", "الاتصالات الدوارة", "نقاط المحورة"]
    }
  ];

  const troubleshootingGuide = [
    {
      problem: "Build falls apart easily",
      problemAr: "البناء ينهار بسهولة",
      solutions: [
        "Check all connections are properly secured",
        "Use overlapping brick patterns for stability",
        "Add cross-bracing with technic beams"
      ],
      solutionsAr: [
        "تحقق من أن جميع الاتصالات محكمة",
        "استخدم أنماط متداخلة للاستقرار",
        "أضف دعامات متقاطعة بالعوارض التقنية"
      ]
    },
    {
      problem: "Gears not meshing properly",
      problemAr: "التروس لا تتشابك بشكل صحيح",
      solutions: [
        "Ensure proper spacing between gear centers",
        "Check that gears are on the same plane",
        "Verify axle alignment is straight"
      ],
      solutionsAr: [
        "تأكد من المسافة الصحيحة بين مراكز التروس",
        "تحقق أن التروس في نفس المستوى",
        "تأكد من استقامة محاذاة المحور"
      ]
    },
    {
      problem: "Model moves too slowly",
      problemAr: "النموذج يتحرك ببطء شديد",
      solutions: [
        "Check for friction in moving parts",
        "Adjust gear ratios for more speed",
        "Ensure axles rotate freely"
      ],
      solutionsAr: [
        "تحقق من الاحتكاك في الأجزاء المتحركة",
        "اضبط نسب التروس لمزيد من السرعة",
        "تأكد أن المحاور تدور بحرية"
      ]
    }
  ];

  const extensionActivities = [
    {
      title: "Design Challenge",
      titleAr: "تحدي التصميم",
      description: "Create your own unique build using available pieces",
      descriptionAr: "أنشئ بناءً فريداً باستخدام القطع المتاحة",
      time: "15-20 minutes",
      skills: ["Creativity", "Problem-solving", "Engineering"]
    },
    {
      title: "Speed Race",
      titleAr: "سباق السرعة",
      description: "Modify builds to make them faster and race against classmates",
      descriptionAr: "عدّل البناء لجعله أسرع وتسابق مع زملاء الصف",
      time: "10-15 minutes",
      skills: ["Optimization", "Competition", "Physics"]
    },
    {
      title: "Story Building",
      titleAr: "بناء القصة",
      description: "Create characters and scenes, then tell a story",
      descriptionAr: "أنشئ شخصيات ومشاهد، ثم احك قصة",
      time: "20-25 minutes",
      skills: ["Storytelling", "Imagination", "Communication"]
    },
    {
      title: "Real-World Connections",
      titleAr: "الروابط مع العالم الحقيقي",
      description: "Discuss how the built mechanisms relate to everyday objects",
      descriptionAr: "ناقش كيف ترتبط الآليات المبنية بالأشياء اليومية",
      time: "5-10 minutes",
      skills: ["Critical thinking", "Real-world application", "Discussion"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-blue-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between h-16 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900 dark:text-white">
                {language === 'ar' ? 'موارد المعلم' : 'Teacher Resources'}
              </h1>
            </div>
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/teacher/dashboard"}
              >
                {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Core Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-white mb-8 text-center">
            {language === 'ar' ? 'القيم الأساسية' : 'Core Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Building Basics */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-blue-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center">
                  <Wrench className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">
                  {language === 'ar' ? 'أساسيات البناء' : 'Building Basics'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {language === 'ar' 
                    ? 'المفاهيم الأساسية للبناء والتركيب'
                    : 'Fundamental concepts of construction and assembly'
                  }
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {language === 'ar' ? 'عرض جميع المحتويات' : 'See All Content'}
                </Button>
              </CardContent>
            </Card>

            {/* Preparation */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-green-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">
                  {language === 'ar' ? 'التحضير' : 'Preparation'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {language === 'ar' 
                    ? 'إرشادات التحضير والتخطيط للدروس'
                    : 'Lesson preparation and planning guidelines'
                  }
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {language === 'ar' ? 'عرض جميع المحتويات' : 'See All Content'}
                </Button>
              </CardContent>
            </Card>

            {/* Afaq Programs */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-purple-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">
                  {language === 'ar' ? 'برامج آفاق العلم' : 'Afaq Programs'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {language === 'ar' 
                    ? 'البرامج التعليمية المتخصصة والأنشطة'
                    : 'Specialized educational programs and activities'
                  }
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {language === 'ar' ? 'عرض جميع المحتويات' : 'See All Content'}
                </Button>
              </CardContent>
            </Card>

            {/* Curriculum Resources */}
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-orange-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center">
                  <Download className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-lg">
                  {language === 'ar' ? 'موارد المنهج' : 'Curriculum Resources'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {language === 'ar' 
                    ? 'موارد المنهج الدراسي والمواد التعليمية'
                    : 'Curriculum resources and educational materials'
                  }
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {language === 'ar' ? 'عرض جميع المحتويات' : 'See All Content'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="mission" className="space-y-6">
          <TabsList className={`grid w-full grid-cols-7 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <TabsTrigger value="mission" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {language === 'ar' ? 'الرؤية والرسالة' : 'Mission & Vision'}
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {language === 'ar' ? 'الاجتماعات' : 'Meetings'}
            </TabsTrigger>
            <TabsTrigger value="kits" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {language === 'ar' ? 'المجموعات' : 'Kits'}
            </TabsTrigger>
            <TabsTrigger value="bricks" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              {language === 'ar' ? 'القطع' : 'Bricks'}
            </TabsTrigger>
            <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              {language === 'ar' ? 'حل المشاكل' : 'Troubleshooting'}
            </TabsTrigger>
            <TabsTrigger value="instructions" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              {language === 'ar' ? 'تعليمات البناء' : 'Build Instructions'}
            </TabsTrigger>
            <TabsTrigger value="extensions" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              {language === 'ar' ? 'أنشطة إضافية' : 'Extensions'}
            </TabsTrigger>
          </TabsList>

          {/* Mission & Vision */}
          <TabsContent value="mission" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                    <Target className="h-5 w-5" />
                    {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {language === 'ar' 
                      ? 'ثورة في تعليم العلوم والتكنولوجيا والهندسة والفنون والرياضيات في الأردن من خلال جعل التعلم التطبيقي متاحاً لكل طالب، وتعزيز الابتكار والإبداع ومهارات التفكير النقدي التي تعدهم لتحديات الغد.'
                      : 'To revolutionize STEAM education in Jordan by making hands-on learning accessible to every student, fostering innovation, creativity, and critical thinking skills that prepare them for the challenges of tomorrow.'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                    <Users className="h-5 w-5" />
                    {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {language === 'ar' 
                      ? 'نوفر حلول تعليمية شاملة ثنائية اللغة في العلوم والتكنولوجيا من خلال مجموعات المناهج المبتكرة وتدريب المعلمين والدعم المستمر، شراكة مع المدارس لتحويل التعلم التقليدي إلى تجارب عملية مثيرة تلهم الجيل القادم من المبتكرين وحلال المشاكل.'
                      : 'We provide comprehensive, bilingual STEAM education solutions through innovative curriculum kits, teacher training, and continuous support, partnering with schools to transform traditional learning into engaging, practical experiences that inspire the next generation of innovators and problem-solvers.'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-white">
                  {language === 'ar' ? 'أهداف البرنامج' : 'Program Goals'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: language === 'ar' ? 'تطوير مهارات حل المشكلات' : 'Develop Problem-Solving Skills',
                      description: language === 'ar' ? 'تعليم الطلاب التفكير النقدي والتحليلي' : 'Teach students critical and analytical thinking'
                    },
                    {
                      title: language === 'ar' ? 'تعزيز الإبداع' : 'Foster Creativity',
                      description: language === 'ar' ? 'تشجيع التفكير الإبداعي والابتكار' : 'Encourage creative thinking and innovation'
                    },
                    {
                      title: language === 'ar' ? 'بناء مهارات التعاون' : 'Build Collaboration Skills',
                      description: language === 'ar' ? 'تطوير العمل الجماعي والتواصل' : 'Develop teamwork and communication'
                    },
                    {
                      title: language === 'ar' ? 'ربط التعلم بالواقع' : 'Connect Learning to Reality',
                      description: language === 'ar' ? 'إظهار التطبيقات العملية للمفاهيم' : 'Show practical applications of concepts'
                    },
                    {
                      title: language === 'ar' ? 'تطوير المهارات التقنية' : 'Develop Technical Skills',
                      description: language === 'ar' ? 'بناء الفهم الهندسي والتقني' : 'Build engineering and technical understanding'
                    },
                    {
                      title: language === 'ar' ? 'إعداد للمستقبل' : 'Prepare for the Future',
                      description: language === 'ar' ? 'تأهيل الطلاب لوظائف المستقبل' : 'Prepare students for future careers'
                    }
                  ].map((goal, index) => (
                    <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">{goal.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meeting Schedule */}
          <TabsContent value="meetings" className="space-y-6">
            <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                  <Calendar className="h-5 w-5" />
                  {language === 'ar' ? 'جدول اجتماعات التدريب' : 'Training Meeting Schedule'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {meetingSchedule.map((meeting, index) => (
                    <div key={index} className="border border-blue-200 dark:border-gray-600 rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20">
                      <div className={`flex items-start justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className="flex-1">
                          <div className={`flex items-center gap-3 mb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <Badge variant={meeting.type === 'hands-on' ? 'default' : meeting.type === 'orientation' ? 'secondary' : 'outline'}>
                              {meeting.type === 'hands-on' ? (language === 'ar' ? 'تطبيقي' : 'Hands-on') : 
                               meeting.type === 'orientation' ? (language === 'ar' ? 'توجيهي' : 'Orientation') : 
                               (language === 'ar' ? 'ورشة عمل' : 'Workshop')}
                            </Badge>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{meeting.date}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{meeting.time}</span>
                          </div>
                          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                            {language === 'ar' ? meeting.topicAr : meeting.topic}
                          </h4>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                              {language === 'ar' ? 'المواد المطلوبة:' : 'Required Materials:'}
                            </p>
                            <ul className={`text-sm text-gray-600 dark:text-gray-400 ${language === 'ar' ? 'pr-4' : 'pl-4'}`}>
                              {meeting.materials.map((material, idx) => (
                                <li key={idx} className="list-disc">{material}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className={`${language === 'ar' ? 'ml-4' : 'mr-4'}`}>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            {language === 'ar' ? 'الموارد' : 'Resources'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Kit Overview */}
          <TabsContent value="kits" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Starter Kit',
                  titleAr: 'مجموعة المبتدئين',
                  grades: 'Grades 1-3',
                  gradesAr: 'الصفوف 1-3',
                  focus: 'Creativity, motion, shapes, simple storytelling builds',
                  focusAr: 'الإبداع والحركة والأشكال وبناء القصص البسيطة',
                  components: ['60 basic bricks', '20 wheels', '10 axles', 'Building guide'],
                  componentsAr: ['60 قطعة أساسية', '20 عجلة', '10 محاور', 'دليل البناء'],
                  color: 'from-green-500 to-green-600'
                },
                {
                  title: 'Builder Kit',
                  titleAr: 'مجموعة البناة',
                  grades: 'Grades 4-6',
                  gradesAr: 'الصفوف 4-6',
                  focus: 'Simple machines, gears, pulleys, force, ratios',
                  focusAr: 'الآلات البسيطة والتروس والبكرات والقوة والنسب',
                  components: ['80 technic beams', '15 gears', '5 pulleys', 'Activity sheets'],
                  componentsAr: ['80 عارضة تقنية', '15 ترس', '5 بكرات', 'أوراق الأنشطة'],
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  title: 'Engineer Kit',
                  titleAr: 'مجموعة المهندسين',
                  grades: 'Grades 7-9',
                  gradesAr: 'الصفوف 7-9',
                  focus: 'Real-world mechanisms, problem-solving, optimization',
                  focusAr: 'الآليات الواقعية وحل المشكلات والتحسين',
                  components: ['100 advanced pieces', '20 sensors', '5 motors', 'Project challenges'],
                  componentsAr: ['100 قطعة متقدمة', '20 مستشعر', '5 محركات', 'تحديات المشاريع'],
                  color: 'from-purple-500 to-purple-600'
                }
              ].map((kit, index) => (
                <Card key={index} className="glassmorphism bg-white/70 dark:bg-gray-800/70 hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-br ${kit.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-center text-blue-900 dark:text-white">
                      {language === 'ar' ? kit.titleAr : kit.title}
                    </CardTitle>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? kit.gradesAr : kit.grades}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {language === 'ar' ? 'التركيز:' : 'Focus:'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? kit.focusAr : kit.focus}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {language === 'ar' ? 'المكونات:' : 'Components:'}
                      </h4>
                      <ul className={`text-sm text-gray-600 dark:text-gray-400 space-y-1 ${language === 'ar' ? 'pr-4' : 'pl-4'}`}>
                        {(language === 'ar' ? kit.componentsAr : kit.components).map((component, idx) => (
                          <li key={idx} className="list-disc">{component}</li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'ابدأ التعلم' : 'Start Learning'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Brick Types */}
          <TabsContent value="bricks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {brickTypes.map((brick, index) => (
                <Card key={index} className="glassmorphism bg-white/70 dark:bg-gray-800/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                      <Wrench className="h-5 w-5" />
                      {language === 'ar' ? brick.nameAr : brick.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? brick.descriptionAr : brick.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {language === 'ar' ? 'الاستخدامات:' : 'Uses:'}
                      </h4>
                      <ul className={`text-sm text-gray-600 dark:text-gray-400 space-y-1 ${language === 'ar' ? 'pr-4' : 'pl-4'}`}>
                        {(language === 'ar' ? brick.usesAr : brick.uses).map((use, idx) => (
                          <li key={idx} className="list-disc">{use}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Troubleshooting */}
          <TabsContent value="troubleshooting" className="space-y-6">
            <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                  <AlertTriangle className="h-5 w-5" />
                  {language === 'ar' ? 'دليل حل المشاكل' : 'Troubleshooting Guide'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {troubleshootingGuide.map((issue, index) => (
                    <div key={index} className="border border-orange-200 dark:border-orange-800 rounded-lg p-4 bg-orange-50/50 dark:bg-orange-900/20">
                      <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-3">
                        {language === 'ar' ? issue.problemAr : issue.problem}
                      </h4>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                          {language === 'ar' ? 'الحلول:' : 'Solutions:'}
                        </p>
                        <ul className={`space-y-1 ${language === 'ar' ? 'pr-4' : 'pl-4'}`}>
                          {(language === 'ar' ? issue.solutionsAr : issue.solutions).map((solution, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 list-disc">{solution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Build Instructions */}
          <TabsContent value="instructions" className="space-y-6">
            <Card className="glassmorphism bg-white/70 dark:bg-gray-800/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                  <Play className="h-5 w-5" />
                  {language === 'ar' ? 'تعليمات البناء خطوة بخطوة' : 'Step-by-Step Building Instructions'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {[
                    {
                      level: 'Starter Kit',
                      levelAr: 'مجموعة المبتدئين',
                      projects: [
                        {
                          name: 'Simple Car',
                          nameAr: 'سيارة بسيطة',
                          steps: [
                            'Connect 4 wheels to 2 axles',
                            'Attach axles to a rectangular base',
                            'Add decorative bricks for the car body',
                            'Test rolling motion'
                          ],
                          stepsAr: [
                            'ربط 4 عجلات بمحورين',
                            'تثبيت المحاور في قاعدة مستطيلة',
                            'إضافة قطع تزيينية لجسم السيارة',
                            'اختبار الحركة المتدحرجة'
                          ]
                        },
                        {
                          name: 'Spinning Top',
                          nameAr: 'الدوامة',
                          steps: [
                            'Build a circular base with bricks',
                            'Insert a vertical axle through center',
                            'Add weights around the edge',
                            'Practice spinning technique'
                          ],
                          stepsAr: [
                            'بناء قاعدة دائرية بالقطع',
                            'إدخال محور عمودي في المركز',
                            'إضافة أثقال حول الحافة',
                            'ممارسة تقنية الدوران'
                          ]
                        }
                      ]
                    },
                    {
                      level: 'Builder Kit',
                      levelAr: 'مجموعة البناة',
                      projects: [
                        {
                          name: 'Gear Train',
                          nameAr: 'سلسلة التروس',
                          steps: [
                            'Mount first gear on input axle',
                            'Position second gear to mesh properly',
                            'Add third gear for direction change',
                            'Test gear ratio and speed'
                          ],
                          stepsAr: [
                            'تركيب الترس الأول على محور الإدخال',
                            'وضع الترس الثاني للتشابك الصحيح',
                            'إضافة ترس ثالث لتغيير الاتجاه',
                            'اختبار نسبة التروس والسرعة'
                          ]
                        },
                        {
                          name: 'Pulley System',
                          nameAr: 'نظام البكرات',
                          steps: [
                            'Set up fixed pulley at top',
                            'Add movable pulley for mechanical advantage',
                            'Thread string through both pulleys',
                            'Test lifting different weights'
                          ],
                          stepsAr: [
                            'إعداد بكرة ثابتة في الأعلى',
                            'إضافة بكرة متحركة للفائدة الميكانيكية',
                            'تمرير الخيط عبر البكرتين',
                            'اختبار رفع أوزان مختلفة'
                          ]
                        }
                      ]
                    },
                    {
                      level: 'Engineer Kit',
                      levelAr: 'مجموعة المهندسين',
                      projects: [
                        {
                          name: 'Robotic Arm',
                          nameAr: 'ذراع آلية',
                          steps: [
                            'Build stable base with motors',
                            'Construct articulated arm segments',
                            'Install sensors for feedback',
                            'Program movement sequences'
                          ],
                          stepsAr: [
                            'بناء قاعدة مستقرة بالمحركات',
                            'تركيب أجزاء الذراع المفصلية',
                            'تركيب المستشعرات للتغذية المرتدة',
                            'برمجة تسلسلات الحركة'
                          ]
                        },
                        {
                          name: 'Automated Crane',
                          nameAr: 'رافعة آلية',
                          steps: [
                            'Design tower structure for stability',
                            'Install horizontal boom with counterweight',
                            'Add motorized lifting mechanism',
                            'Program automated pickup and delivery'
                          ],
                          stepsAr: [
                            'تصميم هيكل البرج للاستقرار',
                            'تركيب ذراع أفقية مع ثقل موازن',
                            'إضافة آلية رفع محركة',
                            'برمجة الالتقاط والتسليم الآلي'
                          ]
                        }
                      ]
                    }
                  ].map((kit, kitIndex) => (
                    <div key={kitIndex} className="space-y-4">
                      <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 border-b border-blue-200 dark:border-blue-800 pb-2">
                        {language === 'ar' ? kit.levelAr : kit.level}
                      </h3>
                      {kit.projects.map((project, projectIndex) => (
                        <Card key={projectIndex} className="bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                          <CardHeader>
                            <CardTitle className="text-blue-800 dark:text-blue-300 text-base">
                              {language === 'ar' ? project.nameAr : project.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ol className={`space-y-2 ${language === 'ar' ? 'pr-4' : 'pl-4'}`}>
                              {(language === 'ar' ? project.stepsAr : project.steps).map((step, stepIndex) => (
                                <li key={stepIndex} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                  <span className="font-bold text-blue-600 min-w-[1.5rem]">{stepIndex + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Extension Activities */}
          <TabsContent value="extensions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {extensionActivities.map((activity, index) => (
                <Card key={index} className="glassmorphism bg-white/70 dark:bg-gray-800/70 hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                      <Lightbulb className="h-5 w-5" />
                      {language === 'ar' ? activity.titleAr : activity.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      {activity.time}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? activity.descriptionAr : activity.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {language === 'ar' ? 'المهارات المطورة:' : 'Skills Developed:'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activity.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" size="sm" variant="outline">
                      {language === 'ar' ? 'بدء النشاط' : 'Start Activity'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}