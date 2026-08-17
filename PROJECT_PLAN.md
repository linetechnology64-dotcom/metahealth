# MetaHealth — Project Plan

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend/DB**: Supabase (Auth, Postgres, Storage, Realtime)
- **Hosting**: Vercel (recommended)
- **Payments**: Stripe (if needed)
- **Booking**: Calendly embed or custom (TBD)

## Colour Palette
| Name     | Hex       | Usage                        |
|----------|-----------|------------------------------|
| Navy     | `#222939` | Primary text, nav, headings  |
| Copper   | `#AF7761` | Accent, CTAs, highlights     |
| Salmon   | `#D6997D` | Secondary accent, tags       |
| Brown    | `#78594F` | Body text, subtle elements   |
| Cream    | `#F2E7E0` | Cards, light sections        |
| Off-White| `#FAF7F5` | Page background              |

## Typography
- Headings: Cormorant Garamond (serif)
- Body: Inter (sans-serif)

---

## Project Sections (Build Order)

### Phase 1 — Foundation
- [ ] Next.js project setup with TypeScript + Tailwind
- [ ] Global styles, CSS variables, fonts
- [ ] Reusable layout components (Nav, Footer)
- [ ] Responsive design system
- [ ] Supabase project creation & env config

### Phase 2 — Public Pages
- [ ] Landing/Home page (Hero, About, Services, Testimonials, CTA)
- [ ] About page (coach bio, philosophy)
- [ ] Services page (detailed service breakdowns)
- [ ] Contact page

### Phase 3 — Authentication (Supabase Auth)
- [ ] Supabase Auth setup (email/password + Google OAuth)
- [ ] Sign Up page
- [ ] Login page
- [ ] Password reset flow
- [ ] Auth middleware (protected routes)
- [ ] User profile table in Supabase

### Phase 4 — Client Dashboard
- [ ] Dashboard layout (sidebar + main content)
- [ ] Overview/home dashboard view
- [ ] Profile settings page
- [ ] Progress tracking (weight, energy, goals)
- [ ] View assigned nutrition plans
- [ ] Booking/scheduling integration
- [ ] Messaging / notes from coach

### Phase 5 — Coach Admin Panel
- [ ] Admin-only route protection
- [ ] Client list + search
- [ ] Individual client view (notes, plans, progress)
- [ ] Create/edit nutrition plans
- [ ] Create/edit courses or content
- [ ] Upload resources (PDFs, guides)
- [ ] Manage bookings / availability

### Phase 6 — Content & Courses
- [ ] Blog/articles system (Supabase + rich text)
- [ ] Course modules (video embeds, text, quizzes)
- [ ] Gated content (paid/enrolled users only)

### Phase 7 — Payments & Subscriptions (if needed)
- [ ] Stripe integration
- [ ] Service packages / pricing page
- [ ] Checkout flow
- [ ] Subscription management
- [ ] Invoice history

### Phase 8 — Polish & Launch
- [ ] SEO metadata, Open Graph images
- [ ] Performance optimisation
- [ ] Accessibility audit
- [ ] Analytics (Vercel Analytics or Plausible)
- [ ] Domain + DNS setup
- [ ] Go live

---

## Supabase Tables (Initial Schema)

### `profiles`
- id (uuid, FK to auth.users)
- full_name, email, avatar_url
- role ('client' | 'coach')
- phone, date_of_birth
- created_at, updated_at

### `services`
- id, title, description, price, duration
- is_active, created_at

### `bookings`
- id, client_id (FK), service_id (FK)
- date, time, status, notes
- created_at

### `nutrition_plans`
- id, client_id (FK), coach_id (FK)
- title, description, content (JSON)
- status ('draft' | 'active' | 'archived')
- created_at, updated_at

### `progress_logs`
- id, client_id (FK)
- date, weight, energy_level, notes
- created_at

### `articles`
- id, title, slug, content, excerpt
- cover_image, published_at, is_published
- created_at

### `courses`
- id, title, description, price
- is_published, created_at

### `course_modules`
- id, course_id (FK), title, content
- video_url, order, created_at

### `enrollments`
- id, user_id (FK), course_id (FK)
- enrolled_at, completed_at
