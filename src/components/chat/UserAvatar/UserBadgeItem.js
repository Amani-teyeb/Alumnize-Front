import Badge from '@mui/material/Badge';
import { Close } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box alignItems="center" borderRadius="lg" m={1}>
      <Button
        variant="contained"
        display="flex"
        sx={{ height: '30px', backgroundColor: 'purple' }}
        startIcon={<DisabledByDefaultIcon />}
        onClick={handleFunction}
      >
        {user.firstName}
      </Button>
    </Box>
  );
};

export default UserBadgeItem;
