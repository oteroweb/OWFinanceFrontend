import React, { /* useState ,*/ Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
const useStyles = theme => ({
  root: {
    width: "100%",
    "& > * + *": { marginTop: theme.spacing(2), },
  },
});
class AlertDialog extends Component {
  myFunc(state) {
    return state;
  }
  //constructor(props) {
  //  super(props);
  //}
  componentDidMount() {
  }
  render() {
    const { classes } = this.props;
    return (
      <Tooltip title={"Crear Cuenta"}>
          <IconButton className={classes.iconButton} onClick={() => this.props.collapseCreate(true)} >
            <AddIcon className={classes.deleteIcon}   /> 
          </IconButton>
        </Tooltip> )
  }
}
AlertDialog.propTypes = {
  //myFunc: "holadesdehijo"
};
export default withStyles(useStyles)(AlertDialog)