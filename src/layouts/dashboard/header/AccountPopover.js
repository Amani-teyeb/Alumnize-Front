import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// mocks_
import account from '../../../_mock/account';
import { Logout } from '../../../Redux/actions/auth.actions';
import EditUserModal from '../../../components/EditUserModal';
import EditTeacherModal from '../../../components/EditTeacherModal';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'صفحة الاستقبال',
    icon: 'eva:home-fill',
  },
  {
    label: 'إعدادات',
    icon: 'eva:person-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const history = useNavigate();

  const auth = useSelector((state) => state.auth.user);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(Logout());
    // history('/login')
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [Logout]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="img" />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {auth.firstName} {auth.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {auth.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <MenuItem key={'الاستقبال'}>الصفحة الرئيسية</MenuItem>
          </Link>
          {auth && auth.role === 'teacher' ? (
            <EditTeacherModal>
              <Link style={{ textDecoration: 'none' }}>
                <MenuItem key={'إعدادات'}>إعدادات </MenuItem>
              </Link>
            </EditTeacherModal>
          ) : (
            <EditUserModal>
              <Link style={{ textDecoration: 'none' }}>
                <MenuItem key={'إعدادات'}>إعدادات </MenuItem>
              </Link>
            </EditUserModal>
          )}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          خروج
        </MenuItem>
      </Popover>
    </>
  );
}
