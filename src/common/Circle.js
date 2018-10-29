import React, { Component } from "react";
import styled from "styled-components";

const SVG = styled.svg`
  position: absolute;
  z-index: 5;
`;

const CircleWrapper = styled.div`
  width: 70px;
  height: 70px;

  position: absolute;
  display: flex;
`;

export default class Circle extends Component {
  render() {
    const { side, fill, strokeWidth } = this.props;

    return (
      <CircleWrapper className={`circleWrapper ${side}CircleSelect`}>
        <div
          className="csscircle"
          style={{
            background: `${fill}`,
            border: `solid ${strokeWidth}px #909090`
          }}
        />
      </CircleWrapper>
    );
  }
}
