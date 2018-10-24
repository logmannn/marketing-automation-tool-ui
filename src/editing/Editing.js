import React, { Component } from "react";
import styled from "styled-components";

const EditingDiv = styled.div`
  position: absolute;

  border: 2px solid #c7c6c7;

  width: calc(100vw - 234px);
  height: calc(100vh - 4px);

  z-index: 1;

  left: 230px;
`;

export default class Editing extends Component {
  render() {
    console.log(this.props);
    return (
      <EditingDiv
        className={
          "disable-css-transitions " +
          (this.props.isHidden === true && "editingFull") +
          " " +
          (this.props.isHidden === false && "editingSmall")
        }
      />
    );
  }
}
