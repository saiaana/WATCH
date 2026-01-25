'use client';

import { memo } from 'react';
import NavBar from './NavBar';

interface NavBarClientWrapperProps {
  isCollapsed: boolean;
}

const NavBarClientWrapperComponent = function NavBarClientWrapper({
  isCollapsed,
}: NavBarClientWrapperProps) {
  return <NavBar isCollapsed={isCollapsed} />;
};

export const NavBarClientWrapper = memo(NavBarClientWrapperComponent);
