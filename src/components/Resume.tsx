import React, { useState } from 'react';
import { RESUME_DATA } from '../constants';
import { Briefcase, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';

const Resume: React.FC = () => {
  const [showFullHistory, setShowFullHistory] = useState(false);
  
  const displayedExperience = showFullHistory 
    ? RESUME_DATA.experience 
    : RESUME_DATA.experience.slice(0, 4);

  return (
    <section id="resume" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Professional Experience</h2>
          <p className="text-slate-500">A track record of building revenue engines and driving global expansion.</p>
        </div>

        <div className="space-y-16">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-slate-100 text-slate-900 rounded-lg">
                <Briefcase size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Work History</h3>
            </div>
            
            <div className="space-y-10 border-l-2 border-slate-100 pl-6 ml-3">
              {displayedExperience.map((job, index) => (
                <div key={job.id} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-white border-2 border-slate-300 rounded-full"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                    <h4 className="font-bold text-lg text-slate-900">{job.role}</h4>
                    <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-slate-900 font-medium mb-4">{job.company}</div>
                  <ul className="space-y-3">
                    {job.description.map((desc, i) => {
                      const isAchievement = desc.startsWith('Achievement:');
                      const text = desc.replace(/^(Duties|Achievement):\s*/, '');
                      return (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                          <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${isAchievement ? 'bg-slate-900' : 'bg-slate-300'}`}></span>
                          <span>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {RESUME_DATA.experience.length > 4 && (
              <div className="mt-12 text-center">
                <button 
                  onClick={() => setShowFullHistory(!showFullHistory)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-medium rounded-full hover:bg-slate-50 transition-colors border border-slate-200 text-sm"
                >
                  {showFullHistory ? (
                    <>Show Less <ChevronUp size={16} /></>
                  ) : (
                    <>View Full History ({RESUME_DATA.experience.length - 4} more) <ChevronDown size={16} /></>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Education */}
          <div className="pt-16 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-slate-100 text-slate-900 rounded-lg">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Education</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {RESUME_DATA.education.map((edu, index) => (
                <div key={index} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-1 leading-snug">{edu.degree}</h4>
                  <div className="text-slate-700 text-sm font-medium mb-2">{edu.school}</div>
                  <div className="text-slate-500 text-xs font-medium">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
