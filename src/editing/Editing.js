import React, { Component } from "react";
import styled from "styled-components";
import DraggableCore from "react-draggable";
import Draggable from "react-draggable";
import Step from "./Step";

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

  position: relative;
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

const Follow = styled.div`
  background: red;
  width: 50px;
  height: 50px;

  position: fixed;
`;

export default class Editing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPositions: [],
      loading: true,
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
      mouseY: 0,
      offsetX: 0,
      offsetY: 0
    });
  }

  // onStart = e => {
  //   // console.log("start");
  //   if (!isNaN(e.target.id)) {
  //     this.setState({
  //       currentItem: e.target.id
  //     });
  //   }
  //   this.setState({
  //     activeDrags: this.state.activeDrags + 1
  //   });
  //   let intervalId = setInterval(this.checkForScroll, 50);
  //   this.setState({ intervalId: intervalId });
  // };

  checkForScroll = () => {
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
      moveX = moveX - sizeOfScroll;
    }
    if (ymouse < sizeOfInfluence) {
      moveY = moveY - sizeOfScroll;
    }
    if (xMouse > width - sizeOfInfluence) {
      moveX = moveX + sizeOfScroll;
    }
    if (ymouse > height - sizeOfInfluence) {
      moveY = moveY + sizeOfScroll;
    }

    window.scrollBy(moveX, moveY);

    // const itemNumber = this.state.currentItem;

    // const items = this.state.deltaPositions;
    // items[0][itemNumber] = {
    //   ...items[0][itemNumber],
    //   x: items[0][itemNumber].x + 1,
    //   y: items[0][itemNumber].y + 1
    // };

    // this.setState({
    //   deltaPositions: items
    // });
  };

  // I actually prefer to not use this...
  // onMouseLeave = () => {
  //   if (this.state.activeDrags) {
  //     // force mouseup
  //     let element = document.getElementById("EditingDiv");
  //     element.dispatchEvent(new Event("mouseup"));
  //   }
  // };

  // For controlled component
  // adjustXPos = (e, position) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { x, y } = this.state.controlledPosition;
  //   this.setState({ controlledPosition: { x: x - 10, y } });
  // };

  // adjustYPos = (e, position) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { controlledPosition } = this.state;
  //   const { x, y } = controlledPosition;
  //   this.setState({ controlledPosition: { x, y: y - 10 } });
  // };

  onControlledDrag = (e, position) => {
    let { x, y } = position;
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }

    const itemNumber = position.node.id;

    const items = this.state.deltaPositions;
    items[0][itemNumber] = {
      ...items[0][itemNumber],
      x: x,
      y: y
    };

    // console.log(document.getElementById(itemNumber).getBoundingClientRect());

    this.setState({
      deltaPositions: items,
      mouseX: e.clientX,
      mouseY: e.clientY
    });

    if (
      e.offsetX <= 50 &&
      e.offsetY <= 50 &&
      e.offsetX >= 0 &&
      e.offsetY >= 0 &&
      e.offsetX !== this.state.offsetX &&
      e.offsetY !== this.state.offsetY
    ) {
      this.setState({
        offsetX: e.offsetX,
        offsetY: e.offsetY
      });
    }
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop(e, position);
  };

  onStart = (e, position) => {
    const itemNumber = position.node.id;
    let intervalId = setInterval(this.checkForScroll, 100);
    this.setState({
      activeDrags: this.state.activeDrags + 1,
      intervalId: intervalId
    });
    if (!isNaN(itemNumber)) {
      this.setState({
        currentItem: itemNumber
      });
    }
  };

  onStop = (e, position) => {
    this.setState({ activeDrags: this.state.activeDrags - 1, currentItem: "" });
    clearInterval(this.state.intervalId);

    let { x, y } = position;
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }

    const itemNumber = position.node.id;
    const items = this.state.deltaPositions;
    items[0][itemNumber] = {
      ...items[0][itemNumber],
      x: x,
      y: y
    };

    this.setState({
      deltaPositions: items,
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const {
      deltaPositions,
      loading,
      activeDrags,
      mouseX,
      mouseY,
      controlledPosition,
      currentItem,
      offsetX,
      offsetY
    } = this.state;

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
            {!isNaN(currentItem) &&
              activeDrags === 1 && (
                <div
                  style={{
                    position: "fixed",
                    left: `calc(${mouseX}px - ${offsetX}px)`,
                    top: `calc(${mouseY}px - ${offsetY}px)`,
                    border: "1px solid black"
                  }}
                >
                  <Step item={deltaPositions[0][parseInt(currentItem)]} />
                </div>
              )}
            <EditingContent>
              {deltaPositions[0].map(step => (
                <Draggable
                  position={deltaPositions[0][step.key]}
                  {...dragHandlers}
                  onDrag={this.onControlledDrag}
                  key={step.key}
                >
                  <div id={step.key} style={{ position: "absolute" }}>
                    <Step item={deltaPositions[0][step.key]} />
                  </div>
                </Draggable>
              ))}
            </EditingContent>
          </>
        )}
      </EditingDiv>
    );
  }
}
