import { Avatar, Box, TextField } from '@mui/material';

const UserListItem = ({ user, handleFunction }) => {
  //   const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      sx={{
        display: 'flex',
        cursor: 'pointer',
        bgcolor: '#E8E8E8',
        w: '100%',
        alignItems: 'center',
        color: 'black',
        px: 3,
        py: 2,
        mb: 2,
        borderRadius: 'lg',
        '&:hover': {
          bgcolor: '#38B2AC',
          color: 'white',
        },
      }}
    >
      <Avatar
        alt={user.firstName}
        src={user.picture}
        sx={{
          mr: 2,
          width: 24,
          height: 24,
        }}
      />
      <Box
        sx={{
          height: '50px',
        }}
      >
        <div>
          {user.firstName} {user.lastName}
        </div>
        <div>
          <b>Email: </b>
          {user.email}
        </div>
      </Box>
    </Box>
  );
};

export default UserListItem;
