import { AuthProvider } from '@/context';
import { AppRouter } from '@/routes';
import '@/i18n';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
