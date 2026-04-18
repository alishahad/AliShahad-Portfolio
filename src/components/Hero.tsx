import React, { useState, useRef } from 'react';
import { RESUME_DATA } from '../constants';
import { Mail, MapPin, Github, Linkedin, Twitter, Download, Globe, X, CheckCircle2, Users } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Hero: React.FC = () => {
  const { name, title, summary, contact, metrics } = RESUME_DATA;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'generating' | 'done'>('idle');
  const [demoState, setDemoState] = useState<'idle' | 'submitting' | 'done'>('idle');
  
  // Download Options
  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [selectedRole, setSelectedRole] = useState('Chief Revenue Officer');
  const [selectedLength, setSelectedLength] = useState('Short (1 Page)');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [includeExperience, setIncludeExperience] = useState(true);
  const [includeEducation, setIncludeEducation] = useState(true);
  const [includeSkills, setIncludeSkills] = useState(true);

  const resumeRef = useRef<HTMLDivElement>(null);

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github': return <Github size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'globe': return <Globe size={20} />;
      default: return null;
    }
  };

  const getAtsKeywords = (role: string, region: string) => {
    const base = "CRM, B2B, SaaS, Enterprise Sales, Lead Generation, Strategic Partnerships, GTM, Pipeline Management, Revenue Growth, Key Account Management, Negotiation, Cross-functional Leadership, Data Analysis, SQL, Python, PowerBI, Vibe Coding, AI Sales Automation";
    const roleKeywords = role.includes('CRO') || role.includes('CCO') ? "C-Suite, Executive Management, P&L Responsibility, Board Reporting, Revenue Architecture" :
                         role.includes('Director') ? "Director of Sales, Team Leadership, Territory Expansion" : "RWA Tokenization, Web3, M&A, Fundraising, Capital Raising";
    const regionKeywords = region === 'Global' ? "Global Expansion, International Sales, Cross-border" : `${region} Market, Localized GTM, Regional Compliance`;
    return `${base}, ${roleKeywords}, ${regionKeywords}`;
  };

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setDownloadState('generating');
    
    try {
      // Temporarily make the hidden resume visible for capture
      resumeRef.current.style.display = 'block';
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      resumeRef.current.style.display = 'none';

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF height based on canvas ratio to support long resumes
      const pdfWidth = canvas.width / 2;
      const pdfHeight = canvas.height / 2;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [pdfWidth, pdfHeight]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const safeName = name.replace(/\s+/g, '_');
      const safeRole = selectedRole.replace(/\s+/g, '_');
      pdf.save(`${safeName}_${safeRole}_Resume_${selectedLanguage}.pdf`);
      
      setDownloadState('done');
      setTimeout(() => {
        setDownloadState('idle');
        setIsModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      setDownloadState('idle');
    }
  };

  const atsKeywords = getAtsKeywords(selectedRole, selectedCountry);
  
  // Translations for PDF headers
  const t = {
    Summary: selectedLanguage === 'Arabic' ? 'ملخص' : selectedLanguage === 'Spanish' ? 'Resumen' : selectedLanguage === 'Russian' ? 'Резюме' : selectedLanguage === 'French' ? 'Résumé' : selectedLanguage === 'German' ? 'Zusammenfassung' : 'Summary',
    Experience: selectedLanguage === 'Arabic' ? 'الخبرة' : selectedLanguage === 'Spanish' ? 'Experiencia' : selectedLanguage === 'Russian' ? 'Опыт работы' : selectedLanguage === 'French' ? 'Expérience' : selectedLanguage === 'German' ? 'Erfahrung' : 'Experience',
    Skills: selectedLanguage === 'Arabic' ? 'المهارات' : selectedLanguage === 'Spanish' ? 'Habilidades' : selectedLanguage === 'Russian' ? 'Навыки' : selectedLanguage === 'French' ? 'Compétences' : selectedLanguage === 'German' ? 'Fähigkeiten' : 'Skills',
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
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <Download size={16} />
              Download Resume
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

      {/* Download Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Customize Resume</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Target Region</label>
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  >
                    <option>Global</option>
                    <option>UAE / MENA</option>
                    <option>Europe</option>
                    <option>USA</option>
                    <option>APAC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Role</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option>Chief Revenue Officer (CRO)</option>
                  <option>Chief Commercial Officer (CCO)</option>
                  <option>VP of Global Sales</option>
                  <option>Head of Business Development</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Format Length</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="length" 
                      value="Short (1 Page)" 
                      checked={selectedLength === 'Short (1 Page)'}
                      onChange={(e) => setSelectedLength(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">Short (Top 2 Roles)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="length" 
                      value="Long (Full History)" 
                      checked={selectedLength === 'Long (Full History)'}
                      onChange={(e) => setSelectedLength(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">Long (Full History)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Include Sections</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={includeExperience}
                      onChange={(e) => setIncludeExperience(e.target.checked)}
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="text-sm text-slate-700">Experience</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={includeEducation}
                      onChange={(e) => setIncludeEducation(e.target.checked)}
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="text-sm text-slate-700">Education</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={includeSkills}
                      onChange={(e) => setIncludeSkills(e.target.checked)}
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="text-sm text-slate-700">Skills</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-3 rounded-lg flex items-start gap-3">
                <SparklesIcon className="text-indigo-600 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-indigo-800 leading-relaxed">
                  The generated PDF will automatically include hidden ATS-friendly keywords optimized for {selectedRole} roles in {selectedCountry}.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDownload}
                disabled={downloadState !== 'idle'}
                className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {downloadState === 'generating' ? (
                  <>Generating... <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-4 h-4"></span></>
                ) : downloadState === 'done' ? (
                  <>Downloaded <CheckCircle2 size={16} /></>
                ) : (
                  <>Download PDF</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* Hidden Resume Template for PDF Generation */}
      <div 
        ref={resumeRef} 
        className="absolute top-0 left-0 w-[800px] bg-white p-12 text-slate-900" 
        style={{ display: 'none', zIndex: -9999 }}
        dir={selectedLanguage === 'Arabic' ? 'rtl' : 'ltr'}
      >
        <div className="border-b-2 border-slate-900 pb-6 mb-6">
          <h1 className="text-4xl font-bold mb-2">{name}</h1>
          <h2 className="text-xl text-indigo-600 font-medium mb-4">{selectedRole} | {selectedCountry} Focus</h2>
          <div className="flex gap-4 text-sm text-slate-600">
            <span>{contact.email}</span>
            <span>•</span>
            <span>{contact.location}</span>
            <span>•</span>
            <span>linkedin.com/in/ali-shahad-93532ba0</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-3">{t.Summary}</h3>
          <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
        </div>

        {includeExperience && (
          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-4">{t.Experience}</h3>
            <div className="space-y-5">
              {(selectedLength === 'Short (1 Page)' ? RESUME_DATA.experience.slice(0, 2) : RESUME_DATA.experience).map(job => (
                <div key={job.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-slate-900">{job.role}</h4>
                    <span className="text-sm text-slate-500 font-medium">{job.period}</span>
                  </div>
                  <div className="text-indigo-600 text-sm font-medium mb-2">{job.company}</div>
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {job.description.map((desc, i) => (
                      <li key={i} className="text-sm text-slate-700 leading-relaxed pl-1">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {includeEducation && (
          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-4">Education</h3>
            <div className="space-y-3">
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-sm text-slate-700">{edu.school} | {edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {includeSkills && (
          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 mb-4">{t.Skills}</h3>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.skills.flatMap(s => s.items).map(skill => (
                <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded font-medium">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* ATS Invisible Keywords */}
        <div className="text-[4px] text-white opacity-1 select-none mt-10">
          {atsKeywords}
        </div>
      </div>
    </section>
  );
};

// Helper icon for the modal
const SparklesIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

export default Hero;
