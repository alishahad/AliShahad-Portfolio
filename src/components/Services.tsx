import React from 'react';
import { RESUME_DATA } from '../constants';
import { TrendingUp, Briefcase, Bot } from 'lucide-react';

const Services: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'trending-up': return <TrendingUp size={24} />;
      case 'briefcase': return <Briefcase size={24} />;
      case 'bot': return <Bot size={24} />;
      default: return <TrendingUp size={24} />;
    }
  };

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">How I Add Value</h2>
          <p className="text-slate-500 text-lg">
            I don't just advise; I build, execute, and scale. Here are the core areas where I drive exponential growth for my partners.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {RESUME_DATA.services?.map((service) => (
            <div key={service.id} className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                {getIcon(service.iconName)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></div>
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
