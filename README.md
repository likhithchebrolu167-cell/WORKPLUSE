# WORKPULSE — Smart Employee Productivity Tracking System
> **Smarter Teams. Better Performance.**  
> *A Production-Quality SaaS Platform for Workforce Telemetry, Task Velocity & Milestone Analytics*

---

## 🌟 Executive Project Overview

**WORKPULSE** is an enterprise-grade Employee Productivity Tracking and Analytics platform built for major project evaluation and commercial SaaS demonstration. Taking direct visual and interaction inspiration from **Linear**, **Stripe**, **Notion**, and **Vercel**, WORKPULSE avoids generic dashboard layouts in favor of an expensive, refined aesthetic:
- **Deep Navy Palette:** `#101426` (Deep Navy), `#151B30` (Sidebar / Dark Cards), `#795CF6` (Primary Violet), `#4285F4` (Electric Blue), `#F5F6FA` (Light Background), `#22C58B` (Success Green), `#F5A623` (Warning Orange), `#F05B67` (Danger Red).
- **Typography:** Inter & Plus Jakarta Sans with strict typographic scale and readable numbers.
- **Micro-Interactions:** Smooth KPI hover states, animated counter effects, SVG sparklines, live second tickers, and status badges.
- **Transparent Mathematical Formulas:** All productivity scoring separates **Task Completion Rate** from **On-Time Milestone Velocity** instead of arbitrary black-box scoring.
- **Zero Spyware Guarantee:** User-initiated work sessions and transparent clock-ins/outs with zero keystroke or silent background harvesting.

---

## ☁️ Google Cloud & Firebase Publishing Guide

