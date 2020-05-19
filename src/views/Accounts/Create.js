import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import PrimarySearchAppBar from "./appbar.js";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    flexGrow: 1,
    margin: theme.spacing(0),
    padding: theme.spacing(3, 0),
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 1,
      currencies: [],
      customers: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8001/api/1.0/currencies/all_active`)
      .then((res) => {
        const currencies = res.data.data;
        this.setState({ currencies });
      });
    axios.get(`http://localhost:8001/api/1.0/customers/all`).then((res) => {
      const customers = res.data.data;
      this.setState({ customers });
    });
  }
  handleChange(event) {
    this.setState({ currency: event.target.value });
  }
  render() {
    const { classes, collapseCreate } = this.props;
    const openfrom = this.props.collapse;
    return (
      <>
        <Collapse disabled={openfrom} in={openfrom}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={3} className={classes.paper}>
                  <PrimarySearchAppBar collapseCreate = {collapseCreate.bind(this)}/>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="standard-basic"
                      label="Nombre de la cuenta"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Saldo Inicial"
                      variant="outlined"
                      value={0}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Tasa"
                      variant="outlined"
                      value={1}
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Moneda"
                      value={this.state.currency}
                      onChange={this.handleChange}
                      helperText="Please select your currency"
                      variant="outlined"
                    >
                      {this.state.currencies.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {" "}
                          {option.name}{" "}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Cliente"
                      value={1}
                      readonly
                      helperText="Please select your Customer"
                      variant="outlined"
                    >
                      {this.state.customers.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {" "}
                          {option.name} {option.lastname}{" "}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                    >
                      Guardar
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Collapse>
      </>
    );
  }
}

Create.propTypes = {
  myFunc: "holadesdehijo",
};
export default withStyles(useStyles)(Create);
