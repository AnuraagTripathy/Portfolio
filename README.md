# Portfolio

Source for [anuraag.site](https://anuraag.site), my personal site.

## What is actually interesting here

Not much of it is the content. The parts worth reading are in `src/components`:

`ProjectShowcase.tsx` and `ui/coverflow-carousel.tsx` implement a drag, click, and
keyboard-driven card stack in which every card is simultaneously a depth-sorted 3D
transform and a real focusable element, so the deck is navigable with a keyboard and by
a screen reader rather than being a mouse-only toy. `lib/project-slides.ts` derives the
slide order from the same `content/projects.ts` that renders the flat list, so there is
one source of truth for what exists and the two views cannot disagree.

`lib/scheduledTheme.ts` picks the initial theme from the time of day before
`next-themes` takes over, and `SiteBackground.tsx` and `VoidField.tsx` render an animated
field that has to stay cheap enough not to drop frames on a phone while a page
transition is running.

Content lives in `src/content/experience.ts` and `src/content/projects.ts` as typed
objects. Adding a project is one entry there and an image in `public/projects/`.

## Stack

Next.js 14 App Router, React 18, TypeScript, Tailwind, Framer Motion for transitions,
next-themes for dark mode, lucide-react for icons, react-github-calendar for the
contribution graph. Deployed on Vercel.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

No environment variables, no API keys, no backend. `npm run build` for a production
build and `npm run lint` for eslint.

## What is unfinished

- There are no tests and no CI beyond Vercel's build.
- `public/me.jpeg` is 1.1MB and unoptimized, which is the largest thing on the site.
- `.ua/` holds 40 committed files of tool output, including a `.trash-*` directory. It is
  not used by the app and should be gitignored and removed.
- The animated background does real per-frame work with no `prefers-reduced-motion` check.
