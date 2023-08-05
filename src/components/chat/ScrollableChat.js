import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import ScrollableFeed from 'react-scrollable-feed';
import Tooltip from '../../theme/overrides/Tooltip';
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from '../../Config/ChatLogics';

const ScrollableChat = ({ myMessage }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <ScrollableFeed>
      {myMessage &&
        myMessage.map((m, i) => (
          <div style={{ display: 'flex' }} key={m._id}>
            {(isSameSender(myMessage, m, i, user._id) || isLastMessage(myMessage, i, user._id)) && (
              <Avatar mt="7px" mr={1} size="sm" cursor="pointer" />
            )}
            <span
              style={{
                backgroundColor: `${m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'}`,
                marginLeft: isSameSenderMargin(myMessage, m, i, user._id),
                marginTop: isSameUser(myMessage, m, i, user._id) ? 3 : 10,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
