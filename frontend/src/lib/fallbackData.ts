import type {
  ProjectWithTech,
  Skill,
  Education,
  Achievement,
  TimelineEvent,
  BuildLog,
} from "./api";

export const fallbackProjects: ProjectWithTech[] = [
  {
    id: "proj-1",
    title: "ABIT EventHub",
    slug: "abit-eventhub",
    shortDescription:
      "Official Event Management & In-Browser QR Ticketing Platform for AJAY BINAY INSTITUTE OF TECHNOLOGY, Cuttack.",
    category: "Web",
    status: "completed",
    githubUrl: "https://github.com/dasrahulprasad05-dev/ABIT_ANUAL_FUNCTION",
    liveUrl: "https://abit-anual-function.vercel.app/",
    demoUrl: null,
    imageUrl: null,
    featured: true,
    order: 1,
    problemStatement:
      "College cultural and technical fests suffer from chaotic manual registrations, long physical entry queues, forged ticket passes, and unverified student attendance. Organizers lack real-time visibility into hall capacity and entry validation.",
    solution:
      "Built a high-throughput event management platform enabling students to explore 20+ fest events, register with automatic capacity checks, receive cryptographically secure QR ticket passes via email, and allow fest coordinators to scan and check-in attendees via in-browser camera scanners in under 2 seconds.",
    results:
      "Streamlined 20+ college fest events, reduced entry queue wait times from 15 minutes to under 2 seconds per scan, and eliminated duplicate or forged passes.",
    challenges:
      "Scanning QR codes in poor lighting or high-glare environments at fest venue doors, and handling sudden traffic spikes during popular event registrations.",
    learnings:
      "Camera-based barcode/QR scanning pipelines with HTML5 MediaStream, Next.js Server Actions with PostgreSQL connection pooling, transactional ticket generation, and high-concurrency event registration controls.",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t1", name: "Next.js" },
      { id: "t2", name: "React" },
      { id: "t3", name: "PostgreSQL" },
      { id: "t4", name: "Prisma" },
      { id: "t5", name: "Tailwind CSS" },
      { id: "t6", name: "TypeScript" },
      { id: "t7", name: "Node.js" },
    ],
  },
  {
    id: "proj-2",
    title: "Swasthya Sathi AI",
    slug: "swasthya-sathi-ai",
    shortDescription:
      "Multilingual Public Health Assistant for Odisha & India delivering voice-enabled healthcare guidance in regional languages.",
    category: "AI/ML",
    status: "live",
    githubUrl: "https://github.com/dasrahulprasad05-dev/SWASTHYA_SATHI_AI",
    liveUrl: "https://swasthya-sathi-ai-five.vercel.app/",
    demoUrl: null,
    imageUrl: null,
    featured: true,
    order: 2,
    problemStatement:
      "Over 70% of rural and semi-urban populations in Odisha struggle with English-only digital healthcare tools, complex medical jargon, and rampant health misinformation. Critical health schemes (BSKY, Ayushman Bharat) are often underutilized due to lack of awareness.",
    solution:
      "Built an accessible, voice-first public healthcare assistant that understands and speaks Odia, Hindi, and English. It uses Retrieval-Augmented Generation (RAG) grounded in verified clinical guidance to perform symptom triage, explain health schemes, and connect patients to nearby hospitals.",
    results:
      "Empowers Odia and rural citizens with instant, verified health guidance, voice-first navigation, and direct access to 108/102 emergency ambulance dispatch.",
    challenges:
      "Accurately understanding Odia medical terminology and colloquial expressions, preventing clinical hallucinations, and ensuring strict emergency safety guardrails.",
    learnings:
      "Multilingual NLP and phonetic normalization for Odia lexicons, RAG architecture with vector databases, prompt engineering for safety-critical medical triage, and Web Speech API integration.",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t1", name: "Next.js" },
      { id: "t6", name: "TypeScript" },
      { id: "t8", name: "RAG" },
      { id: "t9", name: "LLM" },
      { id: "t10", name: "NLP" },
      { id: "t5", name: "Tailwind CSS" },
      { id: "t11", name: "Machine Learning" },
    ],
  },
  {
    id: "proj-3",
    title: "Arogya Sahayak",
    slug: "arogya-sahayak",
    shortDescription:
      "Multimodal AI Healthcare Companion with 16 on-device diagnostic scanners, clinical triage, and doctor consultations.",
    category: "AI/ML",
    status: "completed",
    githubUrl: "https://github.com/dasrahulprasad05-dev/Arogya_sahayak",
    liveUrl: "https://arogya-sahayak-ten.vercel.app/",
    demoUrl: null,
    imageUrl: null,
    featured: true,
    order: 3,
    problemStatement:
      "Primary health centers in rural districts lack specialist doctors (dermatologists, ophthalmologists, cardiologists), forcing patients to travel hundreds of kilometers for basic screenings.",
    solution:
      "Built a multimodal health companion that runs client-side visual assessment scanners, guides users through structured clinical symptom checklists, generates downloadable medical summary PDFs, and connects patients with doctors.",
    results:
      "16 on-device AI diagnostic scanners, one-tap emergency SOS GPS beacon, and instant medical summary reports for clinical visits.",
    challenges:
      "Running computer vision models reliably on resource-constrained mobile browsers without server latency, and ensuring data privacy for patient scans.",
    learnings:
      "Client-side image processing, computer vision classification pipelines, PDF document generation, emergency SOS geolocation workflows, and accessible medical UX design.",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t2", name: "React" },
      { id: "t6", name: "TypeScript" },
      { id: "t5", name: "Tailwind CSS" },
      { id: "t11", name: "Machine Learning" },
      { id: "t12", name: "FastAPI" },
    ],
  },
  {
    id: "proj-4",
    title: "Nexus Student Management",
    slug: "nexus-student-management",
    shortDescription:
      "Next-Gen Student Management & Academic ERP with AI tutors, QR attendance, and gamified progress.",
    category: "Web",
    status: "completed",
    githubUrl: "https://github.com/dasrahulprasad05-dev/nexus_student_management",
    liveUrl: "https://nexus-student-management.vercel.app/",
    demoUrl: null,
    imageUrl: null,
    featured: true,
    order: 4,
    problemStatement:
      "Legacy college student portals are clunky, mobile-unfriendly, and lack student engagement. Students miss deadlines, lose track of attendance percentages, and have no centralized academic companion.",
    solution:
      "Engineered a modern, gamified student management SaaS portal featuring XP progression, streak tracking, instant QR lecture attendance, grade calculation, and an integrated AI academic tutor.",
    results:
      "Increased student engagement with gamified study streaks and XP leaderboards, and automated lecture attendance via dynamic QR tokens.",
    challenges:
      "Preventing QR attendance spoofing and proxy attendance, and designing real-time GPA and semester analytics charts.",
    learnings:
      "Supabase authentication, Row Level Security (RLS), real-time query invalidation with TanStack Query, and gamification psychology in EdTech software.",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t2", name: "React" },
      { id: "t6", name: "TypeScript" },
      { id: "t5", name: "Tailwind CSS" },
      { id: "t3", name: "PostgreSQL" },
      { id: "t13", name: "Supabase" },
    ],
  },
  {
    id: "proj-5",
    title: "CAMPUSLINK - Placement Intelligence",
    slug: "campuslink",
    shortDescription:
      "AI-powered campus-to-corporate placement intelligence, readiness scoring, and skill-gap analysis.",
    category: "Web",
    status: "completed",
    githubUrl: "https://github.com/dasrahulprasad05-dev/RAHUL_PROTFOLIO",
    liveUrl: "https://campus-link-rahul.vercel.app/",
    demoUrl: null,
    imageUrl: null,
    featured: true,
    order: 5,
    problemStatement:
      "Training and Placement Offices (TPOs) struggle with managing hundreds of student profiles, manually checking CGPA eligibility for recruiters, and identifying which skills students lack before placement season.",
    solution:
      "Created a tri-portal platform connecting Students, TPO Administrators, and Corporate Recruiters with automated recruitment drive filtering, resume screening, readiness index scores, and placement statistics.",
    results:
      "Automated candidate shortlisting for recruitment drives, reduced TPO administrative workload by 70%, and provided actionable skill-gap reports to students.",
    challenges:
      "Structuring role-based access controls across multiple distinct personas (Students, Faculty, TPO, Recruiters) while maintaining clean shared data models.",
    learnings:
      "Enterprise multi-role authorization, placement readiness scoring algorithms, high-volume tabular data exports, and recruitment analytics.",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t1", name: "Next.js" },
      { id: "t6", name: "TypeScript" },
      { id: "t5", name: "Tailwind CSS" },
      { id: "t2", name: "React" },
      { id: "t7", name: "Node.js" },
      { id: "t3", name: "PostgreSQL" },
    ],
  },
  {
    id: "proj-6",
    title: "NatureSip Premium",
    slug: "naturesip-premium",
    shortDescription:
      "Immersive 3D Animated Artisanal Beverage Showcase and High-Conversion E-Commerce Storefront.",
    category: "Web",
    status: "completed",
    githubUrl: "https://github.com/dasrahulprasad05-dev/Naure__sip_premium",
    liveUrl: "https://naure-sip-premium.vercel.app/",
    demoUrl: null,
    imageUrl: null,
    featured: false,
    order: 6,
    problemStatement:
      "Conventional direct-to-consumer beverage websites suffer from high bounce rates and flat product displays that fail to convey product craftsmanship and taste appeal.",
    solution:
      "Crafted an ultra-fluid, 60 FPS interactive e-commerce product experience featuring simulated 3D bottle rotation, floating ingredient physics, dynamic flavor switches, and smooth micro-interactions.",
    results:
      "Achieved 95+ Google Lighthouse performance score with zero layout shift and fluid 60 FPS rendering on both mobile and desktop devices.",
    challenges:
      "Maintaining 60 FPS animation performance with heavy visual assets, multi-layer parallax, and responsive viewport sizing.",
    learnings:
      "Hardware-accelerated CSS 3D transforms, requestAnimationFrame orchestration, high-conversion product landing page micro-copy, and asset optimization.",
    content: `## 📌 NatureSip Premium Overview

An immersive, high-converting interactive e-commerce showcase featuring simulated 3D bottle rotation and botanical ingredient physics.

### ⚡ Key Features
- **Dynamic Flavor Matrix**: Seamless theme switching between signature fruit blends.
- **Interactive Botanical Breakdown**: Floating ingredient cards displaying nutritional benefits.
- **Scroll-Driven Parallax**: Smooth fluid animations reacting to user scroll depth.
- **Optimized Asset Pipeline**: 95+ Google Lighthouse score.

### 🚀 Production Deployment
- **Live Vercel Site**: [https://naure-sip-premium.vercel.app/](https://naure-sip-premium.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/Naure__sip_premium](https://github.com/dasrahulprasad05-dev/Naure__sip_premium)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t2", name: "React" },
      { id: "t6", name: "TypeScript" },
      { id: "t5", name: "Tailwind CSS" },
      { id: "t14", name: "HTML/CSS" },
    ],
  },
  {
    id: "proj-7",
    title: "Unified Marketplace - Buy Your Project",
    slug: "unified-marketplace",
    shortDescription:
      "Curated digital marketplace for engineering capstone projects, source code, and deployment guides.",
    category: "Web",
    status: "completed",
    githubUrl: "https://github.com/dasrahulprasad05-dev/UNIFIED-MARKETPLACE",
    liveUrl: "https://buy-your-project.vercel.app/",
    demoUrl: null,
    imageUrl: null,
    featured: false,
    order: 7,
    problemStatement:
      "Engineering students and junior developers frequently get stuck when building final year capstone projects, lacking reliable repositories with complete source code, installation walk-throughs, and live demo sandboxes.",
    solution:
      "Built a marketplace where users can browse verified developer projects across AI/ML, Full Stack, and Web3, interact with live demo embeds, inspect architectural specifications, and acquire starter source code.",
    results:
      "Over 50+ curated project blueprints with integrated live demo frames and step-by-step setup documentation.",
    challenges:
      "Safe in-browser preview sandboxing for varied tech stacks and responsive catalog filtering across multiple technology dimensions.",
    learnings:
      "Digital product marketplace modeling, sandbox preview architectures, custom project request workflows, and e-commerce UI patterns.",
    content: `## 📌 Unified Marketplace Overview

A curated digital marketplace for engineering capstone projects, verified open-source blueprints, and architectural documentation.

### ⚡ Key Features
- **Live Demo Previewer**: Integrated preview frames allowing buyers to test apps before acquiring code.
- **Category & Stack Filtering**: Filter by Python, React, Next.js, AI/ML, or IoT.
- **Custom Project Commissioning**: Built-in consultation form allowing students to request bespoke project builds.
- **Instant Documentation Bundles**: Each project includes README guides and database schemas.

### 🚀 Production Deployment
- **Live Vercel Site**: [https://buy-your-project.vercel.app/](https://buy-your-project.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/UNIFIED-MARKETPLACE](https://github.com/dasrahulprasad05-dev/UNIFIED-MARKETPLACE)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t15", name: "JavaScript" },
      { id: "t5", name: "Tailwind CSS" },
      { id: "t14", name: "HTML/CSS" },
      { id: "t7", name: "Node.js" },
    ],
  },
  {
    id: "proj-8",
    title: "HealthGuard - Predictive Diagnostic Engine",
    slug: "healthguard",
    shortDescription:
      "Supervised Machine Learning Health Monitoring and Early Chronic Disease Detection Pipeline.",
    category: "AI/ML",
    status: "completed",
    githubUrl: "https://github.com/dasrahulprasad05-dev/HEALTHGUARD",
    liveUrl: null,
    demoUrl: null,
    imageUrl: null,
    featured: false,
    order: 8,
    problemStatement:
      "Early onset symptoms of chronic conditions (cardiovascular disease, diabetes, hypertension) frequently go undetected in standard routine checkups until irreversible organ damage occurs.",
    solution:
      "Trained an end-to-end predictive healthcare engine on clinical biomarker datasets that outputs probabilistic risk assessments and explains which biometric indicators contributed most to the risk score.",
    results:
      "High-accuracy diagnostic risk scoring with feature importance plots explaining individual biomarker impacts (blood glucose, BMI, lipid profiles).",
    challenges:
      "Handling imbalanced clinical datasets, clinical outliers, missing laboratory values, and ensuring model interpretability for medical context.",
    learnings:
      "Ensemble learning (XGBoost, Random Forest), SMOTE for imbalance handling, SHAP feature attribution, and clinical data preprocessing pipelines.",
    content: `## 📌 HealthGuard Overview

An end-to-end predictive machine learning healthcare pipeline trained on biometric clinical datasets for early detection of chronic conditions.

### ⚡ Key Features
- **Multi-Disease Risk Prediction**: Validated models for diabetes onset, heart disease probability, and hypertension.
- **Biomarker Importance Analysis**: Feature importance plots showing how blood glucose, BMI, and lipid profiles influence predictions.
- **Automated Data Cleaning Pipeline**: Handles missing medical values, outliers, and feature scaling.

### 🚀 Open Source Repository
- **Repository**: [https://github.com/dasrahulprasad05-dev/HEALTHGUARD](https://github.com/dasrahulprasad05-dev/HEALTHGUARD)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t16", name: "Python" },
      { id: "t11", name: "Machine Learning" },
      { id: "t17", name: "Scikit-learn" },
      { id: "t18", name: "Pandas" },
      { id: "t19", name: "NumPy" },
    ],
  },
  {
    id: "proj-9",
    title: "Fresh Basket - Hyperlocal Grocery",
    slug: "fresh-basket",
    shortDescription:
      "Farm-to-table hyperlocal grocery platform connecting local producers directly to consumers.",
    category: "Web",
    status: "completed",
    githubUrl: "https://github.com/dasrahulprasad05-dev/Fresh-basket",
    liveUrl: null,
    demoUrl: null,
    imageUrl: null,
    featured: false,
    order: 9,
    problemStatement:
      "Supply chain inefficiencies in grocery distribution degrade the freshness of produce and eat away farmer margins through excessive broker fees.",
    solution:
      "Built a localized e-commerce storefront allowing customers to purchase fresh organic produce directly with scheduled same-day delivery slots and automated cart calculation.",
    results:
      "Real-time inventory decrementing to eliminate overselling of perishable goods, paired with morning and evening delivery time slot allocation.",
    challenges:
      "Managing perishable inventory state, handling dynamic cart state changes, and optimizing image-heavy grocery catalogs.",
    learnings:
      "E-commerce state management, cart persistence, inventory reservation patterns, and hyperlocal logistics scheduling.",
    content: `## 📌 Fresh Basket Overview

A direct-to-consumer hyperlocal grocery marketplace connecting regional agricultural producers directly to residential consumers.

### ⚡ Key Features
- **Live Inventory Tracking**: Dynamic stock counts that prevent over-ordering of perishable goods.
- **Delivery Slot Scheduler**: User-selected delivery time windows.
- **Categorized Produce Filter**: Fast search and filtering by organic vegetables, fruits, dairy, and farm staples.

### 🚀 Open Source Repository
- **Repository**: [https://github.com/dasrahulprasad05-dev/Fresh-basket](https://github.com/dasrahulprasad05-dev/Fresh-basket)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t2", name: "React" },
      { id: "t6", name: "TypeScript" },
      { id: "t7", name: "Node.js" },
      { id: "t20", name: "Express" },
      { id: "t5", name: "Tailwind CSS" },
    ],
  },
  {
    id: "proj-10",
    title: "Rahul Creative 3D Portfolio",
    slug: "rahul-creative-3d",
    shortDescription:
      "Immersive 3D creative developer portfolio showcasing WebGL, Three.js, and interactive storytelling.",
    category: "Web",
    status: "completed",
    githubUrl: "https://github.com/dasrahulprasad05-dev/rahul_devloper",
    liveUrl: "https://rahul-devloper.vercel.app/",
    demoUrl: null,
    imageUrl: null,
    featured: false,
    order: 10,
    problemStatement:
      "Standard static resume portfolios fail to demonstrate advanced frontend craft, spatial UI design, and creative shader coding capabilities.",
    solution:
      "Engineered a WebGL-powered 3D interactive portfolio featuring dynamic particle fields, camera fly-through sequences, interactive 3D assets, and engaging narrative-driven developer presentation.",
    results:
      "Captivating spatial web experience with interactive 3D shaders running smoothly at 60 FPS across desktop and mobile.",
    challenges:
      "Balancing complex 3D geometry and particle simulations with fast initial load times and battery efficiency on mobile devices.",
    learnings:
      "Three.js scene graph management, WebGL shaders, camera interpolation (Lerp), and spatial storytelling UI.",
    content: `## 📌 Rahul Developer 3D Experience

An award-caliber WebGL 3D developer portfolio demonstrating spatial visual storytelling and interactive graphics programming.

### ⚡ Key Features
- **Interactive 3D Geometry**: Shaders and particle systems reacting to cursor and touch coordinates.
- **Narrative Storyline**: Section-by-section visual progression through design, engineering, and 3D dimensions.
- **Fluid Layout Transitions**: Seamless blending between 3D canvas viewport and HTML content overlays.

### 🚀 Production Deployment
- **Live Vercel Site**: [https://rahul-devloper.vercel.app/](https://rahul-devloper.vercel.app/)
- **Repository**: [https://github.com/dasrahulprasad05-dev/rahul_devloper](https://github.com/dasrahulprasad05-dev/rahul_devloper)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    technologies: [
      { id: "t1", name: "Next.js" },
      { id: "t6", name: "TypeScript" },
      { id: "t5", name: "Tailwind CSS" },
      { id: "t2", name: "React" },
    ],
  },
];

export const fallbackSkills: { skills: Skill[]; grouped: Record<string, Skill[]> } = {
  skills: [
    { id: "s1", name: "RAG & Vector Search", category: "AI/ML", level: "proficient", order: 1 },
    { id: "s2", name: "Large Language Models (LLM)", category: "AI/ML", level: "proficient", order: 2 },
    { id: "s3", name: "Machine Learning (Supervised/Unsupervised)", category: "AI/ML", level: "proficient", order: 3 },
    { id: "s4", name: "Natural Language Processing (NLP)", category: "AI/ML", level: "proficient", order: 4 },
    { id: "s5", name: "Deep Learning (CNN / Transformers)", category: "AI/ML", level: "practicing", order: 5 },
    { id: "s6", name: "React 19 & Next.js 16", category: "Development", level: "expert", order: 1 },
    { id: "s7", name: "TypeScript", category: "Development", level: "proficient", order: 2 },
    { id: "s8", name: "Node.js & Express.js", category: "Development", level: "proficient", order: 3 },
    { id: "s9", name: "Tailwind CSS v4 & Framer Motion", category: "Development", level: "expert", order: 4 },
    { id: "s10", name: "PostgreSQL & Prisma ORM", category: "Development", level: "proficient", order: 5 },
    { id: "s11", name: "Python", category: "Data", level: "expert", order: 1 },
    { id: "s12", name: "SQL & Relational Modeling", category: "Data", level: "proficient", order: 2 },
    { id: "s13", name: "Pandas & NumPy", category: "Data", level: "proficient", order: 3 },
    { id: "s14", name: "Scikit-Learn", category: "Data", level: "proficient", order: 4 },
    { id: "s15", name: "Git & GitHub Version Control", category: "Tools", level: "expert", order: 1 },
    { id: "s16", name: "Vercel & Supabase Cloud", category: "Tools", level: "expert", order: 2 },
  ],
  grouped: {
    "AI/ML": [
      { id: "s1", name: "RAG & Vector Search", category: "AI/ML", level: "proficient", order: 1 },
      { id: "s2", name: "Large Language Models (LLM)", category: "AI/ML", level: "proficient", order: 2 },
      { id: "s3", name: "Machine Learning (Supervised/Unsupervised)", category: "AI/ML", level: "proficient", order: 3 },
      { id: "s4", name: "Natural Language Processing (NLP)", category: "AI/ML", level: "proficient", order: 4 },
      { id: "s5", name: "Deep Learning (CNN / Transformers)", category: "AI/ML", level: "practicing", order: 5 },
    ],
    Development: [
      { id: "s6", name: "React 19 & Next.js 16", category: "Development", level: "expert", order: 1 },
      { id: "s7", name: "TypeScript", category: "Development", level: "proficient", order: 2 },
      { id: "s8", name: "Node.js & Express.js", category: "Development", level: "proficient", order: 3 },
      { id: "s9", name: "Tailwind CSS v4 & Framer Motion", category: "Development", level: "expert", order: 4 },
      { id: "s10", name: "PostgreSQL & Prisma ORM", category: "Development", level: "proficient", order: 5 },
    ],
    Data: [
      { id: "s11", name: "Python", category: "Data", level: "expert", order: 1 },
      { id: "s12", name: "SQL & Relational Modeling", category: "Data", level: "proficient", order: 2 },
      { id: "s13", name: "Pandas & NumPy", category: "Data", level: "proficient", order: 3 },
      { id: "s14", name: "Scikit-Learn", category: "Data", level: "proficient", order: 4 },
    ],
    Tools: [
      { id: "s15", name: "Git & GitHub Version Control", category: "Tools", level: "expert", order: 1 },
      { id: "s16", name: "Vercel & Supabase Cloud", category: "Tools", level: "expert", order: 2 },
    ],
  },
};

export const fallbackEducation: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
    institution: "Ajay Binay Institute of Technology (ABIT), Cuttack",
    location: "Cuttack, Odisha, India",
    startYear: "2023",
    endYear: "2027",
    description:
      "Specializing in Full-Stack Web Architecture, Artificial Intelligence, and Applied Machine Learning. Creator and Lead Developer of the official ABIT EventHub platform.",
    grade: "8.6 CGPA",
    current: true,
    order: 1,
  },
  {
    id: "edu-2",
    degree: "Higher Secondary Examination (12th Science)",
    institution: "Council of Higher Secondary Education, Odisha",
    location: "Odisha, India",
    startYear: "2021",
    endYear: "2023",
    description:
      "Major in Physics, Chemistry, Mathematics, and Computer Science with strong foundation in analytical logic.",
    grade: "First Division",
    current: false,
    order: 2,
  },
];

export const fallbackAchievements: Achievement[] = [
  {
    id: "ach-1",
    title: "Built & Deployed Official ABIT EventHub",
    organization: "Ajay Binay Institute of Technology, Cuttack",
    date: "2025",
    description:
      "Architected and launched the official college fest ticketing platform with in-browser QR scanners used by hundreds of students.",
    category: "launch",
    verificationUrl: "https://abit-anual-function.vercel.app/",
    order: 1,
  },
  {
    id: "ach-2",
    title: "Creator of Swasthya Sathi AI",
    organization: "Public Health AI Initiative",
    date: "2025",
    description:
      "Engineered voice-enabled regional healthcare assistant supporting Odia and Hindi with clinical RAG guardrails.",
    category: "hackathon",
    verificationUrl: "https://swasthya-sathi-ai-five.vercel.app/",
    order: 2,
  },
  {
    id: "ach-3",
    title: "Machine Learning Specialization",
    organization: "Coursera & DeepLearning.AI",
    date: "2024",
    description:
      "Mastered supervised learning, neural networks, decision trees, and unsupervised learning algorithms.",
    category: "certification",
    order: 3,
  },
];

export const fallbackTimeline: { events: TimelineEvent[]; grouped: Record<string, TimelineEvent[]> } = {
  events: [
    { id: "tl-1", year: "2023", month: "Aug", title: "Enrolled in B.Tech CSE at ABIT Cuttack", description: "Began engineering journey with deep focus on computing fundamentals, algorithms, and software design.", category: "education", order: 1 },
    { id: "tl-2", year: "2024", month: "Feb", title: "Full-Stack Development (React & Node.js)", description: "Constructed full-stack web applications with modern frontend frameworks and backend REST APIs.", category: "skill", order: 2 },
    { id: "tl-3", year: "2025", month: "Jan", title: "Launched ABIT EventHub", description: "Developed and deployed the official college fest QR ticketing portal with in-browser camera scanning.", category: "project", order: 3 },
    { id: "tl-4", year: "2025", month: "Mar", title: "Engineered Swasthya Sathi AI", description: "Pioneered voice-first multilingual healthcare assistant for Odisha with native Odia NLP and RAG pipelines.", category: "project", order: 4 },
    { id: "tl-5", year: "2026", month: "Oct", title: "Full-Stack Portfolio & CMS Launch", description: "Architected modern developer portfolio and content management system with Next.js 16 and Express 5.", category: "milestone", order: 5 },
  ],
  grouped: {
    "2023": [
      { id: "tl-1", year: "2023", month: "Aug", title: "Enrolled in B.Tech CSE at ABIT Cuttack", description: "Began engineering journey with deep focus on computing fundamentals, algorithms, and software design.", category: "education", order: 1 },
    ],
    "2024": [
      { id: "tl-2", year: "2024", month: "Feb", title: "Full-Stack Development (React & Node.js)", description: "Constructed full-stack web applications with modern frontend frameworks and backend REST APIs.", category: "skill", order: 2 },
    ],
    "2025": [
      { id: "tl-3", year: "2025", month: "Jan", title: "Launched ABIT EventHub", description: "Developed and deployed the official college fest QR ticketing portal with in-browser camera scanning.", category: "project", order: 3 },
      { id: "tl-4", year: "2025", month: "Mar", title: "Engineered Swasthya Sathi AI", description: "Pioneered voice-first multilingual healthcare assistant for Odisha with native Odia NLP and RAG pipelines.", category: "project", order: 4 },
    ],
    "2026": [
      { id: "tl-5", year: "2026", month: "Oct", title: "Full-Stack Portfolio & CMS Launch", description: "Architected modern developer portfolio and content management system with Next.js 16 and Express 5.", category: "milestone", order: 5 },
    ],
  },
};

export const fallbackBuildLogs: BuildLog[] = [
  {
    id: "bl-1",
    date: new Date().toISOString(),
    title: "Full-Stack Portfolio & CMS Architecture",
    content: "## Portfolio Architecture with Next.js 16 & Express 5\n\n- Engineered modular full-stack monorepo with Next.js 16 (Turbopack) frontend and dedicated Express TypeScript backend.\n- Synchronized database with 10 production projects, real live Vercel deployments, and verified GitHub repositories.",
    tags: "nextjs16,prisma,fullstack,cms",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackSettings: Record<string, string> = {
  site_title: "Rahul Prasad Das",
  site_tagline: "Full-Stack Developer & AI/ML Engineer",
  site_description: "Building high-performance web applications, voice AI assistants, and production-grade full-stack systems.",
  hero_title: "BUILDING WITH AI.\nSHAPING THE WEB.",
  hero_subtitle: "Full-Stack Development • AI/ML & RAG • System Design",
  currently_building_title: "Swasthya Sathi AI & ABIT EventHub",
  currently_building_description: "Multilingual AI healthcare assistant and high-concurrency event ticketing systems.",
  currently_learning: "Agentic AI → Next.js 16 Architecture → Production LLMs",
  currently_preparing: "Full-Stack & AI/ML Software Engineering",
  current_goal: "Software Engineering & AI/ML Opportunities",
  resume_url: "/resume.pdf",
  contact_email: "dasrahulprasad05@gmail.com",
  github_url: "https://github.com/dasrahulprasad05-dev",
  linkedin_url: "https://linkedin.com/in/rahul-prasad-das",
  instagram_url: "https://www.instagram.com/the___cyber__rahul/",
  about_text: "I'm Rahul Prasad Das, a B.Tech Computer Science student at Ajay Binay Institute of Technology (ABIT), Cuttack, passionate about Full-Stack Engineering, Artificial Intelligence, and building impactful real-world software.\n\nI created ABIT EventHub—the official event ticketing and in-browser QR scanning platform for our college fest—and Swasthya Sathi AI, an accessible voice-enabled public healthcare companion for Odisha with native Odia NLP.\n\nMy focus spans modern web architecture (Next.js 16, React 19, TypeScript, PostgreSQL, Prisma), AI/ML systems (RAG pipelines, LLMs, computer vision), and building tools that deliver measurable utility to thousands of users.",
};
