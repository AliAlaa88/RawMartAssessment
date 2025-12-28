import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginContainer, RegisterContainer, TasksContainer } from '@/containers';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<TasksContainer />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
