OneUni Frontend Development Rules

Before touching any file, explore the existing codebase thoroughly. Understand layout patterns, spacing scale, typography, color usage, and component boundaries.
Do not introduce new patterns unless absolutely required and approved.

This product must feel intentional, calm, and authoritative, not like a hackathon project.

Design Philosophy
Core Principles

Clarity over cleverness: Users are students and parents. Do not confuse them.

Admission-first mindset: Every screen should push users closer to applying or completing their application.

Premium but restrained: This is education infrastructure, not a crypto landing page.

Consistency beats novelty: Repetition is good when it builds trust.

If a UI choice does not reduce friction or improve understanding, remove it.

Visual Language (Based on Current Screens)
Layout & Structure

- **Flush Workspace**: The main content area must be flush with the Sidebar and Top Header. Do not use global padding (`p-6`, etc.) or `max-w-7xl` on the main container. Let individual sections handle their internal alignment.
- **Full-Width Immersion**: Pages should feel like a "well" or "app canvas" rather than a document.
- **Large, Readable Hero Sections**: Use cards with vibrant gradients and clear primary CTAs for dashboard entry points.
- **Left-Aligned Content Blocks**: Maintain readability while allowing for asymmetric layouts in dashboards.
- **Generous Inter-Section Whitespace**: Use `space-y-8` or `gap-12` between major blocks to prevent visual clutter.

Cards & Sections

Cards exist only when they group related information

Soft borders or very subtle background contrast only

No heavy shadows, no floating nonsense

Rounded corners must be consistent project-wide

If a card can be a simple section, it must be a section.

Typography
Font

Inter only, no exceptions

No fallback experiments

Usage Rules

Headings are bold, confident, and calm

Body text is readable, slightly relaxed line-height

Labels and helper text are lighter and secondary

Do not stack font weights randomly

Hierarchy must be obvious without color tricks.

Color Usage

Use the existing OneUni palette only

Primary brand color is for:

Main CTAs

Key highlights

Active states

Secondary colors support information, not decoration

Strict No List

❌ Neon or saturated colors

❌ Random accent colors per section

❌ Decorative gradients

❌ Color used just to “make it pop”

If color is doing visual heavy lifting, your layout failed.

Buttons & CTAs

One primary CTA per screen

Secondary actions must visually step back

Button text must be action-oriented and clear

Good: “Start Application”

Bad: “Get Started”, “Continue”, “Explore Magic”

Buttons guide behavior, not emotions.

Icons & Illustrations

Icons are supportive, not decorative

Consistent icon set only

No emoji usage, ever

Illustrations must feel custom and calm, not playful or childish

If an icon does not improve scan-ability, delete it.

Interactions & Motion

Transitions must be subtle and fast

Motion exists only to:

Show cause and effect

Guide attention

Indicate state change

Hard No

❌ Bounce effects

❌ Over-animated hover states

❌ Page-load animations for decoration

❌ Skeletons that flash aggressively

This is not a marketing animation reel.

Content & Copy Rules

Simple English, no jargon

Short sentences

Clear intent

No startup buzzwords

Forbidden Phrases

“Revolutionary”

“Next-generation”

“Empowering”

“Seamless experience” (unless you actually prove it)

The UI should show, not brag.

Coding Rules
General Engineering Discipline

Follow existing folder structure strictly

Reuse components, do not duplicate logic

One component = one responsibility

Files should be boring and predictable

If your component exceeds reasonable length, split it.

Styling Rules

Follow the current styling approach exactly (Tailwind or CSS modules)

No inline styles unless already used in the codebase

Use spacing utilities consistently

Do not invent new spacing values

Design consistency is more important than personal taste.

TypeScript

Strict mode only

No any unless justified in code comments

All props and API responses must be typed

If TypeScript complains, fix the problem, do not silence it.

State & Data Handling

Centralize API calls in the existing service layer

Components do not talk directly to APIs

Handle loading, empty, error, and success states always

Errors shown to users must be human-readable

A broken state is a broken product.

API Integration Rules

Use cookie-based authentication only

Always include credentials: 'include'

Send X-XSRF-TOKEN for mutating requests

Never store tokens in localStorage or sessionStorage

Security shortcuts are not acceptable.

What to Avoid (NO AI SLOP, NO LAZY CODE)
Design

❌ Random gradients

❌ Glassmorphism

❌ Overuse of cards

❌ Fancy backgrounds

❌ Visual noise

❌ “Startup hero” clichés

Code

❌ console.log in production

❌ Commented-out code

❌ Copy-paste components

❌ Hardcoded strings

❌ God components

❌ Ignoring TypeScript errors

If it looks rushed, it probably is. Fix it.

Product Mindset Rule (Most Important)

OneUni is not a demo.
It is an admission system handling real students, real deadlines, and real stress.

Every decision should answer:

Does this reduce confusion?

Does this build trust?

Does this move the user forward?

If not, it does not belong.