import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems="center"
      flexDirection="column"
      padding="3"
      marginRight={3}
      bgcolor="white"
      width={{ base: '100%', md: '68%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};
export default ChatBox;
