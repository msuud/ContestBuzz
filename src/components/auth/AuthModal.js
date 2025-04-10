import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { FaTimes, FaGoogle, FaUserAstronaut } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(138, 75, 175, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(138, 75, 175, 0); }
  100% { box-shadow: 0 0 0 0 rgba(138, 75, 175, 0); }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
  position: relative;
  background: linear-gradient(145deg, #1e293b, #0f172a);
  border-radius: 20px;
  padding: 2.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
    background-size: 200% auto;
    animation: ${gradientAnimation} 3s ease infinite;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const LogoIcon = styled.div`
  margin-right: 8px;
  font-size: 1.8rem;
  color: #a855f7;
  display: flex;
  align-items: center;
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const FirstLetter = styled.span`
  font-family: "Brush Script MT", cursive;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #d946ef 100%);
  background-size: 200% auto;
  animation: ${gradientAnimation} 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  transform: rotate(-5deg);
  display: inline-block;
  margin-right: -3px;
`;

const RestOfFirst = styled.span`
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #d946ef 100%);
  background-size: 200% auto;
  animation: ${gradientAnimation} 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
`;

const SecondLetter = styled.span`
  font-family: "Broadway", sans-serif;
  color: #fc00ff;
  font-size: 2rem;
  font-weight: 900;
  display: inline-block;
  margin-right: 0.5px;
  margin-left: 2px;
`;

const RestOfSecond = styled.span`
  color: #fc00ff;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  p {
    color: #94a3b8;
    font-size: 1rem;
  }
`;

const AuthGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: linear-gradient(90deg, #4285f4 0%, #34a853 100%);
  color: white;
  padding: 0.85rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(66, 133, 244, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(66, 133, 244, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  svg {
    font-size: 1.2rem;
    background: white;
    color: #4285f4;
    padding: 5px;
    border-radius: 50%;
    box-sizing: content-box;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #94a3b8;

  button {
    background: transparent;
    border: none;
    background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    font-weight: 600;
    position: relative;
    padding: 0 5px;

    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const ErrorMessage = styled.div`
  background: linear-gradient(
    90deg,
    rgba(239, 68, 68, 0.15) 0%,
    rgba(220, 38, 38, 0.15) 100%
  );
  color: #f87171;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #ef4444;
  animation: ${pulseAnimation} 1.5s infinite;
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
`;

const Divider = styled.div`
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
`;

const DividerText = styled.span`
  padding: 0 1rem;
  color: #94a3b8;
  font-size: 0.9rem;
`;

const AuthModal = () => {
  const { setShowAuthModal, authMode, setAuthMode, googleSignIn, currentUser } =
    useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
    setError("");
  };

  const handleCloseModal = () => {
    if (currentUser) {
      setShowAuthModal(false);
    }
  };

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleCloseModal}
      >
        <ModalContent
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {currentUser && (
            <CloseButton onClick={handleCloseModal}>
              <FaTimes />
            </CloseButton>
          )}

          <Logo>
            <LogoIcon>
              <MdNotificationsActive />
            </LogoIcon>
            <LogoText>
              <FirstLetter>C</FirstLetter>
              <RestOfFirst>ontest</RestOfFirst>
              <SecondLetter>B</SecondLetter>
              <RestOfSecond>uzz</RestOfSecond>
            </LogoText>
          </Logo>

          <ModalHeader>
            <h2>
              {authMode === "login" ? "Welcome Back!" : "Create an Account"}
            </h2>
            <p>
              {authMode === "login"
                ? "Sign in to access your coding contest alerts"
                : "Join ContestBuzz and stay updated with coding contests"}
            </p>
          </ModalHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <AuthGrid>
            <GoogleButton
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <FaGoogle />
              {authMode === "login"
                ? "Continue with Google"
                : "Sign up with Google"}
            </GoogleButton>
          </AuthGrid>

          <DividerContainer>
            <Divider />
            <DividerText>or</DividerText>
            <Divider />
          </DividerContainer>

          <ToggleText>
            {authMode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button type="button" onClick={toggleAuthMode}>
              {authMode === "login" ? "Sign Up" : "Login"}
            </button>
          </ToggleText>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default AuthModal;
