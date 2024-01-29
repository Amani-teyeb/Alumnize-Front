import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
// @mui
import {
  Grid,
  Button,
  Box,
  MenuItem,
  Container,
  FormControl,
  Typography,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// components
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// mock
import FileUpload from 'react-mui-fileuploader';
import courses from '../../_mock/course';
import { addPayPic, getAllCourses, getThemes, getUserWishlist, AddCourse } from '../../Redux/actions';
import WishlistCard from './wishlistCard';
import TeacherCourse from './TeacherCourse';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function WishList() {
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.theme.themes);
  const user = useSelector((state) => state.auth.user);
  const wishlist = useSelector((state) => state.auth.wishlist.wichlist);

  const [opend, setOpend] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [fileToUpload, setFileToUpload] = useState();

  const [payPeriode, setPayPeriode] = useState('');

  useEffect(() => {
    dispatch(getThemes());
    dispatch(getAllCourses());
    dispatch(getUserWishlist());
  }, []);

  const handleOpenDialog = () => {
    setOpend(true);
  };
  const handleCloseDialog = () => {
    setOpend(false);
  };
  const handleSubmitDialog = () => {
    const form = new FormData();
    form.append('payPeriode', payPeriode);
    form.append('payPicture', fileToUpload);
    form.append('_id', user._id);

    dispatch(addPayPic(form));
    setOpend(false);
  };
  const handlePayPeriod = (event) => {
    const {
      target: { value },
    } = event;
    setPayPeriode(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleFilesChange = (file) => {
    // Update chosen files
    setFileToUpload(file[0]);
    console.log(file[0]);
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {user.level}
          </Typography>
          <Button
            variant="contained"
            size="large"
            fontSize="h4"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenDialog}
          >
            دفع معلوم الاشتراك
          </Button>
        </Stack>
      </Container>

      <Dialog
        fullWidth={fullWidth}
        open={opend}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" marginLeft={'130px'}>
          <span style={{ fontSize: '30px', color: 'blue' }}> {'تحميل صورة دفع معلوم الاشتراك'} </span>
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
            <span style={{ fontSize: '20px', marginLeft: '40px' }}>
              {' '}
              لاضافة الصورة "Click here" الرجاء اختيار طريقة الدفع ثم اضغط على
            </span>
            <FormControl sx={{ mt: 2, maxWidth: 'xl', mb: 2 }}>
              <InputLabel htmlFor="max-width">طريقة الدفع</InputLabel>
              <Select
                autoFocus
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                  defaultValue: 'payPeriode',
                }}
                value={payPeriode}
                onChange={handlePayPeriod}
              >
                <MenuItem value={'شهر'}>
                  <span style={{ fontSize: '20px', color: 'blue' }}> {'شهر '} </span>
                </MenuItem>
                <MenuItem value={'ثلاثي'}>
                  <span style={{ fontSize: '20px', color: 'blue' }}> {'ثلاثي '} </span>
                </MenuItem>
                <MenuItem value={'سنة'}>
                  <span style={{ fontSize: '20px', color: 'blue' }}> {'سنة '} </span>
                </MenuItem>
              </Select>
            </FormControl>

            <FileUpload onFilesChange={handleFilesChange} onContextReady={(context) => {}} />
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

      <Container>
        {wishlist && (
          <Grid container display="flex" spacing={6} align="center" justifyItems={'space-arround'} mt={4}>
            {wishlist.map((theme, index) => (
              <WishlistCard key={theme._id} theme={theme} index={index} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
