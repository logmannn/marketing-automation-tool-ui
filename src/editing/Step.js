import React, { Component } from "react";
import styled from "styled-components";

const Box = styled.div`
  position: absolute;

  user-select: none;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 50px;
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

  display: flex;
  justify-content: center;
  align-items: center;

  background-size: 25px;
  background-repeat: no-repeat;
  background-position: center;
`;

const IconContent = styled.div`
  width: 150px;

  display: flex;
  justify-content: center;
`;

export default class Step extends Component {
  render() {
    const { item } = this.props;
    return (
      <Box className="box">
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
