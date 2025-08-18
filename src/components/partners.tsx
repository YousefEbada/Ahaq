import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

const partners = [
  { name: "Ministry of Education", nameAr: "وزارة التربية والتعليم" },
  { name: "UNESCO", nameAr: "اليونسكو" },
  { name: "Jordan University", nameAr: "الجامعة الأردنية" },
  { name: "USAID", nameAr: "الوكالة الأمريكية للتنمية الدولية" },
  { name: "British Council", nameAr: "المجلس الثقافي البريطاني" },
  { name: "Al-Kindi Foundation", nameAr: "مؤسسة الكندي" },
];

export function Partners() {
  const { t, language } = useLanguage();

  return (
    <section id="partners" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-400 to-accent-500 bg-clip-text text-transparent">
              {t('partners.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div>

        {/* Partner Logos Carousel */}
        <Card className="glassmorphism bg-transparent">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 h-24 flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <span className="text-sm font-medium text-center text-gray-300 group-hover:text-white transition-colors">
                    {language === 'ar' ? partner.nameAr : partner.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Partnership Info */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="glassmorphism bg-transparent">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">150+</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Active Partnerships</h3>
              <p className="text-gray-400 text-sm">
                Collaborative relationships across educational institutions
              </p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-transparent">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">12</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Governorates</h3>
              <p className="text-gray-400 text-sm">
                Nationwide reach across Jordan's educational districts
              </p>
            </CardContent>
          </Card>

          <Card className="glassmorphism bg-transparent">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">5</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Years Active</h3>
              <p className="text-gray-400 text-sm">
                Building lasting partnerships in STEM education
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
