import React, { Component } from "react";
import styled from "styled-components";

const AddItemsWrapper = styled.div`
  position: fixed;

  right: 0;

  width: 230px;

  /* border: 1px solid black; */

  /* background: #161a1f; */
`;

const ItemBox = styled.div``;

const ItemHeader = styled.div`
  font-size: 1.25rem;
  font-weight: bold;

  color: #9e9ea0;

  text-align: center;

  padding-bottom: 1rem;
  padding-top: 1rem;
`;

export default class AddItems extends Component {
  render() {
    return (
      <AddItemsWrapper>
        <ItemBox>
          <ItemHeader>Trigger</ItemHeader>
          <ItemHeader>Action</ItemHeader>
          <ItemHeader>Control</ItemHeader>
        </ItemBox>
      </AddItemsWrapper>
    );
  }
}
