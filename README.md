# 🚀 Architecting Global Revenue

This repository contains the interactive portfolio of **Ali Shahad**, a Chief Revenue Officer and Global Commercial Executive specializing in 10x revenue growth, institutional capital raising, M&A, and market expansion.

## 🌟 Live Preview
[Visit the live portfolio built with React & Vite](https://alishahad.github.io/)

![Portfolio Preview Interface](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200)

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Charts / Visualizations:** Recharts
- **AI Agent Integration:** `@google/genai` (Interactive chat widget)
- **Icons:** Lucide React

## 💡 Key Features
- **Interactive Founder & Sales Tools**: Embedded calculators that model SaaS ARR, LTV:CAC, Pipeline Velocity, Revenue Projections (with full funnel charts), and AI Sales Automation impact.
- **Deep-Dive Portfolio Cases**: Problem -> Action -> Result modal dialogs detailing institutional capital raises, Web3/RWA architectures, and global expansions.
- **AI-Powered "Talk to Ali" Widget**: An ambient LLM assistant loaded with Ali's resume, ready to answer questions about his operational capabilities and executive impact on demand.
- **Responsive Executive Design**: Engineered with a minimalist, high-contrast, modern "fintech" aesthetic utilizing Inter and JetBrains Mono.

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/alishahad/interactive-portfolio.git

# Install dependencies
npm install

# Setup environment variables (add your Gemini key or others)
cp .env.example .env

# Start the dev server
npm run dev
```

## 📈 Vercel Deployment Instructions
To publish this portfolio dynamically and automatically:

1. Create a free account at [Vercel](https://vercel.com).
2. Connect your GitHub account to Vercel.
3. Click **Add New Project** and select this repository from your GitHub list.
4. Vercel will automatically detect that it's a Vite application.
5. In the **Environment Variables** section before deploying, you can inject API keys (e.g., `GEMINI_API_KEY`) if needed for backend functions.
6. Click **Deploy**. Vercel will build and publish your project. 
7. *Magic*: Every time you push changes to your GitHub `main` branch, Vercel will automatically rebuild and update the live site under 2 minutes.

---
*Built for scale. Structured for revenue.*
