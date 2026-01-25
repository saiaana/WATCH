# 📚 Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [API Routes](#api-routes)
3. [State Management](#state-management)
4. [Custom Hooks](#custom-hooks)
5. [Performance Optimizations](#performance-optimizations)
6. [Environment Variables](#environment-variables)
7. [Deployment](#deployment)

## Architecture Overview

### Technology Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **State**: Redux Toolkit
- **Styling**: Tailwind CSS, Material-UI
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **External APIs**: TMDB, OpenAI, YouTube

### Design Principles

1. **Feature-Based Organization**: Code organized by features, not file types
2. **Server-First**: All external API calls through API routes
3. **Type Safety**: Strict TypeScript
4. **Performance**: Optimistic UI, prefetching, intelligent caching
5. **Error Resilience**: Graceful error handling at all levels

## API Routes

All API routes are in `app/api/` following RESTful conventions.

### Endpoints

**Content:**
- `GET /api/content/byCategory` - Content by category (trending, top-rated, etc.)
- `GET /api/content/byGenre` - Content filtered by genre
- `GET /api/content/byActor/[contentType]` - Content by actor
- `GET /api/content/byDirector/[contentType]` - Content by director
- `GET /api/content/similar` - Similar content
- `GET /api/content/genres` - All genres
- `GET /api/content/actors` - Actor details

**Search:**
- `POST /api/search/by-type` - Search movies, TV shows, or actors
- `POST /api/ai/recommendations` - AI-powered recommendations

**YouTube:**
- `GET /api/youtube/trailer` - Get YouTube trailer URL

### Response Format

**Success:**
```json
{ "data": { ... }, "status": "success" }
```

**Error:**
```json
{ "error": "Error message", "code": "ERROR_CODE", "status": "error" }
```

### Middleware

- **Validation**: `lib/middleware/validation.ts`
- **Error Handling**: `lib/middleware/error-handler.ts`

## State Management

### Redux Slices

- `moviesSlice` - Movie data, favorites, caching
- `tvShowsSlice` - TV show data, favorites, caching
- `authSlice` - Authentication state, user session
- `genresSlice` - Genre list management
- `uiSlice` - UI state (modals, tabs, preferences)

### Usage

```typescript
import { useAppSelector } from '@/store';
import { selectFavoriteMovies } from '@/store/selectors/movies.selectors';

const favoriteMovies = useAppSelector(selectFavoriteMovies);
```

## Custom Hooks

### Content Hooks

- `useCriticalContent` - Loads critical content (trending, top-rated)
- `useCategoryContent` - Infinite scroll for category content
- `useContentByGenre` - Content filtered by genre
- `usePersonContent` - Content by actor or director

### Search & Favorites

- `useSearchQuery` - Search with debouncing and pagination
- `useFavoriteContent` - Manage favorite status for single item
- `useFavorites` - Manage entire favorites list

### UI Hooks

- `usePagination` - Generic pagination with caching
- `useInfiniteScroll` - Intersection Observer for infinite scroll

## Performance Optimizations

### 1. Optimistic UI
React's `useTransition` for instant navigation feedback.

### 2. Prefetching
Next.js `Link` components automatically prefetch on hover.

### 3. Image Optimization
- AVIF/WebP formats
- Responsive sizes
- 7-day cache TTL
- Lazy loading

### 4. Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Tree-shaking for Material-UI and Lucide icons

### 5. Caching

**Client-Side:**
- Redux store with localStorage persistence
- Custom cache with TTL (`lib/cache.ts`)
- 4MB localStorage limit

**Server-Side:**
- Next.js caching for API routes
- TMDB API response caching

### 6. Memoization
- `React.memo` for expensive components
- `useMemo` for computed values
- `useCallback` for stable function references

## Environment Variables

### Required

```env
# TMDB API (REQUIRED)
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_key
# OR
TMDB_BEARER_TOKEN=your_token

# Supabase (REQUIRED for auth/favorites)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Optional

```env
# OpenAI (for AI recommendations)
OPEN_AI_API_URL=https://api.openai.com/v1/chat/completions
OPEN_AI_API_KEY=your_key

# YouTube (for trailers)
YOUTUBE_API_KEY=your_key
YOUTUBE_SEARCH_URL=https://www.googleapis.com/youtube/v3/search
```

### Validation

- **TMDB**: Validated in `lib/server/env.ts` (requires `TMDB_API_KEY` or `TMDB_BEARER_TOKEN`)
- **Supabase**: Validated in `lib/supabase.ts` (requires both URL and anon key)
- **OpenAI & YouTube**: Optional, validated when used

> ⚠️ **Important**: `.env.local` is in `.gitignore`. Never commit files with real API keys!

**Variable Naming:**
- `NEXT_PUBLIC_*` = exposed to browser (client-side)
- No prefix = server-side only

## Deployment

### Build

```bash
npm run build
```

### Environment Setup

**Never commit `.env.local` or any file containing real API keys to git!**

#### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Go to **Settings** → **Environment Variables**
4. Add all variables from `.env.local`
5. Select environments (Production/Preview/Development)
6. Deploy!

#### Other Platforms

- **Netlify**: Site configuration → Environment variables
- **AWS Amplify**: App settings → Environment variables
- **Railway**: Variables tab
- **Self-hosted**: Set environment variables on server or use `.env.production` (do not commit!)

### Production Checklist

- [ ] All required environment variables set
- [ ] Variables configured for correct environment
- [ ] `.env.local` not committed to git
- [ ] Application builds successfully
- [ ] All API endpoints working
- [ ] Authentication functional (if using Supabase)

## Best Practices

### Code Organization
- Feature-based structure
- Co-location of tests
- Separation of concerns (UI, logic, data)

### Performance
- Lazy loading
- Memoization
- Prefetching
- Caching

### Security
- Never expose API keys in client code
- Store in environment variables only
- Use `NEXT_PUBLIC_` prefix only when necessary
- Validate all user inputs
- Use different keys for dev/prod

### Accessibility
- ARIA labels on interactive elements
- Full keyboard navigation
- Semantic HTML
- WCAG AA compliant

---

**Version**: 0.1.0
