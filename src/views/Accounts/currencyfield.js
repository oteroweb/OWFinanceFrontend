import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      flexGrow: 1,
      margin: theme.spacing(0),
      padding: theme.spacing(3, 0),
    },
  },
}));
function NumberFormatCustom(props) {
  const { id, label, inputRef, onChange, ...other } = props;
  const [values, setValues] = React.useState({numberformat: '',   });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <NumberFormat
      id={id}
      {...other}
      getInputRef={inputRef}
      onChange={handleChange}
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
  const { id, label,onChange } = props;
  const [values, setValues] = React.useState({numberformat: '',   });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
      <TextField
        label={label}
        id={id}
        onChange={handleChange}
        value={values.numberformat}
        name="numberformat"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
  );
}
