import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export const ChatLoading = (props) => {
  return (
    <Box sx={{ width: 300 }}>
      <Skeleton animation="wave" height="20px" />
      <Skeleton animation="wave" height="20px" />
      <Skeleton animation="wave" height="20px" />
      <Skeleton animation="wave" height="20px" />
      <Skeleton animation="wave" height="20px" />
    </Box>
  );
};
