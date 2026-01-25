import { ReactNode } from 'react';

interface FeaturedHeroLayoutProps {
  ratingAndGenres: ReactNode;
  title: ReactNode;
  overview: ReactNode;
  mainCast: ReactNode;
  buttons: ReactNode;
}

export default function FeaturedHeroLayout({
  ratingAndGenres,
  title,
  overview,
  mainCast,
  buttons,
}: FeaturedHeroLayoutProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
      <div className="max-w-4xl">
        <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">{ratingAndGenres}</div>
        {title}
        {overview}
        {mainCast}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">{buttons}</div>
      </div>
    </div>
  );
}
