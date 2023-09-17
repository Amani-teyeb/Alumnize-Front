import React, { useEffect, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { accessChatById, fetchChats } from '../../Redux/actions';
import { getSender, getSenderId } from '../../Config/ChatLogics';
import GroupChatModal from './miscellaneous/GroupChatModal';

const MyChats = ({ fetchAgain }) => {
  const auth = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.chat.friends);
  const chatLoad = useSelector((state) => state.chat.loading);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const chats = useSelector((state) => state.chat.chats);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChats());
  }, [fetchAgain]);

  const handleClick = (chatId) => {
    dispatch(accessChatById(chatId));
  };

  return (
    <Box
      sx={{
        display: { base: selectedChat ? 'none' : 'flex', md: 'flex' },
        flexDirection: 'column',
        p: 3,
        backgroundColor: 'white',
        width: { base: '100%', md: '35%' },
        borderRadius: 'xs',
        borderWidth: '1px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          fontSize: { base: '20px', md: '25px' },
          fontFamily: 'Work sans',
          width: '100%',
          marginBottom: 2,
        }}
      >
        {auth && auth.role === 'teacher' ? (
          <GroupChatModal>
            <Button
              variant="outlined"
              display="flex"
              fontSize={{ base: '17px', md: '10px', lg: '17px' }}
              startIcon={<AddIcon />}
            >
              <Typography variant="h6"> اضافة مجموعة جديدة</Typography>
            </Button>
          </GroupChatModal>
        ) : null}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          backgroundColor: '#F8F8F8',
          width: '100%',
          height: '100%',
          overflowy: 'scroll',
        }}
      >
        <ScrollableFeed>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <Box
                backgroundColor={selectedChat._id === chat._id ? '#38B2AC' : '#E8E8E8'}
                color={selectedChat._id === chat._id ? 'white' : 'black'}
                sx={{
                  mb: 3,
                  px: 3,
                  py: 2,
                  borderRadius: 'lg',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#38B2AC',
                    color: 'white',
                  },
                }}
                key={chat._id}
                onClick={() => handleClick(chat._id)}
              >
                {!chat.isGroupChat ? getSender(auth, chat.users) : chat.chatName}
              </Box>
            ))
          ) : (
            <></>
          )}
        </ScrollableFeed>
      </Box>
    </Box>
  );
};
export default MyChats;
