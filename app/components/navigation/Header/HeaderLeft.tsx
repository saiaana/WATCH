import { memo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GenreSelector from '@/app/components/features/genre/GenreSelector';
import HeaderButton from './HeaderButton';
import Logo from './Logo';

interface HeaderLeftProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

function HeaderLeft({ isMobileMenuOpen, onMobileMenuToggle }: HeaderLeftProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      <HeaderButton
        onClick={onMobileMenuToggle}
        ariaLabel="Toggle mobile menu"
        className="h-9 w-9 sm:h-10 sm:w-10 md:hidden"
      >
        {isMobileMenuOpen ? (
          <CloseIcon fontSize="small" className="transition-transform duration-200" />
        ) : (
          <MenuIcon
            fontSize="small"
            className="transition-transform duration-200 group-hover:scale-110"
          />
        )}
      </HeaderButton>

      <div className="md:hidden">
        <Logo />
      </div>
      <div className="hidden md:block">
        <GenreSelector />
      </div>
    </div>
  );
}

export default memo(HeaderLeft);
