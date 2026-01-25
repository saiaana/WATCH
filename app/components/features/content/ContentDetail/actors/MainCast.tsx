import { MainCastActorModel } from '@/features/movies/mapToMainCast';
import PersonCard from '@/app/components/ui/PersonCard';
import SectionHeader from '@/app/components/ui/SectionHeader';
import CardGrid from '@/app/components/ui/CardGrid';
import { memo } from 'react';

interface MainCastProps {
  actors: MainCastActorModel[];
}

function MainCast({ actors }: MainCastProps) {
  return (
    <div>
      <SectionHeader title="Main Cast" variant="default" />
      <CardGrid>
        {actors.map((actor) => (
          <div key={actor.id} className="text-center">
            <PersonCard
              id={actor.id}
              name={actor.name}
              profilePath={actor.profilePath}
              character={actor.character}
            />
          </div>
        ))}
      </CardGrid>
    </div>
  );
}

export default memo(MainCast);
