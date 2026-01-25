import type { Metadata } from 'next';
import AuthLayout from '@/app/components/features/auth/AuthLayout';
import AuthCheck from '@/app/components/features/auth/AuthCheck';
import LoginForm from './components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In - Watch',
  description:
    'Sign in to your account to access your favorite movies and TV shows. Join thousands of users enjoying premium entertainment content.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage() {
  return (
    <AuthLayout>
      <AuthCheck>
        <LoginForm />
      </AuthCheck>
    </AuthLayout>
  );
}
