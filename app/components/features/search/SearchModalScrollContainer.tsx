import { memo, useEffect, useRef, ReactNode } from 'react';

interface SearchModalScrollContainerProps {
  children: ReactNode;
  activeTab: string;
}

function SearchModalScrollContainer({ children, activeTab }: SearchModalScrollContainerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  return (
    <div
      ref={scrollContainerRef}
      className="max-h-[calc(100vh-180px)] flex-1 overflow-y-auto p-4 sm:max-h-[60vh] sm:p-6"
      style={{
        willChange: 'scroll-position',
        transform: 'translateZ(0)',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </div>
  );
}

export default memo(SearchModalScrollContainer);
