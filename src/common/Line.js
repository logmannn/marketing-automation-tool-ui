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

    let inverted = false;

    if (startSide === "bottom") {
      X1 = x1 + 77;
      Y1 = y1 + 65;
      if (Y1 > Y2 && X1 < X2) {
        inverted = true;
      }
    }
    if (endSide === "bottom") {
      X2 = x2 + 77;
      Y2 = y2 + 65;
    }

    if (startSide === "top") {
      X1 = x1 + 77;
      Y1 = y1 + 9;
      if (X1 > X2) {
        inverted = true;
      }
    }
    if (endSide === "top") {
      X2 = x2 + 77;
      Y2 = y2 + 9;
    }

    if (startSide === "right") {
      X1 = x1 + 103;
      Y1 = y1 + 38;
      if (Y1 > Y2) {
        inverted = true;
      }
    }
    if (endSide === "right") {
      X2 = x2 + 103;
      Y2 = y2 + 38;
    }

    if (startSide === "left") {
      X1 = x1 + 50;
      Y1 = y1 + 38;
      if (Y1 < Y2) {
        inverted = true;
      }
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
      X2 = x2;
    }

    let MX = Math.round((X2 + X1) / 2);
    let MY = Math.round((Y2 + Y1) / 2);

    let offset = 30;

    let theta = Math.atan2(Y2 - Y1, X2 - X1) - Math.PI / 2;
    let rotation =
      Math.round((Math.atan2(Y2 - Y1, X2 - X1) * 180) / Math.PI) + 12;

    if (inverted) {
      rotation =
        Math.round((Math.atan2(Y2 - Y1, X2 - X1) * 180) / Math.PI) - 18;
    }

    let MX1 = Math.round((MX + X1) / 2);
    let MY1 = Math.round((MY + Y1) / 2);

    let MX2 = Math.round((MX + X2) / 2);
    let MY2 = Math.round((MY + Y2) / 2);

    let CX1 = Math.round(MX1 + offset * Math.cos(theta));
    let CY1 = Math.round(MY1 + offset * Math.sin(theta));

    let CX2 = Math.round(MX2 - offset * Math.cos(theta));
    let CY2 = Math.round(MY2 - offset * Math.sin(theta));

    if (inverted === true) {
      CX1 = Math.round(MX1 - offset * Math.cos(theta));
      CY1 = Math.round(MY1 - offset * Math.sin(theta));

      CX2 = Math.round(MX2 + offset * Math.cos(theta));
      CY2 = Math.round(MY2 + offset * Math.sin(theta));
    }

    let curve =
      "M" + X1 + " " + Y1 + " Q " + CX1 + " " + CY1 + " " + MX + " " + MY;
    let curve2 =
      "M" + X2 + " " + Y2 + " Q " + CX2 + " " + CY2 + " " + MX + " " + MY;

    return (
      <SVG height="100%" width="100%">
        {/* <line x1={X1} y1={Y1} x2={X2} y2={Y2} stroke={color} /> */}
        <path
          id="curve"
          d={curve}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="transparent"
        />
        <path
          id="curve2"
          d={curve2}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="transparent"
        />
        <polygon
          points={`${MX - 14},${MY + 11} ${MX},${MY} ${MX - 14},${MY - 11}`}
          transform={`rotate(${rotation} ${MX} ${MY})`}
          fill={color}
        />
      </SVG>
    );
  }
}
