import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

const styles = {
  root: {
    width: "300px",
    marginTop: "50px",
    marginLeft: "50px",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
    },
    "&:hover svg": {
      opacity: "1",
    },
  },
  colors: {
    backgroundColor: "grey",
    height: "120px",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    padding: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  minicolor: {
    width: "20%",
    height: "25%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px",
  },
  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0",
    padding: "10px",
    zIndex: "5",
    opacity: "0",
    "&:hover": {
      color: "black",
    },
  },
};
class MiniPalette extends React.Component {
  removePalette = (e) => {
    e.stopPropagation();
    this.props.deletePalette(this.props.id);
  };
  render() {
    const { classes, colors } = this.props;
    const miniColorBoxes = colors.map((color) => (
      <div
        key={color.name}
        className={classes.minicolor}
        style={{ background: color.color }}
      ></div>
    ));
    return (
      <div className={classes.root} onClick={this.props.handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={this.removePalette}
        />

        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {this.props.paletteName}
          <span>{this.props.emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
