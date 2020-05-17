import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AlertDialog from "./SimpleDialog.js";

const defaultToolbarStyles = {
  iconButton: {}
};

class CustomToolbar extends React.Component {
  render() {

    return (
      <React.Fragment>
        <AlertDialog></AlertDialog>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
