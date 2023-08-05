import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };
  const [sent, setSent] = React.useState(false);

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
            label="Level"
            margin="normal"
            name="level"
            required
            select
          >
            <MenuItem value={'première année'}>première année</MenuItem>
            <MenuItem value={'deuxième année'}>deuxième année</MenuItem>
            <MenuItem value={'troisième année'}>troisième année</MenuItem>
          </Field>

          <TextField
            fullWidth
            required
            name="email"
            label="Email address"
            value={email}
            type="text"
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormButton sx={{ mt: 3, mb: 2 }} color="secondary" onClick={handleClick} fullWidth>
            Signup
          </FormButton>
        </Box>
      )}
    </Form>
  );
}
