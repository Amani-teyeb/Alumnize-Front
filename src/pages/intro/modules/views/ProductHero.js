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
      <Typography color="inherit" align="center" variant="h5" sx={{ mb: 6, mt: { sx: 4, sm: 10 } }}>
        باش تتهنى على قراية صغيرك على عينيك
      </Typography>
      <Button
        style={{
          borderRadius: 35,
          backgroundColor: '#21b6ae',
          padding: '15px 50px',
          fontSize: '25px',
        }}
        href="/signup"
        variant="contained"
      >
        التسجيل
      </Button>

      <></>

      {/* <Typography variant="body2" color="inherit">
        Discover the experience
      </Typography> */}
    </ProductHeroLayout>
  );
}
