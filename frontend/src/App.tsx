import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@Auth/context/AuthContext";
import PrivateRoute from "@Auth/components/PrivateRoute";
import ContentRouter from "@Content/ContentRouter";

import Login from "@Auth/components/Login";
import Signup from "@Auth/components/Signup";

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
                  <ContentRouter />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
