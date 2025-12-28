import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context";
import { useTasks, useDocumentTitle, useViewportPagination } from "@/hooks";
import { TasksView } from "@/pages/Tasks";
import type { Task, CreateTaskRequest } from '@/types';

export function TasksContainer() {
  useDocumentTitle('tasks');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const itemsPerPage = useViewportPagination();
  
  const {
    tasks,
    isLoading,
    isSubmitting,
    error,
    setCurrentPage,
    createTask,
    updateTask,
    deleteTask,
    updateStatus,
  } = useTasks(user, itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmitTask = async (data: CreateTaskRequest) => {
    setIsModalOpen(false);
    
    if (editingTask) {
      updateTask(editingTask.id, data, editingTask);
    } else {
      createTask(data);
    }
    
    setEditingTask(undefined);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <TasksView
      user={user}
      tasks={tasks}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      error={error}
      isModalOpen={isModalOpen}
      editingTask={editingTask}
      modalTitle={editingTask ? t('tasks.editTask') : t('tasks.addTask')}
      onAddTask={handleAddTask}
      onEditTask={handleEditTask}
      onDeleteTask={deleteTask}
      onStatusChange={updateStatus}
      onPageChange={setCurrentPage}
      onSubmitTask={handleSubmitTask}
      onCloseModal={handleCloseModal}
      onLogout={handleLogout}
    />
  );
}
