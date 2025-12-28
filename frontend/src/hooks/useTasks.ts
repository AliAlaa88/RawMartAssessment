import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { taskApi } from "@/api";
import type {
  Task,
  TaskStatus,
  PaginatedTasks,
  CreateTaskRequest,
  User,
} from "@/types";

export function useTasks(user: User | null, perPage: number = 10) {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState<PaginatedTasks | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = useCallback(
    async (page: number) => {
      setIsLoading(true);
      setError("");
      try {
        const data = await taskApi.getTasks(page, perPage);
        setTasks(data);
      } catch (err: any) {
        setError(err.response?.data?.message || t("common.error"));
      } finally {
        setIsLoading(false);
      }
    },
    [t, perPage]
  );

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage, fetchTasks]);

  const updateTaskInList = (taskId: number, updates: Partial<Task>) => {
    setTasks((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: prev.data.map((t) =>
          t.id === taskId ? { ...t, ...updates } : t
        ),
      };
    });
  };

  const removeTaskFromList = (taskId: number) => {
    setTasks((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: prev.data.filter((t) => t.id !== taskId),
        total: prev.total - 1,
      };
    });
  };

  const createTask = async (data: CreateTaskRequest) => {
    setIsSubmitting(true);
    try {
      const tempId = -Date.now();
      const tempTask: Task = {
        id: tempId,
        title: data.title,
        description: data.description || null,
        status: data.status || "pending",
        deadline: data.deadline || null,
        user_id: user?.id || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setTasks((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: [tempTask, ...prev.data],
          total: prev.total + 1,
        };
      });

      const response = await taskApi.createTask(data);
      const realTask = response.task;
      setTasks((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.data.map((t) => (t.id === tempId ? realTask : t)),
        };
      });

      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || t("common.error"));
      fetchTasks(currentPage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTask = async (
    taskId: number,
    data: CreateTaskRequest,
    originalTask: Task
  ) => {
    setIsSubmitting(true);
    try {
      updateTaskInList(taskId, {
        title: data.title,
        description: data.description || null,
        status: data.status || originalTask.status,
        deadline: data.deadline || null,
      });

      await taskApi.updateTask(taskId, data);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || t("common.error"));
      fetchTasks(currentPage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTask = async (id: number) => {
    const previousTasks = tasks;
    removeTaskFromList(id);

    try {
      await taskApi.deleteTask(id);
    } catch (err: any) {
      setError(err.response?.data?.message || t("common.error"));
      setTasks(previousTasks);
    }
  };

  const updateStatus = async (id: number, status: TaskStatus) => {
    const task = tasks?.data.find((t) => t.id === id);
    const previousStatus = task?.status;

    updateTaskInList(id, { status });

    try {
      await taskApi.updateTask(id, { status });
    } catch (err: any) {
      setError(err.response?.data?.message || t("common.error"));
      if (previousStatus) {
        updateTaskInList(id, { status: previousStatus });
      }
    }
  };

  return {
    tasks,
    isLoading,
    isSubmitting,
    error,
    currentPage,
    setCurrentPage,
    createTask,
    updateTask,
    deleteTask,
    updateStatus,
  };
}
