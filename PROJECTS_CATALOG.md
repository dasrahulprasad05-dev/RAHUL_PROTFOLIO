# 📚 Rahul Prasad Das — Complete Projects Knowledge Base & Catalog

A comprehensive, production-grade catalog of all projects developed by **Rahul Prasad Das**. This document serves as the single source of truth for portfolio showcases, resume case studies, and recruiter deep-dives.

---

## 📑 Quick Navigation

1. [ABIT EventHub](#1-abit-eventhub) (`Live Vercel` · `Full Stack`)
2. [Swasthya Sathi AI](#2-swasthya-sathi-ai) (`Live Vercel` · `AI / RAG`)
3. [Arogya Sahayak](#3-arogya-sahayak) (`Live Vercel` · `AI / HealthTech`)
4. [Nexus Student Management](#4-nexus-student-management) (`Live Vercel` · `EdTech / SaaS`)
5. [CAMPUSLINK — Placement Intelligence](#5-campuslink--placement-intelligence-platform) (`Live Vercel` · `Enterprise / EdTech`)
6. [NatureSip Premium](#6-naturesip-premium) (`Live Vercel` · `3D E-Commerce`)
7. [Unified Marketplace — Buy Your Project](#7-unified-marketplace--buy-your-project) (`Live Vercel` · `Digital Marketplace`)
8. [HealthGuard — Disease Diagnostic Engine](#8-healthguard--predictive-diagnostic-engine) (`Machine Learning / Python`)
9. [Fresh Basket — Hyperlocal Grocery](#9-fresh-basket--hyperlocal-grocery-platform) (`Full Stack E-Commerce`)
10. [Rahul Creative 3D Portfolio](#10-rahul-creative-3d-portfolio) (`Live Vercel` · `WebGL / Three.js`)

---

## 1. ABIT EventHub

- **Project Name**: ABIT EventHub
- **Short Tagline**: Official Event Management & In-Browser QR Ticketing Platform for AJAY BINAY INSTITUTE OF TECHNOLOGY, Cuttack.
- **Project Category**: Full-Stack Web Application
- **Status**: Completed / In Production
- **GitHub Repository**: [https://github.com/dasrahulprasad05-dev/ABIT_ANUAL_FUNCTION](https://github.com/dasrahulprasad05-dev/ABIT_ANUAL_FUNCTION)
- **Live Vercel URL ⭐**: [https://abit-anual-function.vercel.app/](https://abit-anual-function.vercel.app/)
- **Tags**: `Next.js 16`, `PostgreSQL`, `Prisma ORM`, `QR Code Scanner`, `Tailwind CSS`, `Nodemailer`, `Authentication`

### What Problem It Solves
College cultural and technical fests suffer from chaotic manual registrations, long physical entry queues, forged ticket passes, and unverified student attendance. Organizers lack real-time visibility into hall capacity and entry validation.

### What You Built
A high-throughput event management platform enabling students to explore 20+ fest events, register with automatic capacity checks, receive cryptographically secure QR ticket passes via email, and allow fest coordinators to scan and check-in attendees via in-browser camera scanners in under 2 seconds.

### Key Features
- **Instant Digital Passes**: Generates a dynamic, tamper-evident QR code ticket for each verified student registration.
- **In-Browser Camera QR Scanner**: Built-in `html5-qrcode` camera integration allowing coordinators to authenticate tickets live on mobile or laptop browsers without any external scanner hardware.
- **Automated Email Pass Delivery**: Dispatches email tickets with event schedules and QR passes via Nodemailer.
- **Role-Based Access**: Coordinator dashboard for entry validation, capacity monitoring, and live attendance metrics vs. student registration views.
- **Event Capacity Controls**: Automatically marks events as full when seating quotas are reached to prevent overbooking.

### Actual Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React
- **Backend & Database**: Next.js Server Actions, PostgreSQL via `@prisma/adapter-pg`, Prisma ORM 6, bcryptjs
- **Hardware Integration**: HTML5 MediaStream API / `html5-qrcode`

### Architecture & How It Works
Student signs up & registers for event ➔ Server Action writes record to PostgreSQL via Prisma ➔ QR payload is signed and email is dispatched ➔ Event day: Coordinator opens `/scan` route on phone camera ➔ Video feed scans QR code ➔ API validates ticket against DB and prevents duplicate check-ins.

### Your Contribution
- Engineered the end-to-end full-stack architecture from database schema to responsive frontend.
- Implemented the camera-based QR scanning pipeline with real-time visual feedback (beep + green/red badge).
- Designed the PostgreSQL relational schema linking students, tickets, and events.

### Challenges & Solutions
- *Challenge*: Scanning QR codes in poor lighting or high-glare environments at fest venue doors.
- *Solution*: Fine-tuned scanner sampling rates and added a high-contrast inverted viewfinder with flashlight toggle support.

---

## 2. Swasthya Sathi AI

- **Project Name**: Swasthya Sathi AI
- **Short Tagline**: Multilingual Public Health Assistant for Odisha & India delivering voice-enabled healthcare guidance in regional languages.
- **Project Category**: AI / Healthcare / Public Tech
- **Status**: Active / Featured
- **GitHub Repository**: [https://github.com/dasrahulprasad05-dev/SWASTHYA_SATHI_AI](https://github.com/dasrahulprasad05-dev/SWASTHYA_SATHI_AI)
- **Live Vercel URL ⭐**: [https://swasthya-sathi-ai-five.vercel.app/](https://swasthya-sathi-ai-five.vercel.app/)
- **Tags**: `AI/ML`, `RAG`, `Odia NLP`, `Next.js`, `LLM`, `Public Health`, `Voice AI`, `Tailwind CSS`

### What Problem It Solves
Over 70% of rural and semi-urban populations in Odisha struggle with English-only digital healthcare tools, medical jargon, and rampant health misinformation. Critical health schemes (BSKY, Ayushman Bharat) are often underutilized due to lack of awareness.

### What You Built
An accessible, voice-first public healthcare assistant that understands and speaks Odia, Hindi, and English. It uses Retrieval-Augmented Generation (RAG) grounded in verified clinical guidance to perform symptom triage, explain health schemes, and connect patients to nearby hospitals.

### Key Features
- **Native Odia & Multilingual Support**: Communicates natively in Odia (ଓଡ଼ିଆ), Hindi, and English.
- **Voice-First Accessibility**: Speech-to-text and text-to-speech for elderly and non-literate citizens.
- **Clinical Urgency Triage**: Classifies conditions into Mild, Moderate, or Critical (Red Alert) with immediate emergency hotline routing.
- **Government Scheme Guide**: Step-by-step eligibility verification for Biju Swasthya Kalyan Yojana (BSKY) and Ayushman Bharat.
- **Hospital & Ambulance Locator**: Direct click-to-call for 108/102 emergency ambulance services in Odisha.

### Actual Tech Stack
- **Frontend**: Next.js 16, TypeScript, Tailwind CSS, Lucide React
- **AI & NLP**: LangChain, Groq Llama 3 / Google Gemini API, Web Speech API (Voice synthesis & transcription)
- **Knowledge Retrieval**: Vector embeddings on verified Indian public health protocols

### Architecture & How It Works
User speaks or types in Odia/Hindi ➔ Voice recognized by Speech API ➔ Query sent to RAG pipeline ➔ Knowledge base retrieves verified clinical treatment advisories ➔ LLM formats simple, compassionate advice with a mandatory medical disclaimer.

### Challenges & Solutions
- *Challenge*: Accurately understanding Odia medical terminology and colloquial expressions.
- *Solution*: Implemented dual-stage phonetic normalization and prompt engineering with domain-specific Odia medical lexicons.

---

## 3. Arogya Sahayak

- **Project Name**: Arogya Sahayak
- **Short Tagline**: Multimodal AI Healthcare Companion with 16 on-device diagnostic scanners, clinical triage, and doctor consultations.
- **Project Category**: AI / HealthTech
- **Status**: Completed / Featured
- **GitHub Repository**: [https://github.com/dasrahulprasad05-dev/Arogya_sahayak](https://github.com/dasrahulprasad05-dev/Arogya_sahayak)
- **Live Vercel URL ⭐**: [https://arogya-sahayak-ten.vercel.app/](https://arogya-sahayak-ten.vercel.app/)
- **Tags**: `React`, `TypeScript`, `Computer Vision`, `Medical AI`, `Tailwind CSS`, `Radix UI`, `Vite`

### What Problem It Solves
Primary health centers in rural districts lack specialist doctors (dermatologists, ophthalmologists, cardiologists), forcing patients to travel hundreds of kilometers for basic screenings.

### What You Built
A multimodal health companion that runs client-side visual assessment scanners, guides users through structured clinical symptom checklists, generates downloadable medical summary PDFs, and connects patients with doctors.

### Key Features
- **16 Diagnostic AI Scanner Modules**: Visual screening modules for skin anomalies, nail symptoms, eye conditions, and posture.
- **Doctor Consultation Booking**: Integrated appointment scheduler with specialty matching.
- **Emergency SOS Dispatch**: One-tap emergency beacon that packages the user's GPS coordinates and emergency contacts into an alert.
- **Digital Health Locker**: Secure client-side storage for prescriptions, lab tests, and clinical histories.

### Actual Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Radix UI Primitives, Lucide React
- **Diagnostics**: Computer Vision classification pipelines, PDF generation, QR Code sharing

---

## 4. Nexus Student Management

- **Project Name**: Nexus Portal
- **Short Tagline**: Next-Gen Student Management & Academic ERP with AI tutors, QR attendance, and gamified progress.
- **Project Category**: EdTech / SaaS
- **Status**: Completed
- **GitHub Repository**: [https://github.com/dasrahulprasad05-dev/nexus_student_management](https://github.com/dasrahulprasad05-dev/nexus_student_management)
- **Live Vercel URL ⭐**: [https://nexus-student-management.vercel.app/](https://nexus-student-management.vercel.app/)
- **Tags**: `React`, `Supabase`, `TanStack Query`, `Framer Motion`, `Gamification`, `TypeScript`, `Tailwind CSS`

### What Problem It Solves
Legacy college student portals are clunky, mobile-unfriendly, and lack student engagement. Students miss deadlines, lose track of attendance percentages, and have no centralized academic companion.

### What You Built
A modern, gamified student management SaaS portal featuring XP progression, streak tracking, instant QR lecture attendance, grade calculation, and an integrated AI academic tutor.

### Key Features
- **Gamified Academic Profiles**: Students earn XP, maintain daily study streaks, and unlock achievement badges as they complete assignments and maintain attendance.
- **Smart QR Attendance**: Generates rotating security tokens to ensure attendees are physically present during attendance checks.
- **AI Academic Tutor**: 24/7 subject assistant explaining complex engineering concepts.
- **GPA & Performance Analytics**: Interactive visual charts tracking semester-by-semester progress.
- **Assignment Tracker**: Countdown alerts for deadlines with submission verification.

### Actual Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, TanStack React Query, Framer Motion, Canvas Confetti
- **Backend**: Supabase (PostgreSQL, Row Level Security, Auth), Edge Functions

---

## 5. CAMPUSLINK — Placement Intelligence Platform

- **Project Name**: CAMPUSLINK (CampusFlow)
- **Short Tagline**: AI-powered campus-to-corporate placement intelligence, readiness scoring, and skill-gap analysis.
- **Project Category**: Enterprise EdTech
- **Status**: Completed
- **Live Vercel URL ⭐**: [https://campus-link-rahul.vercel.app/](https://campus-link-rahul.vercel.app/) *(Also deployed at [https://campus-flow-sand-five.vercel.app/](https://campus-flow-sand-five.vercel.app/))*
- **Tags**: `Placement Tech`, `Next.js`, `Analytics`, `Role-Based Access`, `Resume Matcher`, `Tailwind CSS`

### What Problem It Solves
Training and Placement Offices (TPOs) struggle with managing hundreds of student profiles, manually checking CGPA eligibility for recruiters, and identifying which skills students lack before placement season.

### What You Built
A tri-portal platform connecting Students, TPO Administrators, and Corporate Recruiters with automated recruitment drive filtering, resume screening, readiness index scores, and placement stats.

### Key Features
- **Placement Readiness Index (PRI)**: Algorithmic score ranking students based on coding skills, academic standing, and projects.
- **Automated Drive Eligibility Matcher**: Instantly notifies students when they meet criteria for incoming recruitment drives (Google, TCS, Infosys, etc.).
- **TPO Management Console**: Real-time exportable reports of eligible, placed, and unplaced candidates.
- **Four Connected Portals**: Role-based access for Students, Faculty, TPO, and Recruiters.

---

## 6. NatureSip Premium

- **Project Name**: NatureSip Premium
- **Short Tagline**: Immersive 3D Animated Artisanal Beverage Showcase and High-Conversion E-Commerce Storefront.
- **Project Category**: Creative Development / E-Commerce
- **Status**: Completed
- **GitHub Repository**: [https://github.com/dasrahulprasad05-dev/Naure__sip_premium](https://github.com/dasrahulprasad05-dev/Naure__sip_premium)
- **Live Vercel URL ⭐**: [https://naure-sip-premium.vercel.app/](https://naure-sip-premium.vercel.app/)
- **Tags**: `Creative Dev`, `3D CSS`, `Vite`, `UI/UX`, `Micro-Interactions`, `Performance`

### What Problem It Solves
Conventional direct-to-consumer beverage websites suffer from high bounce rates and flat product displays that fail to convey product craftsmanship and taste appeal.

### What You Built
An ultra-fluid, 60 FPS interactive e-commerce product experience featuring simulated 3D bottle rotation, floating ingredient physics, dynamic flavor switches, and smooth micro-interactions.

### Key Features
- **Dynamic Flavor Matrix**: Seamless theme switching between signature fruit blends (Cherry Blossom, Golden Mango, Wild Strawberry).
- **Interactive Botanical Breakdown**: Floating ingredient cards displaying nutritional benefits and antioxidant profiles.
- **Scroll-Driven Parallax**: Smooth fluid animations that react to user scroll depth.
- **Optimized Asset Pipeline**: 95+ Google Lighthouse performance score with zero layout shift.

---

## 7. Unified Marketplace — Buy Your Project

- **Project Name**: Unified Marketplace (Buy Your Project)
- **Short Tagline**: Curated digital marketplace for engineering capstone projects, source code, and deployment guides.
- **Project Category**: Digital Products Marketplace
- **Status**: Completed
- **GitHub Repository**: [https://github.com/dasrahulprasad05-dev/UNIFIED-MARKETPLACE](https://github.com/dasrahulprasad05-dev/UNIFIED-MARKETPLACE)
- **Live Vercel URL ⭐**: [https://buy-your-project.vercel.app/](https://buy-your-project.vercel.app/)
- **Tags**: `E-Commerce`, `Web Marketplace`, `Digital Goods`, `Tailwind CSS`, `JavaScript`

### What Problem It Solves
Engineering students and junior developers frequently get stuck when building final year capstone projects, lacking reliable repositories with complete source code, installation walk-throughs, and live demo sandboxes.

### What You Built
A marketplace where users can browse verified developer projects across AI/ML, Full Stack, and Web3, interact with live demo embeds, inspect architectural specifications, and acquire starter source code.

### Key Features
- **Live Demo Previewer**: Integrated preview frames allowing buyers to test apps before acquiring code.
- **Category & Stack Filtering**: Filter by Python, React, Next.js, AI/ML, or IoT.
- **Custom Project Commissioning**: Built-in consultation form allowing students to request bespoke project builds.
- **Instant Documentation Bundles**: Each project includes README installation guides, database schemas, and presentation decks.

---

## 8. HealthGuard — Predictive Diagnostic Engine

- **Project Name**: HealthGuard
- **Short Tagline**: Supervised Machine Learning Health Monitoring and Early Chronic Disease Detection Pipeline.
- **Project Category**: Machine Learning / Data Science
- **Status**: Completed
- **GitHub Repository**: [https://github.com/dasrahulprasad05-dev/HEALTHGUARD](https://github.com/dasrahulprasad05-dev/HEALTHGUARD)
- **Tags**: `Python`, `Machine Learning`, `Scikit-Learn`, `Pandas`, `XGBoost`, `Healthcare Data`

### What Problem It Solves
Early onset symptoms of chronic conditions (cardiovascular disease, diabetes, hypertension) frequently go undetected in standard routine checkups until irreversible organ damage occurs.

### What You Built
An end-to-end predictive healthcare engine trained on clinical biomarker datasets that outputs probabilistic risk assessments and explains which biometric indicators contributed most to the risk score.

### Key Features
- **Multi-Disease Risk Prediction**: Validated models for diabetes onset, heart disease probability, and hypertension.
- **Biomarker Importance Analysis**: Feature importance plots showing how blood glucose, BMI, age, and lipid profiles influence predictions.
- **Automated Data Cleaning Pipeline**: Handles missing medical values, outliers, and feature scaling.
- **Actionable Health Recommendations**: Generates tailored preventative guidance based on output risk tiers.

---

## 9. Fresh Basket — Hyperlocal Grocery Platform

- **Project Name**: Fresh Basket
- **Short Tagline**: Farm-to-table hyperlocal grocery platform connecting local producers directly to consumers.
- **Project Category**: Full Stack E-Commerce
- **Status**: Completed
- **GitHub Repository**: [https://github.com/dasrahulprasad05-dev/Fresh-basket](https://github.com/dasrahulprasad05-dev/Fresh-basket)
- **Tags**: `TypeScript`, `React`, `Node.js`, `REST API`, `E-Commerce`, `Cart System`

### What Problem It Solves
Supply chain inefficiencies in grocery distribution degrade the freshness of produce and eat away farmer margins through excessive broker fees.

### What You Built
A localized e-commerce storefront allowing customers to purchase fresh organic produce directly with scheduled same-day delivery slots and automated cart calculation.

### Key Features
- **Live Inventory Tracking**: Dynamic stock counts that prevent over-ordering of perishable goods.
- **Delivery Slot Scheduler**: User-selected delivery time windows (Morning / Evening fresh batches).
- **Categorized Produce Filter**: Fast search and filtering by organic vegetables, fruits, dairy, and farm staples.
- **Order History & Status Tracking**: Real-time state management from packing to delivery.

---

## 10. Rahul Creative 3D Portfolio

- **Project Name**: Rahul Developer 3D Experience
- **Short Tagline**: Immersive 3D creative developer portfolio showcasing WebGL, Three.js, and interactive storytelling.
- **Project Category**: Creative Portfolio
- **Status**: Completed
- **GitHub Repository**: [https://github.com/dasrahulprasad05-dev/rahul_devloper](https://github.com/dasrahulprasad05-dev/rahul_devloper)
- **Live Vercel URL ⭐**: [https://rahul-devloper.vercel.app/](https://rahul-devloper.vercel.app/)
- **Tags**: `Three.js`, `WebGL`, `Creative Dev`, `3D Animations`, `Next.js`, `Tailwind CSS`

### What Problem It Solves
Standard static resume portfolios fail to demonstrate advanced frontend craft, spatial UI design, and creative shader coding capabilities.

### What You Built
A WebGL-powered 3D interactive portfolio featuring dynamic particle fields, camera fly-through sequences, interactive 3D assets, and engaging narrative-driven developer presentation.

### Key Features
- **Interactive 3D Geometry**: Shaders and particle systems reacting to cursor and touch coordinates.
- **Narrative Storyline**: Section-by-section visual progression through design, engineering, and 3D dimensions.
- **Fluid Layout Transitions**: Seamless blending between 3D canvas viewport and HTML content overlays.

---
*Catalog maintained by Rahul Prasad Das · Last Updated: 2026*
