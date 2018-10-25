import React, { Component } from "react";
import styled from "styled-components";

import Draggable from "react-draggable";
import ReactHoverObserver from "react-hover-observer";

const EditingDiv = styled.div`
  position: absolute;

  border: 2px solid #c7c6c7;

  width: calc(100vw - 234px);
  height: calc(100vh - 4px);

  z-index: 1;

  left: 230px;
`;

const Box = styled.div`
  position: absolute;

  background: green;

  padding: 20px;
`;

export default class Editing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPositions: [],
      loading: true,
      currentItem: ""
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
      activeDrags: 0,
      deltaPositions: [
        [
          {
            x: 0,
            y: 0
          },
          {
            x: 300,
            y: 200
          },
          {
            x: 300,
            y: 200
          }
        ]
      ]
    });
  }

  onStart = e => {
    if (!isNaN(e.target.id)) {
      this.setState({
        currentItem: e.target.id
      });
    }
    this.setState({
      activeDrags: this.state.activeDrags + 1
    });
  };

  onStop = () => {
    this.setState({ activeDrags: this.state.activeDrags - 1, currentItem: "" });
  };

  handleDrag = (e, ui) => {
    const items = this.state.deltaPositions;

    items[0][e.target.id] = {
      x: ui.x + ui.deltaX,
      y: ui.y + ui.deltaY
    };
    this.setState({
      deltaPositions: items
    });
  };
  // onStart = (e, ui) => {
  //   console.log("start");
  // };

  // onStop = (e, ui) => {
  //   console.log("stop");
  // };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPositions, loading, currentItem, activeDrags } = this.state;

    return (
      <ReactHoverObserver>
        {({ isHovering }) => (
          <EditingDiv
            className={
              "disable-css-transitions " +
              (this.props.isHidden === true && "editingFull") +
              " " +
              (this.props.isHidden === false && "editingSmall")
            }
          >
            {loading ? (
              "loading"
            ) : (
              <>
                <Draggable
                  defaultPosition={{
                    x: deltaPositions[0][0].x,
                    y: deltaPositions[0][0].y
                  }}
                  onDrag={this.handleDrag}
                  onStart={this.handleStart}
                  onStop={this.handleStop}
                  position={null}
                  bounds="parent"
                  {...dragHandlers}
                  handle="strong"
                >
                  <Box
                    className={
                      "box " + (currentItem === "0" ? "show" : "hidden")
                    }
                    style={{ width: "150px" }}
                  >
                    <strong
                      id="0"
                      className={
                        "grabbable " +
                        (currentItem !== "0" && activeDrags === 1
                          ? "disable "
                          : "")
                      }
                    >
                      0 Grab Here
                    </strong>
                    <div>
                      x: {deltaPositions[0][0].x.toFixed(0)}, y:{" "}
                      {deltaPositions[0][0].y.toFixed(0)}
                    </div>
                  </Box>
                </Draggable>
                <Draggable
                  defaultPosition={{
                    x: deltaPositions[0][1].x,
                    y: deltaPositions[0][1].y
                  }}
                  position={null}
                  onDrag={this.handleDrag}
                  bounds="parent"
                  {...dragHandlers}
                  handle="strong"
                >
                  <Box
                    className={
                      "box " + (currentItem === "1" ? "show" : "hidden")
                    }
                    style={{ width: "150px" }}
                  >
                    <strong
                      id="1"
                      className={
                        "grabbable " +
                        (currentItem !== "1" && activeDrags === 1
                          ? "disable"
                          : "")
                      }
                    >
                      Grab Here
                    </strong>
                    <div>
                      x: {deltaPositions[0][1].x.toFixed(0)}, y:{" "}
                      {deltaPositions[0][1].y.toFixed(0)}
                    </div>
                  </Box>
                </Draggable>
                <Draggable
                  defaultPosition={{
                    x: deltaPositions[0][2].x,
                    y: deltaPositions[0][2].y
                  }}
                  onDrag={this.handleDrag}
                  bounds="parent"
                  {...dragHandlers}
                  handle="strong"
                >
                  <Box
                    className={
                      "box " + (currentItem === "2" ? "show" : "hidden")
                    }
                    style={{ width: "150px" }}
                  >
                    <strong
                      id="2"
                      className={
                        "grabbable " +
                        (currentItem !== "2" && activeDrags === 1
                          ? "disable"
                          : "")
                      }
                    >
                      Grab Here
                    </strong>
                    <div>
                      x: {deltaPositions[0][2].x.toFixed(0)}, y:{" "}
                      {deltaPositions[0][2].y.toFixed(0)}
                    </div>
                  </Box>
                </Draggable>
              </>
            )}
          </EditingDiv>
        )}
      </ReactHoverObserver>
    );
  }
}
