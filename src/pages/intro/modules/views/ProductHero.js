import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import Background from './onepirate.jpg';
import AppAppBar from './AppAppBar';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
      }}
    >
      <AppAppBar />
      <Typography color="inherit" align="center" variant="h3" marked="center" sx={{ mt: 8 }}>
        H-tag Academy
      </Typography>
      <Typography color="inherit" align="center" variant="h5" sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}>
        study from home with H-tag Academy programs.
      </Typography>
      <Button color="secondary" variant="contained" size="large" component="a" href="/signup" sx={{ minWidth: 200 }}>
        Signup
      </Button>
      <></>

      {/* <Typography variant="body2" color="inherit">
        Discover the experience
      </Typography> */}
    </ProductHeroLayout>
  );
}
