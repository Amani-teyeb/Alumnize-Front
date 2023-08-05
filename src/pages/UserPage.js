import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
// components
import SideDrawer from '../components/chat/miscellaneous/SideDrawer';
import MyChats from '../components/chat/MyChats';
import ChatBox from '../components/chat/ChatBox';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

export default function UserPage() {
  const auth = useSelector((state) => state.auth.user);
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Friends
          </Typography>
          {auth && <SideDrawer />}
        </Stack>
        <div style={{ width: '100 %' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100 %',
              height: '94vh',
              p: '10px',
              backgroundColor: '#f0f8ff',
            }}
          >
            {auth && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            {auth && <MyChats fetchAgain={fetchAgain} />}
          </Box>
        </div>
      </Container>
    </>
  );
}
