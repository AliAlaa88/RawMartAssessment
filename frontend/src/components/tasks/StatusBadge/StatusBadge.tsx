import type { TaskStatus } from '@/types';
import { useTranslation } from 'react-i18next';

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation();
  
  const statusClasses: Record<TaskStatus, string> = {
    pending: 'bg-status-pending',
    in_progress: 'bg-status-in-progress',
    done: 'bg-status-done',
  };

  return (
    <span className={`badge ${statusClasses[status]}`}>
      {t(`tasks.status.${status}`)}
    </span>
  );
}
