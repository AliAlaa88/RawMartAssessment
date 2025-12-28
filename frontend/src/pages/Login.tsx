import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@/components/common';
import { authApi } from '@/api';
import { useAuth } from '@/context';

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });
      login(response.token, response.user);
      navigate('/tasks');
    } catch (err: any) {
      setError(err.response?.data?.message || t('auth.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
