# [Feature] Implement "The Editorial Ledger" UI Design

## Overview
We are overhauling the frontend of the trading history platform to adopt "The Financial Atelier" design system. The goal is to move away from rigid, utilitarian dashboards towards a high-end, editorial-style experience. 

This issue outlines the high-level goals to rebuild the interface.

## Target Stack
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS

## Assets Provided
Please review the following assets in the repository before starting:
- **`code.html`**: Contains the raw HTML/Tailwind prototype. Use this as your primary blueprint for layout structure, Tailwind configuration values (colors, fonts), and utility classes.
- **`screen.png`**: The visual target mockup to understand the intended aesthetic and premium feel.

## High-Level Execution Plan 

### 1. Theme & Configuration Setup
- Initialize the Next.js environment with Tailwind CSS.
- Extract the custom theme configuration (colors, font families, radiuses) from the `<script>` tag in `code.html` and migrate it into `tailwind.config.ts`.
- Set up global fonts: **Manrope** for display/headings and **Inter** for body text.

### 2. Core UI Components
- Break down the monolithic HTML file into manageable, reusable Next.js components. Focus on creating generic wrappers for:
  - **Interactive Elements:** Buttons (gradient pills, secondary outlines) with tactile hover/press states.
  - **Layout Elements:** Cards and containers leveraging the "tonal layering" approach (using subtle background color differences instead of 1px borders).
  - **Navigation:** The sticky glassmorphism top navigation bar.

### 3. Page Assembly
- Draft the main page structure by assembling your newly created components.
- Implement the Hero Section, the User Persona splits ("Tailored for your Perspective"), the Feature Bento Grid, and the global CTA.
- Ensure all sections are fully responsive, maintaining the "breathing room" and generous whitespace defined in the design across all screen sizes.

### 4. Final Polish
- Ensure all hover states, subtle ambient shadows, and blur effects match the prototype.
- Verify that color contrast ratios remain accessible.

## Guidance for Assignee
- **Think in Components:** Do not copy-paste huge blocks of HTML. Map the structure logically into React components.
- **Stay High-Level on Styles:** Rely on the Tailwind config for colors and sizing. Avoid inline styles or one-off hardcoded values.
- **Refer to the Assets:** If you are unsure about a design decision, consult `code.html` and `screen.png`. They represent the source of truth for this implementation.