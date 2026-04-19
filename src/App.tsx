import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Resume from './components/Resume';
import ExecutiveResume from './components/ExecutiveResume';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import FounderTools from './components/FounderTools';
import ChatWidget from './components/ChatWidget';
import { Menu, X, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from './constants';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'tools' | 'resume'>('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#', tab: 'home' },
    { name: 'Founder Tools', href: '#', tab: 'tools' },
    { name: 'Executive Resume', href: '#', tab: 'resume' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: any) => {
    e.preventDefault();
    if (link.tab !== activeTab) {
      setActiveTab(link.tab as 'home' | 'tools' | 'resume');
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div 
            className="text-2xl font-bold tracking-tighter text-slate-900 cursor-pointer"
            onClick={() => { setActiveTab('home'); window.scrollTo(0,0); }}
          >
            {RESUME_DATA.name.split(' ')[0]}<span className="text-indigo-600">.</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-sm font-medium transition-colors ${
                  activeTab === link.tab && link.tab === 'tools' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={`mailto:${RESUME_DATA.contact.email}`} 
              className="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-colors"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-900 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-center">
             {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-xl font-medium ${
                  activeTab === link.tab && link.tab === 'tools' ? 'text-indigo-600' : 'text-slate-900 hover:text-indigo-600'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={`mailto:${RESUME_DATA.contact.email}`} 
              className="mt-4 px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-full"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {activeTab === 'home' && (
          <>
            <Hero onBuildResume={() => { setActiveTab('resume'); window.scrollTo(0,0); }} />
            <div id="services">
              <Services />
            </div>
            <Resume />
            <Portfolio />
          </>
        )}
        {activeTab === 'tools' && (
          <FounderTools />
        )}
        {activeTab === 'resume' && (
          <ExecutiveResume />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-8">
            {RESUME_DATA.contact.socials.map((social) => {
               // Use lucide-react icons dynamically based on iconName
               const IconName = social.iconName.toLowerCase();
               let IconComponent = null;
               if (IconName === 'github') IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
               else if (IconName === 'linkedin') IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
               else if (IconName === 'twitter') IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
               else if (IconName === 'globe') IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
               
               return (
                 <a 
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label={social.platform}
                    title={social.platform}
                  >
                    {IconComponent || social.platform}
                  </a>
               );
            })}
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {RESUME_DATA.name}. All rights reserved.
            <br />
            Built with React, Tailwind, and Gemini AI.
          </p>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;
