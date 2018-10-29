import React, { Component } from "react";
import styled from "styled-components";

const CircleWrapper = styled.div`
  width: 70px;
  height: 70px;

  position: absolute;
  display: flex;

  pointer-events: all;
`;

export default class Circle extends Component {
  render() {
    const { side, fill, strokeWidth, opacity } = this.props;

    return (
      <CircleWrapper className={`circleWrapper ${side}CircleSelect`}>
        <div
          className="csscircle"
          style={{
            background: `${fill}`,
            border: `solid ${strokeWidth}px #909090`,
            opacity: `${opacity}`
          }}
        />
      </CircleWrapper>
    );
  }
}
