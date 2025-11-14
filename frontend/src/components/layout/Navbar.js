import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { FaUserAstronaut } from "react-icons/fa";
import { IoRocketSharp, IoHomeOutline, IoHome } from "react-icons/io5";
import { RiTrophyLine, RiTrophyFill } from "react-icons/ri";
import { BiInfoCircle } from "react-icons/bi";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const popAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1.5rem;
  height: 75px;

  position: fixed;
  top: 1rem;
  left: 2rem;
  right: 2rem;

  z-index: 1000;

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);

  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
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

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isActive ? "rgba(32, 97, 46, 0.9)" : "rgba(32, 97, 46, 0.9)"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    color: white;
    font-size: 1rem;
  }
`;

const NavLinkText = styled.span`
  color: #03290eff;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 3px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(90deg, #04702cff 0%, #04702cff 100%);
    transition: width 0.3s ease;
    border-radius: 10px;
  }
`;

const NavLinkItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.2rem 0.5rem;

  &:hover ${NavCircle} {
    transform: translateY(-2px);
  }

  &:hover ${NavLinkText}::after {
    width: 100%;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 30px;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const UserIcon = styled(FaUserAstronaut)`
  color: rgba(12, 56, 24, 1);
  font-size: 1.2rem;
`;

const UserEmail = styled.span`
  color: #0e3e1dff;
  font-weight: 500;
  font-size: 0.85rem;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ActionButton = styled.button`
  background: linear-gradient(90deg, #077f27ff 0%, #077f27ff 100%);
  background-size: 200% auto;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.5px;

  &:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: ${popAnimation} 0.3s ease;
  }
`;

const LogoutButton = styled(ActionButton)`
  background: linear-gradient(90deg, #297822ff 0%, #297822ff 100%);
  background-size: 200% auto;
`;

const Navbar = () => {
  const { currentUser, logout, setShowAuthModal, setAuthMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode("register");
    setShowAuthModal(true);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <NavbarContainer>
      <Logo>
        <Link to="/">
          <LogoIcon>
            <MdNotificationsActive />
          </LogoIcon>
          <LogoText>
            <FirstLetter>C</FirstLetter>
            <RestOfFirst>ontest</RestOfFirst>
            <SecondLetter>B</SecondLetter>
            <RestOfSecond>uzz</RestOfSecond>
          </LogoText>
        </Link>
      </Logo>

      {currentUser && (
        <NavLinks>
          <NavLinkItem
            to="/"
            isActive={activeLink === "/"}
            onClick={() => handleLinkClick("/")}
          >
            <NavCircle isActive={activeLink === "/"}>
              {activeLink === "/" ? <IoHome /> : <IoHomeOutline />}
            </NavCircle>
            <NavLinkText>Home</NavLinkText>
          </NavLinkItem>

          <NavLinkItem
            to="/contests"
            isActive={activeLink === "/contests"}
            onClick={() => handleLinkClick("/contests")}
          >
            <NavCircle isActive={activeLink === "/contests"}>
              {activeLink === "/contests" ? <RiTrophyFill /> : <RiTrophyLine />}
            </NavCircle>
            <NavLinkText>Contests</NavLinkText>
          </NavLinkItem>

          <NavLinkItem
            to="/about"
            isActive={activeLink === "/about"}
            onClick={() => handleLinkClick("/about")}
          >
            <NavCircle isActive={activeLink === "/about"}>
              {activeLink === "/about" ? (
                <AiFillInfoCircle />
              ) : (
                <BiInfoCircle />
              )}
            </NavCircle>
            <NavLinkText>About</NavLinkText>
          </NavLinkItem>
        </NavLinks>
      )}

      <UserSection>
        {currentUser ? (
          <>
            <UserInfo>
              <UserIcon />
              <UserEmail>{currentUser.email}</UserEmail>
            </UserInfo>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <ActionButton onClick={handleLogin}>Login</ActionButton>
            <ActionButton
              onClick={handleSignUp}
              style={{
                background: "linear-gradient(90deg, #8e2de2 0%, #4a00e0 100%)",
              }}
            >
              Sign Up{" "}
              <IoRocketSharp
                style={{ marginLeft: "5px", fontSize: "0.8rem" }}
              />
            </ActionButton>
          </>
        )}
      </UserSection>
    </NavbarContainer>
  );
};

export default Navbar;
