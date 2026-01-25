'use client';

import CardGrid from '@/app/components/ui/CardGrid';
import CarouselContainer from '@/app/components/ui/CarouselContainer';
import GlassContainer from '@/app/components/ui/GlassContainer';
import ContentCardSkeleton from '@/app/components/features/content/ContentCardSkeleton';
import SectionHeader from '@/app/components/ui/SectionHeader';

export default function ContentDetailSkeleton() {
  const mainContent = (
    <div style={{ paddingTop: 'calc(var(--header-height, 88px) + 1rem)' }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr_220px] md:gap-4 lg:grid-cols-[300px_1fr_300px] lg:items-stretch lg:gap-6 xl:grid-cols-[340px_1fr_340px]">
        <div className="order-1 flex md:h-full">
          <GlassContainer className="flex h-full w-full flex-col">
            <div className="mx-auto w-full flex-1 lg:flex lg:items-center">
              <div className="skeleton-bg aspect-[2/3] w-full animate-pulse overflow-hidden rounded-lg shadow-xl lg:h-auto" />
            </div>
          </GlassContainer>
        </div>

        <div className="order-2 flex md:h-full">
          <GlassContainer className="flex w-full flex-col space-y-2 md:h-full md:space-y-2">
            <div className="flex flex-col justify-center space-y-3 md:flex-1">
              <div className="flex flex-col gap-2">
                <div className="skeleton-base mb-2 h-7 w-3/4 animate-pulse rounded-lg sm:h-7 md:h-8 lg:h-9" />
                <div className="skeleton-base h-5 w-1/4 animate-pulse rounded-md md:h-6 lg:h-7" />
              </div>

              <div className="skeleton-base h-12 w-12 animate-pulse rounded-full" />

              <div className="space-y-3">
                <div className="skeleton-base h-16 animate-pulse rounded-xl" />

                <div className="skeleton-base h-16 animate-pulse rounded-xl" />

                <div className="skeleton-base h-16 animate-pulse rounded-xl" />
              </div>
            </div>
          </GlassContainer>
        </div>

        <div className="order-4 flex md:order-3 md:h-full">
          <div className="flex w-full flex-col gap-6 md:h-full md:w-[280px] lg:w-[300px] xl:w-[350px]">
            <GlassContainer className="flex-shrink-0">
              <div className="mb-3 flex items-center justify-center gap-2 md:gap-3">
                <div className="skeleton-base h-4 w-10 animate-pulse rounded md:h-5" />
                <div className="skeleton-base h-9 w-12 animate-pulse rounded md:h-11 lg:h-14" />
              </div>
              <div className="skeleton-base mx-auto h-4 w-24 animate-pulse rounded md:h-5" />
            </GlassContainer>

            <GlassContainer className="flex flex-col overflow-hidden md:flex-1">
              <div className="skeleton-base mb-3 h-6 w-16 flex-shrink-0 animate-pulse rounded md:mb-4 md:h-7" />
              <div className="max-h-[400px] space-y-2 overflow-y-auto md:max-h-none md:flex-1">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton-base h-8 w-full animate-pulse rounded-lg md:h-9"
                  />
                ))}
              </div>
            </GlassContainer>
          </div>
        </div>

        <div className="order-3 md:order-4 md:col-span-3 md:mt-0">
          <GlassContainer>
            <div className="space-y-2">
              <div className="skeleton-base h-4 w-full animate-pulse rounded leading-relaxed" />
              <div className="skeleton-base h-4 w-full animate-pulse rounded leading-relaxed" />
              <div className="skeleton-base h-4 w-5/6 animate-pulse rounded leading-relaxed" />
              <div className="skeleton-base h-4 w-4/6 animate-pulse rounded leading-relaxed" />
            </div>
          </GlassContainer>
        </div>
      </div>
    </div>
  );

  const mainCast = (
    <div>
      <SectionHeader title="Main Cast" variant="default" />
      <CardGrid>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="text-center">
            <div className="content-card-wrapper group relative w-full">
              <div className="content-card-link skeleton-bg relative block aspect-[2/3] w-full animate-pulse overflow-hidden rounded-2xl bg-zinc-900 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <div className="content-card-overlay absolute inset-x-0 bottom-0 z-20 flex flex-col items-start gap-2 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-1.5 md:p-5">
                  <h3 className="skeleton-base h-4 w-20 animate-pulse rounded text-left text-xs leading-tight tracking-tight md:h-5 md:text-sm" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardGrid>
    </div>
  );

  const trailer = (
    <div className="mt-6 sm:mt-8">
      <SectionHeader title="Watch Trailer" variant="default" />
      <div className="trailer-container card-base skeleton-bg relative mx-auto aspect-video w-full max-w-4xl animate-pulse cursor-pointer overflow-hidden rounded-lg border border-zinc-800/50 shadow-xl sm:rounded-xl sm:shadow-2xl" />
    </div>
  );

  const similar = (
    <div className="overflow-hidden border-t border-zinc-800/50 pt-8">
      <SectionHeader title="Similar" variant="large" showIcon />
      <div className="mt-6 sm:mt-8">
        <CarouselContainer>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="relative w-[240px] flex-shrink-0">
              <ContentCardSkeleton />
            </div>
          ))}
        </CarouselContainer>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black px-4 pb-8 text-white sm:px-6 lg:px-12">
      {mainContent}
      {mainCast}
      {trailer}
      {similar}
    </div>
  );
}
