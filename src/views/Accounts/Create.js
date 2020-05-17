import React, { /* useState, */ Component  }  from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
const useStyles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(0),
    padding: theme.spacing(2, 0),
    },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Create extends Component{
  /* constructor(props) {
    super(props);
    // Set initial state
  } */

  componentDidMount() {
    

  }

  render() { 
    const { classes } = this.props;
    //const handleToUpdate  =   this.props.handleToUpdate
    const openfrom  =   this.props.collapse
console.log(openfrom)
    return ( 
      <>
      <Collapse disabled={openfrom} in={openfrom}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                
                </Paper>
              </Grid>
            </Grid>
          </div>
          </Collapse>
        </>
    );
  }
};

Create.propTypes = {
  myFunc: "holadesdehijo"
};
export default withStyles(useStyles)(Create)

