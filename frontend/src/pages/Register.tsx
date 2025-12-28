import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Input, ThemeToggle, LanguageSwitcher } from '@/components/common';

interface RegisterViewProps {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  errors: Record<string, string>;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
  onSubmit: () => void;
}

export function RegisterView({
  name,
  email,
  password,
  passwordConfirm,
  errors,
  isLoading,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onSubmit,
}: RegisterViewProps) {
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
          {t('auth.register')}
        </h1>

        {errors.general && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger rounded-lg text-danger text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('auth.name')}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            error={errors.name}
            required
          />
          
          <Input
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            error={errors.email}
            required
          />
          
          <Input
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            error={errors.password}
            required
          />
          
          <Input
            label={t('auth.confirmPassword')}
            type="password"
            value={passwordConfirm}
            onChange={(e) => onPasswordConfirmChange(e.target.value)}
            error={errors.passwordConfirm}
            required
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            {t('auth.register')}
          </Button>
        </form>

        <p className="mt-6 text-center text-secondary">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-[--color-primary] hover:underline">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
