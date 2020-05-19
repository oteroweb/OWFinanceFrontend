import React, { Component /*  , useState */ } from "react";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Cities from "./cities";
import AlertDialog from "./SimpleDialog.js";
import Create from "./Create.js";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
 class App extends Component {
  state = { open: true };
  /*constructor() {
    super();
   // let collapseCreate  = this.collapseCreate.bind(this)
  } */
  collapseCreate(open) {
    this.setState({ open: open });
  }
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    let collapseCreate = this.collapseCreate;
    const columns = [
      {
        name: "Nombre",
        options: {
          filter: false,
        },
      },
      {
        name: "Title",
        options: {
          filter: true,
        },
      },
      {
        name: "Location",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Cities
                value={value}
                index={tableMeta.columnIndex}
                change={(event) => updateValue(event)}
              />
            );
          },
        },
      },
      {
        name: "Saldo Inicial",
        options: {
          filter: false,
        },
      },
      {
        name: "Saldo Actual",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const nf = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            return nf.format(value);
          },
        },
      },
      {
        name: "Active",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <FormControlLabel
                label={value ? "Yes" : "No"}
                value={value ? "Yes" : "No"}
                control={
                  <Switch
                    color="primary"
                    checked={value}
                    value={value ? "Yes" : "No"}
                  />
                }
                onChange={(event) => {
                  updateValue(event.target.value === "Yes" ? false : true);
                }}
              />
            );
          },
        },
      },
    ];
    const data = [
      ["Robin Duncan", "Business Analyst", "Los Angeles", 20, 77000, false],
    ];
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      customToolbar: () => {
        return (
          <AlertDialog
            collapseCreate={collapseCreate.bind(this)}
            handler={this.handler}
            collapse={this.state.open}
            listNameFromParent={"variable padre"}
            myFunc={this.handleChildFunc}
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
          open={this.open}
          collapseCreate={collapseCreate.bind(this)}
          handler={this.handler}
          collapse={this.state.open}
        ></Create>
        <MUIDataTable
          title={"Accounts"}
          data={data}
          columns={columns}
          options={options}
        />
      </>
    );
  }
}
export default (App);
