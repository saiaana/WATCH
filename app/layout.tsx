import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './styles/globals.css';
import { ClientProviders } from '@/app/components/providers/ClientProviders';
import AuthInitializer from '@/app/components/features/auth/AuthInitializer';
import GenresInitializer from '@/app/components/features/genre/GenresInitializer';
import FavoritesInitializer from '@/app/components/features/favorites/FavoritesInitializer';
import AppLayout from '@/app/components/layout/AppLayout';
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'WATCH',
  description: 'Discover the Best Movies & TV Shows',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${poppins.variable} bg-black text-white antialiased`}>
        <GoogleAnalytics gaId="G-ZL96FLEBQL" />
        <ClientProviders>
          <AuthInitializer />
          <GenresInitializer />
          <FavoritesInitializer />
          <AppLayout>{children}</AppLayout>
        </ClientProviders>
      </body>
    </html>
  );
}
