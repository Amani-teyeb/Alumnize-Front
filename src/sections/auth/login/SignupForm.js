import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Link, Stack, IconButton, InputAdornment, MenuItem, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Field, Form, FormSpy } from 'react-final-form';
import Iconify from '../../../components/iconify';
import { email, required } from '../../../pages/intro/modules/form/validation';

import FormButton from '../../../pages/intro/modules/form/FormButton';
import FormFeedback from '../../../pages/intro/modules/form/FormFeedback';
import { signup } from '../../../Redux/actions';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [parentName, setParentName] = useState('');
  const [level, setLevel] = useState('');
  const [moy, setMoy] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const [sent, setSent] = React.useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const auth = useSelector((state) => state.auth);

  if (auth.authenticate) {
    return <Navigate to={`/dashboard`} />;
  }

  const handleClick = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      parentName,
      level,
      contactNumber,
      password,
    };
    dispatch(signup(user));
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
  const validate = (values) => {
    const errors = required(['firstName', 'lastName', 'email', 'level', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  return (
    <Form onSubmit={handleClick} subscription={{ submitting: true }} validate={validate}>
      {({ handleSubmit: handleSubmit2, submitting }) => (
        <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="اللقب"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                label="الاسم"
                name="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Field
            autoComplete="level"
            component={TextField}
            disabled={submitting || sent}
            fullWidth
            label="المستوى الدراسي"
            margin="normal"
            name="level"
            value={level}
            onChange={handleLevel}
            required
            select
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
          </Field>
          <TextField
            fullWidth
            required
            name="parentName"
            label="اسم الولي "
            value={parentName}
            type="text"
            margin="normal"
            onChange={(e) => setParentName(e.target.value)}
          />

          <TextField
            fullWidth
            required
            name="contactNumber"
            label="رقم الهاتف"
            value={contactNumber}
            type="number"
            margin="normal"
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <TextField
            fullWidth
            required
            name="moy"
            label=" معدل السنة الفارطة"
            value={moy}
            type="number"
            margin="normal"
            onChange={(e) => setMoy(e.target.value)}
          />

          <TextField
            name="email"
            required
            label="البريد الالكتروني"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            required
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
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormButton sx={{ mt: 3, mb: 2 }} color="secondary" onClick={handleClick} fullWidth>
            تسجيل
          </FormButton>
        </Box>
      )}
    </Form>
  );
}
