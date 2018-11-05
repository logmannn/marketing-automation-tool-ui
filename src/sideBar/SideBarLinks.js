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
  height: auto;

  display: flex;

  align-items: center;

  flex-direction: column;

  text-transform: capitalize;

  /* overflow-y: scroll; */
`;

const SmallLinks = styled.div`
  max-width: 100%;

  display: flex;
  justify-content: space-evenly;

  padding-top: 0.25rem;
  padding-bottom: 0.25rem;

  color: #bab9ba;

  background: #161a1f;

  & > :first-child {
    border-right: 1px solid #21242a;
  }
`;

const SmallLink = styled.a`
  padding: 0.9rem;

  cursor: pointer;

  color: #bab9ba;
  font-weight: lighter;

  &:hover {
    color: #fff;
  }
`;

const Toggle = styled.div`
  cursor: pointer;

  color: #161a1f;
  font-weight: lighter;

  position: absolute;
  top: 50%;
  left: 240px;

  &:hover {
    color: #21242a;
  }
`;

const OverflowScroll = styled.div`
  height: 100%;

  /* overflow-y: scroll; */
`;

export default class SideBarLinks extends Component {
  render() {
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
        <Toggle onClick={() => this.props.hideShow()}>
          {!this.props.isHidden ? (
            <FontAwesomeIcon icon="angle-double-left" />
          ) : (
            <FontAwesomeIcon icon="angle-double-right" />
          )}
        </Toggle>
        <OverflowScroll>
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
          </SmallLinks>
        </OverflowScroll>
      </>
    );
  }
}
