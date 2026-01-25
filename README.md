# 🎬 WATCH - Movie & TV Show Discovery Platform

A modern, feature-rich web application for discovering and exploring movies and TV shows. Built with Next.js 15, React 18, and TypeScript, featuring AI-powered recommendations and advanced search.

## LIVE DEMO:

https://watch-the-movie-app.vercel.app/

## ✨ Features

### 🎯 Core Features

- **Content Discovery**: Browse movies and TV shows by category, genre, actor, and director
- **AI-Powered Search**: Get personalized recommendations using OpenAI GPT-4
- **Advanced Search**: Search by title, actor, or director with real-time results
- **Favorites System**: Save your favorite movies and TV shows (requires authentication)
- **Content Details**: Comprehensive information including cast, crew, ratings, trailers, and similar content
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🚀 Performance Optimizations

- **Optimistic UI**: Instant visual feedback for all user interactions
- **Prefetching**: Automatic page prefetching on hover for faster navigation
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Code Splitting**: Automatic code splitting and lazy loading
- **Caching**: Intelligent client-side and server-side caching with TTL
- **Bundle Optimization**: Tree-shaking for Material-UI and Lucide icons

### 🎨 User Experience

- **Smooth Animations**: Framer Motion for fluid transitions
- **Loading States**: Loading spinners and skeleton screens
- **Error Handling**: Error handling with user-friendly messages
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15.2.3](https://nextjs.org/) (App Router)
- **UI Library**: [React 18.2.0](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **UI Components**: [Material-UI 6.4](https://mui.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & Material-UI Icons
- **Animations**: [Framer Motion 12.6](https://www.framer.com/motion/)
- **State Management**: [Redux Toolkit 2.6](https://redux-toolkit.js.org/)
- **Video Player**: [React Player 2.16](https://github.com/cookpete/react-player)

### Backend & APIs

- **API Routes**: Next.js API Routes (Server Actions)
- **Database**: [Supabase](https://supabase.com/) (Authentication & Favorites)
- **Content API**: [The Movie Database (TMDB)](https://www.themoviedb.org/)
- **AI**: [OpenAI GPT-4.1-mini](https://openai.com/) (Ai search based on user propmt)
- **Video**: YouTube API (Trailers)

### Development Tools

- **Testing**: [Vitest 3.2](https://vitest.dev/)
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier with Tailwind plugin
- **Bundle Analysis**: @next/bundle-analyzer

## 📋 Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm)
- **TMDB API Key**: Get one from [TMDB](https://www.themoviedb.org/settings/api) (required)
- **Supabase Account**: For authentication and favorites (required for auth features)
- **OpenAI API Key**: For AI recommendations (optional)
- **YouTube API Key**: For video trailers (optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd movie-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# TMDB API Configuration (REQUIRED)
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_tmdb_api_key_here
# OR use Bearer token instead
TMDB_BEARER_TOKEN=your_bearer_token_here

# Supabase Configuration (REQUIRED for authentication & favorites)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI API Configuration (OPTIONAL - for AI recommendations)
OPEN_AI_API_URL=https://api.openai.com/v1/chat/completions
OPEN_AI_API_KEY=your_openai_api_key_here

# YouTube API (OPTIONAL - for trailers)
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_SEARCH_URL=https://www.googleapis.com/youtube/v3/search
```

> ⚠️ **Important**: The `.env.local` file is already in `.gitignore` and will not be committed to git. Never commit files containing real API keys!

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
movie-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── ai/                   # AI recommendations
│   │   ├── content/              # Content endpoints
│   │   ├── search/               # Search endpoints
│   │   └── youtube/              # YouTube trailer API
│   ├── components/               # React components
│   │   ├── features/             # Feature-based components
│   │   │   ├── auth/             # Authentication
│   │   │   ├── content/          # Content display
│   │   │   ├── favorites/        # Favorites management
│   │   │   ├── genre/            # Genre selection
│   │   │   ├── hero/             # Hero sections
│   │   │   ├── search/           # Search functionality
│   │   │   └── video/            # Video player
│   │   ├── layout/               # Layout components
│   │   ├── navigation/           # Navigation components
│   │   ├── providers/            # Context providers
│   │   └── ui/                   # Reusable UI components
│   ├── [routes]/                 # Page routes
│   └── styles/                   # Global styles
├── config/                       # Configuration files
├── constants/                    # App constants
├── features/                     # Feature modules
├── helpers/                      # Utility functions
├── hooks/                      # Custom React hooks
├── lib/                          # Shared libraries
│   ├── client/                  # Client-side utilities
│   ├── middleware/              # API middleware
│   ├── server/                  # Server-side utilities
│   └── services/                # Business logic services
├── store/                        # Redux store
│   ├── factories/               # Redux factories
│   └── selectors/               # Redux selectors
├── types/                        # TypeScript type definitions
└── utils/                        # General utilities
```

## 🎯 Key Features Explained

### AI-Powered Recommendations

The app uses OpenAI GPT-4 to provide personalized movie and TV show recommendations based on natural language queries. Users can describe their preferences (e.g., "thrilling sci-fi movies with strong female leads"), and the AI will return relevant titles.

### Optimistic UI

All navigation and interactions use React's `useTransition` hook to provide instant visual feedback, making the app feel responsive and fast.

### Smart Caching

- **Client-side**: Redux store with localStorage persistence
- **Server-side**: Next.js caching for API routes
- **Images**: Optimized formats with caching

### Feature-Based Architecture

Components are organized by feature rather than type, making the codebase more maintainable and scalable.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests with Vitest
- `npm run analyze` - Analyze bundle size

## 🧪 Testing

The project uses Vitest for testing. Run tests with:

```bash
npm run test
```

Test coverage includes:

- Custom hooks (search, favorites, content loading)
- Utility functions (caching, data transformation)
- Redux slices (planned)


## 🔒 Security Considerations

- **API keys are stored server-side only** (except `NEXT_PUBLIC_*` variables which are exposed to the browser)
- **Environment variables are validated** at application startup
- **Input validation** on all API routes
- **Centralized error handling** to prevent information leakage
- **`.env.local` is in `.gitignore`** - never commit files containing real API keys
- **CORS configuration** recommended for production
- Use different API keys for development and production environments

