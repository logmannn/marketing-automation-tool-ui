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
        x: 25,
        y: 25
      }
    };
  }

  componentDidMount() {
    this.setState({
      activeDrags: 0,
      deltaPosition: {
        x: 25,
        y: 25
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
    console.log("ui.x: " + ui.x);
    console.log("ui.deltaX: " + ui.deltaX);

    this.setState({
      deltaPosition: {
        x: ui.x + ui.deltaX,
        y: ui.y + ui.deltaY
      }
    });
  };

  render() {
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
        <Draggable
          defaultPosition={{ x: deltaPosition.x, y: deltaPosition.y }} // in the future this will not be used and it will be taken from the server
          onDrag={this.handleDrag}
          bounds="parent"
          {...dragHandlers}
        >
          <div className="box" style={{ width: "150px" }}>
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
