import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
    >
      <span className="font-medium">
        {language === 'en' ? 'EN' : 'AR'} | {language === 'en' ? 'AR' : 'EN'}
      </span>
    </Button>
  );
}
