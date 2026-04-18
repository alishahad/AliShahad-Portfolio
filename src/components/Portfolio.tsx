import React, { useState, useMemo } from 'react';
import { RESUME_DATA } from '../constants';
import { ExternalLink, Github, X, FileText, Target, Zap, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    RESUME_DATA.projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return RESUME_DATA.projects;
    return RESUME_DATA.projects.filter(p => p.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="portfolio" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects & Case Studies</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A selection of projects and initiatives that demonstrate my expertise in business development, strategic partnerships, and global expansion.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === tag 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 flex flex-col h-full">
              <div className="relative overflow-hidden aspect-video bg-slate-100">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  {project.caseStudy && (
                    <button onClick={() => setSelectedProject(project)} className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 hover:scale-110 transition-all shadow-lg" title="Read Case Study">
                      <FileText size={20} />
                    </button>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 border border-slate-700 rounded-full text-white hover:bg-black hover:scale-110 transition-all shadow-lg" title="View Source">
                      <Github size={20} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 hover:scale-110 transition-all shadow-lg" title="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow relative">
                {project.logoUrl && (
                  <div className="absolute -top-8 right-6 w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm">
                    <img src={project.logoUrl} alt={project.company || project.title} className="w-full h-full object-cover" />
                  </div>
                )}
                {project.company && (
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{project.company}</div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors pr-10">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-4">
                {selectedProject.logoUrl && (
                  <img src={selectedProject.logoUrl} alt="Logo" className="w-10 h-10 rounded-full" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedProject.title}</h3>
                  {selectedProject.company && <p className="text-sm text-slate-500 font-medium">{selectedProject.company}</p>}
                </div>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-slate-600 p-2">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow">
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title} 
                className="w-full h-64 object-cover rounded-xl mb-8"
              />
              
              <div className="space-y-6">
                {selectedProject.caseStudy?.map((paragraph, idx) => {
                  const isChallenge = paragraph.startsWith('Challenge:');
                  const isAction = paragraph.startsWith('Action:');
                  const isResult = paragraph.startsWith('Result:');
                  
                  let title = '';
                  let content = paragraph;
                  let bgClass = 'bg-slate-50 border-slate-100';
                  let icon = null;
                  let titleClass = 'text-slate-900';
                  
                  if (isChallenge) { 
                    title = 'The Challenge'; 
                    content = paragraph.replace('Challenge:', '').trim(); 
                    bgClass = 'bg-slate-50 border-slate-200';
                    titleClass = 'text-slate-900';
                    icon = <Target className="text-slate-700" size={20} />;
                  }
                  else if (isAction) { 
                    title = 'The Action'; 
                    content = paragraph.replace('Action:', '').trim(); 
                    bgClass = 'bg-slate-50 border-slate-200';
                    titleClass = 'text-slate-900';
                    icon = <Zap className="text-slate-700" size={20} />;
                  }
                  else if (isResult) { 
                    title = 'The Result'; 
                    content = paragraph.replace('Result:', '').trim(); 
                    bgClass = 'bg-slate-900 border-slate-800 text-white';
                    titleClass = 'text-white';
                    icon = <CheckCircle2 className="text-white" size={20} />;
                  }

                  return (
                    <div key={idx} className={`p-6 rounded-xl border ${bgClass}`}>
                      {title && (
                        <div className="flex items-center gap-2 mb-3">
                          {icon}
                          <h4 className={`text-lg font-bold ${titleClass}`}>{title}</h4>
                        </div>
                      )}
                      <p className={`${isResult ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>{content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4 shrink-0 rounded-b-2xl">
              {selectedProject.liveUrl && (
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  Visit Project <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
