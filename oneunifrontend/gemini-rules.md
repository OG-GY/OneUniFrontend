# OneUni Frontend Development Rules

Before making any changes, thoroughly explore the existing codebase to understand current patterns, components, styling approach, and project structure. Follow existing conventions.

---

## Design Philosophy

### Core Principles
- **Minimal & Purposeful**: Every element must serve a function. Remove anything that doesn't add value.
- **Modern Sophistication**: Clean lines, generous whitespace, thoughtful spacing. The design should feel premium without being flashy.
- **Human & Authentic**: Avoid the "AI-generated" aesthetic at all costs. No gradient soup, no generic card layouts, no stock-photo energy.
- **Consistent Visual Language**: Every page should feel like it belongs to the same family.

### Typography
- **Font**: `Inter` exclusively across the entire application
- Use weight variations purposefully (Regular for body, Medium for labels, Semibold for headings)
- Establish clear visual hierarchy through size, weight, and color—not through excessive decoration
- Generous line heights for readability

### Visual Design
- Maintain the existing color palette established in the project
- Use color with intention—accent colors should guide attention, not scatter it
- Avoid oversaturated colors; prefer muted, sophisticated tones
- Ensure proper contrast ratios for accessibility
- Consistent spacing scale throughout

### Interactions & Motion
- Micro-interactions should be subtle and purposeful
- Smooth transitions with appropriate easing
- Avoid motion for motion's sake—every animation should communicate something
- Loading states should be elegant, not distracting
- Hover states should provide clear feedback without being overwhelming

### What to Avoid (NO AI SLOP)
- ❌ Gratuitous gradients, especially purple-to-pink or blue-to-purple
- ❌ Excessive shadows, glows, or "glassmorphism"
- ❌ Generic hero sections with abstract blob backgrounds
- ❌ Overuse of icons or emojis
- ❌ Cookie-cutter card layouts with rounded corners and shadows
- ❌ "Tech startup" clichés (floating dashboards, fake 3D elements)
- ❌ Overly busy backgrounds
- ❌ Generic stock photography aesthetic
- ❌ Unnecessary decorative elements
- ❌ Multiple competing accent colors
- ❌ Animations that serve no purpose

---

## Coding Rules

### General Principles
- Explore the existing codebase first to understand patterns and conventions
- Follow the established project structure exactly
- Use existing components and utilities—don't reinvent
- TypeScript strict mode: No `any` types unless absolutely necessary with justification
- Keep components focused on single responsibilities
- DRY principle—reuse, don't repeat

### API Integration
- All API calls go through the existing service layer (explore to find it)
- Include `credentials: 'include'` for all fetch requests (cookie-based auth)
- Read `XSRF-TOKEN` cookie and send as `X-XSRF-TOKEN` header for mutating requests
- Never store tokens in localStorage/sessionStorage—cookies handle this
- Type all API requests and responses

### State & Error Handling
- Use the existing state management approach in the codebase
- Always handle loading, error, and success states
- User-friendly error messages (not raw API errors)
- Graceful degradation—the app should not break on API failures

### What to Avoid (NO AI SLOP CODE)
- ❌ `console.log` statements in production code
- ❌ Commented-out code
- ❌ `any` types without justification
- ❌ Hardcoded strings (use constants)
- ❌ Inline styles when the project uses CSS/Tailwind
- ❌ Copy-pasted code
- ❌ Over-engineering simple features
- ❌ God components that do everything
- ❌ Ignoring TypeScript errors
- ❌ Mixing concerns (API logic directly in components)

---

## Backend API Reference

### Authentication (Cookie-Based)
The backend uses HTTP-only cookies. Cookies are set automatically on successful auth responses.

**POST `/api/auth/register`** — Email/Password Signup
- Request: `{ email, fullName, password, confirmPassword, role }`
- Role values: `0` = student, `1` = mentor, `2` = university_representative
- Response (201): `{ expiresAt, user: { id, email, role } }`
- Errors: 400 (validation), 409 (user exists), 500 (server error)

**POST `/api/auth/login`** — Email/Password Login
- Request: `{ email, password }`
- Response (200): `{ expiresAt, user: { id, email, role } }`
- Errors: 400 (validation), 401 (invalid credentials), 500 (server error)

**GET `/api/auth/me`** — Get Current User (requires auth cookies)
- Response (200): `{ id, email, role }`
- Errors: 401 (unauthorized), 404 (user not found)

**POST `/api/auth/logout`** — Logout (requires auth)
- Clears cookies
- Response (200): `{ message: "Logged out successfully" }`

**POST `/api/auth/refresh`** — Refresh Token
- Uses refresh_token cookie automatically
- Response (200): `{ expiresAt, user }`

### Google OAuth
**Callback Flow** (handled by backend):
- Existing user → Sets cookies, redirects to `/login/callback`
- New user → Sets temporary token, redirects to `/signup/callback`

**POST `/api/google-oauth/complete-signup`** — Complete Google Signup
- Request: `{ role }` (uses temporary token from cookie)
- Response (201): `{ expiresAt, user: { id, email, role } }`

### User Roles
- `0` = student
- `1` = mentor  
- `2` = university_representative
- `3` = admin

### Error Response Format
All errors return: `{ errors: string[], traceId: string }`
