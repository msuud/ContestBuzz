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

const BulletList = styled.ul`
  margin-top: 1.5rem;
  padding-left: 1.2rem;
  font-size: 1.5rem;
  line-height: 1.7;
  color: white;
  opacity: 0.97;

  li {
    margin-bottom: 1rem;
    list-style-type: "• ";
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(4, 47, 7, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh; /* FULL SCREEN HEIGHT */
  display: flex;
  padding: 0;
  border-radius: 0; /* REMOVE ROUND CORNERS */
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  color: #1f1f1f;
  font-size: 1.3rem;
  cursor: pointer;
  width: 38px;
  height: 38px;
  border-radius: 50%;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: rotate(90deg);
  }
`;

const RightSection = styled.div`
  flex: 1.2;
  height: 100vh;
  background: white;
  padding: 5rem 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LeftLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  svg {
    font-size: 2.2rem;
    margin-right: 10px;
    color: #087608ff;
  }
`;

const LeftTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  color: white;
`;

const RightTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  color: #033c12ff;
`;

const LeftSection = styled.div`
  flex: 1;
  height: 100vh;
  background: rgba(4, 47, 7, 0.92); /* your green */
  padding: 4rem 3rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const LogoIcon = styled.div`
  margin-right: 8px;
  font-size: 2rem;
  color: #1e7f42ff;
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
  background: linear-gradient(
    90deg,
    #022d15ff 0%,
    #022d15ff 50%,
    #022d15ff 100%
  );
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
  background: linear-gradient(
    90deg,
    #104f18ff 0%,
    #104f18ff 50%,
    #104f18ff 100%
  );
  background-size: 200% auto;
  animation: ${gradientAnimation} 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
`;

const SecondLetter = styled.span`
  font-family: "Broadway", sans-serif;
  color: #045c10ff;
  font-size: 2rem;
  font-weight: 900;
  display: inline-block;
  margin-right: 0.5px;
  margin-left: 2px;
`;

const RestOfSecond = styled.span`
  color: #066003ff;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(90deg, #1f6f2e, #0e4f1f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  p {
    color: #1b3a22;
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
  background: linear-gradient(90deg, #1f6f2e, #0e4f1f);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(31, 111, 46, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(31, 111, 46, 0.4);
  }

  svg {
    background: white;
    color: #1f6f2e;
    padding: 6px;
    border-radius: 50%;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #1f3d2b;

  button {
    background: transparent;
    border: none;
    background: linear-gradient(90deg, #1f6f2e, #0e4f1f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    font-weight: 700;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.15);
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 5px solid #dc2626;
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
`;

const Divider = styled.div`
  flex-grow: 1;
  height: 1px;
  background: rgba(0, 50, 0, 0.2);
`;

const DividerText = styled.span`
  padding: 0 1rem;
  color: #1f3d2b;
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
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* LEFT SIDE */}
          <LeftSection>
            {/* Logo at top-left */}
            <LeftLogo style={{ marginBottom: "2rem", marginTop: "1rem" }}>
              <MdNotificationsActive />
              <LeftTitle>ContestBuzz</LeftTitle>
            </LeftLogo>

            {/* BULLET DESCRIPTION */}
            <BulletList>
              <li>
                Stay updated with coding contests from CodeForces, LeetCode,
                AtCoder, CodeChef, and GeeksforGeeks.
              </li>
              <li>Real-time contest data powered by the Clist.by API.</li>
              <li>
                Get reminders so you never miss an important challenge again.
              </li>
              <li>
                Filter contests by platform for a clean and personalized
                experience.
              </li>
              <li>One unified dashboard for upcoming and ongoing contests.</li>
              <li>
                Add contests directly to your calendar with a single click.
              </li>
              <li>
                Perfect for placement preparation and competitive programming
                improvement.
              </li>
            </BulletList>
          </LeftSection>

          {/* RIGHT SIDE */}
          <RightSection>
            {currentUser && (
              <CloseButton onClick={handleCloseModal}>
                <FaTimes />
              </CloseButton>
            )}

            <ModalHeader>
              <h2>
                {authMode === "login" ? "Welcome Back!" : "Create an Account"}
              </h2>
              <p>
                {authMode === "login"
                  ? "Sign in to access your contest alerts"
                  : "Join ContestBuzz and stay updated!"}
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
          </RightSection>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default AuthModal;
