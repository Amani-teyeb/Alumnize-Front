import React, { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Divider, Stack, Button, Select, MenuItem, TextField } from '@mui/material';
import SignupForm from '../sections/auth/login/SignupForm';
// sections
import Typography from './intro/modules/components/Typography';
// components
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 550,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6, 0),
}));

// ----------------------------------------------------------------------

export default function SignupPage() {
  return (
    <>
      <StyledRoot>
        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5, mr: 15 }}>
            Hi, Welcome
          </Typography>
          <img src="/assets/illustrations/illustration_login.png" alt="login" />
        </StyledSection>

        <Container maxWidth="sm">
          <StyledContent>
            <>
              <Typography variant="h3" gutterBottom marked="center" align="center">
                التسجيل{' '}
              </Typography>
              <Typography variant="body1" align="center">
                <Link href="/login" underline="always">
                  لديك حساب في المنصة ؟{' '}
                </Link>
              </Typography>
            </>

            <SignupForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
