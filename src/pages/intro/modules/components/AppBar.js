import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';

function AppBar(props) {
  return <MuiAppBar elevation={0} color="transparent" position="fixed" {...props} />;
}

export default AppBar;
