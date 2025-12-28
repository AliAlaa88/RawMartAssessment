import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { authApi } from "@/api";
import { useAuth } from "@/context";
import { useDocumentTitle } from "@/hooks";
import { RegisterView } from "@/pages/Register";

export function RegisterContainer() {
  useDocumentTitle('register');
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

  const handleSubmit = async () => {
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
    <RegisterView
      name={name}
      email={email}
      password={password}
      passwordConfirm={passwordConfirm}
      errors={errors}
      isLoading={isLoading}
      onNameChange={setName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onPasswordConfirmChange={setPasswordConfirm}
      onSubmit={handleSubmit}
    />
  );
}
