# Peoné Digital Menu Board

Restaurant digital menu board built with `React + TypeScript + Vite`.

## Environment

- Node.js: 18+ (recommended 20 LTS)
- Package manager: npm
- Frontend framework: React 19
- Build tool: Vite 6
- Icons: lucide-react

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Edit `.env.local` and set `GEMINI_API_KEY` (placeholder is acceptable if you do not use Gemini features).

3. Start dev server (hot reload):
```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

4. Open:
- `http://localhost:5173`

## Scripts

- `npm run dev`: start local development server
- `npm run build`: production build
- `npm run preview`: preview production build locally

## Project Structure

- `App.tsx`: page layout and slideshow timer
- `constants.ts`: menu data + carousel data (main content source)
- `types.ts`: shared TypeScript types
- `components/Logo.tsx`: top-left title/subtitle card
- `components/MediaCarousel.tsx`: carousel image display + progress bar
- `components/MenuDisplay.tsx`: menu list rendering and tags
- `public/`: local image assets used by carousel

## Current Menu/Carousel Behavior

- Carousel auto-rotates every `5` seconds (set in `App.tsx`).
- Carousel progress bar also uses `5` seconds (set in `components/MediaCarousel.tsx`).
- Carousel items are configured in `CAROUSEL_DATA` (`constants.ts`).
- Menu items are configured in `MENU_DATA` (`constants.ts`).
- `main_dish_id` in `CAROUSEL_DATA` links a slide to the menu item index for highlight behavior.

## Menu Item Fields

From `types.ts` (`MenuItem`):

- `name`, `price`, `description`
- `showNumber?: boolean` (`false` hides numbering for items like drinks)
- `originalPrice?: number` (shows strike-through + promotion price)
- `isPopular?: boolean`
- `isPromotion?: boolean`
- `isSeasonalSpecial?: boolean`
- `isSpicy?: boolean`
- `isComingSoon?: boolean`

## How To Update Content Quickly

1. Add/update images in `public/`.
2. Update `CAROUSEL_DATA` in `constants.ts`:
- `url`: `./your_image.png`
- `title` / `subtitle`
- `main_dish_id` for highlight mapping
3. Update dish names/prices/descriptions in `MENU_DATA`.
4. Build check:
```bash
npm run build
```

## Deployment

This repository is connected to GitHub auto-deploy.

Standard release flow:

```bash
git add -A
git commit -m "your message"
git push origin master
```

After push, the deployment pipeline is triggered automatically.
