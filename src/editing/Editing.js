import React, { Component } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import Step from "./Step";

import Drip from "../common/drip.svg";
import Line from "../common/Line";

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

  z-index: 4;
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
            x: 257,
            y: 253,
            icon: Drip,
            background: "green",
            activePoints: [
              {
                top: "end",
                left: "",
                bottom: "",
                right: "start"
              }
            ],
            connectedTo: [1]
          },
          {
            key: 1,
            x: 233,
            y: 86,
            icon: Drip,
            background: "red",
            activePoints: [
              {
                top: "",
                left: "",
                bottom: "start",
                right: ""
              }
            ],
            connectedTo: [0]
          },
          {
            key: 2,
            x: 520,
            y: 342,
            icon: Drip,
            background: "blue",
            activePoints: [
              {
                top: "",
                left: "end",
                bottom: "",
                right: ""
              }
            ],
            connectedTo: [0]
          },
          {
            key: 3,
            x: 605,
            y: 632,
            icon: Drip,
            background: "cyan",
            activePoints: [
              {
                top: "",
                left: "",
                bottom: "",
                right: ""
              }
            ],
            connectedTo: []
          }
        ]
      ],
      intervalId: 0,
      mouseX: 0,
      mouseY: 0,
      offsetX: 0,
      offsetY: 0,
      start: false,
      creatingLine: false,
      lines: [
        [
          {
            key: 0,
            start: [
              {
                item: 0,
                side: "top"
              }
            ],
            end: [
              {
                item: 1,
                side: "bottom"
              }
            ]
          },
          {
            key: 1,
            start: [
              {
                item: 0,
                side: "right"
              }
            ],
            end: [
              {
                item: 2,
                side: "left"
              }
            ]
          }
        ]
      ]
    });
  }

  checkForScroll = () => {
    if (this.state.activeDrags) {
      let sizeOfScroll = 10;
      let sizeOfInfluence = 20;
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
      let scrolling = false;

      if (xMouse < sizeOfInfluence) {
        moveX = moveX - sizeOfScroll;
        scrolling = true;
      }
      if (ymouse < sizeOfInfluence) {
        moveY = moveY - sizeOfScroll;
        scrolling = true;
      }
      if (xMouse > width - sizeOfInfluence) {
        moveX = moveX + sizeOfScroll;
        scrolling = true;
      }
      if (ymouse > height - sizeOfInfluence) {
        moveY = moveY + sizeOfScroll;
        scrolling = true;
      }

      this.setState({
        scrolling
      });

      window.scrollBy(moveX, moveY);
    }
  };

  onMouseMove = e => {
    let element = document.getElementById("EditingDiv");
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY
    });
    if (this.state.hidden !== this.props.isHidden) {
      this.setState({
        hidden: this.props.isHidden
      });
    }
  };

  // onMouseLeave = () => {
  //   if (this.state.activeDrags) {
  //     // force mouseup
  //     let element = document.getElementById("EditingDiv");
  //     element.dispatchEvent(new Event("mouseup"));
  //   }
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

    this.setState({
      deltaPositions: items,
      start: false
    });
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop(e, position);
  };

  onStart = (e, position) => {
    const itemNumber = position.node.id;
    let intervalId = setInterval(this.checkForScroll, 150);

    this.setState({
      activeDrags: this.state.activeDrags + 1,
      intervalId: intervalId,
      start: true,
      offsetX:
        e.clientX -
        document.getElementById(itemNumber).getBoundingClientRect().x,
      offsetY:
        e.clientY -
        document.getElementById(itemNumber).getBoundingClientRect().y
    });
    if (!isNaN(itemNumber)) {
      this.setState({
        currentItem: itemNumber
      });
    }
  };

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  onStop = (e, position) => {
    this.setState({
      activeDrags: this.state.activeDrags - 1,
      currentItem: "",
      intervalId: 0
    });
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
      mouseY: e.clientY,
      start: false
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
      currentItem,
      offsetX,
      offsetY,
      start,
      scrolling,
      lines,
      creatingLine,
      currentLineItem
    } = this.state;

    const { isHidden } = this.props;

    this.lineCreate = (side, id) => {
      if (deltaPositions[0][id].activePoints[0][side] !== "end") {
        if (creatingLine === false) {
          const items = this.state.deltaPositions[0];
          items[id] = {
            ...items[id],
            activePoints: [
              {
                ...items[id].activePoints[0],
                [side]: "start"
              }
            ]
          };

          this.setState({
            currentLineItem: lines[0].length,
            lines: [
              [
                ...lines[0],
                {
                  key: lines[0].length,
                  start: [
                    {
                      item: id,
                      side
                    }
                  ],
                  end: [
                    {
                      item: null,
                      side: "",
                      hidden: this.state.hidden
                    }
                  ]
                }
              ]
            ]
          });
        } else {
          const items = this.state.deltaPositions[0];
          items[id] = {
            ...items[id],
            activePoints: [
              {
                ...items[id].activePoints[0],
                [side]: "end"
              }
            ]
          };
          const lines = this.state.lines[0];
          console.log(currentLineItem);

          lines[currentLineItem] = {
            ...lines[currentLineItem],
            end: [
              {
                ...lines[currentLineItem].end[0],
                item: id,
                side
              }
            ]
          };
          this.setState({
            lines: [lines],
            deltaPositions: [items]
          });
        }
        this.setState({
          creatingLine: !creatingLine
        });
      }
    };

    return (
      <EditingDiv
        id="EditingDiv"
        className={
          "disable-css-transitions " +
          (isHidden === true && "editingFull") +
          " " +
          (isHidden === false && "editingSmall")
        }
        onMouseMove={this.onMouseMove}
      >
        <LeftSideBar
          id="LeftSideBar"
          className={
            "disable-css-transitions " +
            (isHidden === true && "LeftSidebarBefore") +
            " " +
            (isHidden === false && "LeftSidebarAfter")
          }
        />
        <TopSideBar id="TopSideBar" />

        {loading ? (
          "loading"
        ) : (
          <>
            {lines[0].map(
              line =>
                line.end[0].item !== null ? (
                  <Line
                    key={line.key}
                    color="black"
                    x1={deltaPositions[0][line.start[0].item].x}
                    y1={deltaPositions[0][line.start[0].item].y}
                    x2={deltaPositions[0][line.end[0].item].x}
                    y2={deltaPositions[0][line.end[0].item].y}
                    startSide={line.start[0].side}
                    endSide={line.end[0].side}
                    hidden={this.state.hidden}
                  />
                ) : (
                  <Line
                    key={line.key}
                    color="black"
                    x1={deltaPositions[0][line.start[0].item].x}
                    y1={deltaPositions[0][line.start[0].item].y}
                    x2={mouseX}
                    y2={mouseY}
                    startSide={line.start[0].side}
                    endSide="mouse"
                    hidden={this.state.hidden}
                  />
                )
            )}
            {!isNaN(currentItem) &&
              activeDrags === 1 &&
              start === false && (
                <div
                  style={{
                    position: "fixed",
                    left: `calc(${mouseX}px - ${offsetX}px)`,
                    top: `calc(${mouseY}px - ${offsetY}px)`
                  }}
                >
                  <Step
                    item={deltaPositions[0][parseInt(currentItem)]}
                    // lineCreate={this.lineCreate}
                  />
                </div>
              )}
            <EditingContent>
              {deltaPositions[0].map(step => (
                <Draggable
                  position={deltaPositions[0][step.key]}
                  {...dragHandlers}
                  onDrag={this.onControlledDrag}
                  key={step.key}
                  handle=".grabbable"
                >
                  <div
                    id={step.key}
                    style={{ position: "absolute" }}
                    className={
                      scrolling === true &&
                      parseInt(currentItem) === step.key &&
                      start === false
                        ? "noOpacity"
                        : "opacity"
                    }
                  >
                    <Step
                      item={deltaPositions[0][step.key]}
                      lines={lines[0]}
                      lineCreate={this.lineCreate}
                    />
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
