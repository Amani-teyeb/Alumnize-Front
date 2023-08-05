import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { Alert, Box, Button, FormControl, Input, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, createGroup } from '../../../Redux/actions';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {
  const chats = useSelector((state) => state.chat.chats);
  const auth = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.chat.friends);
  const dispatch = useDispatch();

  const [opend, setOpend] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const handleOpenDialog = () => {
    setOpend(true);
  };
  const handleCloseDialog = () => {
    setOpend(false);
  };
  const handleSearch = () => {
    setSearch();
    dispatch(getFriends(search));
  };
  const handleSubmit = () => {
    dispatch(createGroup({ groupChatName, selectedUsers }));
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      Alert('friend exist');
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id === !delUser._id));
  };
  return (
    <>
      <span role="button" tabIndex={0} onClick={handleOpenDialog} onKeyDown={handleOpenDialog}>
        {children}
      </span>
      <Dialog
        fullWidth="true"
        open={opend}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {'Create Group Chat...'}
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pb: 2,
            }}
          >
            <Box marginBottom={3}>
              <TextField
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
                id="outlined-basic"
                label="Add Friend"
                variant="outlined"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {/* <Button onClick={handleSearch}>Search</Button> */}
            </Box>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
              ))}
            </Box>
            {friends &&
              friends
                .slice(0, 4)
                .map((user) => <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />)}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleSubmit}>
            Create
          </Button>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupChatModal;
