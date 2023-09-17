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

const EditUserModal = ({ children, user }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);

  const [opend, setOpend] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('');
  const [moy, setMoy] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleOpenDialog = () => {
    setOpend(true);
  };
  const handleCloseDialog = () => {
    setOpend(false);
  };

  const handleLevel = (event) => {
    const {
      target: { value },
    } = event;
    setLevel(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value : value._id
    );
    console.log(event.target.value);
  };

  const handleSubmitDialog = () => {
    const id = user._id;
    const theuser = {
      _id: id,
      email: email || user.email,
      level: level || user.level,
      moy: moy || user.moy,
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
                name="moy"
                type="number"
                label=" معدل السنة الفارطة"
                value={moy}
                onChange={(e) => setMoy(e.target.value)}
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
            <FormControl sx={{ mt: 2, maxWidth: 'xl' }}>
              <InputLabel htmlFor="max-width">المستوى الدراسي</InputLabel>
              <Select
                autoFocus
                label="المستوى الدراسي"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                  defaultValue: 'level',
                }}
                value={level}
                onChange={handleLevel}
              >
                <MenuItem value={'2 ème année'}>2 ème année</MenuItem>
                <MenuItem value={'3 ème année'}>3 ème année</MenuItem>
                <MenuItem value={'4 ème année'}>4 ème année</MenuItem>
                <MenuItem value={'5 ème année'}>5 ème année</MenuItem>
                <MenuItem value={'6 ème année'}>6 ème année</MenuItem>
                <MenuItem value={'7 ème année'}>7 ème année</MenuItem>
                <MenuItem value={'8 ème année'}>8 ème année</MenuItem>
                <MenuItem value={'9 ème année'}>9 ème année</MenuItem>
                <MenuItem value={'1 ère secondaire'}> 1 ère secondaire</MenuItem>
                <MenuItem value={'2 ème secondaire informatique'}>2 ème secondaire informatique</MenuItem>
                <MenuItem value={'2 ème secondaire scientifique'}>2 ème secondaire scientifique</MenuItem>
                <MenuItem value={'2 ème secondaire économie'}>2 ème secondaire économie</MenuItem>
                <MenuItem value={'2 ème secondaire lettres'}>2 ème secondaire lettres</MenuItem>
                <MenuItem value={'3 ème secondaire économie'}>3 ème secondaire économie</MenuItem>
                <MenuItem value={'3 ème secondaire informatique'}>3 ème secondaire informatique</MenuItem>
                <MenuItem value={'3 ème secondaire math'}>3 ème secondaire math</MenuItem>
                <MenuItem value={'3 ème secondaire sciences exp'}>3 ème secondaire sciences exp</MenuItem>
                <MenuItem value={'3 ème secondaire techniques'}>3 ème secondaire techniques</MenuItem>
                <MenuItem value={'3 ème secondaire lettres'}>3 ème secondaire lettres</MenuItem>
                <MenuItem value={'Bac économie'}>Bac économie</MenuItem>
                <MenuItem value={'Bac sciences exp'}>Bac sciences exp</MenuItem>
                <MenuItem value={'Bac informatique'}>Bac informatique</MenuItem>
                <MenuItem value={'Bac lettres'}>Bac lettres</MenuItem>
                <MenuItem value={'Bac mathématiques'}>Bac mathématiques</MenuItem>
                <MenuItem value={'Bac techniques'}>Bac techniques</MenuItem>
                <MenuItem value={'Formation Langues'}>Formation Langues</MenuItem>
              </Select>
            </FormControl>
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

export default EditUserModal;
