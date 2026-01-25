import Logo from '@/app/components/navigation/Header/Logo';
import HeroHeading from './HeroHeading';
import HeroDescription from './HeroDescription';
import HeroActionButtons from './HeroActionButtons';
import HeroAuthSection from './HeroAuthSection';

export default function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
      <div className="mb-8 sm:mb-12">
        <Logo />
      </div>

      <HeroHeading />

      <HeroDescription />

      <HeroActionButtons />

      <HeroAuthSection />
    </div>
  );
}
