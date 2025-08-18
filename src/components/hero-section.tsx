import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Play, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import steamKitImage from "@assets/3d6eda70-9a41-439f-b7c5-d303f49416f8_1754863007760.png";

interface Stats {
  schoolCount: number;
  studentCount: number;
  lessonCount: number;
  teacherCount: number;
}

export function CounterAnimation({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-teal-400">{count.toLocaleString()}</div>
      <div className="text-sm text-gray-400">{t(label)}</div>
    </div>
  );
}

export function HeroSection() {
  const { t } = useLanguage();
  
  const { data: stats } = useQuery<Stats>({
    queryKey: ['/api/public/stats'],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1581726690015-c9861fa5057f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full opacity-60" />
        <div className="animate-float absolute top-40 right-20 w-6 h-6 bg-blue-600 rounded-full opacity-40 animation-delay-1000" />
        <div className="animate-float absolute bottom-32 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-50 animation-delay-2000" />
        <div className="animate-float absolute top-60 right-1/3 w-5 h-5 bg-blue-700 rounded-full opacity-30 animation-delay-500" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Hero Content */}
          <div className="animate-slide-up">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {t('hero.title.revolutionizing')}
              </span><br />
              <span className="text-white">{t('hero.title.steam')}</span><br />
              <span className="text-2xl lg:text-3xl font-normal text-gray-300">
                {t('hero.subtitle')}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                {t('hero.cta.primary')}
              </Button>
              <Button
                onClick={() => scrollToSection('#curriculum')}
                variant="ghost"
                className="glassmorphism hover:bg-white/20 px-8 py-4 text-lg font-semibold transition-all duration-300 text-white border border-white/20"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('hero.cta.secondary')}
              </Button>
            </div>
            

            

          </div>
          
          {/* Hero Visual */}
          <div className="relative animate-fade-in">
            <div className="glassmorphism rounded-3xl p-8 transform hover:scale-105 transition-all duration-500">
              <img 
                src={steamKitImage} 
                alt="STEAM Kit Preview" 
                className="rounded-2xl w-full h-auto shadow-2xl"
              />
              
              {/* Floating UI Elements */}
              <div className="absolute -top-4 -right-4 glassmorphism rounded-xl p-4 animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white">Live Building</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glassmorphism rounded-xl p-4 animate-float animation-delay-1000">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white">4 Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
