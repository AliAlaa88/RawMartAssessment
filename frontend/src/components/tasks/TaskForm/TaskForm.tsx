import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@/components/common';
import { TaskStatusSelect } from '../TaskStatusSelect';
import type { Task, TaskStatus, CreateTaskRequest } from '@/types';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'pending');
  const [deadline, setDeadline] = useState(
    task?.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : ''
  );
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError(t('errors.required'));
      return;
    }

    await onSubmit({
      title,
      description,
      status,
      deadline: deadline ? new Date(deadline).toISOString() : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label={t('tasks.taskTitle')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-secondary mb-1">
          {t('tasks.taskDescription')}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input min-h-[100px] resize-y"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1">
          {t('tasks.deadline')}
        </label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1">
          {t('tasks.taskStatus')}
        </label>
        <TaskStatusSelect value={status} onChange={setStatus} />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={isLoading}>
          {t('common.save')}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  );
}
