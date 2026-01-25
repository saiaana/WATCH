'use client';

import { usePathname } from 'next/navigation';
import { NavBarClientWrapper } from '../navigation/NavBar/NavBarClientWrapper';
import { NavBarProvider, useNavBar } from '../navigation/NavBar/NavBarContext';
import Header from '../navigation/Header/Header';

const NO_NAVBAR_PATHS = ['/', '/login', '/signup'];

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavBar = !NO_NAVBAR_PATHS.includes(pathname);
  const { isHovered, setIsHovered } = useNavBar();

  if (!showNavBar) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black md:flex-row">
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative z-40 hidden flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out md:block ${isHovered ? 'w-[274px]' : 'w-16'} `}
      >
        <NavBarClientWrapper isCollapsed={!isHovered} />
      </aside>

      <main
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <Header />
        {children}
      </main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavBarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </NavBarProvider>
  );
}
