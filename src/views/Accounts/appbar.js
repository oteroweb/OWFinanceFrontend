import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});

class PrimarySearchAppBar extends Component {
  constructor(props) {
    super(props);
    this.collapseCreate = this.collapseCreate.bind(this);
  }
  collapseCreate=(open)=>{this.setState(open);};
  render() {
    const { classes, collapseCreate } = this.props;
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Crear Cuenta
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="close"
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  collapseCreate(false);
                }}
              >
                <CloseIcon fontSize="inherit"  />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(useStyles)(PrimarySearchAppBar);
