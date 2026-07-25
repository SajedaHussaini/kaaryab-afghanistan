# KaarYab Afghanistan

KaarYab Afghanistan is a modern opportunity finder platform that helps Afghan youth discover jobs, internships, scholarships, remote work, online courses, training programs, and volunteer opportunities in one place.

## Project Description

This is a final capstone project built with Next.js App Router, TypeScript, React, Tailwind CSS, LocalStorage, mock API route handlers, React Hook Form, Zod, Recharts, Framer Motion, resend, and jsPDF.

The app uses clearly labeled demo data. If real opportunity data is added later, every listing should be verified before publishing.

## Problem It Solves

Opportunity information for Afghan students, graduates, job seekers, and organizations is often scattered across websites, social pages, and private groups. KaarYab brings those opportunities into one searchable, filterable, saveable, and manageable platform.

## Features

- Home page with featured opportunities, statistics, quick search, and expiring soon records
- Opportunities page with search and filters by title, category, location, remote/on-site mode, deadline, and type
- Dynamic opportunity details route at `/opportunities/[id]`
- Save opportunity feature using LocalStorage and Context API
- Add opportunity form with React Hook Form and Zod validation
- Full local CRUD: create, read, edit, delete
- Dashboard with totals, job/scholarship/internship counts, remote count, expiring soon count, pending queue, recent submissions, and charts
- Dark mode with persisted theme preference
- Mock authentication with student, organization, and admin roles
- Admin approval system for pending opportunities
- Featured opportunities and expiring soon badges
- Contact form backed by a mock API route at `/api/contact`
- PDF CV builder using jsPDF
- Responsive mobile, tablet, and desktop layout
- Loading, empty, error, modal, badge, card, and form states

## Technologies Used

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- React Hook Form
- Zod
- Context API
- LocalStorage
- Next.js route handlers
- Recharts
- Framer Motion
- Lucide React
- jsPDF
- resend
- ESLint

## How to Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run build
```

## Demo Admin

Open `/auth` and sign in with the default admin demo values:

- Name: `KaarYab Admin`
- Email: `admin@kaaryab.af`
- Role: `admin`

Then open `/dashboard` to approve, reject, feature, or delete opportunities.

## Screenshots

Add final screenshots after deployment:

- Home page
- Opportunities search and filters
- Opportunity details
- Add opportunity form
- Dashboard charts and approval queue
- CV builder

## Live Demo Link

Add the Vercel link after deployment.

## GitHub Link

Add the GitHub repository link after pushing the project.

## Future Improvements

- Real authentication with protected admin routes
- Database-backed opportunities and approval workflow
- Real email delivery for contact messages
- Organization profiles
- Applicant tracking
- Verified real opportunity feeds
- Multi-language support in English, Dari, and Pashto
