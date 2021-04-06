import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
class PaletteMetaForm extends Component {
  state = { stage: "namestage" };
  handleClickOpen = () => {
    this.setState({ stage: "form" });
  };
  handleClose = () => {
    this.setState({ stage: "name" });
  };
  showEmoji = () => {
    this.setState({ stage: "emoji" });
  };
  savePalette = (emoji) => {
    const newPalette = {
      paletteName: this.props.newPaletteName,
      emoji: emoji.native,
    };
    this.props.savePalette(newPalette);
  };
  render() {
    const { stage } = this.state;
    const { handlePaletteChange, newPaletteName } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          save
        </Button>
        <Dialog open={stage === "emoji"} onClose={this.handleClose}>
          <Picker set="apple" onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={stage === "form"}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <ValidatorForm onSubmit={this.showEmoji}>
            <DialogContent>
              <DialogContentText>enter a palette name</DialogContentText>

              <TextValidator
                onChange={handlePaletteChange}
                value={newPaletteName}
                label="palette name"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["enter a color name", "name must be unique"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                save palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
