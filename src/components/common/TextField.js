//import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
//import DisablingTooltip from '@app/components/utils/DisablingTooltip';
import TextField from "@mui/material/TextField";


function TextBox(props) {
  return (
        <TextField
          {...props}
        //  disabled={isDisabled}
          variant={props.variant ?? 'standard'}
          className={`${props.className} ${'' ? 'cursor-not-allowed' : ''}`}
        />
  );
}

export default TextBox;