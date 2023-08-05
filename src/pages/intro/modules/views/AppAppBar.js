import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AdbIcon from '@mui/icons-material/Adb';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Toolbar from '../components/Toolbar';
import AppBar from '../components/AppBar';
import logo from './logo.jpg';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed" sx={{ mt: '20px' }}>
        <Toolbar sx={{ justifyContent: 'space-arround' }}>
          <Box sx={{ height: '120px', width: '120px', mt: '40px' }}>
            <img alt="Remy Sharp" src={logo} />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
