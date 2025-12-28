import { Modal, ErrorAlert } from '@/components/common';
import { TaskList, TaskForm, TasksHeader, TasksToolbar } from '@/components/tasks';
import type { Task, TaskStatus, PaginatedTasks, CreateTaskRequest, User } from '@/types';

interface TasksViewProps {
  user: User | null;
  tasks: PaginatedTasks | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string;
  isModalOpen: boolean;
  editingTask: Task | undefined;
  modalTitle: string;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
  onPageChange: (page: number) => void;
  onSubmitTask: (data: CreateTaskRequest) => Promise<void>;
  onCloseModal: () => void;
  onLogout: () => void;
}

export function TasksView({
  user,
  tasks,
  isLoading,
  isSubmitting,
  error,
  isModalOpen,
  editingTask,
  modalTitle,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onPageChange,
  onSubmitTask,
  onCloseModal,
  onLogout,
}: TasksViewProps) {
  return (
    <div className="min-h-screen bg-secondary">
      <TasksHeader user={user} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <ErrorAlert message={error} />

        <TasksToolbar
          totalCount={tasks?.total || 0}
          onAddTask={onAddTask}
        />

        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onStatusChange={onStatusChange}
          onPageChange={onPageChange}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={modalTitle}
      >
        <TaskForm
          task={editingTask}
          onSubmit={onSubmitTask}
          onCancel={onCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}
