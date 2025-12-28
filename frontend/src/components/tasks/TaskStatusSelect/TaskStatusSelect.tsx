import { useTranslation } from 'react-i18next';
import type { TaskStatus } from '@/types';

interface TaskStatusSelectProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
  compact?: boolean;
}

export function TaskStatusSelect({ value, onChange, compact = false }: TaskStatusSelectProps) {
  const { t } = useTranslation();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskStatus)}
      className={`input ${compact ? '!py-1 !px-2 text-sm w-auto' : ''}`}
    >
      <option value="pending">{t('tasks.status.pending')}</option>
      <option value="in_progress">{t('tasks.status.in_progress')}</option>
      <option value="done">{t('tasks.status.done')}</option>
    </select>
  );
}
