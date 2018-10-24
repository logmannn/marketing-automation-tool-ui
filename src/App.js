import React, { Component } from "react";
import "./App.css";
import SideBar from "./sideBar/SideBar";
import SideBarLinks from "./sideBar/SideBarLinks";
import Editing from "./editing/Editing";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;

  flex-direction: row;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isHidden: null };
  }

  render() {
    return (
      <Wrapper className="App">
        <SideBar isHidden={this.state.isHidden}>
          <SideBarLinks
            isHidden={this.state.isHidden}
            hideShow={isHidden =>
              this.setState({ isHidden: !this.state.isHidden })
            }
          />
        </SideBar>
        <Editing isHidden={this.state.isHidden} />
      </Wrapper>
    );
  }
}

export default App;
