import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NotFoundPage from "./pages/not-found";
import { AuthPage, BoardPage } from "./pages";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth" replace />;
  }
};

// Redirect to dashboard if token exists
const AuthRedirect: React.FC = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  } else {
    return <AuthPage />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRedirect />} />

        <Route
          path="*"
          element={
            <AuthGuard>
              <Routes>
                <Route path="/" element={<BoardPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
