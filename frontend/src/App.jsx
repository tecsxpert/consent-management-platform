import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Page Imports
import AnalyticsPage from "./pages/AnalyticsPage";
import DetailsPage from "./pages/DetailsPage";
import Dashboard from "./pages/Dashboard";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";

// Component Imports
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      {/* Day 14: Global Design Tokens */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif; /* Rule: Standardized Typography */
          margin: 0;
          padding: 0;
        }

        /* Rule: 44px Min Touch Targets for accessibility */
        button, input, select, .touch-target {
          min-height: 44px;
          min-width: 44px;
        }

        /* Standardized Scrollbars */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
      `}</style>

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            border: '1px solid #444',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif'
          },
          success: {
            iconTheme: {
              primary: '#1B4F8A', // Day 14: Branding Primary
              secondary: '#fff',
            },
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* 1. Public Route */}
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

          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            } 
          />

          {/* 3. Logical Redirects & Catch-all */}
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;