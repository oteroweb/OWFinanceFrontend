// essential
import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
import API from './api.js';


import AlertDialog from "./SimpleDialog.js";
import Create from "./Create.js";


class App extends Component {
  onChangeHandle = (event) => {
    this.setState({ UserName: event.target.value });
  }
  getData = async event => {
    await API.get(`accounts/all`).then((res) => {
      const accounts = res.data.data;
      this.setState({ accounts });
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      accounts: [],
      formName: "",
      formInitial: 0,
      formCurrent: 0,
      formRate: 122,
      formCustomerId: 1,
      formCurrencyId: 112,
      formActive: "",
      currencies: [],
      customers: [],
    }
    this.getData();

  }
  collapseCreate(open) {
    this.setState({ open: open });
  }
  updateData(data) {
    this.setState(previousState => ({ accounts: [...previousState.accounts, data] }));
  }
  updateForm(data) {
    this.setState({formName:''});
  }
  componentDidMount() { }
  componentDidUpdate() { }
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
        },
      },
      {
        name: "rate",
        label: "Tasa",
        options: {
          filter: false,
        },
      },
      {
        label: "Saldo Actual",
        name: "current",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            let currency
            if (tableMeta.rowData[4] == 1) currency = "USD"
            if (tableMeta.rowData[4] == 2) currency = "EUR"
            if (tableMeta.rowData[4] == 112) currency = "VES"
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
          listNameFromParent={"variable padre"}
            ref={(foo) => {
              this.foo = foo;
            }}
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
          updateForm={this.updateForm.bind(this)}
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
