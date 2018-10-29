import React, { Component } from "react";
import Circle from "../common/Circle";
import styled from "styled-components";

const Box = styled.div`
  position: absolute;

  user-select: none;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 150px;
`;

const IconWrapper = styled.div`
  height: 50px;
  width: 50px;

  padding: 10px;

  display: flex;

  justify-content: center;
  align-items: center;

  z-index: 2;
`;

const Icon = styled.section`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;

  border-radius: 7px;
  border: 1px solid #fff;
`;

const IconContent = styled.div`
  width: 150px;

  display: flex;
  justify-content: center;

  border: 1px solid black;
  background: white;
`;

export default class Step extends Component {
  render() {
    const { item } = this.props;
    return (
      <Box className="box">
        <Circle side="left" fill="white" strokeWidth="2" />
        <Circle side="top" fill="white" strokeWidth="2" />
        <Circle side="right" fill="white" strokeWidth="2" />
        <Circle side="bottom" fill="white" strokeWidth="2" />
        <IconWrapper>
          <Icon
            id={`${item.key}`}
            className={`icon grabbable ${item.icon}`}
            style={{
              backgroundImage: `url(${item.icon})`,
              backgroundColor: item.background
            }}
          />
        </IconWrapper>
        <IconContent>
          <div>
            {item.x} {item.y}
          </div>
        </IconContent>
      </Box>
    );
  }
}
