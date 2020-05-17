import React from 'react';
import EnhancedTable from './Show.js';
import Create from './Create.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Create() {
  const classes = useStyles();
  return(  
'hola'
    );
}
