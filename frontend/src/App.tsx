import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@Auth/context/AuthContext";
import PrivateRoute from "@Auth/components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <div>Home</div>
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<div>Signup</div>} />
            <Route path="/login" element={<div>Login</div>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
