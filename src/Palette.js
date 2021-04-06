import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./palette.css";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(newLevel) {
    this.setState({ level: newLevel });
  }
  changeFormat(val) {
    this.setState({ format: val });
  }
  render() {
    const colorBoxes = this.props.palette.colors[
      this.state.level
    ].map((color) => (
      <ColorBox
        background={color[this.state.format]}
        name={color.name}
        key={color.id}
        id={color.id}
        paletteId={this.props.palette.id}
        showLink={true}
      />
    ));
    return (
      <div className="palette">
        <Navbar
          level={this.state.level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showSinglecolor
        />
        <div className="palette-colors">{colorBoxes}</div>
        <footer className="palette-footer">
          {this.props.palette.paletteName}
          <span className="emoji">{this.props.palette.emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;
