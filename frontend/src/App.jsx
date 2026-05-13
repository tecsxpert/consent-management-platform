import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Route */}
        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* Protected List Route */}
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <ListPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Create Route */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;