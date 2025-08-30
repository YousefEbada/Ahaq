import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Compass } from "lucide-react";

export function VisionMission() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Vision Card */}
          <Card className="glassmorphism bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-400/20 hover:scale-105 transition-all duration-500 h-full">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t('vision.title')}
                </h3>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed flex-grow">
                {t('vision.content')}
              </p>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-400/10 rounded-full blur-lg" />
            </CardContent>
          </Card>

          {/* Mission Card */}
          <Card className="glassmorphism bg-gradient-to-br from-blue-600/10 to-blue-700/5 border-blue-500/20 hover:scale-105 transition-all duration-500 h-full">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t('mission.title')}
                </h3>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed flex-grow">
                {t('mission.content')}
              </p>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-600/10 rounded-full blur-xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500/10 rounded-full blur-lg" />
            </CardContent>
          </Card>
          
        </div>

        {/* STEAM Breakdown */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">{t('steam.what.title')}</h3>
            <p className="text-blue-200 text-lg max-w-4xl mx-auto mb-8">{t('steam.description')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" dir="ltr">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">S</div>
              <div className="text-blue-200 font-medium">{t('steam.science')}</div>
            </div>            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">T</div>
              <div className="text-blue-200 font-medium">{t('steam.technology')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">E</div>
              <div className="text-blue-200 font-medium">{t('steam.engineering')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">A</div>
              <div className="text-blue-200 font-medium">{t('steam.arts')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">M</div>
              <div className="text-blue-200 font-medium">{t('steam.mathematics')}</div>
            </div>
          </div>
        </div>
        
        {/* Central Connecting Line */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600" />
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-blue-500 rounded-full animate-float animation-delay-1000 opacity-40" />
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-600 rounded-full animate-float animation-delay-2000 opacity-50" />
        <div className="absolute bottom-20 right-20 w-2.5 h-2.5 bg-blue-400 rounded-full animate-float animation-delay-500 opacity-30" />
      </div>
    </section>
  );
}