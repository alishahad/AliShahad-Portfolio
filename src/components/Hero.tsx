import React, { useState } from 'react';
import { RESUME_DATA } from '../constants';
import { Mail, MapPin, Github, Linkedin, Twitter, Download, Globe, X, CheckCircle2, Users } from 'lucide-react';

interface HeroProps {
  onBuildResume: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBuildResume }) => {
  const { name, title, summary, contact, metrics } = RESUME_DATA;
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoState, setDemoState] = useState<'idle' | 'submitting' | 'done'>('idle');

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github': return <Github size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'globe': return <Globe size={20} />;
      default: return null;
    }
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoState('submitting');
    // Simulate API call
    setTimeout(() => {
      setDemoState('done');
      setTimeout(() => {
        setDemoState('idle');
        setIsDemoModalOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
            <div className="inline-block p-1.5 px-4 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide uppercase">
              Available for new opportunities
            </div>
            <a href="https://linkedin.com/in/ali-shahad-93532ba0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 p-1.5 px-4 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide uppercase hover:bg-slate-200 transition-colors">
              <Linkedin size={14} />
              500+ Connections
            </a>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            {name}.
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-500 font-medium mb-8 tracking-tight">
            Architecting Global Revenue.
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {summary}
          </p>

          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto">
              {metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center">
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {metric.prefix}{metric.value}{metric.suffix}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-medium text-center">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a 
              href={`mailto:${contact.email}`}
              className="px-8 py-4 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Mail size={16} />
              Contact Me
            </a>
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <Globe size={16} />
              Request Demo
            </button>
            <button 
              onClick={onBuildResume}
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <Download size={16} />
              Build Resume
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{contact.location}</span>
            </div>
            <div className="flex gap-6">
              {contact.socials.map((social) => (
                <a 
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                  aria-label={social.platform}
                >
                  {getIcon(social.iconName)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Request Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Request a Demo</h3>
              <button onClick={() => setIsDemoModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleDemoSubmit} className="p-6 space-y-4">
              <p className="text-sm text-slate-600 mb-4">
                Interested in seeing how I can architect your revenue engine? Fill out the form below to schedule a personalized demo.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input required type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                <input required type="email" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm" placeholder="john@company.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input required type="text" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm" placeholder="Acme Corp" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message (Optional)</label>
                <textarea rows={3} className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none" placeholder="Tell me a bit about your current challenges..."></textarea>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={demoState !== 'idle'}
                  className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {demoState === 'submitting' ? (
                    <>Sending... <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-4 h-4"></span></>
                  ) : demoState === 'done' ? (
                    <>Request Sent <CheckCircle2 size={16} /></>
                  ) : (
                    <>Submit Request</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;
