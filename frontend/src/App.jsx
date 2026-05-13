import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AnalyticsPage from "./pages/AnalyticsPage";
import DetailsPage from "./pages/DetailsPage";
import Dashboard from "./pages/Dashboard";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Public Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* 2. Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <ListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="/details/:id" 
          element={
            <ProtectedRoute>
              <DetailsPage />
            </ProtectedRoute>
          } 
        />

        {/* 3. Logical Redirects to prevent loops */}
        {/* If user hits the root, try to go to dashboard. 
            If not logged in, ProtectedRoute will catch them and send to /login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Fallback for unknown URLs */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;