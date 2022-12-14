import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center" p={3}>
        <Box width="100%" mr={3}>
          <LinearProgress variant="determinate" {...props} color="success" />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  export default LinearProgressWithLabel;