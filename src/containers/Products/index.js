import React, { useState, useEffect } from 'react';

import ProductsLogo from '../../assets/products-logo.svg';
import apiCodeBurguer from '../../services/api';
import {
  Container,
  ProductsImg,
  CategoryButton,
  CategoriesMenu
} from './style';

function Products() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await apiCodeBurguer.get('categories');

      const newCategories = [{ id: 0, name: 'Todas' }, ...data];
      setCategories(newCategories);
    }
    loadCategories();
  }, []);
  return (
    <Container>
      <ProductsImg src={ProductsLogo} alt="logo-home" />
      <CategoriesMenu>
        {categories &&
          categories.map(category => (
            <CategoryButton
              key={category.id}
              type="button"
              isActiveCategory={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id);
              }}
            >
              {category.name}
            </CategoryButton>
          ))}
      </CategoriesMenu>
    </Container>
  );
}

export default Products;
