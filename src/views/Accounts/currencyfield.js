import React, { Component} from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
}));
function NumberFormatCustom(props) {
  const { id, label, handleChange, inputRef, onChange, ...other } = props;
  const [values, setValues] = React.useState({numberformat: '',   });
  // const handleChange = (event) => {
  //   console.log("h2ola")
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };
  return (
    <NumberFormat
      id={id}
      {...other}
      getInputRef={inputRef}
      onChange={props.handleChange}
      onValueChange={(values) => { onChange({ target: { name: props.name, value: values.value, },        }); }}
      thousandSeparator="." decimalSeparator="," isNumericString  decimalScale={2} prefix=""
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default function FormattedInputs(props) {
  const { id, label,onChange,value } = props;
  //const [values, setValues] = React.useState({numberformat: '',   });
  // const handleChange = (event) => {
  //   console.log("hola")
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };
  return (
      <TextField
        label={label}
        id={id}
        value={value}
        onChange={(event, value) => onChange(event, value)}
        // onChange={onChange}
        name="numberformat"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
  );
}
