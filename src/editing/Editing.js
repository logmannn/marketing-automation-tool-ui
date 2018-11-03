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
    this.interval = setInterval(this.checkForScroll, 150);
    this.setState({
      loading: false,
      activeDrags: 0,
      deltaPositions: [
        [
          {
            key: 0,
            x: 97,
            y: 274,
            icon: Drip,
            background: "green",
            activePoints: [
              {
                top: "start",
                left: "",
                bottom: "start",
                right: ""
              }
            ],
            connectedTo: [
              { itemId: 1, status: "start", side: "bottom" },
              { itemId: 4, status: "start", side: "top" }
            ],
            attachedLines: [0, 2],
            deleted: false
          },
          {
            key: 1,
            x: 267,
            y: 509,
            icon: Drip,
            background: "red",
            activePoints: [
              {
                top: "",
                left: "end",
                bottom: "start",
                right: ""
              }
            ],
            connectedTo: [
              { itemId: 0, status: "end", side: "left" },
              { itemId: 2, status: "start", side: "bottom" }
            ],
            attachedLines: [0, 1],
            deleted: false
          },
          {
            key: 2,
            x: 620,
            y: 228,
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
            connectedTo: [{ itemId: 1, status: "end", side: "left" }],
            attachedLines: [1],
            deleted: false
          },
          {
            key: 3,
            x: 300,
            y: 300,
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
            connectedTo: [],
            attachedLines: [],
            deleted: false
          },
          {
            key: 4,
            x: 362,
            y: 159,
            icon: Drip,
            background: "purple",
            activePoints: [
              {
                top: "",
                left: "end",
                bottom: "",
                right: ""
              }
            ],
            connectedTo: [{ itemId: 0, status: "end", side: "left" }],
            attachedLines: [2],
            deleted: false
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
                side: "bottom"
              }
            ],
            end: [
              {
                item: 1,
                side: "left"
              }
            ]
          },
          {
            key: 1,
            start: [
              {
                item: 1,
                side: "bottom"
              }
            ],
            end: [
              {
                item: 2,
                side: "left"
              }
            ]
          },
          {
            key: 2,
            start: [
              {
                item: 0,
                side: "top"
              }
            ],
            end: [
              {
                item: 4,
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

    if (this.props.isHidden === null) {
      this.setState({
        elementX: e.pageX - element.offsetLeft,
        elementY: e.pageY - element.offsetTop
      });
    }
    if (this.props.isHidden === true) {
      this.setState({
        elementX: e.pageX - element.offsetLeft,
        elementY: e.pageY - element.offsetTop
      });
    }
    if (this.props.isHidden === false) {
      this.setState({
        elementX: e.pageX - element.offsetLeft + 230,
        elementY: e.pageY - element.offsetTop
      });
    }

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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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

    this.setState({
      activeDrags: this.state.activeDrags + 1,
      start: true,
      offsetX:
        this.state.mouseX -
        document.getElementById(itemNumber).getBoundingClientRect().x,
      offsetY:
        this.state.mouseY -
        document.getElementById(itemNumber).getBoundingClientRect().y
    });
  };

  onStop = (e, position) => {
    this.setState({
      activeDrags: this.state.activeDrags - 1,
      intervalId: 0,
      currentItem: ""
    });

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

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const {
      deltaPositions,
      loading,
      elementX,
      elementY,
      currentItem,
      start,
      scrolling,
      lines,
      creatingLine,
      currentLineItem,
      currentFirstPoint,
      currentFirstSide,
      currentParentItems,
      activeDrags,
      mouseX,
      mouseY,
      offsetX,
      offsetY
    } = this.state;

    const { isHidden } = this.props;

    this.setCurrentStep = (id, bool) => {
      if (bool) {
        this.setState({
          currentItem: id
        });
      } else {
        this.setState({
          currentItem: ""
        });
      }
    };

    this.onMouseDown = e => {
      if (creatingLine === true && e.target.id === "EditingContent") {
        lines[0].pop();
        deltaPositions[0][currentFirstPoint].activePoints[0][currentFirstSide] =
          "";
        this.setState({
          currentLineItem: "",
          creatingLine: false
        });
      }
    };

    this.onLineDelete = id => {
      if (!creatingLine) {
        for (let i = 0; i < lines[0].length; i++) {
          if (lines[0][i].key === id) {
            const lineItemStart = lines[0][i].start[0];
            const lineItemEnd = lines[0][i].end[0];
            const attachedItemStart = deltaPositions[0][lineItemStart.item];
            const attachedItemEnd = deltaPositions[0][lineItemEnd.item];

            let items = this.state.deltaPositions[0];

            let index = attachedItemStart.attachedLines.indexOf(id);
            items[lineItemStart.item].attachedLines.splice(index, 1);

            index = attachedItemEnd.attachedLines.indexOf(id);
            items[lineItemEnd.item].attachedLines.splice(index, 1);

            // items[id] = {
            //   ...items[id],
            //   attachedLines: [...items[id].attachedLines]
            // };

            let alreadyConnectedToStart = 0;
            for (let i = 0; i < attachedItemStart.connectedTo.length; i++) {
              if (
                attachedItemStart.connectedTo[i].side === lineItemStart.side
              ) {
                alreadyConnectedToStart++;
              }
            }
            if (alreadyConnectedToStart <= 1) {
              attachedItemStart.activePoints[0][lineItemStart.side] = "";
            }
            let alreadyConnectedToEnd = 0;
            for (let i = 0; i < attachedItemEnd.connectedTo.length; i++) {
              if (attachedItemEnd.connectedTo[i].side === lineItemEnd.side) {
                alreadyConnectedToEnd++;
              }
            }
            if (alreadyConnectedToEnd <= 1) {
              attachedItemEnd.activePoints[0][lineItemEnd.side] = "";
            }

            // for (let i = 0; i < attachedItemEnd.connectedTo.length; i++) {
            // console.log(attachedItemEnd.activePoints[0][lineItemEnd.side]);
            // attachedItemEnd.activePoints[0][lineItemEnd.side] = "";
            // }

            for (let i = 0; i < attachedItemStart.connectedTo.length; i++) {
              if (
                attachedItemStart.connectedTo[i].itemId ===
                  lineItemStart.item ||
                attachedItemStart.connectedTo[i].itemId === lineItemEnd.item
              ) {
                attachedItemStart.connectedTo.splice(i, 1);
              }
            }
            for (let i = 0; i < attachedItemEnd.connectedTo.length; i++) {
              if (
                attachedItemEnd.connectedTo[i].itemId === lineItemStart.item ||
                attachedItemEnd.connectedTo[i].itemId === lineItemEnd.item
              ) {
                attachedItemEnd.connectedTo.splice(i, 1);
              }
            }
            lines[0].splice(i, 1);
          }
        }
      }
    };

    this.lineCreate = (side, id) => {
      // if (deltaPositions[0][id].activePoints[0][side] !== "end") {
      if (creatingLine === false) {
        let parentItems = [];
        let tempItems = [];

        for (let i = 0; i < deltaPositions[0][id].connectedTo.length; i++) {
          if (deltaPositions[0][id].connectedTo[i].status === "end") {
            tempItems.push(deltaPositions[0][id].connectedTo[i].itemId);
          }
        }

        while (tempItems.length > 0) {
          parentItems.push(tempItems[0]);

          for (
            let i = 0;
            i < deltaPositions[0][tempItems[0]].connectedTo.length;
            i++
          ) {
            if (
              deltaPositions[0][tempItems[0]].connectedTo[i].status === "end"
            ) {
              tempItems.push(
                deltaPositions[0][tempItems[0]].connectedTo[i].itemId
              );
            }
          }

          tempItems.shift();
        }

        let currentLineItem = 0;
        if (lines[0].length > 0) {
          currentLineItem = lines[0][lines[0].length - 1].key + 1;
        }

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
          currentParentItems: parentItems,
          currentLineItem: currentLineItem,
          currentFirstPoint: id,
          currentFirstSide: side,
          creatingLine: !creatingLine,
          lines: [
            [
              ...lines[0],
              {
                key: currentLineItem,
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
        if (currentParentItems.indexOf(id) === -1 && id !== currentFirstPoint) {
          let isAlreadyConnected = false;
          for (let i = 0; i < deltaPositions[0][id].connectedTo.length; i++) {
            if (deltaPositions[0][id].connectedTo[i].itemId === id) {
              isAlreadyConnected = true;
            }
          }
          for (
            let i = 0;
            i < deltaPositions[0][currentFirstPoint].connectedTo.length;
            i++
          ) {
            if (
              deltaPositions[0][currentFirstPoint].connectedTo[i].itemId === id
            ) {
              isAlreadyConnected = true;
            }
          }

          if (!isAlreadyConnected) {
            const items = this.state.deltaPositions[0];
            items[id] = {
              ...items[id],
              activePoints: [
                {
                  ...items[id].activePoints[0],
                  [side]: "end"
                }
              ],
              connectedTo: [
                ...items[id].connectedTo,
                { itemId: this.state.currentFirstPoint, status: "end", side }
              ],
              attachedLines: [...items[id].attachedLines, currentLineItem]
            };
            items[this.state.currentFirstPoint] = {
              ...items[this.state.currentFirstPoint],
              connectedTo: [
                ...items[this.state.currentFirstPoint].connectedTo,
                { itemId: id, status: "start", side: currentFirstSide }
              ],
              attachedLines: [
                ...items[this.state.currentFirstPoint].attachedLines,
                currentLineItem
              ]
            };
            const lines = this.state.lines[0];

            for (let i = 0; i < lines.length; i++) {
              if (lines[i].key === currentLineItem) {
                lines[i] = {
                  ...lines[i],
                  end: [
                    {
                      ...lines[i].end[0],
                      item: id,
                      side
                    }
                  ]
                };
                this.setState({
                  lines: [lines],
                  deltaPositions: [items],
                  currentParentItems: [],
                  currentLineItem: null,
                  currentFirstPoint: null,
                  currentFirstSide: "",
                  creatingLine: !creatingLine
                });
              }
            }
          }
        }
      }
      // }
    };

    this.deleteStep = id => {
      let itemsDelete = deltaPositions;
      let items = itemsDelete[0][id];
      const itemCount = items.attachedLines.length;

      for (let i = 0; i < itemCount; i++) {
        this.onLineDelete(items.attachedLines[0]);
      }

      for (let i = 0; i < deltaPositions[0].length; i++) {
        if (deltaPositions[0][i].key === id) {
          let items = deltaPositions[0][i];
          items.deleted = true;
        }
      }

      this.setState({
        deltaPositions: itemsDelete
      });
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
        onMouseDown={this.onMouseDown}
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
              (line, index) =>
                line.end[0].item !== null ? (
                  <Line
                    key={index}
                    id={line.key}
                    color="black"
                    x1={deltaPositions[0][line.start[0].item].x}
                    y1={deltaPositions[0][line.start[0].item].y}
                    x2={deltaPositions[0][line.end[0].item].x}
                    y2={deltaPositions[0][line.end[0].item].y}
                    startSide={line.start[0].side}
                    hidden={this.state.hidden}
                    endSide={line.end[0].side}
                    onLineDelete={this.onLineDelete}
                    creation={this.state.creatingLine}
                  />
                ) : (
                  <Line
                    key={index}
                    id={line.key}
                    color="black"
                    x1={deltaPositions[0][line.start[0].item].x}
                    y1={deltaPositions[0][line.start[0].item].y}
                    x2={elementX}
                    y2={elementY}
                    startSide={line.start[0].side}
                    hidden={this.state.hidden}
                    onLineDelete={this.onLineDelete}
                    endSide="mouse"
                    creation={this.state.creatingLine}
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
                  <Step item={deltaPositions[0][parseInt(currentItem)]} />
                </div>
              )}
            <EditingContent id="EditingContent">
              {deltaPositions[0].map(step => {
                if (!isNaN(step.key))
                  return (
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
                          lineDelete={this.lineDelete}
                          setCurrentStep={this.setCurrentStep}
                          deleteStep={this.deleteStep}
                        />
                      </div>
                    </Draggable>
                  );
                else {
                  return null;
                }
              })}
            </EditingContent>
          </>
        )}
      </EditingDiv>
    );
  }
}
