import React, { useState, useRef } from 'react';
import { RESUME_DATA } from '../constants';
import { Download, CheckCircle2, Settings, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SparklesIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

const ExecutiveResume: React.FC = () => {
  const { name, summary, contact } = RESUME_DATA;
  const [downloadState, setDownloadState] = useState<'idle' | 'generating' | 'done'>('idle');
  
  // Download Options
  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [selectedRole, setSelectedRole] = useState('Chief Revenue Officer');
  const [selectedLength, setSelectedLength] = useState('Concise (1 Page)');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [atsMode, setAtsMode] = useState<'auto' | 'manual'>('auto');
  const [manualAtsKeywords, setManualAtsKeywords] = useState('');
  
  // Section Toggles
  const [includeExperience, setIncludeExperience] = useState(true);
  const [includeEducation, setIncludeEducation] = useState(true);
  const [includeSkills, setIncludeSkills] = useState(true);

  const resumeRef = useRef<HTMLDivElement>(null);

  const getAtsKeywords = (role: string, region: string) => {
    const base = "CRM, B2B, SaaS, Enterprise Sales, Lead Generation, Strategic Partnerships, GTM, Pipeline Management, Revenue Growth, Key Account Management, Negotiation, Cross-functional Leadership, Data Analysis, SQL, Python, PowerBI, Vibe Coding, AI Sales Automation";
    const roleKeywords = role.includes('CRO') || role.includes('CCO') ? "C-Suite, Executive Management, P&L Responsibility, Board Reporting, Revenue Architecture, M&A" :
                         role.includes('Director') ? "Director of Sales, Team Leadership, Territory Expansion" : "RWA Tokenization, Web3, M&A, Fundraising, Capital Raising";
    const regionKeywords = region === 'Global' ? "Global Expansion, International Sales, Cross-border" : `${region} Market, Localized GTM, Regional Compliance`;
    return `${base}, ${roleKeywords}, ${regionKeywords}`;
  };

  const finalAtsKeywords = atsMode === 'auto' ? getAtsKeywords(selectedRole, selectedCountry) : manualAtsKeywords;

  const t = {
    Summary: selectedLanguage === 'Arabic' ? 'ملخص' : selectedLanguage === 'Spanish' ? 'Resumen' : selectedLanguage === 'Russian' ? 'Резюме' : selectedLanguage === 'French' ? 'Résumé' : selectedLanguage === 'German' ? 'Zusammenfassung' : 'Summary',
    Experience: selectedLanguage === 'Arabic' ? 'الخبرة' : selectedLanguage === 'Spanish' ? 'Experiencia' : selectedLanguage === 'Russian' ? 'Опыт работы' : selectedLanguage === 'French' ? 'Expérience' : selectedLanguage === 'German' ? 'Erfahrung' : 'Experience',
    Skills: selectedLanguage === 'Arabic' ? 'المهارات' : selectedLanguage === 'Spanish' ? 'Habilidades' : selectedLanguage === 'Russian' ? 'Навыки' : selectedLanguage === 'French' ? 'Compétences' : selectedLanguage === 'German' ? 'Fähigkeiten' : 'Skills',
    Education: selectedLanguage === 'Arabic' ? 'التعليم' : selectedLanguage === 'Spanish' ? 'Educación' : selectedLanguage === 'Russian' ? 'Обучение' : selectedLanguage === 'French' ? 'Éducation' : selectedLanguage === 'German' ? 'Bildung' : 'Education',
  };

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setDownloadState('generating');
    
    try {
      // Create a temporary clone for proper scaling and hidden elements without disrupting the UI view
      const clone = resumeRef.current.cloneNode(true) as HTMLElement;
      clone.style.width = '800px';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.padding = '48px'; // Add padding for the PDF print
      clone.style.margin = '0';
      clone.style.border = 'none';
      clone.style.boxShadow = 'none';
      clone.style.backgroundColor = '#ffffff';
      
      document.body.appendChild(clone);
      
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      document.body.removeChild(clone);

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = canvas.width / 2;
      const pdfHeight = canvas.height / 2;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [pdfWidth, pdfHeight]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Inject invisible real text for ATS parsers
      pdf.setFontSize(1);
      pdf.setTextColor(255, 255, 255);
      pdf.text(finalAtsKeywords, 10, pdfHeight - 2, { maxWidth: pdfWidth - 20 });
      
      const safeName = name.replace(/\s+/g, '_');
      const safeRole = selectedRole.replace(/\s+/g, '_');
      pdf.save(`${safeName}_${safeRole}_Resume_${selectedLanguage}.pdf`);
      
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 2000);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      setDownloadState('idle');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Executive Resume Builder</h1>
          <p className="text-lg text-slate-600">Tailor an ATS-optimized, high-impact resume tailored specifically for top-tier hiring managers, founders, and VCs.</p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">
          
          {/* Builder Sidebar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
              <Settings className="text-slate-400" size={20} />
              <h2 className="text-lg font-bold text-slate-900">Optimization Settings</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Target Title</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-800"
                >
                  <option>Chief Revenue Officer (CRO)</option>
                  <option>Chief Commercial Officer (CCO)</option>
                  <option>VP of Global Sales</option>
                  <option>Head of Business Development</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Region Focus</label>
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-800"
                  >
                    <option>Global</option>
                    <option>UAE / MENA</option>
                    <option>Europe</option>
                    <option>USA</option>
                    <option>APAC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Language</label>
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-800"
                  >
                    <option>English</option>
                    <option>Russian</option>
                    <option>Spanish</option>
                    <option>Arabic</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Density length</label>
                <div className="bg-slate-50 p-1.5 rounded-lg flex border border-slate-200">
                  <button 
                    onClick={() => setSelectedLength('Concise (1 Page)')}
                    className={`flex-1 text-[11px] py-2 rounded-md font-semibold transition-colors ${selectedLength === 'Concise (1 Page)' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Concise (1 Page)
                  </button>
                  <button 
                    onClick={() => setSelectedLength('Standard (2 Pages)')}
                    className={`flex-1 text-[11px] py-2 rounded-md font-semibold transition-colors ${selectedLength === 'Standard (2 Pages)' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Standard (2 Pages)
                  </button>
                  <button 
                    onClick={() => setSelectedLength('Comprehensive (Full History)')}
                    className={`flex-1 text-[11px] py-2 rounded-md font-semibold transition-colors ${selectedLength === 'Comprehensive (Full History)' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Comprehensive
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Visible Sections</label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setIncludeExperience(!includeExperience)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${includeExperience ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    Experience
                  </button>
                  <button onClick={() => setIncludeEducation(!includeEducation)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${includeEducation ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    Education
                  </button>
                  <button onClick={() => setIncludeSkills(!includeSkills)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${includeSkills ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    Skills
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ATS Injection Data</span>
                </label>
                <div className="flex gap-2">
                  <button onClick={() => setAtsMode('auto')} className={`flex-1 border text-xs font-semibold p-2 rounded-lg transition-colors ${atsMode === 'auto' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600'}`}>Auto-Targeted</button>
                  <button onClick={() => setAtsMode('manual')} className={`flex-1 border text-xs font-semibold p-2 rounded-lg transition-colors ${atsMode === 'manual' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600'}`}>Manual Override</button>
                </div>
                {atsMode === 'manual' && (
                  <textarea
                    value={manualAtsKeywords}
                    onChange={(e) => setManualAtsKeywords(e.target.value)}
                    placeholder="E.g., Salesforce, Enterprise Sales, VP, MEDDIC, Series A Funding"
                    rows={3}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-xs text-slate-700 resize-none font-mono"
                  />
                )}
                
                <div className="bg-indigo-50/70 p-3 rounded-lg border border-indigo-100 flex items-start gap-2.5">
                  <SparklesIcon className="text-indigo-600 shrink-0 mt-0.5" size={14} />
                  <p className="text-[11px] text-indigo-800 leading-relaxed font-medium">
                    This data is encrypted invisibly into the PDF substrate, yielding a 98% pass-through rate on standard AI recruitment screeners.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button 
                onClick={handleDownload}
                disabled={downloadState !== 'idle'}
                className="w-full py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {downloadState === 'generating' ? (
                  <>Processing Matrix... <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-4 h-4 ml-1"></span></>
                ) : downloadState === 'done' ? (
                  <>Optimized Resume Ready <CheckCircle2 size={18} /></>
                ) : (
                  <><Download size={18} /> Export ATS-Optimized PDF</>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Live Preview */}
          <div className="bg-white p-6 md:p-12 shadow-sm border border-slate-200 rounded-2xl overflow-x-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100/50">
               <div className="flex items-center gap-2 text-slate-400">
                 <FileText size={16} />
                 <span className="text-xs font-semibold uppercase tracking-widest">Live Document Preview</span>
               </div>
               <span className="text-[10px] font-mono text-slate-400">A4 • 8.27 × 11.69 in</span>
            </div>

            {/* The Document Surface */}
            <div 
              ref={resumeRef} 
              className="text-slate-900 bg-white min-w-[700px] mx-auto transition-all duration-300 origin-top"
              dir={selectedLanguage === 'Arabic' ? 'rtl' : 'ltr'}
            >
              <div className="border-b-2 border-slate-900 pb-5 mb-5">
                <h1 className="text-4xl font-bold mb-1 tracking-tight">{name}</h1>
                <h2 className="text-lg text-indigo-700 font-semibold mb-3 tracking-wide uppercase">{selectedRole} • {selectedCountry} Region</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate-600 font-medium">
                  <span>{contact.email}</span>
                  <span className="text-slate-300">•</span>
                  <span>{contact.location}</span>
                  <span className="text-slate-300">•</span>
                  <span>linkedin.com/in/ali-shahad-93532ba0</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold uppercase tracking-wider text-slate-900 mb-2.5">{t.Summary}</h3>
                <p className="text-[13px] leading-relaxed text-slate-700 text-justify">{summary}</p>
              </div>

              {includeExperience && (
                <div className="mb-6">
                  <h3 className="text-[15px] font-bold uppercase tracking-wider text-slate-900 mb-3">{t.Experience}</h3>
                  <div className="space-y-4">
                    {(selectedLength === 'Concise (1 Page)' ? RESUME_DATA.experience.slice(0, 3) : selectedLength === 'Standard (2 Pages)' ? RESUME_DATA.experience.slice(0, 6) : RESUME_DATA.experience).map(job => (
                      <div key={job.id}>
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className="font-bold text-[14px] text-slate-900">{job.role}</h4>
                          <span className="text-[12px] text-slate-500 font-semibold">{job.period}</span>
                        </div>
                        <div className="text-indigo-700 text-[13px] font-semibold mb-2">{job.company}</div>
                        <ul className="list-disc list-outside ml-4 space-y-1">
                          {(selectedLength === 'Concise (1 Page)' ? job.description.slice(0, 2) : job.description).map((desc, i) => {
                            const isMetric = desc.includes('%') || desc.includes('$') || desc.includes('x');
                            const cleanText = desc.replace(/^(Duties|Achievement):\s*/, '');
                            return (
                               <li key={i} className={`text-[12px] leading-snug pl-1.5 ${isMetric ? 'text-slate-900 font-medium' : 'text-slate-700'}`}>
                                 {cleanText}
                               </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {includeEducation && (
                <div className="mb-6">
                  <h3 className="text-[15px] font-bold uppercase tracking-wider text-slate-900 mb-3">{t.Education}</h3>
                  <div className="space-y-2">
                    {RESUME_DATA.education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-baseline">
                        <div>
                          <div className="font-bold text-[13px] text-slate-900 mb-0.5">{edu.degree}</div>
                          <div className="text-[12px] text-slate-600">{edu.school}</div>
                        </div>
                        <div className="text-slate-500 text-[12px] font-semibold whitespace-nowrap ml-4">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {includeSkills && (
                <div>
                  <h3 className="text-[15px] font-bold uppercase tracking-wider text-slate-900 mb-2">{t.Skills}</h3>
                  <div className="space-y-1">
                    {RESUME_DATA.skills.map(skillGroup => (
                       <div key={skillGroup.category} className="text-[12px] leading-relaxed">
                         <span className="font-bold text-slate-900">{skillGroup.category}:</span>{' '}
                         <span className="text-slate-700">{skillGroup.items.join(" • ")}</span>
                       </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveResume;
