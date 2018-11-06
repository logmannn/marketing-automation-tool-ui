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

import UserPlus from "../common/userPlus.svg";
import Pointer from "../common/pointer.svg";
import Open from "../common/open.svg";
import Calendar from "../common/calendar.svg";
import Mail from "../common/mail.svg";
import AddPoints from "../common/addPoints.svg";
import RemovePoints from "../common/removePoints.svg";
import Time from "../common/time.svg";
import Score from "../common/score.svg";

library.add(faUser, faQuestionCircle, faAngleDoubleLeft);

const SidebarDiv = styled.div`
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

const NavToggle = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-evenly;
`;

const NavItem = styled.div`
  width: 100%;

  text-align: center;

  padding-top: 1rem;
  padding-bottom: 1rem;

  font-size: 1.25rem;

  font-weight: bold;

  color: #bab9ba;

  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

const LinksDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  background: #1f2026;
`;

const AddItemsWrapper = styled.div`
  background: #1f2026;
`;

const ItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;

  color: #9e9ea0;

  text-align: center;

  padding-bottom: 1rem;
  padding-top: 1rem;
`;

const Item = styled.div`
  flex: 0 50%;

  margin-bottom: 1rem;

  display: flex;

  justify-content: center;
  align-items: center;

  flex-direction: column;

  color: white;
`;

const ItemIcon = styled.div`
  width: 50px;
  height: 50px;

  border-radius: 7px;
  border: 2px solid #1f2026;

  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
`;

export default class SideBarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNav: "Edit"
    };
  }

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

    const Conditions = [
      {
        id: 1,
        text: "Joined List",
        icon: UserPlus
      },
      {
        id: 2,
        text: "Link Clicked",
        icon: Pointer
      },
      {
        id: 3,
        text: "Email Opened",
        icon: Open
      },
      {
        id: 4,
        text: "Send Date",
        icon: Calendar
      }
    ];

    const Actions = [
      {
        id: 1,
        text: "Email",
        icon: Mail
      },
      {
        id: 2,
        text: "+Score",
        icon: AddPoints
      },
      {
        id: 3,
        text: "-Score",
        icon: RemovePoints
      }
    ];

    const Controls = [
      {
        id: 1,
        text: "Time Delay",
        icon: Time
      },
      {
        id: 2,
        text: "If Score",
        icon: Score
      }
    ];

    const { currentNav } = this.state;

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
            <NavToggle>
              <NavItem
                onClick={() => this.setState({ currentNav: "Home" })}
                style={{ background: currentNav === "Home" ? "#1f2026" : "" }}
              >
                Home
              </NavItem>
              <NavItem
                onClick={() => this.setState({ currentNav: "Edit" })}
                style={{ background: currentNav === "Edit" ? "#1f2026" : "" }}
              >
                Edit
              </NavItem>
            </NavToggle>
            {currentNav === "Home" ? (
              <LinksDiv>
                {Links.map(link => (
                  <Link
                    key={link.id}
                    text={link.text}
                    icon={link.icon}
                    current={link.current}
                  />
                ))}
              </LinksDiv>
            ) : (
              <AddItemsWrapper>
                <ItemHeader>Conditions</ItemHeader>
                <ItemBox>
                  {Conditions.map(condition => (
                    <Item key={condition.id}>
                      <ItemIcon
                        style={{
                          backgroundImage: `url(${condition.icon})`,
                          backgroundColor: "#F5541C"
                        }}
                      />
                      {condition.text}
                    </Item>
                  ))}
                </ItemBox>
                <ItemHeader>Actions</ItemHeader>
                <ItemBox>
                  {Actions.map(action => (
                    <Item key={action.id}>
                      <ItemIcon
                        style={{
                          backgroundImage: `url(${action.icon})`,
                          backgroundColor: "#AAD20E"
                        }}
                      />
                      {action.text}
                    </Item>
                  ))}
                </ItemBox>
                <ItemHeader>Controls</ItemHeader>
                <ItemBox>
                  {Controls.map(control => (
                    <Item key={control.id}>
                      <ItemIcon
                        style={{
                          backgroundImage: `url(${control.icon})`,
                          backgroundColor: "#AAD20E"
                        }}
                      />
                      {control.text}
                    </Item>
                  ))}
                </ItemBox>
              </AddItemsWrapper>
            )}
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
