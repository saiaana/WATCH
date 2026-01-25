import Logo from '@/app/components/navigation/Header/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900 py-8 text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 animate-pulse rounded-full bg-pink-500/10 blur-3xl delay-1000" />
      </div>
      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <Logo />
        </div>
        {children}
      </div>
    </main>
  );
}
