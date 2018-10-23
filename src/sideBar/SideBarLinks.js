import React, { Component } from "react";
import { Logo } from "../common/Logo";
import Link from "./Link";
import styled from "styled-components";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faQuestionCircle,
  faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faQuestionCircle, faAngleDoubleLeft);

const SidebarDiv = styled.div`
  background: #21242a;

  position: relative;
  top: 0;
  left: 0;

  max-width: 100%;

  display: flex;

  align-items: center;

  flex-direction: column;

  text-transform: capitalize;

  padding-bottom: 1rem;
`;

const SmallLinks = styled.div`
  max-width: 100%;

  display: flex;

  margin-top: 0.25rem;
`;

const SmallLink = styled.a`
  padding: 0.9rem;

  cursor: pointer;

  color: #bab9ba;
  font-weight: lighter;

  border-right: 1px solid #21242a;

  &:hover {
    color: #fff;
  }
`;

export default class SideBarLinks extends Component {
  render() {
    console.log(this.props);

    const Links = [
      {
        id: 1,
        text: "dashboard",
        icon: "home",
        current: false
      },
      {
        id: 2,
        text: "lists",
        icon: "users",
        current: false
      },
      {
        id: 3,
        text: "emails",
        icon: "envelope",
        current: false
      },
      {
        id: 4,
        text: "Automation",
        icon: "sitemap",
        current: true
      },
      {
        id: 5,
        text: "reports",
        icon: "chart-bar",
        current: false
      },
      {
        id: 6,
        text: "my account",
        icon: "cog",
        current: false
      }
    ];

    return (
      <>
        <SidebarDiv>
          <Logo />
          {Links.map(link => (
            <Link
              key={link.id}
              text={link.text}
              icon={link.icon}
              current={link.current}
            />
          ))}
        </SidebarDiv>
        <SmallLinks>
          <SmallLink>
            <FontAwesomeIcon icon="user" /> Profile
          </SmallLink>
          <SmallLink>
            <FontAwesomeIcon icon="question-circle" /> Help
          </SmallLink>
          <SmallLink onClick={this.props.hideShow}>
            {!this.props.isHidden ? (
              <FontAwesomeIcon icon="angle-double-left" />
            ) : (
              <FontAwesomeIcon icon="angle-double-right" />
            )}
          </SmallLink>
        </SmallLinks>
      </>
    );
  }
}
