import React from 'react';
import TextField from "@mui/material/TextField";


function TextBox(props) {
  return (
        <TextField
          {...props}
          variant={props.variant ?? 'standard'}
          className={`${props.className} ${'' ? 'cursor-not-allowed' : ''}`}
        />
  );
}

export default TextBox;