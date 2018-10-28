import React, { Component } from "react";
import styled from "styled-components";

const SVG = styled.svg`
  position: absolute;
`;

export default class Line extends Component {
  render() {
    const { color, x1, y1, x2, y2 } = this.props;
    return (
      <SVG height="100%" width="100%">
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} />
        Sorry, your browser does not support inline SVG.
      </SVG>
    );
  }
}
