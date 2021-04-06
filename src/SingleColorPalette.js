import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./colorBox.css";
import { Link } from "react-router-dom";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }
  changeFormat(val) {
    this.setState({ format: val });
  }
  render() {
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[this.state.format]}
        showLink={false}
      />
    ));
    return (
      <div className="SingleColorP palette">
        <Navbar handleChange={this.changeFormat} showSinglecolor={false} />
        <div className="palette-colors">
          {colorBoxes}
          <div className="palette-goBack colorBox">
            <Link
              to={`/palette/${this.props.palette.id}`}
              className="copy-button"
            >
              go back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleColorPalette;
