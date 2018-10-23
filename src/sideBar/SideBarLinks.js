import React, { Component } from "react";
import { Logo } from "../common/Logo";
import Link from "./Link";
import styled from "styled-components";

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

export default class SideBarLinks extends Component {
  render() {
    const Links = [
      {
        id: 1,
        text: "dashboard",
        icon: "home",
        current: true
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
        text: "reports",
        icon: "chart-bar",
        current: false
      },
      {
        id: 5,
        text: "my account",
        icon: "cog",
        current: false
      }
    ];

    return (
      <SidebarDiv>
        <Logo />
        {Links.map(link => (
          <Link key={link.id} text={link.text} icon={link.icon} />
        ))}
      </SidebarDiv>
    );
  }
}
