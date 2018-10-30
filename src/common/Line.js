import React, { Component } from "react";
import styled from "styled-components";

const SVG = styled.svg`
  position: absolute;

  height: 100%;
  width: 100%;
`;

export default class Line extends Component {
  render() {
    const { color, x1, y1, x2, y2, startSide, endSide, hidden } = this.props;

    let X1 = x1;
    let Y1 = y1;
    let X2 = x2;
    let Y2 = y2;

    if (startSide === "bottom") {
      X1 = x1 + 77;
      Y1 = y1 + 65;
    }
    if (endSide === "bottom") {
      X2 = x2 + 77;
      Y2 = y2 + 65;
    }

    if (startSide === "top") {
      X1 = x1 + 77;
      Y1 = y1 + 9;
    }
    if (endSide === "top") {
      X2 = x2 + 77;
      Y2 = y2 + 9;
    }

    if (startSide === "right") {
      X1 = x1 + 103;
      Y1 = y1 + 38;
    }
    if (endSide === "right") {
      X2 = x2 + 103;
      Y2 = y2 + 38;
    }

    if (startSide === "left") {
      X1 = x1 + 50;
      Y1 = y1 + 38;
    }
    if (endSide === "left") {
      X2 = x2 + 50;
      Y2 = y2 + 38;
    }

    if (endSide === "mouse" && hidden === true) {
      X2 = x2;
      Y2 = y2 - 1;
    }
    if (endSide === "mouse" && hidden === false) {
      X2 = x2 - 230;
    }
    if (endSide === "mouse" && hidden === null) {
      X2 = x2 - 230;
    }

    return (
      <SVG height="100%" width="100%">
        <line x1={X1} y1={Y1} x2={X2} y2={Y2} stroke={color} />
        Sorry, your browser does not support inline SVG.
      </SVG>
    );
  }
}
