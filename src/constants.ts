import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  name: "Ali Shahad",
  title: "Head of Sales & Business Development",
  summary: "Global commercial executive specializing in market expansion and institutional capital raising. I build high-performing sales organizations from the ground up, forge strategic partnerships, and drive exponential revenue growth across EMEA, APAC, and the Americas.",
  metrics: [
    { value: "36.5", label: "Capital Raising", prefix: "$", suffix: "M" },
    { value: "10", label: "Revenue Growth", suffix: "x" },
    { value: "8", label: "Global Regions", suffix: "+" },
    { value: "8", label: "Years Experience", suffix: "+" }
  ],
  contact: {
    email: "aakhan023@gmail.com",
    location: "Global / Remote",
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/ali-shahad-93532ba0", iconName: "linkedin" },
      { platform: "GitHub", url: "https://github.com/alishahad", iconName: "github" },
      { platform: "Website", url: "https://alishahad.github.io", iconName: "globe" }
    ]
  },
  experience: [
    {
      id: "exp-1",
      role: "Head of Business Development",
      company: "Tokenizer.estate",
      period: "June 2025 - Present",
      description: [
        "Duties: Joined pre-revenue to architect the global GTM strategy and build the commercial function from zero for a complex RWA tokenization platform.",
        "Achievement: Transformed an unproven startup into a market-validated, trustworthy company by generating a fully qualified $25M robust sales pipeline and securing early backing from tier-1 institutions to establish immediate credibility.",
        "Achievement: Closed 5 major B2B institutional deals within the first 5 months, navigating complex legal and cross-border compliance frameworks.",
        "Achievement: Navigated complex multi-jurisdictional compliance to secure strategic partnerships and actively open engagements with UAE and EU regulatory sandboxes and financial authorities, paving the way for scale."
      ]
    },
    {
      id: "exp-2",
      role: "Deputy Commercial Director",
      company: "Orbita Investments",
      period: "July 2024 - Present",
      description: [
        "Duties: Built the commercial department from the ground up, establishing the operational framework, KPI dashboards, go-to-market playbooks, and hiring structure within 2 months.",
        "Duties: Spearheading institutional negotiations to raise $36.5M in startup capital.",
        "Achievement: Achieved 125% of Q1 revenue targets (surpassing a $5M baseline quota) driven by optimizing enterprise engagement models.",
        "Achievement: Reduced the average sales cycle by 40% by deploying automated lead qualification, structured deal-desk approvals, and standardized pitching materials.",
        "Achievement: Onboarded 50+ strategic partners for indirect sales channels, boosting overall performance by 48%."
      ]
    },
    {
      id: "exp-3",
      role: "Head of Sales / Head of International Department",
      company: "The World Real Estate",
      period: "July 2023 - July 2024",
      description: [
        "Duties: Overhauled sales operations and shifted strategy from agencies to direct developers.",
        "Achievement: Led expansion from 1 to 8 global regions (UAE, Asia, Europe, USA) in a single quarter.",
        "Achievement: Drove 10x revenue growth in 2 months, increasing MRR from 0.6% to 10% and achieving 49% net profit.",
        "Achievement: Personally closed a $1.5M deal and built a high-performing sales team on a lean budget."
      ]
    },
    {
      id: "exp-4",
      role: "Head of Business Development Department",
      company: "Cbonds",
      period: "September 2022 - June 2023",
      description: [
        "Duties: Streamlined operations using Notion/Trello, creating a comprehensive Sales Enablement and Partner Program.",
        "Duties: Implemented AI and low-code tools to optimize the sales pipeline.",
        "Achievement: Drove 20% overall growth and a 15% increase in recurring revenue.",
        "Achievement: Reduced integration time by 40% through AI-driven automation."
      ]
    },
    {
      id: "exp-5",
      role: "Business Development Specialist",
      company: "GROWmatica",
      period: "April 2019 - September 2022",
      description: [
        "Duties: Managed 15 senior sales staff across multiple European expansion projects.",
        "Achievement: Generated €1M in new recurring revenue and significantly expanded international sales.",
        "Achievement: Secured Fortune 500 and Gartner-listed clients (e.g., Frends Ipaas).",
        "Achievement: Drove 25% growth in the Nordics & DACH regions."
      ]
    },
    {
      id: "exp-6",
      role: "New Business Development & Project Manager",
      company: "WEBCON",
      period: "April 2020 - July 2022",
      description: [
        "Duties: Led Nordic region expansion, developing and executing new strategies for partner onboarding.",
        "Achievement: Successfully managed enterprise client onboarding and acted as the bridge between clients, partners, and internal teams."
      ]
    },
    {
      id: "exp-7",
      role: "Account Manager Enterprise Sales",
      company: "Kentico Software",
      period: "February 2021 - June 2021",
      description: [
        "Duties: Conducted deep BANT analysis and client realignment for at-risk enterprise projects.",
        "Achievement: Increased team productivity by 48% and introduced Fortune 500 listed clients.",
        "Achievement: Successfully rescued and retained multiple at-risk enterprise accounts."
      ]
    },
    {
      id: "exp-8",
      role: "EMEA Channel Partner",
      company: "eKomi - The Feedback Company",
      period: "April 2019 - March 2020",
      description: [
        "Duties: Facilitated channel engagement to support territory sales goals and articulated value propositions to partners.",
        "Achievement: Drove significant EMEA channel partner acquisition and onboarding."
      ]
    },
    {
      id: "exp-9",
      role: "Chief Sales Officer",
      company: "Clicktex",
      period: "March 2019 - May 2019",
      description: [
        "Duties: Sourced and hired a new technical sales team, overseeing business-wide modernization efforts.",
        "Achievement: Increased profits by 53% through process optimization and restructuring."
      ]
    },
    {
      id: "exp-10",
      role: "B2B Key Account and Technical Manager",
      company: "NSYS GROUP",
      period: "April 2018 - March 2019",
      description: [
        "Duties: Hired, supervised, and coached a 14-person sales team to optimize performance.",
        "Achievement: Exceeded sales quotas in the MENA region, successfully opening new territories."
      ]
    },
    {
      id: "exp-11",
      role: "CEO/Founder",
      company: "AdenineCode",
      period: "March 2015 - November 2015",
      description: [
        "Duties: Founded and led a digital transformation agency for SMBs.",
        "Achievement: Built remote teams, formed strategic partnerships, and successfully managed end-to-end client delivery."
      ]
    }
  ],
  education: [
    {
      degree: "Masters in Big Data Science and extreme computing",
      school: "ITMO University",
      year: "2016 - 2018"
    },
    {
      degree: "Erasmus Exchange Masters in Computer science and management",
      school: "Wrocław University of Science and Technology",
      year: "2017 - 2018"
    },
    {
      degree: "Bachelors of science in Bioinformatics",
      school: "Comsats Institute of information technology",
      year: "2011 - 2015"
    }
  ],
  skills: [
    { category: "Sales & Strategy", items: ["B2B Enterprise Sales", "GTM Strategy", "Revenue Architecture", "Strategic Partnerships", "M&A & Capital Raising", "Global Expansion"] },
    { category: "AI & Tech", items: ["Vibe Coding", "AI Sales Automation", "Predictive Revenue Analytics", "LLM Prompt Engineering", "AI-Driven CRM", "SaaS & Web3"] },
    { category: "Management", items: ["P&L Responsibility", "Cross-functional Leadership", "Sales Enablement", "Process Optimization", "Remote Team Building"] },
    { category: "Languages", items: ["English (C2)", "Russian (B2)", "Urdu (C2)", "Hindi (C2)", "Pashto (Native)", "Punjabi (B1)"] }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Tokenizer.estate RWA Platform",
      company: "Tokenizer.estate",
      description: "Built the sales and partnerships function from zero for a complex tokenization / RWA product combining tech and legal infrastructure.",
      tags: ["RWA Tokenization", "Web3", "B2B Sales", "Partnerships"],
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f4d2315?auto=format&fit=crop&q=80&w=800",
      logoUrl: "/tokenizer-logo.png",
      liveUrl: "https://tokenizer.estate",
      caseStudy: [
        "Challenge: Secure tier-1 institutional funding for an unproven, pre-revenue RWA tokenization startup lacking a foundational Go-To-Market strategy, commercial department, and market credibility.",
        "Action: Architected the global GTM strategy and built the commercial function from zero. Initiated strategic engagements with UAE and EU regulatory sandboxes to dissolve cross-border compliance friction and accelerate enterprise onboarding.",
        "Result: Generated a fully qualified $25M sales pipeline, secured early tier-1 institutional backing, and closed 5 major B2B infrastructure deals within the first 5 months of operation.",
        "Key Takeaway: Balancing technological innovation with robust, multi-jurisdictional regulatory compliance is the ultimate differentiator in the RWA space. It separates novelty from true institutional-grade assets."
      ]
    },
    {
      id: "proj-2",
      title: "Orbita Investments Capital Raise & Commercial Engine",
      company: "Orbita Investments",
      description: "Established the commercial framework and go-to-market playbook while spearheading institutional negotiations to raise $36.5M in startup capital.",
      tags: ["Fundraising", "M&A", "Investment Acquisition", "Revenue Operations"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      logoUrl: "/orbita-logo.png",
      liveUrl: "https://orbita.investments",
      caseStudy: [
        "Challenge: Rapidly establish a scalable commercial operation capable of driving enterprise engagement to mount and support a $36.5M institutional capital raise.",
        "Action: Constructed the commercial department from the ground up in 2 months. Deployed targeted operational frameworks, KPI dashboards, automated lead qualification, structured deal-desks, and enterprise playbooks.",
        "Result: Reduced average sales cycle by 40% and onboarded 50+ strategic partners. Achieved 125% of Q1 revenue targets against a $5M baseline quota, successfully driving the $36.5M funding negotiations."
      ]
    },
    {
      id: "proj-3",
      title: "Global Real Estate Expansion",
      company: "The World Real Estate",
      description: "Overhauled sales operations, shifting strategy to direct developers, leading to an expansion across 8 global regions in a single quarter.",
      tags: ["Global Expansion", "HNI Clients", "Sales Strategy"],
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      logoUrl: "https://ui-avatars.com/api/?name=The+World&background=0F172A&color=fff&rounded=true&bold=true",
      liveUrl: "https://emirates.estate",
      caseStudy: [
        "Challenge: Pivot the organization's heavy reliance on external agencies to a high-margin, direct-to-developer sales model while simultaneously expanding international operations.",
        "Action: Overhauled the global sales operation and deployed targeted account strategies for High-Net-Worth Individuals (HNWIs). Built and trained a rigorous internal sales unit operating on a strictly lean budget.",
        "Result: Executed expansion across 8 global regions (UAE, Asia, Europe, USA) in a single quarter. Drove 10x revenue growth within 2 months, increasing MRR from 0.6% to 10%, achieving 49% net profit, and personally closing a $1.5M cornerstone deal."
      ]
    },
    {
      id: "proj-4",
      title: "European IT Channel Expansion",
      company: "GROWmatica",
      description: "Established a robust network of channel partners across Europe, driving a significant increase in indirect sales revenue.",
      tags: ["Channel Sales", "European Market", "IT Solutions", "Partnerships"],
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      logoUrl: "https://ui-avatars.com/api/?name=GROWmatica&background=059669&color=fff&rounded=true&bold=true",
      caseStudy: [
        "Challenge: Penetrate new industry verticals and rapidly expand indirect partnership sales channels across the highly competitive European IT market.",
        "Action: Conducted intensive geographical market analysis to identify high-potential verticals. Architected and executed a structured channel partner recruitment sequence targeting major regional players.",
        "Result: Established a robust network of strategic partners, driving a 60% increase in indirect sales revenue and capturing significant market share in the Nordics & DACH regions."
      ]
    },
    {
      id: "proj-5",
      title: "Financial Data Sales Optimization",
      company: "Cbonds",
      description: "Drove 20% overall growth and 15% recurring revenue increase by selling complex financial data subscriptions to institutional clients.",
      tags: ["Financial Data", "Institutional Sales", "Fixed Income", "Client Acquisition"],
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
      logoUrl: "https://ui-avatars.com/api/?name=Cbonds&background=DC2626&color=fff&rounded=true&bold=true",
      caseStudy: [
        "Challenge: Drive enterprise subscription sales of complex financial data and analytics platforms into a highly sophisticated global institutional audience.",
        "Action: Deployed AI and low-code integrations to aggressively streamline internal deal flow and prospecting. Structured a comprehensive Sales Enablement and Partner Program tracked entirely via Notion/Trello frameworks.",
        "Result: Accelerated tech integration time by 40%. Drove 20% overall growth and a 15% recurring revenue increase, maintaining a position in the top 10% of global sales representatives."
      ]
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Sarah Jenkins",
      title: "CEO",
      company: "FinTech Innovators",
      quote: "Ali is a rare breed of commercial leader. He doesn't just sell; he architects revenue engines. His strategic vision was instrumental in our Series A raise.",
      imageUrl: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: "test-2",
      name: "David Chen",
      title: "Managing Partner",
      company: "Global Ventures",
      quote: "Working with Ali on the Orbita capital raise was a masterclass in institutional negotiation. He understands complex financial structures and how to communicate value effectively.",
      imageUrl: "https://i.pravatar.cc/150?u=david"
    },
    {
      id: "test-3",
      name: "Elena Rostova",
      title: "VP of Operations",
      company: "The World Real Estate",
      quote: "Ali's ability to scale our operations from 1 to 8 global regions in a single quarter was nothing short of phenomenal. He builds high-performing teams that deliver results.",
      imageUrl: "https://i.pravatar.cc/150?u=elena"
    }
  ],
  services: [
    {
      id: "srv-1",
      title: "Revenue Architecture & GTM",
      description: "Partnering with founders to architect scalable revenue engines, from initial Go-To-Market strategy to global expansion.",
      iconName: "trending-up",
      deliverables: ["GTM Strategy Formulation", "Sales Team Hiring & Coaching", "Cross-border Expansion", "Pricing & Packaging"]
    },
    {
      id: "srv-2",
      title: "Capital Raising & M&A",
      description: "Strategic advisory for institutional fundraising, M&A negotiations, and securing strategic partnerships.",
      iconName: "briefcase",
      deliverables: ["Pitch Deck Optimization", "Institutional Investor Outreach", "Term Sheet Negotiation", "Strategic Partner Matching"]
    },
    {
      id: "srv-3",
      title: "AI Sales Automation",
      description: "Implementing cutting-edge AI tools and predictive analytics to automate outreach, qualify leads, and reduce sales cycles.",
      iconName: "bot",
      deliverables: ["CRM AI Integration", "AI-powered Prospecting & Outreach Personalization", "Automated Follow-up & Nurturing Sequences", "Predictive Lead Scoring"]
    }
  ]
};

export const INITIAL_CHAT_MESSAGE = "Hi! I'm Ali's AI assistant. You can ask me anything about his experience, skills, or projects.";
