'use client';

import { useEffect, useState } from 'react';
import { usePersonContent } from '@/hooks/content/persons/usePersonContent';
import {
  getContentByActor,
  getContentByDirector,
  searchPersonByName,
} from '@/lib/client/data-service';
import PersonContentPageClient from './PersonContentPageClient';

type PersonType = 'actor' | 'director';

interface BaseProps {
  personName: string;
  personType: PersonType;
}

interface ActorProps extends BaseProps {
  personType: 'actor';
  personId: number;
}

interface DirectorProps extends BaseProps {
  personType: 'director';
  personId?: number;
}

type Props = ActorProps | DirectorProps;

export default function PersonContentClient(props: Props) {
  const { personName, personType } = props;
  const initialPersonId = props.personType === 'actor' ? props.personId : (props.personId ?? null);
  const [personId, setPersonId] = useState<number | null>(initialPersonId);

  const directorId = props.personType === 'director' ? props.personId : undefined;

  // Search for director by name if id is not provided
  useEffect(() => {
    if (personType === 'actor') {
      setPersonId(props.personId);
      return;
    }

    if (directorId) {
      setPersonId(directorId);
      return;
    }

    let abortController: AbortController | null = null;

    const searchPerson = async () => {
      abortController = new AbortController();

      try {
        const id = await searchPersonByName(personName, abortController.signal);
        setPersonId(id);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error searching for person:', error);
        }
        setPersonId(null);
      }
    };

    searchPerson();

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [personName, personType, props.personId, directorId]);

  // Hooks must be called unconditionally, so we call both but only use the relevant one
  const actorMovies = usePersonContent(
    personType === 'actor' ? (personId ?? 0) : 0,
    'movie',
    getContentByActor,
  );
  const actorTvShows = usePersonContent(
    personType === 'actor' ? (personId ?? 0) : 0,
    'tv',
    getContentByActor,
  );
  const directorMovies = usePersonContent(
    personType === 'director' ? personId : null,
    'movie',
    getContentByDirector,
  );
  const directorTvShows = usePersonContent(
    personType === 'director' ? personId : null,
    'tv',
    getContentByDirector,
  );

  const movies = personType === 'actor' ? actorMovies : directorMovies;
  const tvShows = personType === 'actor' ? actorTvShows : directorTvShows;

  const title = personType === 'actor' ? `${personName} - Actor` : `${personName} - Director`;
  const subtitle =
    personType === 'actor'
      ? `Movies and TV Shows featuring ${personName}`
      : `Movies and TV Shows directed by ${personName}`;

  return (
    <PersonContentPageClient
      title={title}
      subtitle={subtitle}
      icon="🎬"
      movies={movies}
      tvShows={tvShows}
      emptyMovieText={{ title: 'No movies found', description: 'No movies found' }}
      emptyTvText={{ title: 'No TV shows found', description: 'No TV shows found' }}
      loadingMovieTitle="Loading Movies"
      loadingMovieSubtitle={`Discovering ${personName}'s work...`}
      loadingTvTitle="Loading TV Shows"
      loadingTvSubtitle={`Discovering ${personName}'s work...`}
    />
  );
}
