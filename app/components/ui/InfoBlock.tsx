import Link from 'next/link';

export interface InfoBlockItem {
  id: string;
  label: string;
  href?: string;
}

interface InfoBlockProps {
  blockTitle?: string;
  items: InfoBlockItem[];
}

export default function InfoBlock({ blockTitle, items }: InfoBlockProps) {
  if (items.length === 0) return null;

  return (
    <div className="text-base sm:text-lg">
      {blockTitle && <p className="mb-1 font-semibold text-white">{blockTitle}:</p>}

      <ul className="flex flex-wrap text-neutral-200">
        {items.map((item, index) => (
          <li key={item.id} className="flex">
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors duration-300 hover:text-purple-400"
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}

            {index < items.length - 1 && <span>,&nbsp;</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
