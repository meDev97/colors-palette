import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button } from "@material-ui/core";
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBtns: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [background, setBackground] = React.useState("#0092FF");
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const [newName, setNewName] = React.useState("");
  const [newPaletteName, setnewPaletteName] = React.useState("");
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== background)
    );
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [colors, background]);
  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  const handlePaletteChange = (e) => {
    setnewPaletteName(e.target.value);
  };
  const handleAddColors = () => {
    const newColor = {
      color: background,
      name: newName,
    };
    setColors([...colors, newColor]);
    setNewName("");
  };
  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const savePalette = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push("/");
  };
  const deleteColor = (colorName) => {
    setColors([...colors.filter((color) => color.name !== colorName)]);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors([...arrayMove(colors, oldIndex, newIndex)]);
  };
  const clearColors = () => {
    setColors([]);
  };
  const addRandomColor = () => {
    const allcolors = props.palettes.map((p) => p.colors).flat();
    let rand = Math.floor(Math.random() * allcolors.length);
    const randomColor = allcolors[rand];
    setColors([...colors, randomColor]);
  };
  return (
    <div className={classes.root}>
      <PaletteFormNav
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        savePalette={savePalette}
        handlePaletteChange={handlePaletteChange}
        newPaletteName={newPaletteName}
      />

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Typography variant="h4">design your palette</Typography>
        <div>
          {" "}
          <Button variant="contained" color="secondary" onClick={clearColors}>
            clear palette
          </Button>
          <Button variant="contained" color="primary" onClick={addRandomColor}>
            random color
          </Button>
        </div>
        <ColorPickerForm
          background={background}
          handleChangeComplete={handleChangeComplete}
          handleChange={handleChange}
          handleAddColors={handleAddColors}
          newName={newName}
        />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}
