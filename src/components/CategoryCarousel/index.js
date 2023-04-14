import React, { useEffect } from 'react';

import Category from '../../assets/category.png';
import api from '../../services/api';
import { Container, CategoryImg } from './style';

function CategoryCarousel() {
  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('categories');
    }
    loadCategories();
  }, []);
  return (
    <Container>
      <CategoryImg src={Category} alt="logo-home" />
    </Container>
  );
}

export default CategoryCarousel;
