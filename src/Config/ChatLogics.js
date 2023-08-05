export const isSameSenderMargin = (myMessage, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (i < myMessage.length - 1 && myMessage[i + 1].sender._id === m.sender._id && myMessage[i].sender._id !== userId)
    return 33;
  if (
    (i < myMessage.length - 1 && myMessage[i + 1].sender._id !== m.sender._id && myMessage[i].sender._id !== userId) ||
    (i === myMessage.length - 1 && myMessage[i].sender._id !== userId)
  )
    return 0;
  return 'auto';
};

export const isSameSender = (myMessage, m, i, userId) => {
  return (
    i < myMessage.length - 1 &&
    (myMessage[i + 1].sender._id !== m.sender._id || myMessage[i + 1].sender._id === undefined) &&
    myMessage[i].sender._id !== userId
  );
};

export const isLastMessage = (myMessage, i, userId) => {
  return (
    i === myMessage.length - 1 &&
    myMessage[myMessage.length - 1].sender._id !== userId &&
    myMessage[myMessage.length - 1].sender._id
  );
};

export const isSameUser = (myMessage, m, i) => {
  return i > 0 && myMessage[i - 1].sender._id === m.sender._id;
};

export const getSender = (auth, users) => {
  return users[0]._id === auth._id ? users[1].firstName : users[0].firstName;
};

export const getSenderId = (auth, users) => {
  return users[0]._id === auth._id ? users[1]._id : users[0]._id;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
