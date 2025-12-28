import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';
import { Button, ConfirmModal, ThemeToggle, LanguageSwitcher } from '@/components/common';
import type { User } from '@/types';

interface TasksHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function TasksHeader({ user, onLogout }: TasksHeaderProps) {
  const { t } = useTranslation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    onLogout();
  };

  return (
    <>
      <header className="bg-primary border-b border-primary">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">{t('tasks.title')}</h1>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <span className="text-secondary text-sm hidden sm:block">
              {user?.name}
            </span>
            <Button className="flex items-center gap-2" variant="secondary" onClick={() => setIsLogoutModalOpen(true)}>
              <LogOut size={16} />
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </header>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title={t('auth.logoutTitle')}
        message={t('auth.logoutConfirm')}
        confirmText={t('common.logout')}
        cancelText={t('common.cancel')}
        variant="warning"
      />
    </>
  );
}
