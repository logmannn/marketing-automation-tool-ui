import React, { Component } from "react";
import styled from "styled-components";

const LinkDiv = styled.a`
  color: #bab9ba;

  width: calc(100% - 2rem);

  padding-bottom: 1rem;
  padding-top: 1rem;

  text-align: left;

  padding-left: 1rem;
  padding-right: 1rem;

  font-weight: bold;

  font-size: 1.25rem;

  cursor: pointer;

  display: flex;
  align-items: center;

  & > :first-child {
    margin-right: 0.75rem;
  }

  &:hover {
    color: #ffffff;
  }
`;

const Logo = styled.div`
  width: 25px;
  height: 25px;

  background-position: center center;
  background-repeat: no-repeat;
`;

export default class Link extends Component {
  render() {
    return (
      <LinkDiv className={this.props.current ? "current" : ""}>
        {this.props.current ? (
          <Logo style={{ backgroundImage: `url(${this.props.icon2})` }} />
        ) : (
          <Logo style={{ backgroundImage: `url(${this.props.icon})` }} />
        )}
        {this.props.text}
      </LinkDiv>
    );
  }
}
