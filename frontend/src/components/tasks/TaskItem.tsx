import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/common';
import { StatusBadge } from './StatusBadge';
import type { Task, TaskStatus } from '@/types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
}

export function TaskItem({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (window.confirm(t('tasks.deleteConfirm'))) {
      setIsDeleting(true);
      onDelete(task.id);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as TaskStatus);
  };

  return (
    <div className="card flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-primary truncate">{task.title}</h3>
          <StatusBadge status={task.status} />
        </div>
        {task.description && (
          <p className="text-sm text-secondary line-clamp-2">{task.description}</p>
        )}
        <p className="text-xs text-muted mt-1">
          {new Date(task.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="input !py-1 !px-2 text-sm w-auto"
        >
          <option value="pending">{t('tasks.status.pending')}</option>
          <option value="in_progress">{t('tasks.status.in_progress')}</option>
          <option value="done">{t('tasks.status.done')}</option>
        </select>
        
        <Button variant="secondary" onClick={() => onEdit(task)} className="!py-1 !px-3">
          {t('common.edit')}
        </Button>
        
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting} className="!py-1 !px-3">
          {t('common.delete')}
        </Button>
      </div>
    </div>
  );
}
