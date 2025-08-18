import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  school: string;
  schoolAr: string;
  testimonial: string;
  testimonialAr: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sara Al-Khatib",
    nameAr: "سارة الخطيب",
    role: "Science Teacher",
    roleAr: "معلمة علوم",
    school: "Amman International School",
    schoolAr: "مدرسة عمان الدولية",
    testimonial: "Afaq Al-ʿIlm has revolutionized how my students engage with science. The hands-on activities make complex concepts accessible and exciting.",
    testimonialAr: "لقد أحدثت آفاق العلم ثورة في طريقة تفاعل طلابي مع العلوم. الأنشطة العملية تجعل المفاهيم المعقدة سهلة ومثيرة.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b550?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 5
  },
  {
    id: "2", 
    name: "Ahmed Mansour",
    nameAr: "أحمد منصور",
    role: "Principal",
    roleAr: "مدير",
    school: "Jordan Academy",
    schoolAr: "أكاديمية الأردن",
    testimonial: "The bilingual support and alignment with Jordan's curriculum makes this platform invaluable for our diverse student body.",
    testimonialAr: "الدعم ثنائي اللغة والتوافق مع المنهج الأردني يجعل هذه المنصة لا تقدر بثمن لطلابنا المتنوعين.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 5
  },

  {
    id: "4",
    name: "Omar Zaid",
    nameAr: "عمر زيد", 
    role: "Technology Teacher",
    roleAr: "معلم تكنولوجيا",
    school: "Innovation Academy",
    schoolAr: "أكاديمية الابتكار",
    testimonial: "The progression from basic concepts to advanced robotics is perfectly structured. Students build confidence with each level.",
    testimonialAr: "التقدم من المفاهيم الأساسية إلى الروبوتات المتقدمة منظم بشكل مثالي. الطلاب يبنون الثقة مع كل مستوى.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 5
  }
];

export function Testimonials() {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slidesPerView = 2;
  const maxSlide = Math.ceil(testimonials.length / slidesPerView) - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, maxSlide)));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const currentTestimonials = testimonials.slice(
    currentSlide * slidesPerView,
    (currentSlide + 1) * slidesPerView
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {t('testimonials.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-8">
            {currentTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="glassmorphism bg-transparent">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={language === 'ar' ? testimonial.nameAr : testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`${language === 'ar' ? 'mr-4' : 'ml-4'}`}>
                      <h4 className="text-xl font-bold text-white">
                        {language === 'ar' ? testimonial.nameAr : testimonial.name}
                      </h4>
                      <p className="text-gray-400">
                        {language === 'ar' ? testimonial.roleAr : testimonial.role}, {' '}
                        {language === 'ar' ? testimonial.schoolAr : testimonial.school}
                      </p>
                    </div>
                  </div>
                  <p className={`text-gray-300 text-lg italic mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    "{language === 'ar' ? testimonial.testimonialAr : testimonial.testimonial}"
                  </p>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className={`flex justify-center items-center mt-8 gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={language === 'ar' ? nextSlide : prevSlide}
              className="text-white hover:text-blue-400 hover:bg-white/10"
            >
              {language === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>

            <div className={`flex ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              {Array.from({ length: maxSlide + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === currentSlide ? 'bg-blue-500' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={language === 'ar' ? prevSlide : nextSlide}
              className="text-white hover:text-blue-400 hover:bg-white/10"
            >
              {language === 'ar' ? <ChevronRight className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
