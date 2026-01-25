'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface NavBarContextType {
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
}

const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

export function NavBarProvider({ children }: { children: ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavBarContext.Provider value={{ isHovered, setIsHovered }}>{children}</NavBarContext.Provider>
  );
}

export function useNavBar() {
  const context = useContext(NavBarContext);
  if (context === undefined) {
    throw new Error('useNavBar must be used within a NavBarProvider');
  }
  return context;
}

export function useNavBarOptional() {
  const context = useContext(NavBarContext);
  return context;
}
