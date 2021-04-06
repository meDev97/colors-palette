import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: " 0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    "&:hover svg": {
      color: "white",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    bottom: "0",
    left: "0px",
    padding: "10px",
    color: "black",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: ".4s",
  },
};
function DraggableColorBox(props) {
  const { classes, name, color, handleDelete } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={handleDelete}
        ></DeleteIcon>
      </div>
    </div>
  );
}

export default withStyles(styles)(SortableElement(DraggableColorBox));
