import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './styles/globals.css';
import { ClientProviders } from '@/app/components/providers/ClientProviders';
import AuthInitializer from '@/app/components/features/auth/AuthInitializer';
import GenresInitializer from '@/app/components/features/genre/GenresInitializer';
import FavoritesInitializer from '@/app/components/features/favorites/FavoritesInitializer';
import AppLayout from '@/app/components/layout/AppLayout';
import Script from 'next/script';

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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZL96FLEBQL"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZL96FLEBQL');
        `}
      </Script>
      <body className={`min-h-screen ${poppins.variable} bg-black text-white antialiased`}>
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
