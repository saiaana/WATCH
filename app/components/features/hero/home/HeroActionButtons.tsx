import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Button from '@/app/components/ui/Button';

export default function HeroActionButtons() {
  return (
    <div className="mb-8 flex w-full animate-fadeIn flex-col gap-4 sm:w-auto sm:flex-row sm:gap-6">
      <Button href="/movies" variant="gradient" size="large" className="hover:scale-105">
        <MovieIcon className="mr-3 text-xl" />
        <span className="text-base sm:text-lg">Explore Movies</span>
      </Button>

      <Button href="/tvshows" variant="outlined" size="large" className="hover:scale-105">
        <LiveTvIcon className="text-xl" />
        <span className="text-base sm:text-lg">Browse TV Shows</span>
      </Button>
    </div>
  );
}
