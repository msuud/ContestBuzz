import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ContestsPage from "./pages/ContestsPage";
import AboutPage from "./pages/AboutPage";
import { useAuth } from "./context/AuthContext";
import AuthModal from "./components/auth/AuthModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const { showAuthModal, currentUser } = useAuth();

  const AuthOnlyWrapper = ({ children }) => {
    if (!currentUser) {
      return (
        <div className="auth-only-container">
          {showAuthModal && <AuthModal />}
        </div>
      );
    }

    return (
      <>
        <Layout>{children}</Layout>
        {showAuthModal && <AuthModal />}
      </>
    );
  };

  return (
    <>
      <AuthOnlyWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/contests"
            element={
              <ProtectedRoute>
                <ContestsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthOnlyWrapper>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
