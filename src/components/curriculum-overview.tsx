import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { useQuery } from "@tanstack/react-query";
import { Sprout, Wrench, ServerCog, Box, Settings, Cpu, ChevronRight } from "lucide-react";
import steamKitImage from "@assets/3d6eda70-9a41-439f-b7c5-d303f49416f8_1754863007760.png";

interface Level {
  id: string;
  name: string;
  nameAr: string;
  gradesMin: number;
  gradesMax: number;
  color: string;
}

const levelIcons = [Sprout, Wrench, ServerCog];
const levelColors = ['accent', 'orange', 'red'];

export function CurriculumOverview() {
  const { t, language } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState(0);

  const { data: levels, isLoading } = useQuery<Level[]>({
    queryKey: ['/api/public/levels'],
  });

  if (isLoading) {
    return (
      <section id="curriculum" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-gray-300">{t('loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  const levelDescriptions = [
    {
      en: "Introduction to basic mechanical concepts through colorful, large building blocks and simple machines.",
      ar: "مقدمة في المفاهيم الميكانيكية الأساسية من خلال قطع البناء الملونة والكبيرة والآلات البسيطة."
    },
    {
      en: "Advanced mechanical concepts with complex builds, introducing programming and sensor integration.",
      ar: "المفاهيم الميكانيكية المتقدمة مع البناءات المعقدة، وإدخال البرمجة وتكامل أجهزة الاستشعار."
    },
    {
      en: "Real-world engineering challenges with autonomous robots, sensors, and competitive robotics elements.",
      ar: "تحديات هندسية من العالم الحقيقي مع الروبوتات المستقلة وأجهزة الاستشعار وعناصر الروبوتات التنافسية."
    }
  ];

  const features = [
    [
      { en: "24 Interactive Lessons", ar: "24 درسًا تفاعليًا" },
      { en: "Basic Gears & Pulleys", ar: "التروس والبكرات الأساسية" },
      { en: "Storytelling Elements", ar: "عناصر سرد القصص" }
    ],
    [
      { en: "24 Complex Projects", ar: "24 مشروعًا معقدًا" },
      { en: "Motorized Builds", ar: "البناءات المحركة" },
      { en: "Basic Programming", ar: "البرمجة الأساسية" }
    ],
    [
      { en: "24 Engineering Challenges", ar: "24 تحديًا هندسيًا" },
      { en: "Autonomous Robots", ar: "الروبوتات المستقلة" },
      { en: "Competition Prep", ar: "إعداد المسابقات" }
    ]
  ];

  const kitComponents = [
    {
      icon: Box,
      title: { en: "Building Elements", ar: "عناصر البناء" },
      description: { en: "Technic-style beams, connectors, and structural pieces", ar: "العوارض والموصلات والقطع الهيكلية بأسلوب تكنيك" },
      color: "teal"
    },
    {
      icon: Settings,
      title: { en: "Mechanical Parts", ar: "الأجزاء الميكانيكية" },
      description: { en: "Gears, pulleys, wheels, and motion systems", ar: "التروس والبكرات والعجلات وأنظمة الحركة" },
      color: "accent"
    },
    {
      icon: Cpu,
      title: { en: "Smart Components", ar: "المكونات الذكية" },
      description: { en: "Motors, sensors, and programmable controllers", ar: "المحركات وأجهزة الاستشعار ووحدات التحكم القابلة للبرمجة" },
      color: "purple"
    }
  ];

  return (
    <section id="curriculum" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {t('curriculum.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('curriculum.subtitle')}
          </p>
        </div>

        {/* Level Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {levels?.map((level, index) => {
            const Icon = levelIcons[index] || ServerCog;
            const colorClass = levelColors[index] || 'teal';
            const borderColor = index === 0 ? 'border-accent-500' : 
                              index === 1 ? 'border-orange-500' : 'border-red-500';
            const bgColor = index === 0 ? 'from-accent-500 to-blue-600' :
                           index === 1 ? 'from-orange-500 to-amber-600' : 'from-red-500 to-pink-600';
            const textColor = index === 0 ? 'text-accent-400' :
                             index === 1 ? 'text-orange-400' : 'text-red-400';
            const buttonBg = index === 0 ? 'bg-accent-500/20 hover:bg-accent-500/30 text-accent-400' :
                            index === 1 ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400' :
                            'bg-red-500/20 hover:bg-red-500/30 text-red-400';

            return (
              <Card key={level.id} className={`glassmorphism hover:scale-105 transition-all duration-500 border-l-4 ${borderColor} bg-transparent`}>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`bg-gradient-to-br ${bgColor} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className={`${buttonBg} px-3 py-1 rounded-full text-sm font-medium`}>
                      Grades {level.gradesMin}-{level.gradesMax}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>
                    {language === 'ar' ? level.nameAr : level.name}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {language === 'ar' ? levelDescriptions[index]?.ar : levelDescriptions[index]?.en}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {features[index]?.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center space-x-2">
                        <ChevronRight className={`w-4 h-4 ${textColor}`} />
                        <span className="text-gray-300">
                          {language === 'ar' ? feature.ar : feature.en}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button className={`w-full ${buttonBg} transition-colors`}>
                    Explore Level {index + 1}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* LEGO-Style Building Explanation */}
        <Card className="glassmorphism bg-transparent">
          <CardContent className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-white">
                  {language === 'ar' ? 'التعلم بقطع البناء التفاعلية' : 'Hands-on Learning with Building Blocks'}
                </h3>
                <p className="text-gray-300 mb-8 text-lg">
                  {language === 'ar' 
                    ? 'نستخدم قطع بناء شبيهة بالليجو لجعل المفاهيم الهندسية والعلمية ملموسة وممتعة. يتعلم الطلاب من خلال البناء والتجريب والاكتشاف.'
                    : 'We use LEGO-style building blocks to make engineering and scientific concepts tangible and fun. Students learn through building, experimenting, and discovering.'
                  }
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        {language === 'ar' ? 'البناء والتصميم' : 'Build & Design'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'ar' 
                          ? 'قطع البناء الملونة تساعد الطلاب على فهم الهياكل والآليات'
                          : 'Colorful building blocks help students understand structures and mechanisms'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        {language === 'ar' ? 'التجريب والاختبار' : 'Experiment & Test'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'ar' 
                          ? 'يختبر الطلاب أفكارهم ويطورونها من خلال التجريب المباشر'
                          : 'Students test their ideas and iterate through hands-on experimentation'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        {language === 'ar' ? 'الحلول الإبداعية' : 'Creative Solutions'}
                      </h4>
                      <p className="text-gray-300">
                        {language === 'ar' 
                          ? 'كل طالب يجد طريقته الخاصة لحل المشاكل والتحديات'
                          : 'Each student finds their own way to solve problems and challenges'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="glassmorphism rounded-3xl p-8 transform hover:scale-105 transition-all duration-500">
                  <img 
                    src={steamKitImage} 
                    alt="STEAM Robot Kit" 
                    className="rounded-2xl w-full h-auto shadow-2xl"
                  />
                  
                  {/* Floating UI Elements */}
                  <div className="absolute -top-4 -right-4 glassmorphism rounded-xl p-4 animate-float">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-white">
                        {language === 'ar' ? 'روبوت تفاعلي' : 'Interactive Robot'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 glassmorphism rounded-xl p-4 animate-float animation-delay-1000">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-white">
                        {language === 'ar' ? 'تعلم عملي' : 'Hands-on Learning'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
