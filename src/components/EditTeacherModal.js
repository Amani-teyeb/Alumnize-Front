import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Box, FormControl, Stack, InputLabel, Select, MenuItem, InputAdornment, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { updateUser } from '../Redux/actions';
import Iconify from './iconify';
import account from '../_mock/account';

const EditTeacherModal = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [opend, setOpend] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleOpenDialog = () => {
    setOpend(true);
  };
  const handleCloseDialog = () => {
    setOpend(false);
  };

  const handleSubmitDialog = () => {
    const id = user._id;
    const theuser = {
      _id: id,
      email: email || user.email,
      contactNumber: contactNumber || user.contactNumber,
      password: password || user.hash_password,
    };
    dispatch(updateUser(theuser));
    setOpend(false);
  };
  return (
    <div>
      <span role="button" tabIndex={0} onClick={handleOpenDialog} onKeyDown={handleOpenDialog}>
        {children}
      </span>
      <Dialog
        fullWidth={fullWidth}
        open={opend}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" marginLeft={'200px'}>
          <span style={{ fontSize: '30px', color: 'blue' }}> {'تغيير معطيات'} </span>
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
            }}
          >
            {/* <Avatar sx={{ width: '100px', higth: '100px' }} src={auth.profilePicture} alt={account.photoURL} /> */}
            <Stack spacing={3}>
              <TextField
                name="email"
                label="البريد الالكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                name="contactNumber"
                type="number"
                label="رقم الهاتف"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              <TextField
                name="password"
                label="كلمة المرور"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              typography: 'h4',
              height: 30,
            }}
          >
            {' '}
            خروج
          </Button>
          <Button
            onClick={handleSubmitDialog}
            sx={{
              typography: 'h4',
              height: 30,
            }}
            autoFocus
          >
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTeacherModal;
