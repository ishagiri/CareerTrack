# CareerTrack — Placement & Job Application Tracker

A modern, responsive web application designed for students and job seekers to organize, track, and optimize their campus placement and job application journey.

Built entirely with **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)** without external component frameworks.

---

## Features

- **Dashboard Overview**: Real-time KPI statistics cards, interactive HTML5 Canvas activity & status breakdown charts, upcoming interviews feed, and recent submissions.
- **Application Management**: Full CRUD operations with search, multi-criteria filtering (status, job type), date sorting, validation, and confirmation dialogs.
- **Interview Tracker**: Schedule and manage interview rounds (Technical, OA, Cultural Fit), meeting links, modes (Online/Offline), and prep notes.
- **Interactive Calendar**: Monthly view displaying upcoming deadlines, assessment dates, and interview rounds with date-specific agenda drawers.
- **Pipeline Analytics**: Mathematical conversion rates (Interview & Offer rates), gate funnel analysis, role frequency distribution, and monthly submission velocity.
- **Customizable Settings**: Profile configuration, theme selection, and client-side data management (restore demo seeds or wipe local records).
- **Dual Theme Support**: Coordinated Warm White & Navy design system with working dark mode toggle.
- **Zero-Dependency Architecture**: Pure Vanilla JS state management with `localStorage` persistence and lightweight Canvas 2D data visualizations.

---

## Tech Stack

- **Markup**: Semantic HTML5 with accessible ARIA standards
- **Styling**: CSS3 with CSS Custom Properties (Design Tokens), Flexbox, CSS Grid
- **Scripting**: Vanilla JavaScript (ES6+ Modules, HTML5 Canvas API, Web Storage API)
- **Icons**: Font Awesome 6 CDN

---

## Quick Start

1. Clone or download the repository:
   ```bash
   git clone https://github.com/<username>/CareerTrack.git
   cd CareerTrack
   ```

2. Open `public/index.html` directly in any modern web browser:
   - On Windows: Double-click `public/index.html`
   - Or serve with any static server:
     ```bash
     npx serve public
     ```

---

## Project Structure

```
CareerTrack/
├── app.js               # Entry point
├── package.json         # Project metadata
├── .gitignore           # Git ignore patterns
├── README.md            # Documentation
└── public/
    ├── index.html       # Single Page Application HTML structure
    ├── style.css        # Design tokens & responsive stylesheet
    └── script.js        # State, CRUD, Canvas charts, Calendar, Navigation
```

---

## License

MIT License. Free to use for personal portfolios and recruitment tracking.
