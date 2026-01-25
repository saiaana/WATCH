import { memo } from 'react';

interface Props {
  title: string;
  adult: boolean;
  yearDisplay?: string | null;
}

function ContentHeader({ title, adult, yearDisplay }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="heading-main flex items-center gap-4 uppercase text-yellow-400">
        {title}
        {adult && <span className="text-sm font-semibold text-red-400">18+</span>}
      </h1>
      {yearDisplay && (
        <p className="text-base font-medium text-neutral-200 md:text-lg lg:text-xl">
          {yearDisplay}
        </p>
      )}
    </div>
  );
}
export default memo(ContentHeader);
