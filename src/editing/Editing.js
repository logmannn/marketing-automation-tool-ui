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
      deltaPosition: {
        x: 0,
        y: 0
      },
      controlledPosition: {
        x: -400,
        y: 200
      }
    };
  }

  componentDidMount() {
    this.setState({
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0
      },
      controlledPosition: {
        x: -400,
        y: 200
      }
    });
  }

  onStart = () => {
    this.setState({ activeDrags: this.state.activeDrags + 1 });
  };

  onStop = () => {
    this.setState({ activeDrags: this.state.activeDrags - 1 });
  };

  handleDrag = (e, ui) => {
    // console.log(e);
    // console.log(ui.deltaX);
    // console.log(ui.deltaY);
    console.log(this.state);
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  };

  render() {
    console.log(this.state);
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition } = this.state;
    return (
      <EditingDiv
        className={
          "disable-css-transitions " +
          (this.props.isHidden === true && "editingFull") +
          " " +
          (this.props.isHidden === false && "editingSmall")
        }
      >
        {/* <Draggable
          // axis="xy"
          // grid={[25, 25]}
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          // onStart={this.handleStart}
          onDrag={this.handleDrag}
          // onStop={this.handleStop}
        >
          <div>
            <div className="handle">Drag from here</div>
            <div>This readme is really dragging on...</div>
            <div>I track my deltas</div>
            <div>
              x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}
            </div>
          </div>
        </Draggable> */}
        <Draggable onDrag={this.handleDrag} {...dragHandlers}>
          <div className="box">
            <div>I track my deltas</div>
            <div>
              x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}
            </div>
          </div>
        </Draggable>
      </EditingDiv>
    );
  }
}
