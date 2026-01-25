'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store';
import { signup } from '@/store/authSlice';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SubmitButton from '@/app/components/ui/SubmitButton';

type FormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormStatus = {
  message: string;
  type: 'error' | 'success' | '';
};

export default function SignUpForm() {
  const inputStyle =
    'w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 text-white placeholder-neutral-400 rounded-lg border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none transition-colors duration-200';
  const iconStyle = 'absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400';

  const dispatch = useAppDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState<FormStatus>({ message: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: '', type: '' });

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setStatus({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    if (form.password.length < 6) {
      setStatus({ message: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setStatus({ message: 'Passwords do not match', type: 'error' });
      return;
    }

    try {
      await dispatch(
        signup({
          email: form.email,
          password: form.password,
          fullName: form.fullName,
        }),
      ).unwrap();

      setStatus({
        message: 'Check your email to confirm your account',
        type: 'success',
      });
      setForm({ fullName: '', email: '', password: '', confirmPassword: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setStatus({ message, type: 'error' });
    }
  };

  const inputElementsData = [
    {
      name: 'fullName',
      label: 'Full Name',
      icon: <PersonIcon fontSize="small" />,
      type: 'text',
      value: form.fullName,
    },
    {
      name: 'email',
      label: 'Email',
      icon: <EmailIcon fontSize="small" />,
      type: 'email',
      value: form.email,
    },
    {
      name: 'password',
      label: 'Password',
      icon: <LockIcon fontSize="small" />,
      type: 'password',
      value: form.password,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      icon: <LockOutlinedIcon fontSize="small" />,
      type: 'password',
      value: form.confirmPassword,
    },
  ];

  const inputElements = inputElementsData.map((input) => {
    return (
      <div key={input.name} className="relative">
        <div className={iconStyle}>{input.icon}</div>
        <input
          type={input.type}
          name={input.name}
          placeholder={input.label}
          className={inputStyle}
          value={input.value}
          onChange={handleChange}
          aria-required="true"
          aria-label={input.label}
          required
        />
      </div>
    );
  });

  return (
    <>
      <div className="w-full rounded-2xl border border-zinc-800/50 bg-zinc-900/80 p-6 shadow-2xl sm:p-8">
        <h1 className="mb-2 text-center text-3xl font-extrabold sm:text-4xl">
          Create Your Account
        </h1>
        <p className="mb-8 text-center text-sm text-neutral-400 sm:text-base">
          Join the movie world and start your entertainment journey
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {inputElements}

          {(status.message || error) && (
            <div
              id="form-status"
              role={status.type === 'error' || error ? 'alert' : 'status'}
              className={cn(
                'rounded-lg p-3 text-sm',
                status.type === 'error' || error
                  ? 'border border-red-500/30 bg-red-500/10 text-red-400'
                  : 'border border-green-500/30 bg-green-500/10 text-green-400',
              )}
            >
              {status.message || error}
            </div>
          )}
          <SubmitButton isLoading={isLoading} loadingText="Signing Up..." buttonText="Sign Up" />
        </form>

        <div className="mt-6 border-t border-zinc-800/50 pt-6 text-center">
          <p className="mb-2 text-sm text-neutral-400">Already have an account?</p>
          <Link
            href="/login"
            className="font-semibold text-purple-400 underline underline-offset-4 transition-colors duration-200 hover:text-purple-300"
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  );
}
