import React, { Component } from "react";
import Circle from "./Circle";
import styled from "styled-components";

const Box = styled.div`
  position: absolute;

  user-select: none;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 150px;

  pointer-events: none;
`;

const IconWrapper = styled.div`
  height: 48px;
  width: 48px;

  padding: 10px;

  display: flex;

  justify-content: center;
  align-items: center;

  z-index: 2;

  pointer-events: all;
`;

const Icon = styled.section`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;

  border-radius: 7px;
  border: 2px solid #fff;

  z-index: 2;
`;

const IconContent = styled.div`
  width: 150px;

  display: flex;
  justify-content: center;

  border: 2px solid black;
  background: white;

  pointer-events: all;

  position: relative;

  z-index: 10;
`;

export default class Step extends Component {
  render() {
    this.circleClick = (side, id) => {
      this.props.lineCreate(side, id);
    };

    this.onMouseDown = () => {
      this.props.setCurrentStep(item.key, true);
      // console.log(this.props.disabled);
    };

    this.onMouseUp = () => {
      this.props.setCurrentStep(item.key, false);
    };

    const { item } = this.props;

    let left = "#FFF";
    let top = "#FFF";
    let right = "#FFF";
    let bottom = "#FFF";

    let lOpacity = "";
    let tOpacity = "";
    let rOpacity = "";
    let bOpacity = "";

    if (item.activePoints[0].left !== "") {
      lOpacity = 1;
      // if (item.activePoints[0].left === "start") {
      //   left = "green";
      // }
      if (item.activePoints[0].left === "end") {
        left = "#919191";
      }
    }

    if (item.activePoints[0].top !== "") {
      tOpacity = 1;
      // if (item.activePoints[0].top === "start") {
      //   top = "green";
      // }
      if (item.activePoints[0].top === "end") {
        top = "#919191";
      }
    }

    if (item.activePoints[0].right !== "") {
      rOpacity = 1;
      // if (item.activePoints[0].right === "start") {
      //   right = "green";
      // }
      if (item.activePoints[0].right === "end") {
        right = "#919191";
      }
    }

    if (item.activePoints[0].bottom !== "") {
      bOpacity = 1;
      // if (item.activePoints[0].bottom === "start") {
      //   bottom = "green";
      // }
      if (item.activePoints[0].bottom === "end") {
        bottom = "#919191";
      }
    }

    return (
      <Box className="box">
        <Circle
          side="left"
          fill={left}
          strokeWidth="2"
          opacity={lOpacity}
          circleClickParent={this.circleClick}
          id={item.key}
        />
        <Circle
          side="top"
          fill={top}
          strokeWidth="2"
          opacity={tOpacity}
          circleClickParent={this.circleClick}
          id={item.key}
        />
        <Circle
          side="right"
          fill={right}
          strokeWidth="2"
          opacity={rOpacity}
          circleClickParent={this.circleClick}
          id={item.key}
        />
        <Circle
          side="bottom"
          fill={bottom}
          strokeWidth="2"
          opacity={bOpacity}
          circleClickParent={this.circleClick}
          id={item.key}
        />
        <IconWrapper>
          <Icon
            id={item.key}
            className={`icon grabbable ${item.icon}`}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            style={{
              backgroundImage: `url(${item.icon})`,
              backgroundColor: item.background,
              border: `2px solid ${item.background}`
            }}
          />
        </IconWrapper>
        <IconContent>
          <div>
            Content here
            {/* {item.x} {item.y} */}
          </div>
        </IconContent>
      </Box>
    );
  }
}
