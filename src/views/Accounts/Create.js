import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Collapse, Grid, Paper, Button, MenuItem,  } from '@material-ui/core';
import SaveIcon from "@material-ui/icons/Save";

import PrimarySearchAppBar from "./appbar.js";
import FormattedInputs from "./currencyfield.js";
import API from './api.js';

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
  handleChange = (event, value) => {
    this.setState({ [value]: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      name: this.state.formName,
      initial: this.state.formInitial,
      current: this.state.formCurrent,
      rate: this.state.formRate,
      currency_id: this.state.formCurrencyId,
      customer_id: this.state.formCustomerId,
      active: 1,
    };

    API.post(`accounts/save`, data).then((res) => {
      this.setState({
        formName: "",
        formInitial: 0,
        formCurrent: 0,
        formRate: 1,
        formCurrencyId: this.props.state.formCurrencyId,
        formCustomerId: this.props.state.formCustomerId,
        formActive: 1,
      })
      this.props.updateData(data)
      this.props.collapseCreate(false)
    }
    );
  };
  constructor(props) {
    super(props);
    this.state = this.props.state;
    this.getCurrenciesActive();
    this.getCustomersActive();
  }
  getCurrenciesActive = event => {
    API.get(`currencies/all_active`).then((res) => {
      const currencies = res.data.data;
      if(currencies.length > 0){
        this.setState({ currencies });
      this.setState({ currency: currencies[0].id });
      }
      else{
        console.log("no hay currencies, #pendiente por hacer un redirect")
      }
    });
  };
  getCustomersActive = event => {
    API.get(`customers/all`).then((res) => {
      const customers = res.data.data;
      if(customers.length > 0){
        this.setState({ customers });
        this.setState({ customer: customers[0].id });
      }
      else{
        console.log("no hay customers, #pendiente por hacer un redirect")
      }
    });
  };
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
                  <PrimarySearchAppBar collapseCreate={collapseCreate.bind(this)} />
                  <form className={classes.root} autoComplete="off"
                    onSubmit={this.handleSubmit}
                  >
                    <TextField
                      required
                      id="formName"
                      onChange={(event, value) => this.handleChange(event, "formName")}
                      className={classes.textField}
                      defaultValue={this.state.formName}
                      label="Nombre de la cuenta"
                      value={this.state.formName}
                    />
                    <FormattedInputs
                      id="formInitial"
                      onChange={(event, value) => this.handleChange(event, "formInitial")}
                      label="Saldo Inicial"
                      variant="outlined"
                      defaultValue={this.state.formInitial}
                      value={this.state.formInitial}
                    />
                    <FormattedInputs
                      id="formRate"
                      onChange={(event, value) => this.handleChange(event, "formRate")}
                      label="Tasa"
                      variant="outlined"
                      defaultValue={this.state.formRate}
                      value={this.state.formRate}
                    />
                    <TextField
                      id="formCurrencyId"
                      select
                      onChange={(event, value) => this.handleChange(event, "formCurrencyId")}
                      label="Moneda"
                      defaultValue={this.state.formCurrencyId}
                      helperText="Please select your currency"
                      variant="outlined"
                      value={this.state.formCurrencyId}
                    >
                      {this.state.currencies.map((option) => (
                        <MenuItem key={parseInt(option.id)} value={parseInt(option.id)}>{option.name}</MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="formCustomerId"
                      select
                      onChange={(event, value) => this.handleChange(event, "formCustomerId")}
                      label="Cliente"
                      defaultValue={this.state.formCustomerId}
                      helperText="Please select your Customer"
                      variant="outlined"
                      value={this.state.formCustomerId}
                    >
                      {this.state.customers.map((option) => (
                        <MenuItem key={parseInt(option.id)} value={parseInt(option.id)}>{option.name}</MenuItem>
                      ))}
                    </TextField>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
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
  //classes: PropTypes.object.isRequired
};
export default withStyles(useStyles)(Create);
