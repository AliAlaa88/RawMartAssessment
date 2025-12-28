import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Input, ThemeToggle, LanguageSwitcher } from '@/components/common';

interface LoginViewProps {
  email: string;
  password: string;
  error: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

export function LoginView({
  email,
  password,
  error,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginViewProps) {
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4 relative">
      {/* Top-right controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary text-center mb-6">
          {t('auth.login')}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-[--color-danger]/10 border border-[--color-danger] rounded-lg text-[--color-danger] text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
          
          <Input
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            {t('auth.login')}
          </Button>
        </form>

        <p className="mt-6 text-center text-secondary">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="text-[--color-primary] hover:underline">
            {t('auth.register')}
          </Link>
        </p>
      </div>
    </div>
  );
}
