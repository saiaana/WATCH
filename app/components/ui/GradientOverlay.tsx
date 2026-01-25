import { cn } from '@/lib/utils';

interface GradientOverlayProps {
  variant?: 'top' | 'bottom' | 'hover' | 'full';
  className?: string;
}

const variantClasses = {
  top: 'bg-gradient-to-t from-black/100 via-black/30 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-70',
  bottom: 'bg-gradient-to-b from-black/90 via-black/50 to-transparent',
  hover:
    'bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300',
  full: 'bg-gradient-to-t from-black/60 via-black/20 to-transparent',
} as const;

export default function GradientOverlay({ variant = 'top', className }: GradientOverlayProps) {
  return <div className={cn('absolute inset-0', variantClasses[variant], className)} />;
}
