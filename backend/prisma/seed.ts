import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin User ─────────────────────────────────────────
  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "rahul@admin.com" },
    update: {},
    create: {
      email: "rahul@admin.com",
      passwordHash,
      name: "Rahul Prasad Das",
      role: "admin",
    },
  });
  console.log("✅ Admin user created");

  // ─── Technologies ──────────────────────────────────────
  const techData = [
    { name: "Python", icon: "python" },
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Node.js", icon: "nodejs" },
    { name: "Express", icon: "express" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "FastAPI", icon: "fastapi" },
    { name: "Machine Learning", icon: "brain" },
    { name: "Deep Learning", icon: "neural" },
    { name: "NLP", icon: "message" },
    { name: "RAG", icon: "search" },
    { name: "LLM", icon: "bot" },
    { name: "Pandas", icon: "pandas" },
    { name: "NumPy", icon: "numpy" },
    { name: "Scikit-learn", icon: "sklearn" },
    { name: "TensorFlow", icon: "tensorflow" },
    { name: "Power BI", icon: "powerbi" },
    { name: "SQL", icon: "database" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Docker", icon: "docker" },
    { name: "Git", icon: "git" },
    { name: "Streamlit", icon: "streamlit" },
    { name: "Flask", icon: "flask" },
    { name: "HTML/CSS", icon: "html" },
    { name: "Prisma", icon: "prisma" },
    { name: "MongoDB", icon: "mongodb" },
  ];

  const technologies: Record<string, { id: string }> = {};
  for (const tech of techData) {
    const t = await prisma.technology.upsert({
      where: { name: tech.name },
      update: {},
      create: tech,
    });
    technologies[tech.name] = t;
  }
  console.log("✅ Technologies created");

  // ─── Projects ───────────────────────────────────────────
  const projectsData = [
    {
      title: "Arogya Sahayak",
      slug: "arogya-sahayak",
      shortDescription: "AI-powered multilingual healthcare assistant using RAG and LLM for accessible medical guidance.",
      content: `# Arogya Sahayak\n\nAn intelligent healthcare assistant that provides reliable medical information in multiple Indian languages.\n\n## How It Works\n\nThe system uses a RAG (Retrieval-Augmented Generation) pipeline to ground responses in verified medical knowledge, ensuring accuracy and safety.`,
      category: "AI/ML",
      status: "in-development",
      githubUrl: "https://github.com/rahul/arogya-sahayak",
      liveUrl: null,
      featured: true,
      order: 1,
      problemStatement: "Healthcare information is often inaccessible to non-English speakers in India. Misinformation can lead to serious health consequences.",
      solution: "Built an AI-powered assistant using RAG pipeline with verified medical knowledge base, supporting multiple Indian languages with safety guardrails.",
      results: "Achieved 92% accuracy in medical query responses across 5 Indian languages with built-in safety layer for critical health situations.",
      challenges: "Building a reliable safety layer to detect emergency situations, handling medical terminology across languages, ensuring response accuracy.",
      learnings: "Deep understanding of RAG pipelines, vector databases, prompt engineering for safety-critical applications, multilingual NLP.",
      techs: ["Python", "FastAPI", "Machine Learning", "RAG", "LLM", "PostgreSQL"],
    },
    {
      title: "CAMPUSLINK",
      slug: "campuslink",
      shortDescription: "Full-stack campus networking platform connecting students, clubs, and events with real-time features.",
      content: `# CAMPUSLINK\n\nA comprehensive campus networking platform designed to bridge the gap between students, clubs, and campus events.`,
      category: "Web",
      status: "completed",
      githubUrl: "https://github.com/rahul/campuslink",
      liveUrl: "https://campuslink.vercel.app",
      featured: true,
      order: 2,
      problemStatement: "Students often miss important campus events and have difficulty connecting with relevant clubs and peers.",
      solution: "Built a full-stack platform with real-time notifications, event management, club discovery, and student networking features.",
      results: "200+ active users in the first semester, 50+ events organized through the platform.",
      challenges: "Real-time notification system, scalable architecture for growing user base, intuitive UI for diverse user groups.",
      learnings: "Full-stack architecture, real-time systems, database design for social platforms, user experience design.",
      techs: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    },
    {
      title: "Credit Card Fraud Detection",
      slug: "fraud-detection",
      shortDescription: "ML-based fraud detection system achieving 99.2% accuracy using ensemble learning on imbalanced datasets.",
      content: `# Credit Card Fraud Detection\n\nA machine learning system that detects fraudulent credit card transactions in real-time using ensemble methods.`,
      category: "AI/ML",
      status: "completed",
      githubUrl: "https://github.com/rahul/fraud-detection",
      featured: true,
      order: 3,
      problemStatement: "Credit card fraud causes billions in losses annually. Traditional rule-based systems miss sophisticated fraud patterns.",
      solution: "Developed an ensemble ML model combining Random Forest, XGBoost, and neural networks with SMOTE for handling class imbalance.",
      results: "99.2% accuracy, 96.8% recall on fraud cases, processing 1000+ transactions per second.",
      challenges: "Extreme class imbalance (0.17% fraud rate), feature engineering for transaction patterns, minimizing false positives.",
      learnings: "Handling imbalanced datasets, ensemble methods, feature engineering, model evaluation metrics for skewed classes.",
      techs: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    },
    {
      title: "Movie Recommendation System",
      slug: "recommendation-system",
      shortDescription: "Content-based and collaborative filtering recommendation engine with 85% user satisfaction rate.",
      content: `# Movie Recommendation System\n\nAn intelligent recommendation engine combining content-based filtering and collaborative filtering approaches.`,
      category: "AI/ML",
      status: "completed",
      githubUrl: "https://github.com/rahul/movie-recommender",
      liveUrl: "https://movie-rec.streamlit.app",
      featured: false,
      order: 4,
      problemStatement: "Users struggle to find movies matching their preferences among thousands of options.",
      solution: "Built a hybrid recommendation system combining content-based filtering (TF-IDF + cosine similarity) with collaborative filtering.",
      results: "85% user satisfaction rate, sub-second recommendation generation for 10,000+ movies.",
      challenges: "Cold start problem, sparse user-item matrices, balancing novelty vs relevance in recommendations.",
      learnings: "Recommendation algorithms, NLP for content analysis, matrix factorization, evaluation metrics for recommender systems.",
      techs: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit"],
    },
    {
      title: "Sales Analytics Dashboard",
      slug: "sales-analytics",
      shortDescription: "Interactive Power BI dashboard analyzing $2M+ in sales data with predictive insights and trend analysis.",
      content: `# Sales Analytics Dashboard\n\nA comprehensive analytics dashboard providing actionable business insights from sales data.`,
      category: "Data",
      status: "completed",
      githubUrl: "https://github.com/rahul/sales-analytics",
      featured: false,
      order: 5,
      problemStatement: "Business stakeholders needed real-time visibility into sales performance across regions, products, and time periods.",
      solution: "Designed an interactive Power BI dashboard with drill-down capabilities, trend analysis, and predictive forecasting.",
      results: "Reduced reporting time by 80%, identified 3 key revenue growth opportunities worth $200K+.",
      challenges: "Data cleaning from multiple sources, creating intuitive visualizations for non-technical stakeholders, real-time data refresh.",
      learnings: "Data visualization best practices, DAX formulas, data modeling, stakeholder communication.",
      techs: ["Power BI", "SQL", "Python", "Pandas"],
    },
    {
      title: "Customer Churn Prediction",
      slug: "churn-prediction",
      shortDescription: "Predictive model identifying at-risk customers with 91% accuracy using gradient boosting and feature engineering.",
      content: `# Customer Churn Prediction\n\nA machine learning model that predicts customer churn for a telecom company.`,
      category: "Data",
      status: "completed",
      githubUrl: "https://github.com/rahul/churn-prediction",
      featured: false,
      order: 6,
      problemStatement: "Telecom company losing 15% customers annually with no early warning system for at-risk customers.",
      solution: "Built a gradient boosting model with engineered features from usage patterns, billing data, and customer interactions.",
      results: "91% prediction accuracy, identified top 5 churn drivers, reduced churn by 12% in pilot program.",
      challenges: "Feature engineering from raw telecom data, model interpretability for business stakeholders, deployment pipeline.",
      learnings: "Gradient boosting, SHAP values for interpretability, feature importance analysis, production ML pipelines.",
      techs: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    },
    {
      title: "AI Study Planner",
      slug: "ai-study-planner",
      shortDescription: "Intelligent study schedule generator using AI to optimize learning based on difficulty and deadlines.",
      content: `# AI Study Planner\n\nAn AI-powered study planning tool that creates optimized study schedules based on subject difficulty, deadlines, and learning patterns.`,
      category: "AI/ML",
      status: "completed",
      githubUrl: "https://github.com/rahul/ai-study-planner",
      liveUrl: "https://studyplanner.streamlit.app",
      featured: false,
      order: 7,
      problemStatement: "Students struggle to create effective study schedules that account for subject difficulty and optimal learning times.",
      solution: "Built an AI planner that considers subject difficulty, deadlines, available hours, and spaced repetition principles.",
      results: "Used by 50+ students, average grade improvement of 15% reported by beta testers.",
      challenges: "Modeling subject difficulty, implementing spaced repetition algorithms, creating intuitive schedule visualization.",
      learnings: "Optimization algorithms, spaced repetition science, UX for productivity tools.",
      techs: ["Python", "Streamlit", "Machine Learning"],
    },
    {
      title: "Portfolio Website",
      slug: "portfolio-website",
      shortDescription: "This very portfolio — a full-stack application with CMS, analytics, and REST API.",
      content: `# Portfolio Website\n\nA full-stack portfolio platform with admin CMS, analytics dashboard, and REST API built with Next.js and Express.`,
      category: "Web",
      status: "in-development",
      githubUrl: "https://github.com/rahul/portfolio",
      featured: false,
      order: 8,
      problemStatement: "Needed a portfolio that goes beyond static pages — one that demonstrates full-stack capabilities with a CMS.",
      solution: "Built a complete platform with Next.js frontend, Express API, Prisma ORM, authentication, and admin dashboard.",
      results: "Full-stack application demonstrating architecture, API design, database modeling, and modern frontend development.",
      challenges: "Designing a scalable CMS architecture, implementing secure authentication, creating smooth animations.",
      learnings: "Full-stack architecture, REST API design, database schema design, JWT authentication, modern CSS animations.",
      techs: ["Next.js", "TypeScript", "Express", "Prisma", "Tailwind CSS", "PostgreSQL"],
    },
  ];

  for (const proj of projectsData) {
    const { techs, ...projectData } = proj;
    const project = await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {},
      create: projectData,
    });

    for (const techName of techs) {
      if (technologies[techName]) {
        await prisma.projectTechnology.upsert({
          where: {
            projectId_technologyId: {
              projectId: project.id,
              technologyId: technologies[techName].id,
            },
          },
          update: {},
          create: {
            projectId: project.id,
            technologyId: technologies[techName].id,
          },
        });
      }
    }
  }
  console.log("✅ Projects created");

  // ─── Skills ─────────────────────────────────────────────
  const skillsData = [
    // AI/ML
    { name: "Machine Learning", category: "AI/ML", level: "proficient", order: 1 },
    { name: "Deep Learning", category: "AI/ML", level: "practicing", order: 2 },
    { name: "Natural Language Processing", category: "AI/ML", level: "practicing", order: 3 },
    { name: "Computer Vision", category: "AI/ML", level: "learning", order: 4 },
    { name: "Generative AI", category: "AI/ML", level: "practicing", order: 5 },
    { name: "RAG Pipelines", category: "AI/ML", level: "practicing", order: 6 },
    { name: "Model Evaluation", category: "AI/ML", level: "proficient", order: 7 },
    // Data
    { name: "Python", category: "Data", level: "proficient", order: 1 },
    { name: "SQL", category: "Data", level: "proficient", order: 2 },
    { name: "Pandas", category: "Data", level: "proficient", order: 3 },
    { name: "NumPy", category: "Data", level: "proficient", order: 4 },
    { name: "Data Visualization", category: "Data", level: "proficient", order: 5 },
    { name: "Power BI", category: "Data", level: "practicing", order: 6 },
    { name: "Statistical Analysis", category: "Data", level: "practicing", order: 7 },
    // Development
    { name: "React", category: "Development", level: "proficient", order: 1 },
    { name: "Next.js", category: "Development", level: "practicing", order: 2 },
    { name: "Node.js", category: "Development", level: "practicing", order: 3 },
    { name: "Express.js", category: "Development", level: "practicing", order: 4 },
    { name: "TypeScript", category: "Development", level: "practicing", order: 5 },
    { name: "HTML/CSS", category: "Development", level: "proficient", order: 6 },
    { name: "Tailwind CSS", category: "Development", level: "proficient", order: 7 },
    // Tools
    { name: "Git & GitHub", category: "Tools", level: "proficient", order: 1 },
    { name: "VS Code", category: "Tools", level: "proficient", order: 2 },
    { name: "Jupyter Notebook", category: "Tools", level: "proficient", order: 3 },
    { name: "Docker", category: "Tools", level: "learning", order: 4 },
    { name: "Linux", category: "Tools", level: "practicing", order: 5 },
    { name: "Postman", category: "Tools", level: "practicing", order: 6 },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }
  console.log("✅ Skills created");

  // ─── Education ──────────────────────────────────────────
  await prisma.education.create({
    data: {
      degree: "Bachelor of Technology (B.Tech) in Computer Science",
      institution: "Your University Name",
      location: "India",
      startYear: "2023",
      endYear: "2027",
      description: "Focusing on AI/ML, Data Science, and Software Engineering. Active member of coding clubs and hackathon teams.",
      grade: "8.5 CGPA",
      current: true,
      order: 1,
    },
  });

  await prisma.education.create({
    data: {
      degree: "Higher Secondary (12th)",
      institution: "Your School Name",
      location: "India",
      startYear: "2021",
      endYear: "2023",
      description: "Science stream with Computer Science. Built foundation in programming and mathematics.",
      grade: "92%",
      current: false,
      order: 2,
    },
  });
  console.log("✅ Education created");

  // ─── Achievements ──────────────────────────────────────
  const achievementsData = [
    {
      title: "Smart India Hackathon Finalist",
      organization: "Ministry of Education, India",
      date: "2025",
      description: "Selected among top teams nationally for building an AI-powered healthcare solution.",
      category: "hackathon",
      order: 1,
    },
    {
      title: "Best AI Project Award",
      organization: "University Tech Fest",
      date: "2025",
      description: "Won first place for Arogya Sahayak at the annual university technology festival.",
      category: "competition",
      order: 2,
    },
    {
      title: "Machine Learning Specialization",
      organization: "Coursera — Andrew Ng",
      date: "2024",
      description: "Completed the comprehensive ML specialization covering supervised, unsupervised, and reinforcement learning.",
      category: "certification",
      order: 3,
    },
    {
      title: "Deep Learning Specialization",
      organization: "Coursera — deeplearning.ai",
      date: "2025",
      description: "Completed 5-course specialization covering neural networks, CNNs, RNNs, and sequence models.",
      category: "certification",
      order: 4,
    },
    {
      title: "Google Data Analytics Certificate",
      organization: "Google",
      date: "2024",
      description: "Professional certificate in data analytics covering data cleaning, analysis, and visualization.",
      category: "certification",
      order: 5,
    },
    {
      title: "HackOverflow 2025 — Winner",
      organization: "HackOverflow",
      date: "2025",
      description: "Built a real-time campus networking solution in 36 hours, winning among 100+ teams.",
      category: "hackathon",
      order: 6,
    },
    {
      title: "5-Star Python on HackerRank",
      organization: "HackerRank",
      date: "2024",
      description: "Achieved 5-star rating in Python programming, solving 200+ problems.",
      category: "academic",
      order: 7,
    },
  ];

  for (const achievement of achievementsData) {
    await prisma.achievement.create({ data: achievement });
  }
  console.log("✅ Achievements created");

  // ─── Timeline / Journey ─────────────────────────────────
  const timelineData = [
    { year: "2023", month: "Aug", title: "Started B.Tech in Computer Science", description: "Began my journey in Computer Science, diving into programming fundamentals.", category: "education", order: 1 },
    { year: "2023", month: "Oct", title: "First Line of Python", description: "Wrote my first Python program and fell in love with programming.", category: "skill", order: 2 },
    { year: "2024", month: "Jan", title: "Web Development Journey", description: "Started learning HTML, CSS, JavaScript, and React. Built my first web projects.", category: "skill", order: 3 },
    { year: "2024", month: "Mar", title: "Data Structures & Algorithms", description: "Deep dive into DSA with Python. Started competitive programming.", category: "skill", order: 4 },
    { year: "2024", month: "Jun", title: "Machine Learning Specialization", description: "Completed Andrew Ng's ML course. Built first classification and regression models.", category: "achievement", order: 5 },
    { year: "2024", month: "Aug", title: "Google Data Analytics Certificate", description: "Completed Google's professional certificate in data analytics.", category: "achievement", order: 6 },
    { year: "2024", month: "Oct", title: "First ML Project — Fraud Detection", description: "Built credit card fraud detection system achieving 99.2% accuracy.", category: "project", order: 7 },
    { year: "2025", month: "Jan", title: "Deep Learning & NLP", description: "Started exploring neural networks, CNNs, RNNs, and natural language processing.", category: "skill", order: 8 },
    { year: "2025", month: "Mar", title: "CAMPUSLINK Launch", description: "Built and launched a full-stack campus networking platform.", category: "project", order: 9 },
    { year: "2025", month: "May", title: "Smart India Hackathon", description: "Selected as finalist with AI healthcare solution.", category: "achievement", order: 10 },
    { year: "2025", month: "Jul", title: "GenAI & LLMs", description: "Started exploring Generative AI, LLMs, and RAG pipelines.", category: "skill", order: 11 },
    { year: "2025", month: "Sep", title: "Arogya Sahayak Development", description: "Started building AI-powered multilingual healthcare assistant.", category: "project", order: 12 },
    { year: "2026", month: "Jan", title: "Advanced AI/ML", description: "Deep dive into transformer architectures, fine-tuning, and agentic AI.", category: "skill", order: 13 },
    { year: "2026", month: "Jun", title: "Building in Public", description: "Started documenting my learning journey and building projects publicly.", category: "milestone", order: 14 },
    { year: "2026", month: "Oct", title: "Portfolio Redesign", description: "Building this full-stack portfolio as a demonstration of skills.", category: "project", order: 15 },
  ];

  for (const event of timelineData) {
    await prisma.timelineEvent.create({ data: event });
  }
  console.log("✅ Timeline events created");

  // ─── Build Log ──────────────────────────────────────────
  const buildLogsData = [
    {
      date: new Date("2026-10-04"),
      title: "Portfolio Redesign — Day 1",
      content: `## Started redesigning my portfolio\n\nToday:\n- ✅ Database schema design\n- ✅ Authentication architecture\n- ✅ Project CMS structure\n- ✅ Full-stack setup (Next.js + Express)\n\nNext:\n- → Backend API routes\n- → Admin dashboard\n- → Frontend components`,
      tags: "portfolio,architecture,database",
      published: true,
    },
    {
      date: new Date("2026-09-28"),
      title: "Arogya Sahayak — RAG Pipeline",
      content: `## Worked on Arogya Sahayak\n\nLearned:\n- RAG pipeline architecture\n- Vector search with embeddings\n- Prompt grounding techniques\n- Safety layer implementation\n\nChallenges:\n- Handling medical terminology in multiple languages\n- Ensuring response accuracy with retrieval`,
      tags: "arogya-sahayak,rag,ai,nlp",
      published: true,
    },
    {
      date: new Date("2026-09-20"),
      title: "Deep Learning — Transformers",
      content: `## Studying Transformer Architecture\n\nTopics covered:\n- Self-attention mechanism\n- Multi-head attention\n- Positional encoding\n- Encoder-decoder architecture\n\nResources:\n- "Attention is All You Need" paper\n- Andrej Karpathy's videos`,
      tags: "deep-learning,transformers,study",
      published: true,
    },
  ];

  for (const log of buildLogsData) {
    await prisma.buildLog.create({ data: log });
  }
  console.log("✅ Build logs created");

  // ─── Social Links ───────────────────────────────────────
  const socialLinks = [
    { platform: "github", url: "https://github.com/rahul", icon: "Github", order: 1 },
    { platform: "linkedin", url: "https://linkedin.com/in/rahul", icon: "Linkedin", order: 2 },
    { platform: "twitter", url: "https://twitter.com/rahul", icon: "Twitter", order: 3 },
    { platform: "email", url: "mailto:rahul@example.com", icon: "Mail", order: 4 },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.create({ data: link });
  }
  console.log("✅ Social links created");

  // ─── Site Settings ──────────────────────────────────────
  const settings = [
    { key: "site_title", value: "Rahul Prasad Das" },
    { key: "site_tagline", value: "AI/ML Builder & Problem Solver" },
    { key: "site_description", value: "Building intelligent systems and turning ideas into products." },
    { key: "hero_title", value: "BUILDING WITH AI.\nLEARNING IN PUBLIC." },
    { key: "hero_subtitle", value: "AI/ML • Data • Full Stack" },
    { key: "currently_building_title", value: "Arogya Sahayak" },
    { key: "currently_building_description", value: "AI-powered multilingual healthcare assistant" },
    { key: "currently_learning", value: "Deep Learning → LLM → Agentic AI" },
    { key: "currently_preparing", value: "AI/ML + Software Engineering" },
    { key: "current_goal", value: "AI/ML / Data Science Internship" },
    { key: "resume_url", value: "/resume.pdf" },
    { key: "about_text", value: "I'm Rahul Prasad Das, a B.Tech Computer Science student passionate about AI/ML, Data Science, and building products that solve real problems. I believe in learning by building and sharing my journey publicly.\n\nMy focus areas include Machine Learning, Deep Learning, Natural Language Processing, and Full-Stack Development. I love taking complex problems and turning them into elegant, working solutions.\n\nWhen I'm not coding, you'll find me reading about the latest AI research, contributing to open source, or mentoring fellow students." },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("✅ Site settings created");

  // ─── Sample Messages ────────────────────────────────────
  const messages = [
    {
      name: "John Doe",
      email: "john@example.com",
      subject: "Collaboration Opportunity",
      message: "Hi Rahul, I loved your Arogya Sahayak project. Would love to discuss a potential collaboration on healthcare AI. Let me know if you're interested!",
      status: "unread",
    },
    {
      name: "Priya Sharma",
      email: "priya@startup.com",
      subject: "Internship Opportunity",
      message: "We're looking for AI/ML interns and your portfolio really stands out. Would you be open to discussing an internship position at our startup?",
      status: "unread",
    },
    {
      name: "Tech Club",
      email: "techclub@university.edu",
      subject: "Guest Speaker Invitation",
      message: "We'd love to have you as a guest speaker at our upcoming ML workshop. Your projects would be great examples for students.",
      status: "read",
    },
  ];

  for (const msg of messages) {
    await prisma.message.create({ data: msg });
  }
  console.log("✅ Sample messages created");

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
