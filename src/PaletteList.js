import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

const styles = {
  root: {
    backgroundColor: "blue",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    maxWidth: "1100px",
    width: "95%",
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
};
class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes, removePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>react colors</h1>
            <Link to="/palette/new">create palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map((pal) => (
              <MiniPalette
                {...pal}
                handleClick={() => this.goToPalette(pal.id)}
                deletePalette={removePalette}
                key={pal.id}
                id={pal.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
