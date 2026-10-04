import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with authentic projects from PROJECTS_CATALOG.md...");

  // ─── 0. Cleanup Old Data (Pristine Sync) ─────────────────
  await prisma.projectView.deleteMany();
  await prisma.projectTechnology.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.buildLog.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.message.deleteMany();
  console.log("🧹 Previous records cleaned up");

  // ─── 1. Admin User ──────────────────────────────────────
  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "rahul@admin.com" },
    update: { passwordHash },
    create: {
      email: "rahul@admin.com",
      passwordHash,
      name: "Rahul Prasad Das",
      role: "admin",
    },
  });
  console.log("✅ Admin user created (rahul@admin.com / admin123)");

  // ─── 2. Technologies ────────────────────────────────────
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
    { name: "Supabase", icon: "supabase" },
    { name: "Three.js", icon: "box" },
    { name: "WebGL", icon: "box" },
    { name: "Radix UI", icon: "layout" },
    { name: "Computer Vision", icon: "eye" },
  ];

  const technologies: Record<string, { id: string }> = {};
  for (const tech of techData) {
    const t = await prisma.technology.create({
      data: tech,
    });
    technologies[tech.name] = t;
  }
  console.log(`✅ ${Object.keys(technologies).length} Technologies created`);

  // ─── 3. Authentic Projects (from PROJECTS_CATALOG.md) ───
  const projectsData = [
    {
      title: "ABIT EventHub",
      slug: "abit-eventhub",
      shortDescription: "Official Event Management & In-Browser QR Ticketing Platform for AJAY BINAY INSTITUTE OF TECHNOLOGY, Cuttack.",
      category: "Web",
      status: "completed",
      githubUrl: "https://github.com/dasrahulprasad05-dev/ABIT_ANUAL_FUNCTION",
      liveUrl: "https://abit-anual-function.vercel.app/",
      featured: true,
      order: 1,
      problemStatement: "College cultural and technical fests suffer from chaotic manual registrations, long physical entry queues, forged ticket passes, and unverified student attendance. Organizers lack real-time visibility into hall capacity and entry validation.",
      solution: "Built a high-throughput event management platform enabling students to explore 20+ fest events, register with automatic capacity checks, receive cryptographically secure QR ticket passes via email, and allow fest coordinators to scan and check-in attendees via in-browser camera scanners in under 2 seconds.",
      results: "Streamlined 20+ college fest events, reduced entry queue wait times from 15 minutes to under 2 seconds per scan, and eliminated duplicate or forged passes.",
      challenges: "Scanning QR codes in poor lighting or high-glare environments at fest venue doors, and handling sudden traffic spikes during popular event registrations.",
      learnings: "Camera-based barcode/QR scanning pipelines with HTML5 MediaStream, Next.js Server Actions with PostgreSQL connection pooling, transactional ticket generation, and high-concurrency event registration controls.",
      content: `## 📌 ABIT EventHub Overview

Official high-throughput Event Management & In-Browser QR Ticketing Platform engineered specifically for the annual cultural and technical festival at **Ajay Binay Institute of Technology (ABIT), Cuttack**.

### ⚡ Key Features
- **Instant Digital Passes**: Generates a dynamic, tamper-evident QR code ticket for each verified student registration.
- **In-Browser Camera QR Scanner**: Built-in \`html5-qrcode\` camera integration allowing coordinators to authenticate tickets live on mobile or laptop browsers without any external scanner hardware.
- **Automated Email Pass Delivery**: Dispatches email tickets with event schedules and QR passes via Nodemailer.
- **Role-Based Access**: Coordinator dashboard for entry validation, capacity monitoring, and live attendance metrics vs. student registration views.
- **Event Capacity Controls**: Automatically marks events as full when seating quotas are reached to prevent overbooking.

### 🏛️ Architecture & Data Flow
\`\`\`
Student Registration ──► Server Action ──► PostgreSQL (Prisma) ──► Cryptographic QR Ticket
                                                                     │
Coordinator Camera Scan ◄── /scan route ◄── Verification Engine ◄────┘
\`\`\`

### 🚀 Production Deployment
- **Live Vercel Site**: [https://abit-anual-function.vercel.app/](https://abit-anual-function.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/ABIT_ANUAL_FUNCTION](https://github.com/dasrahulprasad05-dev/ABIT_ANUAL_FUNCTION)`,
      techs: ["Next.js", "React", "PostgreSQL", "Prisma", "Tailwind CSS", "TypeScript", "Node.js"],
    },
    {
      title: "Swasthya Sathi AI",
      slug: "swasthya-sathi-ai",
      shortDescription: "Multilingual Public Health Assistant for Odisha & India delivering voice-enabled healthcare guidance in regional languages.",
      category: "AI/ML",
      status: "live",
      githubUrl: "https://github.com/dasrahulprasad05-dev/SWASTHYA_SATHI_AI",
      liveUrl: "https://swasthya-sathi-ai-five.vercel.app/",
      featured: true,
      order: 2,
      problemStatement: "Over 70% of rural and semi-urban populations in Odisha struggle with English-only digital healthcare tools, complex medical jargon, and rampant health misinformation. Critical health schemes (BSKY, Ayushman Bharat) are often underutilized due to lack of awareness.",
      solution: "Built an accessible, voice-first public healthcare assistant that understands and speaks Odia, Hindi, and English. It uses Retrieval-Augmented Generation (RAG) grounded in verified clinical guidance to perform symptom triage, explain health schemes, and connect patients to nearby hospitals.",
      results: "Empowers Odia and rural citizens with instant, verified health guidance, voice-first navigation, and direct access to 108/102 emergency ambulance dispatch.",
      challenges: "Accurately understanding Odia medical terminology and colloquial expressions, preventing clinical hallucinations, and ensuring strict emergency safety guardrails.",
      learnings: "Multilingual NLP and phonetic normalization for Odia lexicons, RAG architecture with vector databases, prompt engineering for safety-critical medical triage, and Web Speech API integration.",
      content: `## 📌 Swasthya Sathi AI Overview

A voice-first, multilingual public health companion designed to bridge medical accessibility barriers in Odisha and across India.

### ⚡ Key Features
- **Native Odia & Multilingual Support**: Communicates natively in Odia (ଓଡ଼ିଆ), Hindi, and English.
- **Voice-First Accessibility**: Speech-to-text and text-to-speech for elderly and non-literate citizens.
- **Clinical Urgency Triage**: Classifies conditions into Mild, Moderate, or Critical (Red Alert) with immediate emergency hotline routing.
- **Government Scheme Guide**: Step-by-step eligibility verification for Biju Swasthya Kalyan Yojana (BSKY) and Ayushman Bharat.
- **Hospital & Ambulance Locator**: Direct click-to-call for 108/102 emergency ambulance services in Odisha.

### 🧠 Retrieval-Augmented Generation (RAG) Pipeline
\`\`\`
User Query (Voice/Text) ──► Odia/Hindi Phonetic Normalization ──► Vector Similarity Search
                                                                          │
Safe Clinical Guidance  ◄── Strict Medical Disclaimer  ◄── Groq / Gemini ◄┘
\`\`\`

### 🚀 Production Deployment
- **Live Vercel Site**: [https://swasthya-sathi-ai-five.vercel.app/](https://swasthya-sathi-ai-five.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/SWASTHYA_SATHI_AI](https://github.com/dasrahulprasad05-dev/SWASTHYA_SATHI_AI)`,
      techs: ["Next.js", "TypeScript", "RAG", "LLM", "NLP", "Tailwind CSS", "Machine Learning"],
    },
    {
      title: "Arogya Sahayak",
      slug: "arogya-sahayak",
      shortDescription: "Multimodal AI Healthcare Companion with 16 on-device diagnostic scanners, clinical triage, and doctor consultations.",
      category: "AI/ML",
      status: "completed",
      githubUrl: "https://github.com/dasrahulprasad05-dev/Arogya_sahayak",
      liveUrl: "https://arogya-sahayak-ten.vercel.app/",
      featured: true,
      order: 3,
      problemStatement: "Primary health centers in rural districts lack specialist doctors (dermatologists, ophthalmologists, cardiologists), forcing patients to travel hundreds of kilometers for basic screenings.",
      solution: "Built a multimodal health companion that runs client-side visual assessment scanners, guides users through structured clinical symptom checklists, generates downloadable medical summary PDFs, and connects patients with doctors.",
      results: "16 on-device AI diagnostic scanners, one-tap emergency SOS GPS beacon, and instant medical summary reports for clinical visits.",
      challenges: "Running computer vision models reliably on resource-constrained mobile browsers without server latency, and ensuring data privacy for patient scans.",
      learnings: "Client-side image processing, computer vision classification pipelines, PDF document generation, emergency SOS geolocation workflows, and accessible medical UX design.",
      content: `## 📌 Arogya Sahayak Overview

A comprehensive multimodal digital health companion providing accessible, preliminary diagnostic screenings and emergency coordination.

### ⚡ Key Features
- **16 Diagnostic AI Scanner Modules**: Visual screening modules for skin anomalies, nail symptoms, eye conditions, and posture.
- **Doctor Consultation Booking**: Integrated appointment scheduler with specialty matching.
- **Emergency SOS Dispatch**: One-tap emergency beacon that packages the user's GPS coordinates and emergency contacts into an alert.
- **Digital Health Locker**: Secure client-side storage for prescriptions, lab tests, and clinical histories.

### 🚀 Production Deployment
- **Live Vercel Site**: [https://arogya-sahayak-ten.vercel.app/](https://arogya-sahayak-ten.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/Arogya_sahayak](https://github.com/dasrahulprasad05-dev/Arogya_sahayak)`,
      techs: ["React", "TypeScript", "Tailwind CSS", "Machine Learning", "FastAPI", "Computer Vision", "Radix UI"],
    },
    {
      title: "Nexus Student Management",
      slug: "nexus-student-management",
      shortDescription: "Next-Gen Student Management & Academic ERP with AI tutors, QR attendance, and gamified progress.",
      category: "Web",
      status: "completed",
      githubUrl: "https://github.com/dasrahulprasad05-dev/nexus_student_management",
      liveUrl: "https://nexus-student-management.vercel.app/",
      featured: true,
      order: 4,
      problemStatement: "Legacy college student portals are clunky, mobile-unfriendly, and lack student engagement. Students miss deadlines, lose track of attendance percentages, and have no centralized academic companion.",
      solution: "Engineered a modern, gamified student management SaaS portal featuring XP progression, streak tracking, instant QR lecture attendance, grade calculation, and an integrated AI academic tutor.",
      results: "Increased student engagement with gamified study streaks and XP leaderboards, and automated lecture attendance via dynamic QR tokens.",
      challenges: "Preventing QR attendance spoofing and proxy attendance, and designing real-time GPA and semester analytics charts.",
      learnings: "Supabase authentication, Row Level Security (RLS), real-time query invalidation with TanStack Query, and gamification psychology in EdTech software.",
      content: `## 📌 Nexus Student Management Overview

A next-generation academic portal combining ERP functionality with gamified student engagement and an integrated 24/7 AI tutor.

### ⚡ Key Features
- **Gamified Academic Profiles**: Students earn XP, maintain daily study streaks, and unlock achievement badges.
- **Smart QR Attendance**: Generates rotating security tokens to ensure attendees are physically present during attendance checks.
- **AI Academic Tutor**: 24/7 subject assistant explaining complex engineering concepts.
- **GPA & Performance Analytics**: Interactive visual charts tracking semester-by-semester progress.
- **Assignment Tracker**: Countdown alerts for deadlines with submission verification.

### 🚀 Production Deployment
- **Live Vercel Site**: [https://nexus-student-management.vercel.app/](https://nexus-student-management.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/nexus_student_management](https://github.com/dasrahulprasad05-dev/nexus_student_management)`,
      techs: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase"],
    },
    {
      title: "CAMPUSLINK - Placement Intelligence",
      slug: "campuslink",
      shortDescription: "AI-powered campus-to-corporate placement intelligence, readiness scoring, and skill-gap analysis.",
      category: "Web",
      status: "completed",
      githubUrl: "https://github.com/dasrahulprasad05-dev/RAHUL_PROTFOLIO",
      liveUrl: "https://campus-link-rahul.vercel.app/",
      featured: true,
      order: 5,
      problemStatement: "Training and Placement Offices (TPOs) struggle with managing hundreds of student profiles, manually checking CGPA eligibility for recruiters, and identifying which skills students lack before placement season.",
      solution: "Created a tri-portal platform connecting Students, TPO Administrators, and Corporate Recruiters with automated recruitment drive filtering, resume screening, readiness index scores, and placement statistics.",
      results: "Automated candidate shortlisting for recruitment drives, reduced TPO administrative workload by 70%, and provided actionable skill-gap reports to students.",
      challenges: "Structuring role-based access controls across multiple distinct personas (Students, Faculty, TPO, Recruiters) while maintaining clean shared data models.",
      learnings: "Enterprise multi-role authorization, placement readiness scoring algorithms, high-volume tabular data exports, and recruitment analytics.",
      content: `## 📌 CAMPUSLINK Overview

Enterprise placement intelligence and campus recruitment management platform connecting academia with top corporate hiring teams.

### ⚡ Key Features
- **Placement Readiness Index (PRI)**: Algorithmic score ranking students based on coding skills, academic standing, and projects.
- **Automated Drive Eligibility Matcher**: Instantly notifies students when they meet criteria for incoming recruitment drives.
- **TPO Management Console**: Real-time exportable reports of eligible, placed, and unplaced candidates.
- **Four Connected Portals**: Role-based access for Students, Faculty, TPO, and Recruiters.

### 🚀 Production Deployment
- **Live Vercel Site**: [https://campus-link-rahul.vercel.app/](https://campus-link-rahul.vercel.app/)
- **Secondary Deployment**: [https://campus-flow-sand-five.vercel.app/](https://campus-flow-sand-five.vercel.app/)`,
      techs: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js", "PostgreSQL"],
    },
    {
      title: "NatureSip Premium",
      slug: "naturesip-premium",
      shortDescription: "Immersive 3D Animated Artisanal Beverage Showcase and High-Conversion E-Commerce Storefront.",
      category: "Web",
      status: "completed",
      githubUrl: "https://github.com/dasrahulprasad05-dev/Naure__sip_premium",
      liveUrl: "https://naure-sip-premium.vercel.app/",
      featured: false,
      order: 6,
      problemStatement: "Conventional direct-to-consumer beverage websites suffer from high bounce rates and flat product displays that fail to convey product craftsmanship and taste appeal.",
      solution: "Crafted an ultra-fluid, 60 FPS interactive e-commerce product experience featuring simulated 3D bottle rotation, floating ingredient physics, dynamic flavor switches, and smooth micro-interactions.",
      results: "Achieved 95+ Google Lighthouse performance score with zero layout shift and fluid 60 FPS rendering on both mobile and desktop devices.",
      challenges: "Maintaining 60 FPS animation performance with heavy visual assets, multi-layer parallax, and responsive viewport sizing.",
      learnings: "Hardware-accelerated CSS 3D transforms, requestAnimationFrame orchestration, high-conversion product landing page micro-copy, and asset optimization.",
      content: `## 📌 NatureSip Premium Overview

An immersive, high-converting interactive e-commerce showcase featuring simulated 3D bottle rotation and botanical ingredient physics.

### ⚡ Key Features
- **Dynamic Flavor Matrix**: Seamless theme switching between signature fruit blends (Cherry Blossom, Golden Mango, Wild Strawberry).
- **Interactive Botanical Breakdown**: Floating ingredient cards displaying nutritional benefits and antioxidant profiles.
- **Scroll-Driven Parallax**: Smooth fluid animations reacting to user scroll depth.
- **Optimized Asset Pipeline**: 95+ Google Lighthouse performance score with zero layout shift.

### 🚀 Production Deployment
- **Live Vercel Site**: [https://naure-sip-premium.vercel.app/](https://naure-sip-premium.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/Naure__sip_premium](https://github.com/dasrahulprasad05-dev/Naure__sip_premium)`,
      techs: ["React", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    },
    {
      title: "Unified Marketplace - Buy Your Project",
      slug: "unified-marketplace",
      shortDescription: "Curated digital marketplace for engineering capstone projects, source code, and deployment guides.",
      category: "Web",
      status: "completed",
      githubUrl: "https://github.com/dasrahulprasad05-dev/UNIFIED-MARKETPLACE",
      liveUrl: "https://buy-your-project.vercel.app/",
      featured: false,
      order: 7,
      problemStatement: "Engineering students and junior developers frequently get stuck when building final year capstone projects, lacking reliable repositories with complete source code, installation walk-throughs, and live demo sandboxes.",
      solution: "Built a marketplace where users can browse verified developer projects across AI/ML, Full Stack, and Web3, interact with live demo embeds, inspect architectural specifications, and acquire starter source code.",
      results: "Over 50+ curated project blueprints with integrated live demo frames and step-by-step setup documentation.",
      challenges: "Safe in-browser preview sandboxing for varied tech stacks and responsive catalog filtering across multiple technology dimensions.",
      learnings: "Digital product marketplace modeling, sandbox preview architectures, custom project request workflows, and e-commerce UI patterns.",
      content: `## 📌 Unified Marketplace Overview

A curated digital marketplace for engineering capstone projects, verified open-source blueprints, and architectural documentation.

### ⚡ Key Features
- **Live Demo Previewer**: Integrated preview frames allowing buyers to test apps before acquiring code.
- **Category & Stack Filtering**: Filter by Python, React, Next.js, AI/ML, or IoT.
- **Custom Project Commissioning**: Built-in consultation form allowing students to request bespoke project builds.
- **Instant Documentation Bundles**: Each project includes README installation guides, database schemas, and presentation decks.

### 🚀 Production Deployment
- **Live Vercel Site**: [https://buy-your-project.vercel.app/](https://buy-your-project.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/UNIFIED-MARKETPLACE](https://github.com/dasrahulprasad05-dev/UNIFIED-MARKETPLACE)`,
      techs: ["JavaScript", "Tailwind CSS", "HTML/CSS", "Node.js"],
    },
    {
      title: "HealthGuard - Predictive Diagnostic Engine",
      slug: "healthguard",
      shortDescription: "Supervised Machine Learning Health Monitoring and Early Chronic Disease Detection Pipeline.",
      category: "AI/ML",
      status: "completed",
      githubUrl: "https://github.com/dasrahulprasad05-dev/HEALTHGUARD",
      liveUrl: null,
      featured: false,
      order: 8,
      problemStatement: "Early onset symptoms of chronic conditions (cardiovascular disease, diabetes, hypertension) frequently go undetected in standard routine checkups until irreversible organ damage occurs.",
      solution: "Trained an end-to-end predictive healthcare engine on clinical biomarker datasets that outputs probabilistic risk assessments and explains which biometric indicators contributed most to the risk score.",
      results: "High-accuracy diagnostic risk scoring with feature importance plots explaining individual biomarker impacts (blood glucose, BMI, lipid profiles).",
      challenges: "Handling imbalanced clinical datasets, clinical outliers, missing laboratory values, and ensuring model interpretability for medical context.",
      learnings: "Ensemble learning (XGBoost, Random Forest), SMOTE for imbalance handling, SHAP feature attribution, and clinical data preprocessing pipelines.",
      content: `## 📌 HealthGuard Overview

An end-to-end predictive machine learning healthcare pipeline trained on biometric clinical datasets for early detection of chronic conditions.

### ⚡ Key Features
- **Multi-Disease Risk Prediction**: Validated models for diabetes onset, heart disease probability, and hypertension.
- **Biomarker Importance Analysis**: Feature importance plots showing how blood glucose, BMI, age, and lipid profiles influence predictions.
- **Automated Data Cleaning Pipeline**: Handles missing medical values, outliers, and feature scaling.
- **Actionable Health Recommendations**: Generates tailored preventative guidance based on output risk tiers.

### 🚀 Open Source Repository
- **Repository**: [https://github.com/dasrahulprasad05-dev/HEALTHGUARD](https://github.com/dasrahulprasad05-dev/HEALTHGUARD)`,
      techs: ["Python", "Machine Learning", "Scikit-learn", "Pandas", "NumPy"],
    },
    {
      title: "Fresh Basket - Hyperlocal Grocery",
      slug: "fresh-basket",
      shortDescription: "Farm-to-table hyperlocal grocery platform connecting local producers directly to consumers.",
      category: "Web",
      status: "completed",
      githubUrl: "https://github.com/dasrahulprasad05-dev/Fresh-basket",
      liveUrl: null,
      featured: false,
      order: 9,
      problemStatement: "Supply chain inefficiencies in grocery distribution degrade the freshness of produce and eat away farmer margins through excessive broker fees.",
      solution: "Built a localized e-commerce storefront allowing customers to purchase fresh organic produce directly with scheduled same-day delivery slots and automated cart calculation.",
      results: "Real-time inventory decrementing to eliminate overselling of perishable goods, paired with morning and evening delivery time slot allocation.",
      challenges: "Managing perishable inventory state, handling dynamic cart state changes, and optimizing image-heavy grocery catalogs.",
      learnings: "E-commerce state management, cart persistence, inventory reservation patterns, and hyperlocal logistics scheduling.",
      content: `## 📌 Fresh Basket Overview

A direct-to-consumer hyperlocal grocery marketplace connecting regional agricultural producers directly to residential consumers.

### ⚡ Key Features
- **Live Inventory Tracking**: Dynamic stock counts that prevent over-ordering of perishable goods.
- **Delivery Slot Scheduler**: User-selected delivery time windows (Morning / Evening fresh batches).
- **Categorized Produce Filter**: Fast search and filtering by organic vegetables, fruits, dairy, and farm staples.
- **Order History & Status Tracking**: Real-time state management from packing to delivery.

### 🚀 Open Source Repository
- **Repository**: [https://github.com/dasrahulprasad05-dev/Fresh-basket](https://github.com/dasrahulprasad05-dev/Fresh-basket)`,
      techs: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
    },
    {
      title: "Rahul Creative 3D Portfolio",
      slug: "rahul-creative-3d",
      shortDescription: "Immersive 3D creative developer portfolio showcasing WebGL, Three.js, and interactive storytelling.",
      category: "Web",
      status: "completed",
      githubUrl: "https://github.com/dasrahulprasad05-dev/rahul_devloper",
      liveUrl: "https://rahul-devloper.vercel.app/",
      featured: false,
      order: 10,
      problemStatement: "Standard static resume portfolios fail to demonstrate advanced frontend craft, spatial UI design, and creative shader coding capabilities.",
      solution: "Engineered a WebGL-powered 3D interactive portfolio featuring dynamic particle fields, camera fly-through sequences, interactive 3D assets, and engaging narrative-driven developer presentation.",
      results: "Captivating spatial web experience with interactive 3D shaders running smoothly at 60 FPS across desktop and mobile.",
      challenges: "Balancing complex 3D geometry and particle simulations with fast initial load times and battery efficiency on mobile devices.",
      learnings: "Three.js scene graph management, WebGL shaders, camera interpolation (Lerp), and spatial storytelling UI.",
      content: `## 📌 Rahul Developer 3D Experience

An award-caliber WebGL 3D developer portfolio demonstrating spatial visual storytelling and interactive graphics programming.

### ⚡ Key Features
- **Interactive 3D Geometry**: Shaders and particle systems reacting to cursor and touch coordinates.
- **Narrative Storyline**: Section-by-section visual progression through design, engineering, and 3D dimensions.
- **Fluid Layout Transitions**: Seamless blending between 3D canvas viewport and HTML content overlays.

### 🚀 Production Deployment
- **Live Vercel Site**: [https://rahul-devloper.vercel.app/](https://rahul-devloper.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/rahul_devloper](https://github.com/dasrahulprasad05-dev/rahul_devloper)`,
      techs: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Three.js", "WebGL"],
    },
  ];

  for (const proj of projectsData) {
    const { techs, ...projectData } = proj;
    const project = await prisma.project.create({
      data: projectData,
    });

    for (const techName of techs) {
      if (technologies[techName]) {
        await prisma.projectTechnology.create({
          data: {
            projectId: project.id,
            technologyId: technologies[techName].id,
          },
        });
      }
    }
  }
  console.log(`✅ ${projectsData.length} Authentic Projects created with Technologies`);

  // ─── 4. Technical Skills ────────────────────────────────
  const skillsData = [
    // AI/ML
    { name: "RAG & Vector Search", category: "AI/ML", level: "proficient", order: 1 },
    { name: "Large Language Models (LLM)", category: "AI/ML", level: "proficient", order: 2 },
    { name: "Machine Learning (Supervised/Unsupervised)", category: "AI/ML", level: "proficient", order: 3 },
    { name: "Natural Language Processing (NLP)", category: "AI/ML", level: "proficient", order: 4 },
    { name: "Deep Learning (CNN / Transformers)", category: "AI/ML", level: "practicing", order: 5 },
    { name: "Computer Vision & Diagnostics", category: "AI/ML", level: "practicing", order: 6 },
    { name: "Prompt Engineering & Safety Guardrails", category: "AI/ML", level: "proficient", order: 7 },
    // Development
    { name: "React 19 & Next.js 16", category: "Development", level: "expert", order: 1 },
    { name: "TypeScript", category: "Development", level: "proficient", order: 2 },
    { name: "Node.js & Express.js", category: "Development", level: "proficient", order: 3 },
    { name: "Tailwind CSS v4 & Framer Motion", category: "Development", level: "expert", order: 4 },
    { name: "PostgreSQL & Prisma ORM", category: "Development", level: "proficient", order: 5 },
    { name: "FastAPI & Python APIs", category: "Development", level: "practicing", order: 6 },
    { name: "REST API Architecture", category: "Development", level: "expert", order: 7 },
    // Data
    { name: "Python", category: "Data", level: "expert", order: 1 },
    { name: "SQL & Relational Modeling", category: "Data", level: "proficient", order: 2 },
    { name: "Pandas & NumPy", category: "Data", level: "proficient", order: 3 },
    { name: "Scikit-Learn", category: "Data", level: "proficient", order: 4 },
    { name: "Data Cleaning & Preprocessing", category: "Data", level: "proficient", order: 5 },
    { name: "Power BI & Data Visualization", category: "Data", level: "practicing", order: 6 },
    // Tools
    { name: "Git & GitHub Version Control", category: "Tools", level: "expert", order: 1 },
    { name: "Vercel & Supabase Cloud", category: "Tools", level: "expert", order: 2 },
    { name: "Docker Containerization", category: "Tools", level: "practicing", order: 3 },
    { name: "Postman & API Testing", category: "Tools", level: "proficient", order: 4 },
    { name: "VS Code & Linux Environment", category: "Tools", level: "expert", order: 5 },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`✅ ${skillsData.length} Skills created`);

  // ─── 5. Education ───────────────────────────────────────
  await prisma.education.create({
    data: {
      degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
      institution: "Ajay Binay Institute of Technology (ABIT), Cuttack",
      location: "Cuttack, Odisha, India",
      startYear: "2023",
      endYear: "2027",
      description: "Specializing in Full-Stack Web Architecture, Artificial Intelligence, and Applied Machine Learning. Creator and Lead Developer of the official ABIT EventHub platform.",
      grade: "8.6 CGPA",
      current: true,
      order: 1,
    },
  });

  await prisma.education.create({
    data: {
      degree: "Higher Secondary Examination (12th Science)",
      institution: "Council of Higher Secondary Education, Odisha",
      location: "Odisha, India",
      startYear: "2021",
      endYear: "2023",
      description: "Major in Physics, Chemistry, Mathematics, and Computer Science with strong foundation in analytical logic.",
      grade: "First Division",
      current: false,
      order: 2,
    },
  });
  console.log("✅ Education created");

  // ─── 6. Achievements ────────────────────────────────────
  const achievementsData = [
    {
      title: "Built & Deployed Official ABIT EventHub",
      organization: "Ajay Binay Institute of Technology, Cuttack",
      date: "2025",
      description: "Architected and launched the official college fest ticketing platform with in-browser QR scanners used by hundreds of students.",
      category: "launch",
      verificationUrl: "https://abit-anual-function.vercel.app/",
      order: 1,
    },
    {
      title: "Creator of Swasthya Sathi AI",
      organization: "Public Health AI Initiative",
      date: "2025",
      description: "Engineered voice-enabled regional healthcare assistant supporting Odia and Hindi with clinical RAG guardrails.",
      category: "hackathon",
      verificationUrl: "https://swasthya-sathi-ai-five.vercel.app/",
      order: 2,
    },
    {
      title: "Machine Learning Specialization",
      organization: "Coursera & DeepLearning.AI",
      date: "2024",
      description: "Mastered supervised learning, neural networks, decision trees, and unsupervised learning algorithms.",
      category: "certification",
      order: 3,
    },
    {
      title: "Deep Learning & Neural Networks Specialization",
      organization: "DeepLearning.AI",
      date: "2025",
      description: "Trained and deployed deep convolutional and recurrent models, sequence modeling, and transformer foundations.",
      category: "certification",
      order: 4,
    },
    {
      title: "Full-Stack Web Engineering Mastery",
      organization: "Modern Web Systems",
      date: "2024",
      description: "Mastered Next.js App Router, React 19, Express REST APIs, PostgreSQL relational modeling, and Prisma ORM.",
      category: "certification",
      order: 5,
    },
  ];

  for (const achievement of achievementsData) {
    await prisma.achievement.create({ data: achievement });
  }
  console.log(`✅ ${achievementsData.length} Achievements created`);

  // ─── 7. Timeline / Journey ──────────────────────────────
  const timelineData = [
    { year: "2023", month: "Aug", title: "Enrolled in B.Tech CSE at ABIT Cuttack", description: "Began engineering journey with deep focus on computing fundamentals, algorithms, and software design.", category: "education", order: 1 },
    { year: "2023", month: "Nov", title: "Mastered Python & Algorithmic Problem Solving", description: "Built core competence in Python data structures, algorithms, and modular programming.", category: "skill", order: 2 },
    { year: "2024", month: "Feb", title: "Full-Stack Development (React & Node.js)", description: "Constructed full-stack web applications with modern frontend frameworks and backend REST APIs.", category: "skill", order: 3 },
    { year: "2024", month: "May", title: "Built HealthGuard Diagnostic Engine", description: "Trained predictive machine learning models on clinical biomarker datasets with Scikit-Learn.", category: "project", order: 4 },
    { year: "2024", month: "Sep", title: "Enterprise Database Systems & Prisma ORM", description: "Deep-dived into relational schema design, SQL optimization, and type-safe database queries.", category: "skill", order: 5 },
    { year: "2025", month: "Jan", title: "Launched ABIT EventHub", description: "Developed and deployed the official college fest QR ticketing portal with in-browser camera scanning.", category: "project", order: 6 },
    { year: "2025", month: "Mar", title: "Engineered Swasthya Sathi AI", description: "Pioneered voice-first multilingual healthcare assistant for Odisha with native Odia NLP and RAG pipelines.", category: "project", order: 7 },
    { year: "2025", month: "Jun", title: "Built Arogya Sahayak Multimodal Companion", description: "Created 16 on-device diagnostic AI scanners and one-tap emergency SOS beacon.", category: "project", order: 8 },
    { year: "2025", month: "Sep", title: "Nexus Student Portal & CAMPUSLINK", description: "Shipped gamified student management ERP and campus-to-corporate placement intelligence system.", category: "project", order: 9 },
    { year: "2026", month: "Jan", title: "Creative WebGL & 3D Web Systems", description: "Engineered NatureSip 3D beverage experience and WebGL interactive portfolio running at 60 FPS.", category: "skill", order: 10 },
    { year: "2026", month: "Oct", title: "Full-Stack Portfolio & CMS Launch", description: "Architected modern developer portfolio and content management system with Next.js 16 and Express 5.", category: "milestone", order: 11 },
  ];

  for (const event of timelineData) {
    await prisma.timelineEvent.create({ data: event });
  }
  console.log(`✅ ${timelineData.length} Timeline events created`);

  // ─── 8. Build Logs ──────────────────────────────────────
  const buildLogsData = [
    {
      date: new Date("2026-10-04"),
      title: "Full-Stack Portfolio & CMS Architecture",
      content: `## Portfolio Architecture with Next.js 16 & Express 5\n\n- Engineered modular full-stack monorepo with Next.js 16 (Turbopack) frontend and dedicated Express TypeScript backend.\n- Synchronized database with 10 production projects, real live Vercel deployments, and verified GitHub repositories.\n- Integrated real-time admin CMS for managing projects, build logs, and visitor communications.`,
      tags: "nextjs16,prisma,fullstack,cms",
      published: true,
    },
    {
      date: new Date("2025-10-15"),
      title: "Swasthya Sathi AI — Multilingual Odia RAG Pipeline",
      content: `## Voice-First Healthcare with RAG\n\n- Designed phonetic normalization layer for Odia (ଓଡ଼ିଆ) and Hindi medical vocabulary.\n- Implemented Retrieval-Augmented Generation over verified public health protocols.\n- Integrated Web Speech API for seamless speech recognition and audio playback.`,
      tags: "swasthya-sathi,rag,voice-ai,odia-nlp",
      published: true,
    },
    {
      date: new Date("2025-06-20"),
      title: "ABIT EventHub — In-Browser Camera QR Ticketing",
      content: `## High-Throughput Fest Entry Verification\n\n- Built client-side QR barcode scanner using HTML5 MediaStream with zero hardware dependencies.\n- Implemented sub-2-second ticket authentication against PostgreSQL database.\n- Handled high concurrent load during peak fest entry hours.`,
      tags: "abit-eventhub,qr-scanner,postgresql,realtime",
      published: true,
    },
  ];

  for (const log of buildLogsData) {
    await prisma.buildLog.create({ data: log });
  }
  console.log(`✅ ${buildLogsData.length} Build logs created`);

  // ─── 9. Social Links ────────────────────────────────────
  const socialLinks = [
    { platform: "github", url: "https://github.com/dasrahulprasad05-dev", icon: "Github", order: 1 },
    { platform: "linkedin", url: "https://linkedin.com/in/rahul-prasad-das", icon: "Linkedin", order: 2 },
    { platform: "twitter", url: "https://x.com", icon: "Twitter", order: 3 },
    { platform: "email", url: "mailto:dasrahulprasad05@gmail.com", icon: "Mail", order: 4 },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.create({ data: link });
  }
  console.log("✅ Social links created");

  // ─── 10. Site Settings ──────────────────────────────────
  const settings = [
    { key: "site_title", value: "Rahul Prasad Das" },
    { key: "site_tagline", value: "Full-Stack Developer & AI/ML Engineer" },
    { key: "site_description", value: "Building high-performance web applications, voice AI assistants, and production-grade full-stack systems." },
    { key: "hero_title", value: "BUILDING WITH AI.\nSHAPING THE WEB." },
    { key: "hero_subtitle", value: "Full-Stack Development • AI/ML & RAG • System Design" },
    { key: "currently_building_title", value: "Swasthya Sathi AI & ABIT EventHub" },
    { key: "currently_building_description", value: "Multilingual AI healthcare assistant and high-concurrency event ticketing systems." },
    { key: "currently_learning", value: "Agentic AI → Next.js 16 Architecture → Production LLMs" },
    { key: "currently_preparing", value: "Full-Stack & AI/ML Software Engineering" },
    { key: "current_goal", value: "Software Engineering & AI/ML Opportunities" },
    { key: "resume_url", value: "/resume.pdf" },
    { key: "contact_email", value: "dasrahulprasad05@gmail.com" },
    { key: "github_url", value: "https://github.com/dasrahulprasad05-dev" },
    { key: "linkedin_url", value: "https://linkedin.com/in/rahul-prasad-das" },
    { key: "about_text", value: "I'm Rahul Prasad Das, a B.Tech Computer Science student at Ajay Binay Institute of Technology (ABIT), Cuttack, passionate about Full-Stack Engineering, Artificial Intelligence, and building impactful real-world software.\n\nI created ABIT EventHub—the official event ticketing and in-browser QR scanning platform for our college fest—and Swasthya Sathi AI, an accessible voice-enabled public healthcare companion for Odisha with native Odia NLP.\n\nMy focus spans modern web architecture (Next.js 16, React 19, TypeScript, PostgreSQL, Prisma), AI/ML systems (RAG pipelines, LLMs, computer vision), and building tools that deliver measurable utility to thousands of users." },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("✅ Site settings created");

  // ─── 11. Initial Sample Messages ────────────────────────
  const messages = [
    {
      name: "TPO Coordinator",
      email: "tpo@abit.edu",
      subject: "CAMPUSLINK Implementation Inquiry",
      message: "Hi Rahul, we reviewed CAMPUSLINK and the ABIT EventHub system. We would like to schedule a discussion regarding deploying the placement readiness scoring module for our upcoming recruitment drive.",
      status: "unread",
    },
    {
      name: "Healthcare Tech Lead",
      email: "lead@healthai.org",
      subject: "Swasthya Sathi AI Collaboration",
      message: "Hello Rahul, impressive work on the Odia NLP triage pipeline in Swasthya Sathi AI. We'd love to connect and discuss potential grant funding or pilot deployments.",
      status: "unread",
    },
  ];

  for (const msg of messages) {
    await prisma.message.create({ data: msg });
  }
  console.log("✅ Sample messages created");

  console.log("\n🎉 Database seeded successfully with all 10 authentic projects!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
