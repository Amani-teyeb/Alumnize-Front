import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { Alert, Box, Button, FormControl, IconButton, Input, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Badge } from '@mui/icons-material';
import Iconify from '../../iconify';
import { addUserToGroup, getFriends, removeUserFromGroup, updateGroupName } from '../../../Redux/actions';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const chats = useSelector((state) => state.chat.chats);
  const auth = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.chat.friends);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
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
  const handleUpdate = () => {
    const selectchatId = selectedChat._id;
    dispatch(updateGroupName({ groupChatName, selectchatId }));
    setFetchAgain(!fetchAgain);
  };

  const handleAddUser = (user) => {
    const selectchatId = selectedChat._id;
    const userId = user._id;

    if (selectedChat.users.find((u) => u._id === user._id)) {
      Alert('user already exist');
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      Alert('Only admins can add someone!');
    }
    dispatch(addUserToGroup({ userId, selectchatId }));
  };
  const handleRemoveUser = (userId) => {
    const selectchatId = selectedChat._id;
    dispatch(removeUserFromGroup({ userId, selectchatId }));
  };

  //   const handleAddUser = (userId) => {
  //     setSelectedUsers(selectedUsers.filter((sel) => sel._id === !delUser._id));
  //   };
  //   const handleRemoveUser = (userId) => {
  //     setSelectedUsers(selectedUsers.filter((sel) => sel._id === !delUser._id));
  //   };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      Alert('friend exist');
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  return (
    <>
      <IconButton color="inherit" sx={{ width: '50px' }} onClick={handleOpenDialog}>
        <Iconify sx={{ width: '100%', height: '100%' }} icon="eva:eye-fill" />
      </IconButton>
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
          {selectedChat.chatName}
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flexWrap: 'wrap',
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
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={(u) => {
                    handleRemoveUser(u._id);
                  }}
                />
              ))}
            </Box>

            <Box
              marginBottom={3}
              marginTop={3}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <TextField
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '280px',
                }}
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button variant="contained" onClick={handleUpdate} color="primary">
                Update
              </Button>
            </Box>
            <Box marginBottom={2}>
              <TextField
                id="outlined-controlled"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
                label="Add Friend"
                variant="outlined"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Box>

            {friends &&
              friends
                .slice(0, 4)
                .map((user) => <UserListItem key={user._id} user={user} handleFunction={() => handleAddUser(user)} />)}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined">Update</Button>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateGroupChatModal;
