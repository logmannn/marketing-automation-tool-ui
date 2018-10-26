import React, { Component } from "react";

export default class CursorFollow extends Component {
  render() {
    return (
      <div
        style={{ transform: `translate(${this.props.x}px, ${this.props.y}px)` }}
      >
        {this.props.x} {this.props.y}
      </div>
    );
  }
}
