'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store';
import { login } from '@/store/authSlice';
import type { RootState } from '@/store';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SubmitButton from '@/app/components/ui/SubmitButton';

type FormState = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email: form.email, password: form.password })).unwrap();
      window.location.href = '/movies';
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const inputStyle =
    'w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 text-white placeholder-neutral-400 rounded-lg border border-zinc-700/50 focus:border-purple-500/50 focus:outline-none transition-colors duration-200';
  const iconStyle = 'absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400';

  const inputElementsData = [
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
          aria-label={input.label}
          aria-required="true"
          required
        />
      </div>
    );
  });

  return (
    <>
      <div className="w-full rounded-2xl border border-zinc-800/50 bg-zinc-900/80 p-6 shadow-2xl sm:p-8">
        <h1 className="mb-2 text-center text-3xl font-extrabold sm:text-4xl">Welcome Back!</h1>
        <p className="mb-8 text-center text-sm text-neutral-400 sm:text-base">
          Sign in to continue your entertainment journey
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {inputElements}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <SubmitButton isLoading={isLoading} loadingText="Logging In..." buttonText="Log In" />
        </form>

        <div className="mt-6 border-t border-zinc-800/50 pt-6 text-center">
          <p className="mb-2 text-sm text-neutral-400">Don&apos;t have an account?</p>
          <Link
            href="/signup"
            className="font-semibold text-purple-400 underline underline-offset-4 transition-colors duration-200 hover:text-purple-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
