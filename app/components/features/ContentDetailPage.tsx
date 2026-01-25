import SimilarContent from '@/app/components/features/content/ContentDetail/sections/SimilarContent';
import TrailerPlayer from '@/app/components/features/video/TrailerPlayer';
import MainCast from '@/app/components/features/content/ContentDetail/actors/MainCast';
import ContentPageMainSection from '@/app/components/features/content/ContentDetail/containers/ContentPageMainSection';
import { getContentInfoModel } from '@/helpers/getContentInfoModel';
import { notFound } from 'next/navigation';
import type { BasePath } from '@/types/media';

interface ContentDetailPageProps {
  id: string;
  contentType: 'movie' | 'tv';
  basePath: BasePath;
}

export default async function ContentDetailPage({
  id,
  contentType,
  basePath,
}: ContentDetailPageProps) {
  const data = await getContentInfoModel(id, contentType);

  const {
    content,
    info,
    yearDisplay,
    directors,
    ratingAndCast,
    mainCast,
    videoId,
    similarGenres,
    similar,
    posterUrl,
  } = data;

  if (!content) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black px-4 pb-8 text-white sm:px-6 lg:px-12">
      <ContentPageMainSection
        content={content}
        info={info}
        yearDisplay={yearDisplay}
        directors={directors}
        ratingAndCast={ratingAndCast}
        posterUrl={posterUrl}
      />
      {mainCast?.length && (
        <div>
          <MainCast actors={mainCast} />
        </div>
      )}
      {videoId && (
        <div>
          <TrailerPlayer videoId={videoId} />
        </div>
      )}
      {similar && (
        <div className="overflow-hidden border-t border-zinc-800/50">
          <SimilarContent
            similar={similar}
            genres={similarGenres}
            basePath={basePath}
            contentId={id}
            title={info.title}
          />
        </div>
      )}
    </div>
  );
}
