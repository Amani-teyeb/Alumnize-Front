import React, { useEffect, useState } from 'react';
import { Box, FormControl, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import io from 'socket.io-client';
import { getSender } from '../../Config/ChatLogics';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { getMessages, sendNewMessage, receivedMessage } from '../../Redux/actions';
import './SingleChat.css';
import ScrollableChat from './ScrollableChat';

const ENDPOINT = 'http://localhost:5000';
let socket;
let selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const auth = useSelector((state) => state.auth.user);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const chats = useSelector((state) => state.chat.chats);
  const myMessage = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);

  console.log(chats)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', chats);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('message received', (newMessageReceived) => {
      dispatch(receivedMessage(newMessageReceived));
    });
  }, [chats, dispatch]);

  
  const sendMessage = async (event) => {
    const chatId = selectedChat._id;
    if (event.key === 'Enter' && newMessage) {
      setNewMessage('');
      dispatch(sendNewMessage({ chatId, newMessage })).then(newMsg => {
        socket.emit('new message', newMsg);
      });
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            fontSize={{ base: '28px', md: '30px' }}
            paddingBottom={3}
            paddingX={2}
            width="100%"
            fontFamily="Work Sans"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {!selectedChat.isGroupChat ? (
              <>{/* {getSender(auth, selectedChat.users)} */}</>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
              </>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 3,
              backgroundColor: '#E8E8E8',
              width: '90%',
              height: '100%',
              overflowy: 'hidden',
            }}
          >
            <div className="messages">
              <ScrollableChat myMessage={myMessage} />
            </div>
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Enter a message"
                sx={{ backgroundColor: '#E0E0E0' }}
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box alignItems="center" justifyContent="center" h="100%">
          <h1>Click on a user to start chatting</h1>
        </Box>
      )}
    </>
  );
};

export default SingleChat;