'use client';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HeaderUserBadge from './HeaderUserBadge';

interface HeaderRightProps {
  onSearchClick: () => void;
  onAiSearchClick: () => void;
}

export default function HeaderRight({ onSearchClick, onAiSearchClick }: HeaderRightProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onAiSearchClick}
        aria-label="AI Search"
        className="group flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-3 text-sm text-neutral-300 backdrop-blur transition-all duration-200 hover:border-purple-500/30 hover:bg-zinc-900/80 hover:text-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 active:scale-95 md:px-4"
      >
        <AutoAwesomeIcon className="text-[18px] flex-shrink-0 transition-transform group-hover:scale-110" />
        <span className="hidden whitespace-nowrap text-xs font-medium md:inline md:text-sm">
          AI Search
        </span>
      </button>
      <button
        onClick={onSearchClick}
        aria-label="Search"
        className="group flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-3 text-sm text-neutral-300 backdrop-blur transition-all duration-200 hover:border-purple-500/30 hover:bg-zinc-900/80 hover:text-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 active:scale-95 md:px-4"
      >
        <SearchRoundedIcon className="text-[18px] flex-shrink-0 transition-transform group-hover:scale-110" />
        <span className="hidden whitespace-nowrap text-xs font-medium md:inline md:text-sm">
          Search
        </span>
      </button>

      <HeaderUserBadge />
    </div>
  );
}
