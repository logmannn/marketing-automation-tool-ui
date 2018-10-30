import React, { Component } from "react";
import styled from "styled-components";

const CircleWrapper = styled.div`
  width: 70px;
  height: 70px;

  position: absolute;
  display: flex;

  pointer-events: all;

  cursor: crosshair;
`;

export default class Circle extends Component {
  render() {
    const { side, fill, strokeWidth, opacity, id } = this.props;

    // console.log(id);

    this.circleClick = () => {
      this.props.circleClickParent(side, id);
    };

    return (
      <CircleWrapper
        className={`circleWrapper ${side}CircleSelect`}
        onClick={this.circleClick}
      >
        <div
          className="csscircle"
          id={`${id}_${side}`}
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
