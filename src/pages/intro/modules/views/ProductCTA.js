import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Snackbar from '../components/Snackbar';
import Button from '../components/Button';
import logo from '../../../../assets/intro/logo.jpg';

function ProductCTA() {
  const [open, setOpen] = React.useState(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'warning.main',
              py: 15,
              px: 3,
            }}
          >
            <Box component="form" sx={{ maxWidth: 500 }}>
              <Typography variant="h2" component="h2" gutterBottom ml="40px" mb="40px">
                تعرف على عروضنا وبرامجنا
              </Typography>

              <Button
                type="submit"
                style={{
                  borderRadius: 35,
                  backgroundColor: '#80ced6',
                  padding: '12px 36px',
                  fontSize: '20px',
                }}
                href="/emploi"
                variant="contained"
                sx={{ width: '60%', ml: '100px', mb: '20px' }}
              >
                روزنامة الاوقات لكل المستويات
              </Button>
              <Button
                // type="submit"
                style={{
                  borderRadius: 35,
                  backgroundColor: '#80ced6',
                  padding: '12px 36px',
                  fontSize: '20px',
                }}
                href="/prix"
                variant="contained"
                sx={{ width: '60%', ml: '100px' }}
              >
                افضل الاسعار
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            component="img"
            src={logo}
            alt="call to action"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
              opacity: '80%',
            }}
          />
        </Grid>
      </Grid>
      {/* <Snackbar open={open} closeFunc={handleClose} message="We will send you our best offers, once a week." /> */}
    </Container>
  );
}

export default ProductCTA;
