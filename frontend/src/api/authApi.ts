import api from "./axios";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "@/types";

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/register", data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/logout");
  },

  getUser: async (): Promise<User> => {
    const response = await api.get<User>("/user");
    return response.data;
  },
};
