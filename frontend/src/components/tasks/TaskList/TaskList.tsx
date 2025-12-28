import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TaskItem } from '../TaskItem';
import { Spinner, Button } from '@/components/common';
import type { Task, TaskStatus, PaginatedTasks } from '@/types';

interface TaskListProps {
  tasks: PaginatedTasks | null;
  isLoading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
  onPageChange: (page: number) => void;
}

export function TaskList({
  tasks,
  isLoading,
  onEdit,
  onDelete,
  onStatusChange,
  onPageChange,
}: TaskListProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  if (isLoading) {
    return (
      <div className="py-12" role="status" aria-label={t('common.loading')}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!tasks || tasks.data.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-secondary">{t('tasks.noTasks')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {tasks.data.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      {/* Pagination */}
      {tasks.last_page > 1 && (
        <nav className="flex justify-center gap-2 pt-4" aria-label={t('common.pagination')}>
          <Button
            className="flex items-center gap-2"
            variant="secondary"
            onClick={() => onPageChange(tasks.current_page - 1)}
            disabled={tasks.current_page === 1}
            aria-label={t('common.previous')}
          >
            {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {t('common.previous')}
          </Button>
          <span className="flex items-center px-4 text-secondary" aria-current="page">
            {t('common.pageOf', { current: tasks.current_page, total: tasks.last_page })}
          </span>
          <Button
            className="flex items-center gap-2"
            variant="secondary"
            onClick={() => onPageChange(tasks.current_page + 1)}
            disabled={tasks.current_page === tasks.last_page}
            aria-label={t('common.next')}
          >
            {t('common.next')}
            {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Button>
        </nav>
      )}
    </div>
  );
}
