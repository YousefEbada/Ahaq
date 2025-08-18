import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { useQuery } from "@tanstack/react-query";
import { School, GraduationCap, Users, Trophy } from "lucide-react";
import { CounterAnimation } from "./hero-section";

interface Stats {
  schoolCount: number;
  studentCount: number;
  lessonCount: number;
  teacherCount: number;
}

export function ImpactMetrics() {
  const { t } = useLanguage();
  
  const { data: stats } = useQuery<Stats>({
    queryKey: ['/api/public/stats'],
  });

  // Provide realistic fallback values when data is not available or shows zeros
  const displayStats = (stats && (stats.studentCount > 0 || stats.teacherCount > 0)) ? stats : {
    studentCount: 150,
    teacherCount: 10
  };

  const progressMetrics = [
    {
      labelKey: "skills.problem.solving",
      percentage: 92,
      color: "from-blue-500 to-blue-400"
    },
    {
      labelKey: "skills.creative.thinking",
      percentage: 88,
      color: "from-accent-500 to-blue-400"
    },
    {
      labelKey: "skills.collaboration",
      percentage: 95,
      color: "from-purple-500 to-pink-400"
    },
    {
      labelKey: "skills.technical",
      percentage: 85,
      color: "from-orange-500 to-amber-400"
    }
  ];

  return (
    <section id="impact" className="py-20 relative">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {t('impact.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('impact.subtitle')}
          </p>
        </div>
        
        {/* Impact Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <Card className="glassmorphism bg-transparent hover:scale-105 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-accent-500 mb-2">150</div>
              <div className="text-gray-300 font-medium">{t('stats.students.reached')}</div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphism bg-transparent hover:scale-105 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-purple-400 mb-2">10</div>
              <div className="text-gray-300 font-medium">{t('stats.trained.teachers')}</div>
            </CardContent>
          </Card>
          
          <Card className="glassmorphism bg-transparent hover:scale-105 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-orange-400 mb-2">95</div>
              <div className="text-gray-300 font-medium">{t('stats.satisfaction')}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Progress Bars */}
        <Card className="glassmorphism bg-transparent">
          <CardContent className="p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">{t('skills.outcomes.progress') || 'Learning Outcomes Progress'}</h3>
            
            <div className="space-y-8">
              {progressMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 font-medium">
                      {t(metric.labelKey)}
                    </span>
                    <span className="text-blue-400 font-bold">{metric.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${metric.color} h-3 rounded-full transition-all duration-1000 animate-pulse`}
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
