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
  width: auto;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  margin-top: 0.2rem;
  display: flex;
  justify-content: center;
  border: 2px solid black;
  background: white;
  pointer-events: all;
  position: relative;
  z-index: 10;
`;

const CloseWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      deleted: false
    };
  }

  render() {
    this.circleClick = (side, id) => {
      this.props.lineCreate(side, id);
    };

    this.onMouseDown = () => {
      this.props.setCurrentStep(item.key, true);
    };

    this.onMouseUp = () => {
      this.props.setCurrentStep(item.key, false);
    };

    this.deleteStep = () => {
      this.props.deleteStep(item.key);
      // this.setState({ deleted: true });
    };

    const { hover } = this.state;
    const { item, creation } = this.props;

    let left = "#FFF";
    let top = "#FFF";
    let right = "#FFF";
    let bottom = "#FFF";

    let lOpacity = "";
    let tOpacity = "";
    let rOpacity = "";
    let bOpacity = "";

    if (typeof item.activePoints[0].left !== "undefined") {
      if (item.activePoints[0].left !== "") {
        lOpacity = 1;
        if (item.activePoints[0].left === "end") {
          left = "#919191";
        }
      }

      if (item.activePoints[0].top !== "") {
        tOpacity = 1;
        if (item.activePoints[0].top === "end") {
          top = "#919191";
        }
      }

      if (item.activePoints[0].right !== "") {
        rOpacity = 1;
        if (item.activePoints[0].right === "end") {
          right = "#919191";
        }
      }

      if (item.activePoints[0].bottom !== "") {
        bOpacity = 1;
        if (item.activePoints[0].bottom === "end") {
          bottom = "#919191";
        }
      }
    }

    return (
      <>
        {this.props.deleted === false ? (
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
            <IconWrapper
              className="IconWrapper"
              onMouseOver={() => this.setState({ hover: true })}
              onMouseLeave={() => this.setState({ hover: false })}
            >
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
              >
                <CloseWrapper>
                  {hover &&
                    !creation && (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={this.deleteStep}
                      >
                        &#10006;
                      </div>
                    )}
                </CloseWrapper>
              </Icon>
            </IconWrapper>
            <IconContent>
              <div>
                Content here
                {/* {item.x} {item.y} */}
              </div>
            </IconContent>
          </Box>
        ) : null}
      </>
    );
  }
}
