import React, { Component } from "react";
import styled from "styled-components";
import DraggableCore from "react-draggable";

import Drip from "../common/drip.svg";

const EditingDiv = styled.div`
  position: absolute;

  z-index: 1;

  top: 0;
  left: 230px;
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

  /* border-radius: 7px; */

  display: flex;
  justify-content: center;
  align-items: center;

  background-size: 25px;
  background-repeat: no-repeat;
  background-position: center;
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
            key: 0,
            x: 300,
            y: 200,
            icon: Drip
          },
          {
            key: 1,
            x: 1,
            y: 1,
            icon: Drip
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
      deltaPositions: items
    });
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
        key: this.state.currentItem,
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
          className={
            "disable-css-transitions " +
            (this.props.isHidden === true && "LeftSidebarBefore") +
            " " +
            (this.props.isHidden === false && "LeftSidebarAfter")
          }
        />
        <TopSideBar />
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
                  onStart={this.handleStart}
                  onDrag={this.handleDrag}
                  onStop={this.handleStop}
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
                    style={{ width: "150px" }}
                  >
                    <IconWrapper>
                      <Icon
                        id={`${deltaPositions[0][step.key].key}`}
                        className={
                          "icon grabbable " +
                          (currentItem !==
                            `${deltaPositions[0][step.key].key}` &&
                          activeDrags === 1
                            ? "disable "
                            : "")
                        }
                        style={{
                          backgroundImage: `url(${
                            deltaPositions[0][step.key].icon
                          })`
                        }}
                      />
                    </IconWrapper>
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
