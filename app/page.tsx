import HeroBackground from '@/app/components/features/hero/home/HeroBackground';
import HeroContent from '@/app/components/features/hero/home/HeroContent';

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white">
      <HeroBackground />
      <HeroContent />
    </main>
  );
}
