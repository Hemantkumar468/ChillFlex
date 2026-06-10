# StreamVault — OTT Platform

A modern full-featured streaming platform built with React.

## Tech Stack

- React 19.2 + Vite
- Tailwind CSS v4
- Framer Motion (animations)
- Zustand (state management)
- React Router v6
- TMDB API (content)
- YouTube Embedded Player (video)
- React Player

## Folder Structure

src/
├── api/
├── components/ # Reusable UI components
├── hooks/ # Custom hooks
├── pages/ # Route-level pages
├── store/ # Zustand state
└── utils/ # Helper functions

## Key Features

.Cinematic hero banner with auto-rotation
.Horizontal scrollable content rows
.YouTube trailer playback
.Search with debounce
.Real TMDB data integration
.Persistent watchlist (localStorage)
.Continue watching with progress tracking
.Skeleton loading states
.Fully responsive (mobile/tablet/desktop)
.Smooth Framer Motion animations

## Setup

1. Clone repo
2. `npm install`
3. Create `.env` with `VITE_TMDB_API_KEY` (get a free key at [themoviedb.org](https://www.themoviedb.org/settings/api))
4. `npm run dev`

Add environment variables in Vercel Dashboard → Project → Settings → Environment Variables:

- `VITE_TMDB_API_KEY`
- `VITE_TMDB_BASE_URL` = `https://api.themoviedb.org/3`
- `VITE_TMDB_IMAGE_BASE` = `https://image.tmdb.org/t/p`
