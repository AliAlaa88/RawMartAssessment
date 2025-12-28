import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';

interface DeadlineIndicatorProps {
  deadline: string | null;
}

interface RemainingTimeInfo {
  key: string;
  values: Record<string, number>;
  isUrgent: boolean;
}

function getRemainingTime(deadline: string | null): RemainingTimeInfo | null {
  if (!deadline) return null;
  
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - now.getTime();
  
  if (diffMs < 0) {
    return { key: 'tasks.time.overdue', values: {}, isUrgent: true };
  }
  
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const remainingHours = diffHours % 24;
  
  const isUrgent = diffHours < 24;
  
  if (diffDays > 0) {
    return { key: 'tasks.time.daysHoursLeft', values: { days: diffDays, hours: remainingHours }, isUrgent };
  }
  if (diffHours > 0) {
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return { key: 'tasks.time.hoursMinutesLeft', values: { hours: diffHours, minutes: diffMinutes }, isUrgent };
  }
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  return { key: 'tasks.time.minutesLeft', values: { minutes: diffMinutes }, isUrgent: true };
}

export function DeadlineIndicator({ deadline }: DeadlineIndicatorProps) {
  const { t } = useTranslation();
  const remainingTime = useMemo(() => getRemainingTime(deadline), [deadline]);

  if (!remainingTime) return null;

  return (
    <span
      role="status"
      aria-label={t(remainingTime.key, remainingTime.values)}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        remainingTime.isUrgent
          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse'
          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      }`}
    >
      <Clock size={12} aria-hidden="true" />
      {t(remainingTime.key, remainingTime.values)}
    </span>
  );
}
