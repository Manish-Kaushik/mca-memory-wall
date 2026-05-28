import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { Toaster }
from "react-hot-toast";

import { AuthProvider }
from "./context/AuthContext";

import Navbar
from "./components/Navbar";

import AdminDashboard
from "./pages/AdminDashboard";

import Home
from "./pages/Home";

import Login
from "./pages/Login";

import Register
from "./pages/Register";

import Wall
from "./pages/Wall";

import Upload
from "./pages/Upload";

import Profile
from "./pages/Profile";

import Feedback
from "./pages/Feedback";

function App() {

  return (

    <AuthProvider>

      <Router>

        <div className="min-h-screen bg-gray-900 text-white font-sans">

          {/* GLOBAL TOAST */}

          <Toaster

            position="top-right"

            toastOptions={{

              style: {

                background: '#111827',

                color: '#fff',

                border:
                  '1px solid rgba(255,255,255,0.1)',

                padding: '14px 18px',

                borderRadius: '14px'

              },

              success: {

                iconTheme: {

                  primary: '#a855f7',

                  secondary: '#fff'

                }

              },

              error: {

                iconTheme: {

                  primary: '#ef4444',

                  secondary: '#fff'

                }

              }

            }}

          />

          {/* NAVBAR */}

          <Navbar />

          {/* ROUTES */}

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            <Route
              path="/wall"
              element={<Wall />}
            />

            <Route
              path="/upload"
              element={<Upload />}
            />

            <Route
              path="/feedback"
              element={<Feedback />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

          </Routes>

        </div>

      </Router>

    </AuthProvider>

  );

}

export default App;