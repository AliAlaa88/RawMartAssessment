import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from '@/components/common';
import { TaskList, TaskForm } from '@/components/tasks';
import { taskApi } from '@/api';
import { useAuth } from '@/context';
import type { Task, TaskStatus, PaginatedTasks, CreateTaskRequest } from '@/types';

export function Tasks() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [tasks, setTasks] = useState<PaginatedTasks | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const fetchTasks = useCallback(async (page: number) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await taskApi.getTasks(page);
      setTasks(data);
    } catch (err: any) {
      setError(err.response?.data?.message || t('common.error'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage, fetchTasks]);

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmitTask = async (data: CreateTaskRequest) => {
    setIsSubmitting(true);
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, data);
      } else {
        await taskApi.createTask(data);
      }
      setIsModalOpen(false);
      fetchTasks(currentPage);
    } catch (err: any) {
      setError(err.response?.data?.message || t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      fetchTasks(currentPage);
    } catch (err: any) {
      setError(err.response?.data?.message || t('common.error'));
    }
  };

  const handleStatusChange = async (id: number, status: TaskStatus) => {
    try {
      await taskApi.updateTask(id, { status });
      fetchTasks(currentPage);
    } catch (err: any) {
      setError(err.response?.data?.message || t('common.error'));
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary border-b border-primary">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">{t('tasks.title')}</h1>
          <div className="flex items-center gap-4">
            <span className="text-secondary text-sm hidden sm:block">
              {user?.name}
            </span>
            <Button variant="secondary" onClick={handleLogout}>
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-3 bg-[--color-danger]/10 border border-[--color-danger] rounded-lg text-[--color-danger] text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-primary">
            {tasks?.total || 0} {t('tasks.title').toLowerCase()}
          </h2>
          <Button onClick={handleAddTask}>
            + {t('tasks.addTask')}
          </Button>
        </div>

        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onPageChange={setCurrentPage}
        />
      </main>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? t('tasks.editTask') : t('tasks.addTask')}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmitTask}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}
