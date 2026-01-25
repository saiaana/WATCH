import CloseButton from '@/app/components/ui/CloseButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

interface SearchModalHeaderProps {
  query: string;
  setQuery: (query: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchModalHeader({
  query,
  setQuery,
  handleKeyDown,
  onClose,
  inputRef,
}: SearchModalHeaderProps) {
  return (
    <div className="sticky top-0 z-10 rounded-t-lg border-b border-zinc-700 bg-zinc-900 p-3 sm:p-4">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative flex-1">
          <SearchRoundedIcon className="absolute left-2 top-1/2 -translate-y-1/2 transform text-lg text-neutral-400 sm:left-3 sm:text-xl" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search movies, TV shows..."
            className="search-input-base"
          />
        </div>
        <CloseButton
          size="sm"
          onClick={onClose}
          className="flex-shrink-0 border-0 bg-transparent hover:bg-zinc-800"
        />
      </div>
    </div>
  );
}
