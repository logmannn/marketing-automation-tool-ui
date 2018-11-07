import React, { Component } from "react";
import "./App.css";
import SideBar from "./sideBar/SideBar";
import SideBarLinks from "./sideBar/SideBarLinks";
import Editing from "./editing/Editing";
import styled from "styled-components";

import { MobileView } from "react-device-detect";

import { Logo } from "./common/Logo";

const Wrapper = styled.div`
  display: flex;

  flex-direction: row;
`;

const NoMobile = styled.div`
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  z-index: 100;

  background: #000;
  color: #fff;

  flex-direction: column;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: null,
      newItem: null
    };
  }

  render() {
    this.newItem = item => {
      this.setState({ newItem: item });
    };

    return (
      <>
        <MobileView>
          <NoMobile>
            <Logo />
            Sorry. The Editor is currently only available on desktop.
          </NoMobile>
        </MobileView>
        <Wrapper className="App">
          <SideBar isHidden={this.state.isHidden}>
            <SideBarLinks
              isHidden={this.state.isHidden}
              hideShow={isHidden =>
                this.setState({ isHidden: !this.state.isHidden })
              }
              newItem={this.newItem}
            />
          </SideBar>
          <Editing
            isHidden={this.state.isHidden}
            newItem={this.state.newItem}
            clearNewItem={newItem => this.setState({ newItem: null })}
          />
        </Wrapper>
      </>
    );
  }
}

export default App;
