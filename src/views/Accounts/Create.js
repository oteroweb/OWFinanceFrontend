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
  constructor(props) {
    super(props);
    console.log(this.state);
    this.state = {
      currency: 1,
      currencies: [],
      customers: [],
      customer: '',
    };
    console.log(this.state);

    this.handleChange = this.handleChange.bind(this);
  }
  state = this.getInitState()

  getInitState() {
    const { form } = this.props
    return form ? form : {
      name: '',
      initial: '',
      rate: '',
      currency_id: '',
      customer_id: '',
    }
  }
  getCurrenciesActive = async event => {
    await API.get(`currencies/all_active`).then((res) => {
      const currencies = res.data.data;
      this.setState({ currencies });
      this.setState({ currency: currencies[0].id });
    });
  };
  getCustomersActive = async event => {
    await API.get(`customers/all`).then((res) => {
      const customers = res.data.data;
      this.setState({ customers });
      this.setState({ customer: customers[0].id });
    });
  };
  componentDidMount() {
    this.getCurrenciesActive();
    this.getCustomersActive();
    axios.get(`http://localhost:8001/api/1.0/customers/all`).then((res) => {

    });
  }
  handleChange = name => ({ target: { value } }) => {
    this.setState({
      form: {
        [name]: value
      }
    })
  }
  handleSubmit = () => {
    // TODO: validate
    this.props.onSubmit({
      //id: this.state.title.toLocaleLowerCase().replace(/ /g,'-'),
      ...this.state

    })

    this.setState(this.getInitState())
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
                  <PrimarySearchAppBar collapseCreate={collapseCreate.bind(this)} />
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="standard-basic"
                      onChange={this.handleChange('name')}
                      label="Nombre de la cuenta"
                    />
                    <TextField
                      id="outlined-basic-initial"
                      onChange={this.handleChange('initial')}
                      label="Saldo Inicial"
                      variant="outlined"
                      defaultValue={0}
                    />
                    <TextField
                      id="outlined-basic-rate"
                      onChange={this.handleChange('rate')}
                      label="Tasa"
                      variant="outlined"
                      defaultValue={1}
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      onChange={this.handleChange('currency')}
                      label="Moneda"
                      defaultValue={parseInt(this.state.currency)}
                      helperText="Please select your currency"
                      variant="outlined"
                    >
                      {this.state.currencies.map((option) => (
                        <MenuItem key={parseInt(option.id)} value={parseInt(option.id)}>{option.name}</MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-customer"
                      select
                      onChange={this.handleChange('customer')}
                      label="Cliente"
                      defaultValue={1}
                      readOnly
                      helperText="Please select your Customer"
                      variant="outlined"
                    >
                      {this.state.customers.map((option) => (
                        <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                      ))}
                    </TextField>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={this.handleSubmit}
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
};
export default withStyles(useStyles)(Create);
