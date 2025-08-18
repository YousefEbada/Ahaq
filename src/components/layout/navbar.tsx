import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/hooks/useAuth";
import { Atom, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { href: "#home", label: t('nav.home') },
    { href: "#curriculum", label: t('nav.curriculum') },
    { href: "#impact", label: t('nav.impact') },
    { href: "#contact", label: t('nav.contact') },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      "backdrop-blur-lg border-b border-white/10",
      isScrolled ? "bg-ocean-900/90" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-sm leading-tight text-center">
                  <div className="text-xs">آفاق</div>
                  <div className="text-xs">العلم</div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{t('app.title')}</h1>
                <p className="text-xs text-gray-300">{t('app.tagline')}</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {location === "/" && navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated && (
              <>
                <Link href="/dashboard">
                  <span className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium cursor-pointer">
                    Dashboard
                  </span>
                </Link>
                <Link href="/curriculum">
                  <span className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium cursor-pointer">
                    Curriculum
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="hidden sm:block text-sm text-gray-300">
                  {(user as any)?.firstName || (user as any)?.email}
                </span>
                <Button
                  onClick={() => window.location.href = '/api/logout'}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {t('button.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => window.location.href = '/api/login'}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  {t('nav.login')}
                </Button>
                <Button
                  onClick={() => scrollToSection('#contact')}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                  size="sm"
                >
                  {t('nav.demo')}
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-ocean-800/95 backdrop-blur-lg rounded-lg mt-2 p-4 space-y-3">
            {location === "/" && navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated && (
              <>
                <Link href="/dashboard">
                  <span className="block text-gray-300 hover:text-teal-400 transition-colors py-2 cursor-pointer">
                    Dashboard
                  </span>
                </Link>
                <Link href="/curriculum">
                  <span className="block text-gray-300 hover:text-teal-400 transition-colors py-2 cursor-pointer">
                    Curriculum
                  </span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
