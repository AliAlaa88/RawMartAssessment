import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@/components/common';
import { authApi } from '@/api';
import { useAuth } from '@/context';

export function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = t('errors.required');
    if (!email.trim()) newErrors.email = t('errors.required');
    if (password.length < 8) newErrors.password = t('errors.passwordMin');
    if (password !== passwordConfirm) newErrors.passwordConfirm = t('errors.passwordMatch');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);

    try {
      const response = await authApi.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      });
      login(response.token, response.user);
      navigate('/tasks');
    } catch (err: any) {
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        const mapped: Record<string, string> = {};
        Object.keys(serverErrors).forEach((key) => {
          mapped[key] = serverErrors[key][0];
        });
        setErrors(mapped);
      } else {
        setErrors({ general: err.response?.data?.message || t('common.error') });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary text-center mb-6">
          {t('auth.register')}
        </h1>

        {errors.general && (
          <div className="mb-4 p-3 bg-[--color-danger]/10 border border-[--color-danger] rounded-lg text-[--color-danger] text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('auth.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />
          
          <Input
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />
          
          <Input
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />
          
          <Input
            label={t('auth.confirmPassword')}
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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
