import { cn } from '@/lib/utils';

interface HoverGlowProps {
  className?: string;
}

export default function HoverGlow({ className }: HoverGlowProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400',
        'opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-20',
        className,
      )}
    />
  );
}
