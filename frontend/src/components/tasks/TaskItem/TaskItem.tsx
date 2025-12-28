import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';
import { Button, ConfirmModal } from '@/components/common';
import { StatusBadge } from '../StatusBadge';
import { DeadlineIndicator } from '../DeadlineIndicator';
import { TaskStatusSelect } from '../TaskStatusSelect';
import type { Task, TaskStatus } from '@/types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
}

export function TaskItem({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) {
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    onDelete(task.id);
    setIsDeleteModalOpen(false);
  };

  const handleStatusChange = (status: TaskStatus) => {
    onStatusChange(task.id, status);
  };

  return (
    <>
      <div className="card flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-medium text-primary truncate">{task.title}</h3>
            <StatusBadge status={task.status} />
            <DeadlineIndicator deadline={task.deadline} />
          </div>
          {task.description && (
            <p className="text-sm text-secondary line-clamp-2">{task.description}</p>
          )}
          <p className="text-xs text-muted mt-1">
            {new Date(task.created_at).toLocaleDateString()}
            {task.deadline && (
              <span className="ml-2 rtl:mr-2 rtl:ml-0">
                📅 {t('tasks.dueDate', { date: new Date(task.deadline).toLocaleString() })}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <TaskStatusSelect
            value={task.status}
            onChange={handleStatusChange}
            compact
          />
          
          <Button className="flex items-center gap-2" variant="secondary" onClick={() => onEdit(task)}>
            <Pencil size={16} />
            {t('common.edit')}
          </Button>
          
          <Button className="flex items-center gap-2" variant="danger" onClick={() => setIsDeleteModalOpen(true)} disabled={isDeleting}>
            <Trash2 size={16} />
            {t('common.delete')}
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={t('tasks.deleteTitle')}
        message={t('tasks.deleteConfirm')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}
