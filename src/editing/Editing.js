import React, { Component } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import Step from "./Step";
import Line from "../common/Line";
import { HotKeys } from "react-hotkeys";

// Icons for Steps
import UserPlus from "../common/userPlus.svg";
import Pointer from "../common/pointer.svg";
import Open from "../common/open.svg";
import Calendar from "../common/calendar.svg";
import Mail from "../common/mail.svg";
import AddPoints from "../common/addPoints.svg";
import RemovePoints from "../common/removePoints.svg";
import Time from "../common/time.svg";
import Score from "../common/score.svg";

const EditingDiv = styled(HotKeys)`
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
      controlledPosition: {
        x: -400,
        y: 200
      },
      loading: true,
      deltaPositions: [
        [
          {
            key: 0,
            x: 22,
            y: 38,
            icon: UserPlus,
            background: "#F5541C",
            activePoints: [
              {
                top: "",
                left: "",
                bottom: "",
                right: "start"
              }
            ],
            connectedTo: [{ itemId: 5, status: "start", side: "right" }],
            attachedLines: [0],
            deleted: false,
            hoverFix: false
          },
          {
            key: 1,
            x: 385,
            y: 594,
            icon: Pointer,
            background: "#F5541C",
            activePoints: [
              {
                top: "end",
                left: "",
                bottom: "start",
                right: ""
              }
            ],
            connectedTo: [
              { itemId: 3, status: "end", side: "top" },
              { itemId: 2, status: "start", side: "bottom" }
            ],
            attachedLines: [4, 5],
            deleted: false,
            hoverFix: false
          },
          {
            key: 2,
            x: 392,
            y: 774,
            icon: AddPoints,
            background: "#AAD20E",
            activePoints: [
              {
                top: "end",
                left: "",
                bottom: "",
                right: ""
              }
            ],
            connectedTo: [{ itemId: 1, status: "end", side: "top" }],
            attachedLines: [5],
            deleted: false,
            hoverFix: false
          },
          {
            key: 3,
            x: 376,
            y: 435,
            icon: Open,
            background: "#F5541C",
            activePoints: [
              {
                top: "",
                left: "end",
                bottom: "start",
                right: "start"
              }
            ],
            connectedTo: [
              { itemId: 7, status: "end", side: "left" },
              { itemId: 1, status: "start", side: "bottom" },
              { itemId: 6, status: "start", side: "right" }
            ],
            attachedLines: [3, 4, 6],
            deleted: false,
            hoverFix: false
          },
          {
            key: 4,
            x: 231,
            y: 12,
            icon: Calendar,
            background: "#F5541C",
            activePoints: [
              {
                top: "",
                left: "",
                bottom: "start",
                right: ""
              }
            ],
            connectedTo: [{ itemId: 5, status: "start", side: "bottom" }],
            attachedLines: [1],
            deleted: false,
            hoverFix: false
          },
          {
            key: 5,
            x: 186,
            y: 187,
            icon: Mail,
            background: "#AAD20E",
            activePoints: [
              {
                top: "end",
                left: "end",
                bottom: "start",
                right: ""
              }
            ],
            connectedTo: [
              { itemId: 0, status: "end", side: "left" },
              { itemId: 7, status: "start", side: "bottom" },
              { itemId: 4, status: "end", side: "top" }
            ],
            attachedLines: [0, 1, 2],
            deleted: false,
            hoverFix: false
          },
          {
            key: 6,
            x: 571,
            y: 511,
            icon: RemovePoints,
            background: "#AAD20E",
            activePoints: [
              {
                top: "",
                left: "end",
                bottom: "",
                right: ""
              }
            ],
            connectedTo: [{ itemId: 3, status: "end", side: "left" }],
            attachedLines: [6],
            deleted: false,
            hoverFix: false
          },
          {
            key: 7,
            x: 234,
            y: 342,
            icon: Time,
            background: "#00A1E1",
            activePoints: [
              {
                top: "",
                left: "end",
                bottom: "",
                right: "start"
              }
            ],
            connectedTo: [
              { itemId: 5, status: "end", side: "left" },
              { itemId: 3, status: "start", side: "right" }
            ],
            attachedLines: [2, 3],
            deleted: false,
            hoverFix: false
          },
          {
            key: 8,
            x: 924,
            y: 749,
            icon: Score,
            background: "#00A1E1",
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
            deleted: false,
            hoverFix: false
          }
        ]
      ],
      lines: [
        [
          {
            key: 0,
            start: [
              {
                item: 0,
                side: "right"
              }
            ],
            end: [
              {
                item: 5,
                side: "left"
              }
            ]
          },
          {
            key: 1,
            start: [
              {
                item: 4,
                side: "bottom"
              }
            ],
            end: [
              {
                item: 5,
                side: "top"
              }
            ]
          },
          {
            key: 2,
            start: [
              {
                item: 5,
                side: "bottom"
              }
            ],
            end: [
              {
                item: 7,
                side: "left"
              }
            ]
          },
          {
            key: 3,
            start: [
              {
                item: 7,
                side: "right"
              }
            ],
            end: [
              {
                item: 3,
                side: "left"
              }
            ]
          },
          {
            key: 4,
            start: [
              {
                item: 3,
                side: "bottom"
              }
            ],
            end: [
              {
                item: 1,
                side: "top"
              }
            ]
          },
          {
            key: 5,
            start: [
              {
                item: 1,
                side: "bottom"
              }
            ],
            end: [
              {
                item: 2,
                side: "top"
              }
            ]
          },
          {
            key: 6,
            start: [
              {
                item: 3,
                side: "right"
              }
            ],
            end: [
              {
                item: 6,
                side: "left"
              }
            ]
          }
        ]
      ]
    };
  }

  componentDidMount() {
    // Set interval for checking if dragging near edge
    this.interval = setInterval(this.checkForScroll, 150);

    // mostly preview information in state for now until I get the backend working
    this.setState({
      loading: false,
      activeDrags: 0,
      startDragPosition: {},
      actionPerformed: false,
      intervalId: 0,
      mouseX: 0,
      mouseY: 0,
      offsetX: 0,
      offsetY: 0,
      start: false,
      creatingLine: false,
      eventHistory: [],
      redoHistory: [],
      simulatingClick: false
    });
  }

  componentDidUpdate(prevProps) {
    const { newItem, clearNewItem } = this.props;
    const { eventHistory } = this.state;

    if (this.state.actionPerformed && !this.state.simulatingClick) {
      this.setState({
        actionPerformed: false,
        redoHistory: []
      });
    }

    if (newItem !== prevProps.newItem && newItem !== null) {
      // If a new item is detected in the props then create a new item and clear the state. I wasn't sure how to do this another way. This is so that the sidebar which is in another component can communicate with this component
      const { deltaPositions } = this.state;

      // Get where the user is in their scroll and add an item in the top left
      const top = Math.abs(
        document.getElementById("EditingContent").getBoundingClientRect().top
      );
      const left = Math.abs(
        document.getElementById("EditingContent").getBoundingClientRect().left -
          230
      );

      const items = deltaPositions;
      const key = this.state.deltaPositions[0].length;

      items[0].push({
        key,
        x: left,
        y: top,
        icon: newItem.icon,
        background: newItem.backgroundColor,
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
      });

      this.setState({
        deltaPositions: items,
        eventHistory: [{ type: "Step created", key }, ...eventHistory]
      });

      // remove the newItem state so that this is not called multiple times
      clearNewItem();
    }
  }

  checkForScroll = () => {
    if (this.state.activeDrags) {
      // If at the edge of the screen and when in the dragging state edges the screen further towards that side
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
        document.getElementById(itemNumber).getBoundingClientRect().y,
      startDragPosition: { x: position.x, y: position.y }
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

    // only set action performed to true if the item has actually moved
    if (
      this.state.startDragPosition.x !== position.x &&
      this.state.startDragPosition.y !== position.y
    ) {
      this.setState({
        eventHistory: [
          {
            type: "Step moved",
            key: itemNumber,
            xStart: this.state.startDragPosition.x,
            yStart: this.state.startDragPosition.y,
            xEnd: x,
            yEnd: y
          },
          ...this.state.eventHistory
        ],
        actionPerformed: true
      });
    }
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

        let isAlreadyConnected = false;
        for (
          let i = 0;
          i < deltaPositions[0][currentFirstPoint].connectedTo.length;
          i++
        ) {
          if (
            deltaPositions[0][currentFirstPoint].connectedTo[i].side ===
            currentFirstSide
          ) {
            isAlreadyConnected = true;
          }
        }

        if (!isAlreadyConnected) {
          deltaPositions[0][currentFirstPoint].activePoints[0][
            currentFirstSide
          ] = "";
        }
        this.setState({
          currentLineItem: "",
          creatingLine: false
        });
      }
    };

    this.onLineDelete = (id, fromDeleteStep) => {
      if (!creatingLine) {
        let lineItemStart;
        let lineItemEnd;
        for (let i = 0; i < lines[0].length; i++) {
          if (lines[0][i].key === id) {
            lineItemStart = lines[0][i].start[0];
            lineItemEnd = lines[0][i].end[0];
            const attachedItemStart = deltaPositions[0][lineItemStart.item];
            const attachedItemEnd = deltaPositions[0][lineItemEnd.item];

            let items = this.state.deltaPositions[0];

            let index = attachedItemStart.attachedLines.indexOf(id);
            items[lineItemStart.item].attachedLines.splice(index, 1);

            index = attachedItemEnd.attachedLines.indexOf(id);
            items[lineItemEnd.item].attachedLines.splice(index, 1);

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
        if (!this.state.simulatingClick) {
          if (typeof fromDeleteStep === "undefined") {
            this.setState({
              actionPerformed: true,
              eventHistory: [
                {
                  type: "Line deleted",
                  startId: lineItemStart.item,
                  endId: lineItemEnd.item,
                  startSide: lineItemStart.side,
                  endSide: lineItemEnd.side,
                  key: id,
                  newLine: lines[0].length + 1
                },
                ...this.state.eventHistory
              ]
            });
          }
        }
      }
    };

    this.lineCreate = (side, id) => {
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

        let test = this.state.deltaPositions[0][id].activePoints[0];
        let status = "start";
        if (side === "left" && test.left === "end") {
          status = "end";
        }
        if (side === "top" && test.top === "end") {
          status = "end";
        }
        if (side === "bottom" && test.bottom === "end") {
          status = "end";
        }
        if (side === "right" && test.right === "end") {
          status = "end";
        }

        const items = this.state.deltaPositions[0];
        items[id] = {
          ...items[id],
          activePoints: [
            {
              ...items[id].activePoints[0],
              [side]: status
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

            let key;

            for (let i = 0; i < lines.length; i++) {
              if (lines[i].key === currentLineItem) {
                key = lines[i].key;
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
              }
            }
            if (!this.state.simulatingClick) {
              this.setState({
                actionPerformed: true
              });
              this.setState({
                eventHistory: [
                  {
                    type: "Line created",
                    id: key,
                    startId: currentFirstPoint,
                    startSide: currentFirstSide,
                    endId: id,
                    endSide: side
                  },
                  ...this.state.eventHistory
                ]
              });
            }
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
        // else {
        //   alert("Sorry, this would create an infinite loop");
        // }
      }
    };

    this.deleteStep = id => {
      if (!activeDrags) {
        let itemsDelete = deltaPositions;
        let items = itemsDelete[0][id];
        const itemCount = items.attachedLines.length;

        const attachedLines = [];
        const lines = this.state.lines[0];

        for (let i = 0; i < itemCount; i++) {
          // for lines where lines are equal to items.attachedLines[0] get side and id of step
          let endId;
          let startId;
          let endSide;
          let startSide;

          for (let i = 0; i < lines.length; i++) {
            if (lines[i].key === items.attachedLines[0]) {
              endId = lines[i].end[0].item;
              startId = lines[i].start[0].item;
              endSide = lines[i].end[0].side;
              startSide = lines[i].start[0].side;
            }
          }
          // linesLength = linesLength + 1;
          attachedLines.push({
            id: items.attachedLines[0],
            endId,
            startId,
            endSide,
            startSide
            // newLine: linesLength + 1
          });
          this.onLineDelete(items.attachedLines[0], true);
        }

        for (let i = 0; i < deltaPositions[0].length; i++) {
          if (deltaPositions[0][i].key === id) {
            let items = deltaPositions[0][i];
            items.deleted = true;
          }
        }

        this.setState({
          deltaPositions: itemsDelete,
          actionPerformed: true,
          eventHistory: [
            {
              type: "Step deleted",
              key: id,
              deleted: true,
              attachedLines
            },
            ...this.state.eventHistory
          ]
        });
      }
    };

    this.toggle = 0;
    this.undo = e => {
      e.preventDefault();
      if (this.toggle === 0) {
        if (this.state.eventHistory.length > 0) {
          if (this.state.eventHistory[0].type === "Step moved") {
            // Find the item and change its x and y to the previous x and y position
            for (let i = 0; i < deltaPositions[0].length; i++) {
              if (
                deltaPositions[0][i].key ===
                parseInt(this.state.eventHistory[0].key)
              ) {
                let items = deltaPositions;
                let innerItem = items[0][i];
                innerItem.x = this.state.eventHistory[0].xStart;
                innerItem.y = this.state.eventHistory[0].yStart;

                this.setState({
                  deltaPositions: items
                });
              }
            }
            this.state.redoHistory.unshift(this.state.eventHistory[0]);
            this.state.eventHistory.shift();
          } else if (this.state.eventHistory[0].type === "Step created") {
            for (let i = 0; i < deltaPositions[0].length; i++) {
              if (
                deltaPositions[0][i].key ===
                parseInt(this.state.eventHistory[0].key)
              ) {
                let items = deltaPositions;
                let innerItem = items[0][i];
                innerItem.deleted = true;
                this.setState({
                  deltaPositions: items
                });
              }
            }
            this.state.redoHistory.unshift(this.state.eventHistory[0]);
            this.state.eventHistory.shift();
          } else if (this.state.eventHistory[0].type === "Line deleted") {
            this.setState({
              simulatingClick: true
            });
            document
              .getElementById(
                `${this.state.eventHistory[0].startId}_${
                  this.state.eventHistory[0].startSide
                }`
              )
              .click();
            document
              .getElementById(
                `${this.state.eventHistory[0].endId}_${
                  this.state.eventHistory[0].endSide
                }`
              )
              .click();
            this.setState({
              simulatingClick: false
            });

            this.state.redoHistory.unshift(this.state.eventHistory[0]);
            this.state.eventHistory.shift();
          } else if (this.state.eventHistory[0].type === "Line created") {
            this.setState({
              simulatingClick: true
            });
            document
              .getElementById(`line_${this.state.eventHistory[0].id}_delete`)
              .click();
            this.setState({
              simulatingClick: false
            });
            this.state.redoHistory.unshift(this.state.eventHistory[0]);
            this.state.eventHistory.shift();
          } else if (this.state.eventHistory[0].type === "Step deleted") {
            for (let i = 0; i < deltaPositions[0].length; i++) {
              if (
                deltaPositions[0][i].key ===
                parseInt(this.state.eventHistory[0].key)
              ) {
                let items = deltaPositions;
                let innerItem = items[0][i];
                innerItem.deleted = false;
                innerItem.hoverFix = true;

                this.setState({
                  simulatingClick: true
                });
                for (
                  let i = 0;
                  i < this.state.eventHistory[0].attachedLines.length;
                  i++
                ) {
                  document
                    .getElementById(
                      `${this.state.eventHistory[0].attachedLines[i].startId}_${
                        this.state.eventHistory[0].attachedLines[i].startSide
                      }`
                    )
                    .click();
                  document
                    .getElementById(
                      `${this.state.eventHistory[0].attachedLines[i].endId}_${
                        this.state.eventHistory[0].attachedLines[i].endSide
                      }`
                    )
                    .click();
                }
                this.setState({
                  simulatingClick: false,
                  deltaPositions: items
                });
              }
            }
            this.state.redoHistory.unshift(this.state.eventHistory[0]);
            this.state.eventHistory.shift();
          }
        }
        this.toggle = 1;
      } else {
        this.toggle = 0;
      }
    };

    this.redo = e => {
      e.preventDefault();
      if (this.toggle === 1) {
        this.toggle = 0;
        if (this.state.redoHistory.length > 0) {
          if (this.state.redoHistory[0].type === "Step moved") {
            // Find the item and change its x and y to the previous x and y position
            for (let i = 0; i < deltaPositions[0].length; i++) {
              if (
                deltaPositions[0][i].key ===
                parseInt(this.state.redoHistory[0].key)
              ) {
                let items = deltaPositions;
                let innerItem = items[0][i];
                innerItem.x = this.state.redoHistory[0].xEnd;
                innerItem.y = this.state.redoHistory[0].yEnd;

                this.setState({
                  deltaPositions: items
                });
              }
            }
            this.state.eventHistory.unshift(this.state.redoHistory[0]);
            this.state.redoHistory.shift();
          } else if (this.state.redoHistory[0].type === "Step created") {
            for (let i = 0; i < deltaPositions[0].length; i++) {
              if (
                deltaPositions[0][i].key ===
                parseInt(this.state.redoHistory[0].key)
              ) {
                let items = deltaPositions;
                let innerItem = items[0][i];
                innerItem.deleted = false;

                this.setState({
                  deltaPositions: items
                });
              }
            }
            this.state.eventHistory.unshift(this.state.redoHistory[0]);
            this.state.redoHistory.shift();
          } else if (this.state.redoHistory[0].type === "Line deleted") {
            this.setState({
              simulatingClick: true
            });

            document
              .getElementById(
                `line_${lines[0][lines[0].length - 1].key}_delete`
              )
              .click();
            this.setState({
              simulatingClick: false
            });

            this.state.eventHistory.unshift(this.state.redoHistory[0]);
            this.state.redoHistory.shift();
          } else if (this.state.redoHistory[0].type === "Line created") {
            this.setState({
              simulatingClick: true
            });

            document
              .getElementById(
                `${this.state.redoHistory[0].startId}_${
                  this.state.redoHistory[0].startSide
                }`
              )
              .click();
            document
              .getElementById(
                `${this.state.redoHistory[0].endId}_${
                  this.state.redoHistory[0].endSide
                }`
              )
              .click();

            this.setState({
              simulatingClick: false
            });

            this.state.eventHistory.unshift(this.state.redoHistory[0]);
            this.state.redoHistory.shift();
          } else if (this.state.redoHistory[0].type === "Step deleted") {
            for (let i = 0; i < deltaPositions[0].length; i++) {
              if (
                deltaPositions[0][i].key ===
                parseInt(this.state.redoHistory[0].key)
              ) {
                let items = deltaPositions;
                let innerItem = items[0][i];
                innerItem.deleted = true;

                for (
                  let i = 0;
                  i < this.state.redoHistory[0].attachedLines.length;
                  i++
                ) {
                  this.setState({
                    simulatingClick: true
                  });
                  document
                    .getElementById(
                      `line_${lines[0][lines[0].length - 1].key}_delete`
                    )
                    .click();
                  this.setState({
                    simulatingClick: false
                  });
                }

                this.setState({
                  deltaPositions: items
                });
              }
            }
            this.state.eventHistory.unshift(this.state.redoHistory[0]);
            this.state.redoHistory.shift();
          }
        }
      } else {
        this.toggle = this.toggle + 1;
      }
    };

    const map = {
      undo: ["command+z", "ctrl+z", "meta+z"],
      redo: [
        "command+y",
        "ctrl+y",
        "meta+y",
        "command+shift+z",
        "meta+shift+z",
        "ctrl+shift+z"
      ]
    };

    const handlers = {
      undo: this.undo,
      redo: this.redo
    };

    return (
      <EditingDiv
        keyMap={map}
        handlers={handlers}
        id="EditingDiv"
        className={
          "disable-css-transitions " +
          (isHidden === true && "editingFull") +
          " " +
          (isHidden === false && "editingSmall")
        }
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        tabIndex="0"
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
            {lines[0].map((line, index) =>
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
            {!isNaN(currentItem) && activeDrags === 1 && start === false && (
              <div
                style={{
                  position: "fixed",
                  left: `calc(${mouseX}px - ${offsetX}px)`,
                  top: `calc(${mouseY}px - ${offsetY}px)`
                }}
              >
                <Step
                  item={deltaPositions[0][parseInt(currentItem)]}
                  deleted={deltaPositions[0][parseInt(currentItem)].deleted}
                />
              </div>
            )}
            <EditingContent id="EditingContent">
              {deltaPositions[0].map(step => {
                if (!isNaN(step.key))
                  return (
                    <Draggable
                      position={{
                        x: deltaPositions[0][step.key].x,
                        y: deltaPositions[0][step.key].y
                      }}
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
                          creation={this.state.creatingLine}
                          deleted={deltaPositions[0][step.key].deleted}
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
