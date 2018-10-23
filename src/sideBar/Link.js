import React, { Component } from "react";
import styled from "styled-components";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

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

  & > :first-child {
    margin-right: 0.75rem;
  }

  &:hover {
    color: #ffffff;
  }
`;

export default class Link extends Component {
  render() {
    library.add(fas);

    return (
      <LinkDiv>
        <FontAwesomeIcon icon={this.props.icon} />
        {this.props.text}
      </LinkDiv>
    );
  }
}
