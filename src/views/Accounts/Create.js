import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import PrimarySearchAppBar from "./appbar.js";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";
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
  handleChange = event => {
    console.log(event.target.id,event.target.value)
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      name: this.state.formName,
      initial: this.state.formInitial,
      current: this.state.formCurrent,
      rate: this.state.formRate,
      customer_id: this.state.formCustomerId,
      currency_id: this.state.formCurrencyId,
      active: 1,
    };
    console.log(data);
    API.post(`accounts/save`, data).then((res) => {
      this.setState ({
        formName: "",
        formInitial: 0,
        formCurrent: 0,
        formRate: 122,
        formCustomerId: 1,
        formCurrencyId: 112,
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
      this.setState({ currencies });
      this.setState({ currency: currencies[0].id });
    });
  };
  getCustomersActive = event => {
    API.get(`customers/all`).then((res) => {
      const customers = res.data.data;
      this.setState({ customers });
      this.setState({ customer: customers[0].id });
    });
  };
  componentDidMount() { }
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
                  <form className={classes.root} noValidate autoComplete="off" 
                  onSubmit={this.handleSubmit}
                  >
                    <TextField
                      required
                      id="formName"
                      className={classes.textField}
                      onChange={this.handleChange} 
                      defaultValue={this.state.formName}
                      label="Nombre de la cuenta"
                      value={this.state.formName}
                    />
                    <TextField
                      id="formInitial"
                      onChange={this.handleChange} 
                      label="Saldo Inicial"
                      variant="outlined"
                      defaultValue={this.state.formInitial}
                      value={this.state.formInitial}
                    />
                    <TextField
                      id="formRate"
                      onChange={this.handleChange} 
                      label="Tasa"
                      variant="outlined"
                      defaultValue={this.state.formRate}
                      value={this.state.formRate}
                    />
                    <TextField
                      id="formCurrencyId"
                      select
                      onChange={this.handleChange} 
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
                      onChange={this.handleChange} 
                      label="Cliente"
                      defaultValue={this.state.formCustomerId}
                      readOnly
                      helperText="Please select your Customer"
                      variant="outlined"
                      value={this.state.formCustomerId}
                    >
                      {this.state.customers.map((option) => (
                        <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
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
