import React from 'react';

import HomeLogo from '../../assets/home-logo.svg';
import CategoryCarousel from '../../components/CategoryCarousel';
import { Container, HomeImg } from './style';

function Home() {
  return (
    <Container>
      <HomeImg src={HomeLogo} alt="logo-home" />
      <CategoryCarousel />
    </Container>
  );
}

export default Home;
