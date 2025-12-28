import api from "./axios";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  PaginatedTasks,
} from "@/types";

export const taskApi = {
  getTasks: async (page = 1, perPage = 10): Promise<PaginatedTasks> => {
    const response = await api.get<PaginatedTasks>(
      `/tasks?page=${page}&per_page=${perPage}`
    );
    return response.data;
  },

  getTask: async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (
    data: CreateTaskRequest
  ): Promise<{ message: string; task: Task }> => {
    const response = await api.post("/tasks", data);
    return response.data;
  },

  updateTask: async (
    id: number,
    data: UpdateTaskRequest
  ): Promise<{ message: string; task: Task }> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
