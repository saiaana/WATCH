import { memo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

function HeaderUserBadge() {
  const user = useSelector((state: RootState) => state.auth.user);
  const fullName = user?.user_metadata?.full_name;

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleClick = () => {
    startTransition(() => {
      router.push('/favorites');
    });
  };

  if (!fullName) return null;

  return (
    <Link
      href="/favorites"
      onClick={handleClick}
      aria-busy={isPending}
      className={`group flex h-10 min-w-[80px] items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-3 text-sm text-neutral-300 backdrop-blur transition-all duration-200 hover:border-purple-500/30 hover:bg-zinc-900/80 hover:text-purple-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-semibold text-white transition-transform duration-200 group-hover:scale-105">
        {fullName.charAt(0).toUpperCase()}
      </div>

      <span className="relative min-w-[10ch] truncate font-medium">
        <span className={isPending ? 'opacity-0' : 'opacity-100'}>{fullName}</span>

        {isPending && <span className="absolute inset-0 flex items-center">LOADING...</span>}
      </span>
    </Link>
  );
}

export default memo(HeaderUserBadge);
