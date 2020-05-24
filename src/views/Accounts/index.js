// essential
import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import {Switch, TableRow,  TableCell, FormControlLabel} from "@material-ui/core";
import API from './api.js';
import AlertDialog from "./SimpleDialog.js";
import Create from "./Create.js";


class App extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      accounts: [],
      formName: "",
      formInitial: 0,
      formCurrent: 0,
      formRate: 1,
      formCustomerId: 1,
      formCurrencyId: 1,
      formActive: "",
      currencies: [],
      customers: [],
    }
    this.getData();
  }
  getData = async event => {
    await API.get(`accounts/all`).then((res) => {
      const accounts = res.data.data;
      this.setState({ accounts });
      if(accounts.length > 0){
        this.setState({ formCurrencyId:accounts[0].customer.currency_id });
        this.setState({ formCustomerId:accounts[0].customer.id });
      }
      else{
        console.log("no hay cuentas, #pendiente por hacer un redirect")
      }
    });
  };
  collapseCreate(open) {
    this.setState({ open: open });
  }
  updateData(data) {
    this.setState(previousState => ({ accounts: [...previousState.accounts, data] }));
  }

  componentDidMount() { }
  componentDidUpdate() {  }
  render() {
    const columns = [
      {
        name: "name",
        label: "Nombre de la Cuenta",
        options: {
          filter: false,
        },
      },
      {
        name: "initial",
        label: "Saldo Inicial",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            let currency
            if (tableMeta.rowData[5] === 1) currency = "USD"
            if (tableMeta.rowData[5] === 3) currency = "EUR"
            if (tableMeta.rowData[5] === 112) currency = "VES"
            const nf = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            return nf.format(value);
          },
        },
      },
      {
        name: "rate",
        label: "Tasa",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            let currency
            if (tableMeta.rowData[5] === 1) currency = "USD"
            if (tableMeta.rowData[5] === 3) currency = "EUR"
            if (tableMeta.rowData[5] === 112) currency = "VES"
            const nf = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            return nf.format(value);
          },
        },
      },
      {
        label: "Saldo Actual",
        name: "current",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            let currency
            if (tableMeta.rowData[5] === 1) currency = "USD"
            if (tableMeta.rowData[5] === 3) currency = "EUR"
            if (tableMeta.rowData[5] === 112) currency = "VES"
            const nf = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            return nf.format(value);
          },
        },
      },
      {
        name: "customer_id",
        label: "Dueño",
        options: {
          filter: true,
        },
      },
      {
        name: "currency_id",
        label: "Moneda",
        options: {
          filter: true,
        },
      },
      {
        name: "active",
        label: "Activada",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <FormControlLabel
                label={value ? "Si" : "No"}
                value={value ? "Si" : "No"}
                control={
                  <Switch
                    color="primary"
                    checked={value}
                    value={value ? "Si" : "No"}
                  />
                }
                onChange={(event) => {
                  updateValue(event.target.value === "Si" ? false : true);
                }}
              />
            );
          },
        },
      },
    ];
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      customToolbar: () => {
        return (
          <AlertDialog
            collapseCreate={this.collapseCreate.bind(this)}
            collapse={this.state.open}
            state={this.state}
          />
        );
      },
      expandableRows: true,
      renderExpandableRow: (rowData, rowMeta) => {
        return (
          <TableRow>
            <TableCell colSpan={rowData.length}>
              Custom expandable row option. Data: {JSON.stringify(rowData)}
            </TableCell>
          </TableRow>
        );
      },
    };
    return (
      <>
        <Create
          state={this.state}
          updateData={this.updateData.bind(this)}
          collapseCreate={this.collapseCreate.bind(this)}
          collapse={this.state.open}
        ></Create>
        <MUIDataTable
          title={"Accounts"}
          data={this.state.accounts}
          columns={columns}
          options={options}
        />
      </>
    );
  }
}
export default (App);
