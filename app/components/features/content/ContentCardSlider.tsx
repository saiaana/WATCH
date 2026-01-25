'use client';

import { useRouter } from 'next/navigation';
import type { ContentSliderProps } from '@/types/component';
import ContentCard from '@/app/components/features/content/ContentCard';
import SectionHeader from '@/app/components/ui/SectionHeader';
import CarouselContainer from '@/app/components/ui/CarouselContainer';
import { getContentLink } from '@/helpers/routes';
import { useViewAllTabSelection } from '@/hooks/ui/useViewAllTabSelection';

function ContentCardSlider({ items, sectionTitle, path, title, basePath }: ContentSliderProps) {
  const router = useRouter();
  const { setTabFromViewAll } = useViewAllTabSelection();

  if (!items || items.length === 0) {
    return null;
  }

  const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (basePath) {
      setTabFromViewAll(basePath);
    }

    const url = path!;
    const queryString = title ? `?title=${encodeURIComponent(title)}` : '';
    router.push(url + queryString);
  };

  return (
    <section className="mb-16 md:mb-24">
      <div className="relative">
        <SectionHeader title={sectionTitle} variant="large" showIcon />
        <div className="mt-6 sm:mt-8">
          <CarouselContainer>
            {items.map((item) => (
              <div key={item.id} className="w-[240px]">
                <ContentCard
                  item={item.cardItem}
                  linkTo={getContentLink(item.id, item.cardItem.contentType)}
                />
              </div>
            ))}
            {path && (
              <a className="view-all-button group" href={path} onClick={handleViewAllClick}>
                <span className="transition-colors duration-200 group-hover:text-purple-300">
                  View all
                </span>
              </a>
            )}
          </CarouselContainer>
        </div>
      </div>
    </section>
  );
}
export default ContentCardSlider;
