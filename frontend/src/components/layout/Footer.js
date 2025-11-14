import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";

/* CLEAN WHITE FOOTER */
const FooterContainer = styled.footer`
  background: #ffffff;
  border-top: 1px solid #094011ff;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 1.5rem;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.div`
  font-size: 2rem;
  color: #2f692d; /* Green */
`;

const LogoText = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #2f692d;
`;

const FooterDescription = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 0.95rem;
  max-width: 300px;
`;

const FooterHeading = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #2f692d;
  font-weight: 700;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    color: #374151;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    text-decoration: none;

    &:hover {
      color: #2f692d;
      transform: translateX(4px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #f3f4f6;
    color: #2f692d;
    transition: all 0.3s ease;
    border: 1px solid #d1d5db;

    &:hover {
      background: #2f692d;
      color: #ffffff;
      transform: translateY(-2px);
      border-color: #2f692d;
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
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.9rem;

  span {
    color: #2f692d;
    font-weight: 700;
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
            <LogoText>ContestBuzz</LogoText>
          </LogoRow>

          <FooterDescription>
            Stay updated with competitive programming contests. Never miss an
            opportunity to grow your coding skills.
          </FooterDescription>

          <SocialLinks>
            <a href="https://github.com/msuud" target="_blank">
              <FaGithub />
            </a>

            <a href="https://www.linkedin.com/in/urvadave/" target="_blank">
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
          <FooterLinks>
            <a href="mailto:contestbuzz123@gmail.com">
              contestbuzz123@gmail.com
            </a>
          </FooterLinks>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} <span>ContestBuzz</span>. All rights
        reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
