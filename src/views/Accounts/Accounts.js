import React, {  Component /*  , useState */ } from "react";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Cities from "./cities";
// import CustomToolbar from "./CustomToolbar";
import AlertDialog from "./SimpleDialog.js";
 import Create from "./Create.js";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


export default class App extends Component {
  state = { open: true }

  /*constructor() {
    super();
   // let handleToUpdate  = this.handleToUpdate.bind(this)
     //this.open = false

  } */
  handleToUpdate(someArg){
    this.setState({open:someArg});
}
  handler() {
   /* this.setState({
      someVar: true
    }) */
  }

  componentDidMount() {
  }
 
  componentDidUpdate() {
    
   }
  render() {
    let handleToUpdate  =   this.handleToUpdate;

    const columns = [
      {
        name: "Name",
        options: {
          filter: false
        }
      },
      {
        name: "Title",
        options: {
          filter: true
        }
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
                change={event => updateValue(event)}
              />
            );
          }
        }
      },
      {
        name: "Age",
        options: {
          filter: false
        }
      },
      {
        name: "Salary",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const nf = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            return nf.format(value);
          }
        }
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
                onChange={event => {
                  updateValue(event.target.value === "Yes" ? false : true);
                }}
              />
            );
          }
        }
      }
    ];

    const data = [
      ["Robin Duncan", "Business Analyst", "Los Angeles", 20, 77000, false],
      ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, 135000, true],
      ["Harper White", "Attorney", "Pittsburgh", 52, 420000, false],
      ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, 150000, true],
      ["Frankie Long", "Industrial Analyst", "Austin", 31, 170000, false],
      ["Brynn Robbins", "Business Analyst", "Norfolk", 22, 90000, true],
      ["Justice Mann", "Business Consultant", "Chicago", 24, 133000, false],
      [ "Addison Navarro", "Business Management Analyst", "New York", 50, 295000, true ],
      ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, 200000, false],
      ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, 400000, true],
      ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, 110000, false],
      ["Danny Leon", "Computer Scientist", "Newark", 60, 220000, true],
      ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, 180000, false],
      ["Jesse Hall", "Business Analyst", "Baltimore", 44, 99000, true],
      ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, 90000, false],
      ["Terry Macdonald", "Commercial Specialist", "Miami", 39, 140000, true],
      ["Justice Mccarthy", "Attorney", "Tucson", 26, 330000, false],
      ["Silver Carey", "Computer Scientist", "Memphis", 47, 250000, true],
      ["Franky Miles", "Industrial Analyst", "Buffalo", 49, 190000, false],
      ["Glen Nixon", "Corporate Counselor", "Arlington", 44, 80000, true],
      [
        "Gabby Strickland",
        "Business Process Consultant",
        "Scottsdale",
        26,
        45000,
        false
      ],
      ["Mason Ray", "Computer Scientist", "San Francisco", 39, 142000, true]
    ];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      customToolbar: () => {
        return  <AlertDialog  handleToUpdate = {handleToUpdate.bind(this)}  handler = {this.handler}  collapse={this.state.open}   listNameFromParent={"variable padre"}  myFunc={this.handleChildFunc}   ref={(foo) => { this.foo = foo; }} />;
      },
      expandableRows: true, // Try Adding This
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
    console.log(this.open)
    return (
      <>
      <Create open = {this.open} handleToUpdate = {handleToUpdate.bind(this)}  handler = {this.handler}  collapse={this.state.open}></Create>
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

// export default function ContainedButtons() {
//   return(  
//     <App />
//   );
// }
