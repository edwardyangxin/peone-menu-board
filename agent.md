# agent.md

This file defines the working contract for agents collaborating on this project.

## Goal

Maintain and iterate the Peoné digital menu board safely and quickly.

## Stack

- React 19
- TypeScript
- Vite 6
- lucide-react icons

## Source of Truth

- `constants.ts`
  - `MENU_DATA`: all menu content
  - `CAROUSEL_DATA`: all carousel slides
- `types.ts`
  - menu/carousel data contracts

## Runtime Rules

- Keep carousel timing consistent:
  - `App.tsx` slideshow interval
  - `components/MediaCarousel.tsx` progress duration
- If one is changed, update the other in the same commit.

## Content Editing Rules

- When adding a new carousel image:
  1. Put image in `public/`
  2. Add one entry in `CAROUSEL_DATA`
  3. Ensure `main_dish_id` points to the correct menu item index
- When adding/updating menu tags:
  - Add field in `types.ts` first
  - Render badge in `components/MenuDisplay.tsx`
  - Set values in `constants.ts`
- For items that should not display numeric prefixes (e.g. drinks), set:
  - `showNumber: false`

## UI Notes

- Category icon in menu header uses `UtensilsCrossed` (not first-letter badge).
- Keep subtitle readability in `components/Logo.tsx`:
  - avoid oversized title classes that hide subtitle.

## Quality Gate Before Push

Run:

```bash
npm run build
```

If build fails, do not push.

## Git Flow

```bash
git add -A
git commit -m "<type>: <summary>"
git push origin master
```

Pushing to `master` triggers auto deployment.
