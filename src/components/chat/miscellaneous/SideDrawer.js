import { Box, Button, Input, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { getFriends, accessChat } from '../../../Redux/actions';
import { ChatLoading } from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {
  const auth = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.chat.friends);
  const chatLoad = useSelector((state) => state.chat.loading);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const chats = useSelector((state) => state.chat.chats);

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [opend, setOpend] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const handleOpenDialog = () => {
    setOpend(true);
  };
  const handleCloseDialog = () => {
    setOpend(false);
  };
  const handleSearch = () => {
    dispatch(getFriends(search));
  };

  const handleChat = (userId) => {
    dispatch(accessChat(userId));
    console.log(userId);
  };
  return (
    <Box>
      <Tooltip title="Search Users to Chat" placement="left-end">
        <Button variant="contained" startIcon={<SearchIcon />} onClick={handleOpenDialog}>
          Search Friend
        </Button>
      </Tooltip>
      <Dialog
        fullWidth={fullWidth}
        open={opend}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Choose friend to talk with...'}</DialogTitle>
        <Divider />
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              m: 'auto',
              pb: 2,
            }}
          >
            <Input
              placeholder="Search by name or email"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mr: '2',
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          {chatLoad ? (
            <ChatLoading />
          ) : (
            friends?.map((user) => (
              <UserListItem key={user._id} user={user} handleFunction={() => handleChat(user._id)} />
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default SideDrawer;
