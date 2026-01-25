import { ReactNode } from 'react';

interface VideoGridLayoutProps {
  header: ReactNode;
  videos: ReactNode;
}

export default function VideoGridLayout({ header, videos }: VideoGridLayoutProps) {
  return (
    <div className="relative">
      {header}
      {videos}
    </div>
  );
}
