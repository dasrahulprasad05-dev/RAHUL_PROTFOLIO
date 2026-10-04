# 🚀 Rahul Prasad Das — Full-Stack Portfolio & CMS

A state-of-the-art developer portfolio and content management platform built with **Next.js 16 (App Router + Turbopack)**, **Tailwind CSS v4**, **Framer Motion**, and an **Express.js + Prisma ORM** backend.

---

## 🌟 Key Highlights

- **⚡ Modern Frontend**: Next.js 16 with App Router, Turbopack, Framer Motion animations, and dark mode design system.
- **🛠️ Dedicated REST API**: Express.js server with TypeScript, modular routing, and rate limiting.
- **🗄️ Relational Database & ORM**: Prisma ORM with SQLite for zero-config local development, seamlessly switchable to PostgreSQL in production.
- **📊 Interactive Admin CMS**: Secured admin dashboard to manage projects, build logs, messages, timeline, and site settings in real-time.
- **🧪 The Lab**: Live interactive demos and AI experiments right inside the portfolio.
- **📈 Analytics & Activity**: Built-in privacy-conscious page view tracking and build log timeline.

---

## 🏗️ Architecture & Tech Stack

```
d:\RAHUL PROTFOLIO/
├── frontend/                  # Next.js 16 App Router Frontend
│   ├── src/
│   │   ├── app/               # Pages & Routes
│   │   │   ├── page.tsx       # Landing & Hero Section
│   │   │   ├── about/         # About & Story
│   │   │   ├── work/          # Featured Projects & Detail [slug]
│   │   │   ├── skills/        # Technical Skills & Proficiencies
│   │   │   ├── resume/        # Interactive & Downloadable Resume
│   │   │   ├── lab/           # Interactive Experiments & AI Demos
│   │   │   ├── journey/       # Career & Educational Timeline
│   │   │   ├── contact/       # Contact Form with Backend Sync
│   │   │   └── admin/         # Full CMS Dashboard & Managers
│   │   ├── components/        # Reusable UI components & Icons
│   │   └── lib/               # API client & TypeScript interfaces
│   └── package.json
│
└── backend/                   # Express.js REST API
    ├── prisma/
    │   ├── schema.prisma      # 15 Database Models
    │   └── seed.ts            # Realistic data seeder
    ├── src/
    │   ├── controllers/       # Business logic for all resources
    │   ├── middleware/        # Auth, error handling, rate limiting
    │   ├── routes/            # REST API endpoints
    │   └── server.ts          # Express entrypoint
    └── package.json
```

### Tech Stack Details

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16, TypeScript, React 19, Tailwind CSS v4, Framer Motion, Lucide React |
| **Backend** | Node.js, Express.js 5, TypeScript, tsx, CORS, Cookie Parser, Zod |
| **Database & ORM** | Prisma ORM 6, SQLite (dev) / PostgreSQL (production ready) |
| **Authentication** | JWT, bcryptjs |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **pnpm** / **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/dasrahulprasad05-dev/RAHUL_PROTFOLIO.git
cd RAHUL_PROTFOLIO
```

### 2. Setup & Start Backend
```bash
cd backend
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```
> The API will be running at `http://localhost:5000`

### 3. Setup & Start Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
> The web application will be live at `http://localhost:3000`

---

## 🛡️ Admin CMS Credentials (Local Development)

- **Login URL**: `http://localhost:3000/login`
- **Email**: `rahul@admin.com`
- **Password**: `admin123`

---

## 📌 Featured Project: Swasthya Sathi AI

Multilingual AI Healthcare Assistant utilizing Retrieval-Augmented Generation (RAG) to provide accessible, verified medical guidance in regional Indian languages with emergency triage guardrails.
- **Repository**: [dasrahulprasad05-dev/SWASTHYA_SATHI_AI](https://github.com/dasrahulprasad05-dev/SWASTHYA_SATHI_AI)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
