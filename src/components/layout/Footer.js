import React from "react";
import styled, { keyframes } from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FooterContainer = styled.footer`
  background: linear-gradient(
    135deg,
    rgba(0, 14, 20, 0.5) 0%,
    rgba(1, 17, 43, 0.5) 50%,
    rgba(1, 25, 35, 0.5) 100%
  );
  padding: 1.2rem 0 1rem;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
    background-size: 200% auto;
    animation: ${gradientAnimation} 5s ease infinite;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 1.5rem;
`;

const LogoIcon = styled.div`
  font-size: 2rem;
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

const FooterDescription = styled.p`
  color: #b8c2cc;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 0.95rem;
  max-width: 300px;
`;

const FooterHeading = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: white;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 3px;
    bottom: -5px;
    left: 0;
    background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
    border-radius: 10px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    color: #b8c2cc;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    position: relative;
    display: inline-block;
    padding: 0.2rem 0;
    width: fit-content;

    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
      transition: width 0.3s ease;
      border-radius: 10px;
    }

    &:hover {
      color: white;
      transform: translateX(5px);

      &::after {
        width: 100%;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
      background-size: 200% auto;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
    }

    &:hover {
      transform: translateY(-3px);
      animation: ${floatAnimation} 1s ease infinite;

      &::before {
        opacity: 1;
      }
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 1.5rem;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #b8c2cc;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  font-size: 0.9rem;

  span {
    background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <LogoRow>
            <LogoIcon>
              <MdNotificationsActive />
            </LogoIcon>
            <LogoText>
              <FirstLetter>C</FirstLetter>
              <RestOfFirst>ontest</RestOfFirst>
              <SecondLetter>B</SecondLetter>
              <RestOfSecond>uzz</RestOfSecond>
            </LogoText>
          </LogoRow>

          <FooterDescription>
            Stay updated with all the competitive programming contests. Never
            miss an opportunity to improve your coding skills.
          </FooterDescription>
          <SocialLinks>
            <a
              href="https://github.com/msuud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/urvadave/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks>
            <a href="/">Home</a>
            <a href="/contests">All Contests</a>
            <a href="/about">About Us</a>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Platforms</FooterHeading>
          <FooterLinks>
            <a href="https://codeforces.com/contests">Codeforces</a>
            <a href="https://www.codechef.com/contests">CodeChef</a>
            <a href="https://leetcode.com/contest/">LeetCode</a>
            <a href="https://atcoder.jp/contests/">AtCoder</a>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Contact</FooterHeading>
          <div>
            <a href="mailto:contestbuzz123@gmail.com">
              contestbuzz123@gmail.com
            </a>
          </div>
        </FooterSection>
      </FooterContent>

      <Copyright>
        &copy; {new Date().getFullYear()} <span>ContestBuzz</span>. All rights
        reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
