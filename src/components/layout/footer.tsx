import { Link } from "wouter";
import { useLanguage } from "@/contexts/language-context";
import { Atom, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "#curriculum", label: t('nav.curriculum') },
    { href: "#impact", label: t('nav.impact') },
    { href: "#partners", label: t('nav.partners') },
    { href: "#contact", label: t('nav.contact') },
  ];

  const resources = [
    { href: "/curriculum", label: t('footer.teacherPortal') },
    { href: "#", label: t('footer.sampleLessons') },
    { href: "#", label: t('footer.trainingMaterials') },
    { href: "#", label: t('footer.supportCenter') },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-ocean-900/50 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{t('app.title')}</h3>
                <p className="text-gray-400">{t('app.tagline')}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  {resource.href.startsWith('/') ? (
                    <Link href={resource.href}>
                      <span className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                        {resource.label}
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={resource.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {resource.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {t('footer.copyright').replace('{title}', t('app.title'))}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              {t('footer.privacyPolicy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              {t('footer.termsOfService')}
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              {t('footer.accessibility')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
