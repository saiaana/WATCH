import { MediaContent } from '@/types/media';
import ContentInfo from '../info/ContentInfo';
import ContentPoster from '../layout/ContentPoster';
import RatingAndCastList from '../sections/RatingAndCastList';
import { ContentInfoModel } from '@/features/movies/mapToContentInfo';
import { RatingAndCastListModel } from '@/features/movies/mapToRatingAndCastListInfo';
import type { CrewMember, Genre } from '@/types/common';
import ContentInfoBlock from '../info/ContentInfoBlock';
import GlassContainer from '@/app/components/ui/GlassContainer';

interface ContentPageMainSectionProps {
  content: MediaContent;
  info: ContentInfoModel;
  directors: CrewMember[];
  ratingAndCast: RatingAndCastListModel;
  yearDisplay?: string | null;
  posterUrl: string;
}

export default function ContentPageMainSection({
  content,
  info,
  directors,
  ratingAndCast,
  yearDisplay,
  posterUrl,
}: ContentPageMainSectionProps) {
  const genres = (content.genres || []) as Genre[];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height, 88px) + 1rem)' }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr_220px] md:gap-4 lg:grid-cols-[300px_1fr_300px] lg:items-stretch lg:gap-6 xl:grid-cols-[340px_1fr_340px]">
        <div className="order-1 flex md:h-full">
          <ContentPoster posterUrl={posterUrl} title={info.title} />
        </div>
        <div className="order-2 flex md:h-full">
          <ContentInfo
            content={content}
            info={info}
            directors={directors}
            genres={genres}
            yearDisplay={yearDisplay}
          />
        </div>
        <div className="order-4 flex md:order-3 md:h-full">
          <RatingAndCastList data={ratingAndCast} />
        </div>
        <div className="order-3 md:order-4 md:col-span-3 md:mt-0">
          <GlassContainer>
            <ContentInfoBlock type="overview" overview={info.overview} />
          </GlassContainer>
        </div>
      </div>
    </div>
  );
}
