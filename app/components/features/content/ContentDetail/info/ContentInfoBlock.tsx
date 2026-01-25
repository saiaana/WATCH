import InfoBlock from '@/app/components/ui/InfoBlock';
import type { Genre, CrewMember } from '@/types/common';

type InfoBlockType = 'genres' | 'directors' | 'countries' | 'overview';

interface ContentInfoBlockProps {
  type: InfoBlockType;
  genres?: Genre[];
  directors?: CrewMember[];
  countries?: string[];
  overview?: string;
}

export default function ContentInfoBlock({
  type,
  genres,
  directors,
  countries,
  overview,
}: ContentInfoBlockProps) {
  if (type === 'genres' && genres?.length) {
    const items = genres
      .filter((g) => g?.id && g?.name)
      .map((g) => ({
        id: String(g.id),
        label: g.name,
        href: `/genres/${g.id}`,
      }));

    return <InfoBlock blockTitle="Genre" items={items} />;
  }

  if (type === 'directors' && directors?.length) {
    const items = directors.map((d) => ({
      id: d.id ? String(d.id) : d.name,
      label: d.name,
      href: `/director/${encodeURIComponent(d.name)}${d.id ? `?id=${d.id}` : ''}`,
    }));

    return <InfoBlock blockTitle="Director" items={items} />;
  }

  if (type === 'countries' && countries?.length) {
    const items = countries.map((country) => ({
      id: country,
      label: country,
    }));

    return <InfoBlock blockTitle="Country" items={items} />;
  }

  if (type === 'overview' && overview?.trim()) {
    return (
      <div className="mt-4">
        <InfoBlock items={[{ id: 'overview', label: overview }]} />
      </div>
    );
  }

  return null;
}
