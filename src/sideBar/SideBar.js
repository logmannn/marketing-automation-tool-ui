import React, { Component } from "react";
import styled from "styled-components";
import SideBarLinks from "./SideBarLinks";

const SidebarDiv = styled.div`
  position: relative;
  
  top: 0;
  left: 0;
  bottom: 0

  width: 100%;
  max-width: 230px;
  height: 100vh;

  background: #161a1f;
`;

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isHidden: false };
  }
  hideShow = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  render() {
    return (
      <SidebarDiv
        className={this.state.isHidden ? "slideLeftHide" : "slideLeftShow"}
      >
        <SideBarLinks isHidden={this.state.isHidden} hideShow={this.hideShow} />
      </SidebarDiv>
    );
  }
}
