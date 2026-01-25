'use client';

import CloseButton from '@/app/components/ui/CloseButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { cn } from '@/lib/utils';

interface AiSearchModalInputProps {
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export default function AiSearchModalInput({
  prompt,
  setPrompt,
  handleKeyDown,
  onSearch,
  onClose,
  inputRef,
}: AiSearchModalInputProps) {
  const canSearch = prompt.trim().length > 0;

  const handleClose = () => {
    setPrompt('');
    onClose();
  };

  return (
    <div className="sticky top-0 z-10 rounded-t-lg border-b border-zinc-700 bg-zinc-900 p-3 sm:p-4">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative flex-1">
          <SearchRoundedIcon className="absolute left-2 top-1/2 -translate-y-1/2 transform text-lg text-neutral-400 sm:left-3 sm:text-xl" />
          <input
            ref={inputRef}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe TV Show or Movie and I'll give you recommendations..."
            className="search-input-base"
          />
        </div>
        <button
          onClick={onSearch}
          disabled={!canSearch}
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-800/60 px-4 py-2 text-sm font-medium text-neutral-200 transition-all duration-200',
            'hover:border-purple-500/30 hover:bg-zinc-800/80 hover:text-purple-300',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50',
            'active:scale-[0.98]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:bg-zinc-800/60 disabled:hover:text-neutral-200',
          )}
          aria-label="Search"
        >
          <SearchRoundedIcon className="text-lg" />
          <span className="hidden sm:inline">Search</span>
        </button>
        <CloseButton
          size="sm"
          onClick={handleClose}
          className="flex-shrink-0 border-0 bg-transparent hover:bg-zinc-800"
        />
      </div>
    </div>
  );
}
