import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import "./colorBox.css";
import chroma from "chroma-js";
export class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }
  render() {
    const { name, background, paletteId, id, showLink } = this.props;
    const isDarkColor = chroma(background).luminance() <= 0.1;
    const isLight = chroma(background).luminance() > 0.3;
    return (
      <CopyToClipboard onCopy={this.changeCopyState} text={background}>
        <div style={{ background: background }} className="colorBox">
          <div
            className={`copy-overlay ${this.state.copied && "show"}`}
            style={{ background: background }}
          />
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor ? "light-text" : ""}>{name}</span>
            </div>
            <button className="copy-button">copy</button>
          </div>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={`see-more ${isLight ? "dark-text" : ""}`}>
                more
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
