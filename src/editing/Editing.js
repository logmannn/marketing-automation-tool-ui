import React, { Component } from "react";
import styled from "styled-components";
import DraggableCore from "react-draggable";

import Drip from "../common/drip.svg";

const EditingDiv = styled.div`
  position: absolute;

  z-index: 1;

  top: 0;
  left: 230px;

  overflow: hidden;
`;

const EditingContent = styled.div`
  width: 10000px;
  height: 10000px;

  overflow: scroll;

  border-right: 2px #c7c6c7 solid;
  border-bottom: 2px #c7c6c7 solid;

  padding: 2px;
`;

const LeftSideBar = styled.div`
  position: fixed;
  left: 230px;
  top: 0;

  background: #c7c6c7;

  width: 2px;
  height: 100%;
`;

const TopSideBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;

  width: 100vw;
  height: 2px;

  background: #c7c6c7;

  z-index: 4;
`;

const Box = styled.div`
  position: absolute;

  user-select: none;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  border-radius: 7px;

  background: green;

  height: 50px;
  width: 50px;
`;

const Icon = styled.section`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-size: 25px;
  background-repeat: no-repeat;
  background-position: center;
`;

const IconContent = styled.div`
  width: 150px;

  display: flex;
  justify-content: center;
`;

export default class Editing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPositions: [],
      loading: true,
      currentItem: "",
      intervalId: 0,
      mouseX: 0,
      mouseY: 0
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
      activeDrags: 0,
      deltaPositions: [
        [
          {
            key: 0,
            x: 300,
            y: 200,
            icon: Drip,
            background: "green"
          },
          {
            key: 1,
            x: 1,
            y: 1,
            icon: Drip,
            background: "red"
          }
        ]
      ],
      intervalId: 0,
      mouseX: 0,
      mouseY: 0
    });
  }

  timer = e => {
    console.log(e);
  };

  onStart = e => {
    // console.log("start");
    if (!isNaN(e.target.id)) {
      this.setState({
        currentItem: e.target.id
      });
    }
    this.setState({
      activeDrags: this.state.activeDrags + 1
    });
    let intervalId = setInterval(this.checkForScroll, 50);
    this.setState({ intervalId: intervalId });
  };

  onStop = () => {
    // console.log("stop");
    this.setState({
      activeDrags: this.state.activeDrags - 1,
      currentItem: ""
    });
    clearInterval(this.state.intervalId);
  };

  handleDrag = (e, ui) => {
    const items = this.state.deltaPositions;

    let x = ui.x + ui.deltaX;
    if (x < 0) {
      x = 0;
    }

    let y = Math.abs(ui.y + ui.deltaY);
    if (y < 0) {
      y = 0;
    }

    items[0][e.target.id] = {
      ...items[0][e.target.id],
      key: parseInt(e.target.id),
      x: x,
      y: y
      // icon: this.state.deltaPositions[0][parseInt(e.target.id)].icon
    };
    this.setState({
      deltaPositions: items,
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  };

  checkForScroll = () => {
    // console.log(this.state.mouseX);
    let sizeOfScroll = 50;
    let sizeOfInfluence = 50;
    let height = document.getElementById("LeftSideBar").clientHeight;
    let width;
    let xMouse;
    if (this.props.isHidden === true) {
      xMouse = this.state.mouseX;
      width = document.getElementById("TopSideBar").clientWidth;
    } else {
      xMouse = this.state.mouseX - 230;
      width = document.getElementById("TopSideBar").clientWidth - 230;
    }
    let ymouse = this.state.mouseY;

    let moveX = 0;
    let moveY = 0;
    if (xMouse < sizeOfInfluence) {
      // console.log("left");
      moveX = moveX - sizeOfScroll;
    }
    if (ymouse < sizeOfInfluence) {
      // console.log("top");
      moveY = moveY - sizeOfScroll;
    }
    if (xMouse > width - sizeOfInfluence) {
      // console.log("right");
      moveX = moveX + sizeOfScroll;
    }
    if (ymouse > height - sizeOfInfluence) {
      // console.log("bottom");
      moveY = moveY + sizeOfScroll;
    }

    window.scrollBy(moveX, moveY);
  };

  onMouseLeave = () => {
    if (this.state.activeDrags) {
      // force mouseup
      let element = document.getElementById("EditingDiv");
      element.dispatchEvent(new Event("mouseup"));

      const x = parseInt(
        document
          .getElementById("box" + this.state.currentItem)
          .style.transform.match(/\((.*?)px,/)[1]
      );
      const y = parseInt(
        document
          .getElementById("box" + this.state.currentItem)
          .style.transform.match(/, (.*?)px/)[1]
      );

      const items = this.state.deltaPositions;
      items[0][this.state.currentItem] = {
        ...items[0][this.state.currentItem],
        key: parseInt(this.state.currentItem),
        x,
        y
      };
      this.setState({
        deltaPositions: items
      });
    }
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPositions, loading, currentItem, activeDrags } = this.state;

    return (
      <EditingDiv
        id="EditingDiv"
        className={
          "disable-css-transitions " +
          (this.props.isHidden === true && "editingFull") +
          " " +
          (this.props.isHidden === false && "editingSmall")
        }
        onMouseLeave={this.onMouseLeave}
      >
        <LeftSideBar
          id="LeftSideBar"
          className={
            "disable-css-transitions " +
            (this.props.isHidden === true && "LeftSidebarBefore") +
            " " +
            (this.props.isHidden === false && "LeftSidebarAfter")
          }
        />
        <TopSideBar id="TopSideBar" />
        {loading ? (
          "loading"
        ) : (
          <>
            <EditingContent>
              {deltaPositions[0].map(step => (
                <DraggableCore
                  defaultPosition={{
                    x: deltaPositions[0][step.key].x,
                    y: deltaPositions[0][step.key].y
                  }}
                  onStart={this.onStart}
                  onDrag={this.handleDrag}
                  onStop={this.onStop}
                  position={null}
                  bounds="parent"
                  {...dragHandlers}
                  handle="section"
                  key={step.key}
                >
                  <Box
                    id={`box${step.key}`}
                    className={
                      "box " +
                      (currentItem === `${deltaPositions[0][step.key].key}`
                        ? "show"
                        : "hidden")
                    }
                    style={{ width: "50px" }}
                  >
                    <IconWrapper>
                      <Icon
                        id={`${deltaPositions[0][step.key].key}`}
                        className={
                          `icon grabbable ${deltaPositions[0][step.key].icon}` +
                          (currentItem !==
                            `${deltaPositions[0][step.key].key}` &&
                          activeDrags === 1
                            ? " disable "
                            : " ")
                        }
                        style={{
                          backgroundImage: `url(${
                            deltaPositions[0][step.key].icon
                          })`,
                          backgroundColor:
                            deltaPositions[0][step.key].background
                        }}
                      />
                    </IconWrapper>
                    <IconContent>
                      <div>
                        x:{" "}
                        {deltaPositions[0][
                          deltaPositions[0][step.key].key
                        ].x.toFixed(0)}
                        , y:{" "}
                        {deltaPositions[0][
                          deltaPositions[0][step.key].key
                        ].y.toFixed(0)}
                      </div>
                    </IconContent>
                  </Box>
                </DraggableCore>
              ))}
            </EditingContent>
          </>
        )}
      </EditingDiv>
    );
  }
}
