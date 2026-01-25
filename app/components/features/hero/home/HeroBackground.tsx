import Image from 'next/image';
import bg from '@/public/bg.jpg';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={bg}
        fill
        quality={80}
        className="object-cover object-center brightness-[0.3]"
        alt="Movies background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20" />
    </div>
  );
}
