# afraanika.github.io

Personal portfolio site, served via GitHub Pages at https://afraanika.github.io.

## Structure

- `index.html` — page content, organized as a grid of full-width "bands" (profile, skills/experience, education, projects, publications, contact)
- `travels.html` — "Travels & Food" page: a world map of visited countries, stats, and a card per country
- `travels-<country>.html` (e.g. `travels-bangladesh.html`) — one page per visited country, listing its trips and photos
- `css/style.css` — styling, incl. light/dark mode, scroll animations, and responsive breakpoints
- `js/script.js` — sticky nav, scroll-triggered fade-ins, back-to-top button, lightbox
- `js/travels-map.js` — renders the world map on `travels.html` (uses D3 + topojson-client, loaded from a CDN in `travels.html`; map data itself is fetched at runtime from `world-atlas` on jsDelivr)
- `assets/photos/` — profile photo
- `assets/photos/travel/` — travel photos (added as trips are written up)
- `assets/diagrams/` — project architecture diagrams (shown on the Projects cards)

## Sections

1. **Hero** — identity line, short bio, personal goal, CTAs
2. **About** — bio, photo, and stats (years engineering, publications, RAG/LLM projects, personal mission)
3. **Projects** — Healthcare RAG Grounding as a featured case study (problem/approach/why it matters/tech/learnings), plus the other two RAG projects framed as a progression (experiment → application → deeper investigation)
4. **Publications** — papers with embedded video walkthroughs (hosted on Google Drive, must stay shared "anyone with the link" to keep working) and topic tags
5. **Experience** / **Skills** (grouped: Engineering, Cloud & Infrastructure, AI/Research)
6. **Currently Exploring** — lightweight, forward-looking topics
7. **Beyond Code** — travel/food/culture personality section, links out to `travels.html`
8. **Education**
9. **Contact** — email, LinkedIn, GitHub, Google Scholar

## Travels & Food page

`travels.html` is a self-contained mini-site of its own:

- A world map (`js/travels-map.js`) highlighting visited countries, hover-synced with a list of the same countries, each with a short blurb and trip/photo counts.
- A "Next on the list" chip row and stat tiles (countries visited, trips logged, photos with a story, and a personal "before 40" goal).
- A card grid linking to each country's own `travels-<country>.html` page, which lists that country's trips — each trip has a hero photo plus a grid of supporting photos with captions, and an empty "Coming Soon" state until real trips are written up.

## Editing

Edit `index.html` directly, then commit and push to `main` — GitHub Pages redeploys automatically within a minute or two.

For `travels.html` and the per-country pages, the same hand-edit workflow applies — each file has HTML comments documenting the markup pattern to paste in for a new trip/photo. There is also a local-only admin tool (kept outside this repo, never deployed) that can add/edit/delete countries, trips, photos, and captions by committing directly to this repo via the GitHub API — ask about it if you don't have it set up.
