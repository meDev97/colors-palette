import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class ColorPickerForm extends Component {
  render() {
    const {
      background,
      handleChangeComplete,
      handleAddColors,
      handleChange,
      newName,
    } = this.props;
    return (
      <div>
        <ChromePicker
          color={background}
          onChangeComplete={handleChangeComplete}
        />
        <ValidatorForm onSubmit={handleAddColors}>
          <TextValidator
            onChange={handleChange}
            value={newName}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "enter a color name",
              "color name must be unique",
              "color is already used",
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ background: background }}
            type="submit"
          >
            add color
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ColorPickerForm;