WorkPulse is pre-configured with Google Cloud native deployment descriptors:
- **Google Firebase Hosting:** [`firebase.json`](file:///d:/MINE/workpulse/firebase.json) & [`.firebaserc`](file:///d:/MINE/workpulse/.firebaserc)
- **Google Cloud Run:** [`Dockerfile`](file:///d:/MINE/workpulse/Dockerfile)
- **Google App Engine:** [`app.yaml`](file:///d:/MINE/workpulse/app.yaml)

### Option 1: Publish to Google Firebase Hosting (Free Global CDN)
Run this single command from the `workpulse` folder:
```bash
npm run publish:google
```
*Or double-click [`publish-to-google.bat`](file:///d:/MINE/workpulse/publish-to-google.bat).*

**What happens:**
1. Automatically compiles production React assets into `client/dist`.
2. Opens your browser to authenticate with your Google account.
3. Deploys the application directly to Google's worldwide Edge CDN, generating a public live URL:
   `https://<your-project>.web.app` and `https://<your-project>.firebaseapp.com`

---

## 🌐 Network Access (Multi-Device / Mobile / Faculty Tablets)

The server is exposed to your local network (`0.0.0.0`). Any device (smartphone, tablet, laptop) connected to the same Wi-Fi network can access the application:

| Service | Local Address | Network Address (Any Device on Wi-Fi) | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Application** | `http://localhost:5173` | **`http://192.168.1.10:5173`** | **LIVE** |
| **Backend REST API** | `http://localhost:5000/api` | **`http://192.168.1.10:5000/api`** | **LIVE** |

> 📱 Open **`http://192.168.1.10:5173`** on your mobile browser (Safari, Chrome, etc.) to experience the fully responsive mobile navigation with the collapsible side drawer.

---

## 🚀 Live Demo Credentials

| Role | Name | Email | Password | Default Portal |
| :--- | :--- | :--- | :--- | :--- |
| **Administrator** | Sarah Jenkins (VP Operations) | `admin@workpulse.io` | `admin123` | Overview & Admin Analytics (`/`) |
| **Employee** | Alex Rivera (Sr. Frontend Engineer) | `alex.rivera@workpulse.io` | `employee123` | Employee Self-Service Portal (`/employee-portal`) |

> ⚡ **Faculty Demonstration Feature:** When running the application, use the **1-Click Demo Login** buttons on the Login page, or the **"Admin View / Employee View"** pill switcher in the top navigation bar to toggle between roles without having to log in and out!

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 (Vite 5)
- **Styling:** Tailwind CSS 3 (configured with custom enterprise palettes and dark mode support)
- **Charts & Data Visualizations:** Recharts (Multi-series Area charts, Donut charts, Bar charts, Sparklines)
- **Icons:** Lucide React (over 40 contextual icons)
- **Transitions:** Framer Motion & CSS custom keyframes
- **Routing:** React Router v6 (Protected routes, dynamic breadcrumbs, role authorization)

### Backend
- **Runtime:** Node.js (v20+ / v24)
- **Web Framework:** Express.js 4 (RESTful API, CORS, JSON body parser)
- **Database & Persistence:** Dual-Persistence Architecture:
  1. **MongoDB & Mongoose:** Connects directly to `mongodb://127.0.0.1:27017/workpulse`.
  2. **High-Fidelity Realtime Memory Fallback:** If MongoDB is not running locally, the backend seamlessly activates an In-Memory data engine seeded with 25 employees, 5 departments, 40 tasks, 30 days of attendance, and activity logs. **The application never throws a 500 error during faculty presentations.**
- **Authentication:** JWT (JSON Web Tokens) with 7-day expiration, bcrypt password verification, role checks.

---

## 📂 Project Structure

```
workpulse/
├── client/                               # Frontend React Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Badge.jsx             # PriorityBadge, StatusBadge, DepartmentBadge
│   │   │   │   ├── EmptyState.jsx        # High-end empty state illustration
│   │   │   │   ├── KpiCard.jsx           # Sparkline animated KPI cards
│   │   │   │   ├── LiveClockTimer.jsx    # Real-time digital timer with clock-in controls
│   │   │   │   ├── Modal.jsx             # Backdrop blur modal dialogs
│   │   │   │   └── ProductivityHeatmap.jsx# GitHub-style 70-day contribution heatmap
│   │   │   ├── layout/
│   │   │   │   ├── AppLayout.jsx         # Responsive master shell layout
│   │   │   │   ├── Sidebar.jsx           # Deep Navy collapsible sidebar navigation
│   │   │   │   └── TopNavbar.jsx         # Global search, notifications, theme & demo switcher
│   │   ├── context/
│   │   │   ├── AuthContext.jsx           # JWT auth, user state & 1-click role switcher
│   │   │   ├── DataContext.jsx           # Reactive data store with realtime mutations
│   │   │   └── ThemeContext.jsx          # Light / Dark mode persistence
│   │   ├── pages/
│   │   │   ├── Analytics.jsx             # Formula analysis, trend curves & leaderboard
│   │   │   ├── Dashboard.jsx             # Admin Dashboard hero, 6 KPIs & Recharts area
│   │   │   ├── Departments.jsx           # 5 Department performance & budget cards
│   │   │   ├── EmployeeDashboard.jsx     # Dedicated Employee self-service workspace
│   │   │   ├── Employees.jsx             # Employee directory with Grid & Table views + 5-tab profile
│   │   │   ├── Login.jsx                 # Split-screen SaaS authentication screen
│   │   │   ├── Notifications.jsx         # Enterprise alerts, deadlines & audit logs
│   │   │   ├── Reports.jsx               # Exportable CSV reports & printable layout
│   │   │   ├── Settings.jsx              # System settings & evaluation parameters
│   │   │   └── Tasks.jsx                 # Linear-style Kanban board (4 columns + drag-drop)
│   │   ├── services/
│   │   │   ├── api.js                    # Fetch client communicating with backend
│   │   │   └── mockData.js               # Rich preloaded dataset for offline resilience
│   │   ├── App.jsx                       # Routing declarations & guards
│   │   ├── index.css                     # Tailwind directives, custom scrollbars & print rules
│   │   └── main.jsx                      # React DOM mounting
│   ├── index.html                        # HTML entry point with Plus Jakarta Sans & Inter
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                               # Backend Node.js / Express Application
│   ├── config/
│   │   └── db.js                         # Mongoose connector with graceful fallback
│   ├── data/
│   │   ├── inMemoryDb.js                 # Realtime in-memory store matching Mongoose schema
│   │   └── seedData.js                   # 25 realistic employees, 40 tasks, 30-day attendance
│   ├── middleware/
│   │   └── auth.js                       # JWT verification and requireAdmin guard
│   ├── models/
│   │   ├── ActivityLog.js
│   │   ├── Attendance.js
│   │   ├── Department.js
│   │   ├── Employee.js
│   │   ├── Notification.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── analytics.js                  # KPI telemetry, heatmaps & time-series
│   │   ├── attendance.js                 # Clock in, clock out, break timers & history
│   │   ├── auth.js                       # Login, me, forgot password
│   │   ├── departments.js                # Department list & metrics
│   │   ├── employees.js                  # Full CRUD & deep profile queries
│   │   ├── notifications.js              # Notifications & read status
│   │   ├── reports.js                    # Aggregated reports & CSV stream export
│   │   └── tasks.js                      # Kanban task CRUD & status transitions
│   ├── package.json
│   └── server.js                         # Express server entry point (port 5000)
│
└── package.json                          # Root orchestration package
```

---

## ⚡ Installation & Execution Guide

### Prerequisites
- **Node.js:** v18, v20, or v24 installed
- **MongoDB (Optional):** If MongoDB service is running on `127.0.0.1:27017`, the system connects automatically; if not, the system runs with the high-fidelity in-memory engine.

### Quick Start (Two Terminal Windows)

#### Terminal 1 — Start the Backend Server:
```bash
cd workpulse/server
npm install
node server.js
```
*Output: `🚀 WORKPULSE Enterprise Backend is LIVE on port 5000`*

#### Terminal 2 — Start the Frontend Application:
```bash
cd workpulse/client
npm install
npm run dev
```
*Output: `Local: http://localhost:5173/` or `http://127.0.0.1:5174/`*

Open your browser at **`http://localhost:5173`** (or the URL printed in Terminal 2).

---

## 📊 Key Implemented Features

### 1. Admin Analytics Dashboard
- Dynamic greeting: *"Good Morning, Sarah 👋"* with current live date.
- **6 Premium KPI Cards:** Total Employees (25), Active Employees (23), Tasks Completed (24), Pending Tasks (16), Avg Productivity (92.4%), Total Working Hours (1,480h) with SVG sparklines.
- **Interactive Multi-Series Productivity Chart:** Area curves comparing overall workforce against engineering velocity with Daily, Weekly, and Monthly view filters.
- **Task Status Donut Chart:** Visual breakdown of deliverables across To Do, In Progress, Review, and Completed.
- **Department Velocity Bar Chart:** Direct comparison against target SLA.
- **Smart Productivity Insights:** Explainable AI observations (*"Engineering sprint velocity up 14.2%"*, *"On-time delivery at 97.4%"*).
- **Recent Activity Timeline:** Live audit feed of completed tasks, clock-ins, and shift starts.
- **Top Performers Leaderboard:** Profile cards with progress meters and on-time badges.

### 2. Employee Workforce Directory
- View switcher: **Card Grid View** vs **Data Table View**.
- Instant search across name, designation, email, and employee ID.
- Multi-dimensional filters: Department and Employment Status (Active, Remote, On Leave).
- **Add Employee Modal:** Add team members with automatic ID generation.
- **Edit & Delete Modals:** Modify credentials or remove records with safety confirmations.
- **Deep Employee Profile Modal with 5 Tabs:**
  1. *Overview:* Contact info, department, location, key rates.
  2. *Tasks:* Specific deliverables assigned to this individual.
  3. *Attendance:* Historical clock-in and duration records.
  4. *Performance:* Evaluation score against sprint deliverables.
  5. *Activity History:* Onboarding date and audit timeline.

### 3. Linear-Style Task Kanban Board
- 4 Status Columns: **To Do**, **In Progress**, **Review**, **Completed**.
- HTML5 Drag-and-Drop task card movement across columns.
- 1-Click step buttons (`←` and `→`) for rapid status updates.
- Priority Badges (Urgent, High, Medium, Low) and Department Pills.
- Assignee avatars and deadline countdown badges.
- **Create Task Modal:** Full form with title, description, department, priority, deadline, tags, and assignee selection.

### 4. Transparent Time Tracking & Attendance
- Large **Digital Working-Hours Live Timer** (`HH:MM:SS`) with live second ticker.
- State-managed buttons: **Clock In**, **Clock Out**, **Start Break**, **End Break**.
- Weekly working-hours bar chart comparing productive work vs break time.
- Shift policy compliance panel (8h workday, 45m mandatory break, grace periods).
- Comprehensive **Attendance History Table** showing date, clock-in, clock-out, break duration, net working hours, and status.

### 5. Advanced Productivity Analytics & Formulas
- Clearly separated, explainable formulas:
  $$\text{Task Completion Rate} = \left(\frac{\text{Completed Tasks}}{\text{Total Assigned Tasks}}\right) \times 100$$
  $$\text{On-Time Completion Rate} = \left(\frac{\text{Tasks Completed On/Before Deadline}}{\text{Total Completed Tasks}}\right) \times 100$$
- Continuous 30-day productivity trend line with gradient fills.
- Department comparison bar charts with target markers.
- Bell curve performance distribution (Exceptional, High, Standard, Needs Focus).
- **GitHub-Style 70-Day Contribution Heatmap** displaying daily completed task volume.
- **Employee Leaderboard Table** featuring medals (🥇, 🥈, 🥉).

### 6. Enterprise Performance Reports & CSV Export
- Frequency tabs: Daily Shift, Weekly Sprint, Monthly Summary, Department Audit.
- Department scope filter.
- **1-Click CSV Export:** Generates and downloads a real formatted `.csv` file directly to the user's browser.
- **Printable Report View:** Native browser print layout with headers, signatures, and automatic suppression of navigation sidebars.

### 7. Dedicated Employee Self-Service Portal
- Distinct view when logged in as a non-admin employee (*"Welcome back, Alex Rivera!"*).
- Personal KPI counters (My Assigned Tasks, Completed, Pending, Weekly Hours).
- Personal Live Time Tracker.
- **1-Click Status Progression:** Employees can click *"Start Task →"*, *"Send to Review →"*, and *"Mark as Done ✓"* on their deliverables to update the Kanban board in real time.
- Personal 5-day velocity area chart.

### 8. Global UI/UX Polish
- **Dark Mode & Light Mode:** Toggleable with persistent state in `localStorage`.
- **Global Search:** Accessible via the search bar with instant floating dropdown results for employees and tasks.
- **Notification Center:** Floating dropdown badge + full-page notification view with category tabs.
- **Responsive Layout:** Works smoothly on desktop, tablet, and mobile displays with a collapsible sidebar.

---

## 📐 Evaluation & Demonstration Checklist for Faculty

1. **Login Page:**
   - Showcase the modern split-screen SaaS layout.
   - Click **"Login as Admin"** to enter the executive dashboard.
2. **Admin Overview:**
   - Review the 6 KPI cards with sparklines.
   - Switch chart filters between *Daily*, *Weekly*, and *Monthly*.
   - Point out the **Live Clock Timer** with pulsating active state.
3. **Employees Section:**
   - Toggle between **Grid View** and **Table View**.
   - Click **"View Profile"** on Alex Rivera to demonstrate the 5 tabs (*Overview*, *Tasks*, *Attendance*, *Performance*, *Activity*).
   - Click **"Add Employee"** and create a new test employee.
4. **Task Kanban Board:**
   - Drag or click `→` on a task in *To Do* to move it through *In Progress*, *Review*, and *Completed*.
   - Filter tasks by Department (*Engineering*) or Priority (*Urgent*).
5. **Productivity Analytics:**
   - Show the transparent mathematical formula cards.
   - Highlight the 70-day GitHub-style productivity heatmap.
   - Review the ranked employee leaderboard with medals.
6. **Performance Reports:**
   - Click **"Export CSV"** to demonstrate downloading the raw spreadsheet.
   - Click **"Print Report"** to show the clean print layout.
7. **Role Switcher & Employee Dashboard:**
   - Click **"Employee View"** in the top navigation bar.
   - Demonstrate the dedicated employee portal for Alex Rivera.
   - Click **"Start Task →"** on an assigned deliverable to update its status live.
8. **Dark Mode:**
   - Click the Moon/Sun toggle in the top navbar to showcase dark elevation tokens.

---

*WORKPULSE — Designed and engineered to exceed expectations for major college capstone projects.*

