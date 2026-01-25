import { Actor } from '@/types/common';
import { memo, useTransition } from 'react';
import { cn } from '@/lib/utils';

interface ActorRowProps {
  actor: Actor;
  onClick: (actorId: number, actorName: string) => void;
}
function ActorRow({ actor, onClick }: ActorRowProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      onClick(actor.id, actor.name);
    });
  };

  return (
    <button
      key={actor.id}
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        'relative w-full cursor-pointer rounded-lg border border-transparent bg-zinc-800/50 px-3 py-1.5 text-left text-sm text-neutral-200 transition-all duration-200 hover:border-purple-500/30 hover:bg-zinc-800/70 hover:text-purple-400 md:py-2 md:text-base',
        isPending && 'cursor-wait opacity-70',
      )}
      aria-busy={isPending}
    >
      <p className="font-medium">{isPending ? 'Loading...' : actor.name}</p>
    </button>
  );
}

export default memo(ActorRow);
