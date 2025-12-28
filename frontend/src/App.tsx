import { AuthProvider, ThemeProvider } from "@/context";
import { AppRouter } from "@/routes";
import "@/i18n";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
