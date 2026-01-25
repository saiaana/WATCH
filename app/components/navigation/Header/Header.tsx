'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import SearchModal from '@/app/components/features/search/SearchModal';
import { useNavBarOptional } from '../NavBar/NavBarContext';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import HeaderMobileMenu from './HeaderMobileMenu';
import AiSearchModal from '@/app/components/features/search/AiSearchModal';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiSearchOpen, setIsAiSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navBarContext = useNavBarOptional();
  const isNavBarHovered = navBarContext?.isHovered ?? false;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleAiSearchClick = () => {
    setIsAiSearchOpen(true);
  };

  const handleAiSearchClose = () => {
    setIsAiSearchOpen(false);
  };

  return (
    <>
      <div className={cn('header-base', isNavBarHovered ? 'md:left-[274px]' : 'md:left-16')}>
        <HeaderLeft
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={handleMobileMenuToggle}
        />

        <HeaderRight onSearchClick={handleSearchOpen} onAiSearchClick={handleAiSearchClick} />
      </div>

      <HeaderMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        isNavBarHovered={isNavBarHovered}
      />

      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
      <AiSearchModal isOpen={isAiSearchOpen} onClose={handleAiSearchClose} />
    </>
  );
}
