import React, { Component } from "react";
import styled from "styled-components";

import Draggable from "react-draggable";

const EditingDiv = styled.div`
  position: absolute;

  border: 2px solid #c7c6c7;

  width: calc(100vw - 234px);
  height: calc(100vh - 4px);

  z-index: 1;

  left: 230px;
`;

export default class Editing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPositions: [],
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
      activeDrags: 0,
      deltaPositions: [
        [
          {
            x: 25,
            y: 25
          },
          {
            x: 1,
            y: 1
          },
          {
            x: 75,
            y: 75
          }
        ]
      ]
    });
  }

  onStart = () => {
    this.setState({ activeDrags: this.state.activeDrags + 1 });
  };

  onStop = () => {
    this.setState({ activeDrags: this.state.activeDrags - 1 });
  };

  handleDrag = (e, ui) => {
    // console.log(e.target.id);
    const items = this.state.deltaPositions;
    console.log(items);
    items[0][e.target.id] = {
      x: ui.x + ui.deltaX,
      y: ui.y + ui.deltaY
    };
    console.log(items);
    this.setState({
      deltaPositions: items
    });
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPositions, loading } = this.state;
    return (
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
              }} // in the future this will not be used and it will be taken from the server
              onDrag={this.handleDrag}
              bounds="parent"
              {...dragHandlers}
              handle="strong"
            >
              <div className="box" style={{ width: "150px" }}>
                <strong id="0">Grab Here</strong>
                <div>
                  x: {deltaPositions[0][0].x.toFixed(0)}, y:{" "}
                  {deltaPositions[0][0].y.toFixed(0)}
                </div>
              </div>
            </Draggable>
            <Draggable
              defaultPosition={{
                x: deltaPositions[0][1].x,
                y: deltaPositions[0][1].y
              }} // in the future this will not be used and it will be taken from the server
              onDrag={this.handleDrag}
              bounds="parent"
              {...dragHandlers}
              handle="strong"
            >
              <div className="box" style={{ width: "150px" }}>
                <strong id="1">Grab Here</strong>
                <div>
                  x: {deltaPositions[0][1].x.toFixed(0)}, y:{" "}
                  {deltaPositions[0][1].y.toFixed(0)}
                </div>
              </div>
            </Draggable>
            <Draggable
              defaultPosition={{
                x: deltaPositions[0][2].x,
                y: deltaPositions[0][2].y
              }} // in the future this will not be used and it will be taken from the server
              onDrag={this.handleDrag}
              bounds="parent"
              {...dragHandlers}
              handle="strong"
            >
              <div className="box" style={{ width: "150px" }}>
                <strong id="2">Grab Here</strong>
                <div>
                  x: {deltaPositions[0][2].x.toFixed(0)}, y:{" "}
                  {deltaPositions[0][2].y.toFixed(0)}
                </div>
              </div>
            </Draggable>
          </>
        )}
      </EditingDiv>
    );
  }
}
