import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Main = styled.main`
  min-height: calc(100vh - 100px);
  padding-top: 80px;
  padding-bottom: 2rem;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
