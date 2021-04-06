import React, { Component } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";

class PaletteFormNav extends Component {
  render() {
    const {
      classes,
      open,
      handleDrawerOpen,
      savePalette,
      handlePaletteChange,
      newPaletteName,
    } = this.props;
    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              create palette
            </Typography>

            <div className={classes.navBtns}>
              <PaletteMetaForm
                savePalette={savePalette}
                handlePaletteChange={handlePaletteChange}
                newPaletteName={newPaletteName}
              />
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary">
                  go back
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default PaletteFormNav;
