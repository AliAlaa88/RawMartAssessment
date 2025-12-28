import { useTranslation } from 'react-i18next';
import { TaskItem } from './TaskItem';
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
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="py-12">
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
        <div className="flex justify-center gap-2 pt-4">
          <Button
            variant="secondary"
            onClick={() => onPageChange(tasks.current_page - 1)}
            disabled={tasks.current_page === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-secondary">
            Page {tasks.current_page} of {tasks.last_page}
          </span>
          <Button
            variant="secondary"
            onClick={() => onPageChange(tasks.current_page + 1)}
            disabled={tasks.current_page === tasks.last_page}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
