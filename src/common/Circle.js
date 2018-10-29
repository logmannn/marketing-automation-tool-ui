import React, { Component } from "react";
import styled from "styled-components";

const SVG = styled.svg`
  position: absolute;
  z-index: 1000;
`;

const CircleWrapper = styled.div`
  width: 70px;
  height: 70px;

  position: absolute;
  display: flex;
`;

export default class Circle extends Component {
  render() {
    const { side } = this.props;

    return (
      <CircleWrapper className={`${side}CircleSelect`}>
        <SVG height="20" width="20">
          <circle
            cx="10"
            cy="10"
            r="8"
            stroke="black"
            strokeWidth="2"
            fill="red"
          />
        </SVG>
      </CircleWrapper>
    );
  }
}
