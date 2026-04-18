export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  company?: string;
  description: string;
  tags: string[];
  link?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  logoUrl?: string;
  caseStudy?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  imageUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  metrics?: {
    value: string;
    label: string;
    prefix?: string;
    suffix?: string;
  }[];
  contact: {
    email: string;
    location: string;
    socials: SocialLink[];
  };
  experience: Experience[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
  skills: Skill[];
  projects: Project[];
  testimonials?: Testimonial[];
  services?: Service[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
  feedback?: 'up' | 'down';
}
