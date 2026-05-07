# EduBroadcast — Content Broadcasting System

A frontend-only implementation of a school content broadcasting system built with **Next.js 16**, **Tailwind CSS**, **React Hook Form**, and **Zod**. Teachers upload educational content, principals approve or reject it, and students can view live broadcasts on a public page.

---

## Tech Stack

| Layer           | Technology                               |
|-----------------|------------------------------------------|
| Framework       | Next.js 16 (App Router)                  |
| Language        | JavaScript (ES2022+)                     |
| Styling         | Tailwind CSS v4                          |
| Forms           | React Hook Form + Zod                    |
| HTTP client     | Axios (service layer)                    |
| Notifications   | react-hot-toast                          |
| Icons           | lucide-react                             |
| Data persistence| localStorage (mock backend)              |

---

## Setup

```bash
# 1. Clone / unzip the project
cd content-broadcasting-system

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open https://education-environment-eight.vercel.app/ — you will be redirected to the login page.

---

## Demo Accounts

| Role      | Email                    | Password      |
|-----------|--------------------------|---------------|
| Teacher   | teacher@school.com       | password123   |
| Teacher 2 | teacher2@school.com      | password123   |
| Principal | principal@school.com     | password123   |

Demo credentials are shown on the login page with one-click fill buttons.

---

## User Flows

### Teacher
1. Log in → redirected to **Teacher Dashboard**
2. **Upload Content** — fill title, subject, description, upload image, set start/end time and rotation duration
3. **My Content** — view all uploads with status (Pending / Approved / Rejected) and rejection reasons

### Principal
1. Log in → redirected to **Principal Dashboard**
2. **Pending Approvals** — review content, approve or reject (rejection requires a mandatory reason)
3. **All Content** — search and filter all school content by title, subject, teacher name, or status

### Public (Students)
- Navigate to `/live/<teacherId>` — no login required
- See currently active (approved + within time window) content
- Auto-refreshes every 30 seconds; slides rotate per `rotationDuration`

---

## Project Structure

```
app/                    Next.js pages (App Router)
components/
  ui/                   Primitive UI: Button, Badge, Modal, Skeleton, Input, Select
  shared/               Composed components used across roles
  teacher/              Teacher-specific: UploadForm, MyContentList
  principal/            Principal-specific: ApprovalModal, ContentFilters, ContentTable
services/               API layer (easily replaceable with real backend)
hooks/                  useAuth, useContent
context/                AuthContext (global auth state)
utils/                  constants, helpers, mockData, validators
layouts/                TeacherLayout, PrincipalLayout (sidebar + mobile nav)
```

---

## Replacing the Mock Backend

All API calls go through `services/`. To connect a real backend:

1. Set `NEXT_PUBLIC_API_URL=https://your-api.com` in `.env.local`
2. Replace the body of each service function with an `apiClient` call
3. No component code changes needed

The `apiClient` (`services/api.client.js`) automatically attaches the Bearer token and handles 401 redirects.

---

## Key Features

- **Role-based routing** — wrong-role access silently redirects to the correct dashboard
- **Drag-and-drop file upload** with client-side type/size validation and live preview
- **Skeleton loaders** on every data-fetching page
- **Toast notifications** for all async actions (success + error)
- **Client-side search + filter** (memoized) on the All Content page
- **Live page polling** — auto-refreshes every 30 seconds
- **Slide rotation** — cycles through multiple live items per their `rotationDuration`
- **Empty and error states** on every list/table
- **Mobile-responsive** sidebar with overlay on small screens

---

## Build

```bash
npm run build
npm run start
```

---

## Documentation

See `Frontend-notes.txt` for a detailed explanation of:
- Project structure
- Authentication flow
- Role-based routing
- API integration approach
- State management decisions
- Assumptions
