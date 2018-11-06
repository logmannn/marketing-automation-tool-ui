import React from "react";
import styled from "styled-components";

const SidebarDiv = styled.div`
  position: fixed;

  top: 0;
  left: 0;
  bottom: 0;

  width: 100%;
  max-width: 230px;
  height: 100vh;

  background: #161a1f;

  z-index: 2;

  @media only screen and (max-height: 670px) {
    overflow: scroll;
  }
`;

const SideBar = ({ children }) => (
  <SidebarDiv
    id="SidebarDiv"
    className={
      "disable-css-transitions " +
      (children.props.isHidden === true && "slideLeftHide") +
      " " +
      (children.props.isHidden === false && "slideLeftShow")
    }
  >
    {children}
  </SidebarDiv>
);

export default SideBar;
