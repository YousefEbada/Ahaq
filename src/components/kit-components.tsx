import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, BookOpen, Target, Blocks, Lightbulb, Cog } from "lucide-react";
import kitImage from "@assets/d37ff72f-56a2-47f8-903d-307b68a55a01_1754862431996.png";

export function KitComponents() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">




        {/* Kit Levels & Curriculum */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-full mb-6">
            <span className="text-blue-300 text-sm font-medium">مستويات التعلم التدريجي</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-8">
            {t('levels.title')}
          </h2>
          <p className="text-xl text-blue-200/80 max-w-4xl mx-auto leading-relaxed">
            {t('levels.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Level 1 - Starter Kit */}
          <Card className="group relative bg-gradient-to-br from-slate-800/50 via-blue-900/30 to-indigo-900/50 border border-blue-500/20 hover:border-blue-400/40 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 relative z-10">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative p-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-blue-200 transition-colors">
                {t('curriculum.level1.title')}
              </h3>
              <p className="text-slate-300 text-center leading-relaxed">
                {t('curriculum.level1.description')}
              </p>
            </CardContent>
          </Card>

          {/* Level 2 - Builder Kit */}
          <Card className="group relative bg-gradient-to-br from-slate-800/50 via-blue-900/30 to-indigo-900/50 border border-blue-500/20 hover:border-blue-400/40 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 relative z-10">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                    <Cog className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-blue-200 transition-colors">
                {t('curriculum.level2.title')}
              </h3>
              <p className="text-slate-300 text-center leading-relaxed">
                {t('curriculum.level2.description')}
              </p>
            </CardContent>
          </Card>

          {/* Level 3 - Engineer Kit */}
          <Card className="group relative bg-gradient-to-br from-slate-800/50 via-blue-900/30 to-indigo-900/50 border border-blue-500/20 hover:border-blue-400/40 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 relative z-10">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-blue-200 transition-colors">
                {t('curriculum.level3.title')}
              </h3>
              <p className="text-slate-300 text-center leading-relaxed">
                {t('curriculum.level3.description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Building Blocks Learning Section */}
        <div className="relative bg-gradient-to-br from-slate-800/30 via-blue-900/20 to-indigo-900/30 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 lg:p-16 mb-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Content */}
            <div className={`space-y-10 ${t('interactive.learning.title').includes('التعلم') ? 'lg:order-2' : ''}`}>
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-400/30 rounded-full mb-6">
                  <span className="text-emerald-300 text-sm font-medium">التعلم التفاعلي</span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent mb-6">
                  {t('interactive.learning.title')}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {t('interactive.learning.subtitle')}
                </p>
              </div>

              <div className="grid gap-8">
                {/* Building & Design */}
                <div className="group flex items-start space-x-5 rtl:space-x-reverse p-4 rounded-2xl hover:bg-blue-900/20 transition-all duration-300">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <Blocks className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                      {t('interactive.building.title')}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {t('interactive.building.description')}
                    </p>
                  </div>
                </div>

                {/* Experimenting & Testing */}
                <div className="group flex items-start space-x-5 rtl:space-x-reverse p-4 rounded-2xl hover:bg-blue-900/20 transition-all duration-300">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Cog className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                      {t('interactive.testing.title')}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {t('interactive.testing.description')}
                    </p>
                  </div>
                </div>

                {/* Creative Solutions */}
                <div className="group flex items-start space-x-5 rtl:space-x-reverse p-4 rounded-2xl hover:bg-blue-900/20 transition-all duration-300">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                      {t('interactive.solutions.title')}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {t('interactive.solutions.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className={`${t('interactive.learning.title').includes('التعلم') ? 'lg:order-1' : ''}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-purple-600/20 to-transparent rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-emerald-600/20 via-transparent to-blue-600/30 rounded-3xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-500"></div>
                <img 
                  src={kitImage} 
                  alt={t('interactive.learning.title')}
                  className="relative w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Jordan Curriculum Alignment */}
        <div className="relative bg-gradient-to-r from-indigo-800/30 via-blue-800/30 to-slate-800/30 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-10 overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl blur opacity-75"></div>
                <div className="relative w-16 h-16 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center mr-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                Jordan Curriculum Alignment
              </h3>
            </div>
            <div className="text-center">
              <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
                {t('curriculum.alignment')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}