import type { Metadata } from 'next';
import AuthLayout from '@/app/components/features/auth/AuthLayout';
import AuthCheck from '@/app/components/features/auth/AuthCheck';
import SignUpForm from './components/SignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up - Watch',
  description:
    'Create your account to access your favorite movies and TV shows. Join thousands of users enjoying premium entertainment content.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignUpPage() {
  return (
    <AuthLayout>
      <AuthCheck>
        <SignUpForm />
      </AuthCheck>
    </AuthLayout>
  );
}
