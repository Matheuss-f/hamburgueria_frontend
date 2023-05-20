import React, { useState, useEffect } from 'react';

import ProductsLogo from '../../assets/products-logo.svg';
import CardProduct from '../../components/CardProducts';
import apiCodeBurguer from '../../services/api';
import formatCurrency from '../../utils/formatCurrency';
import {
  Container,
  ProductsImg,
  CategoryButton,
  CategoriesMenu,
  ProductsContainer
} from './style';

function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await apiCodeBurguer.get('categories');

      const newCategories = [{ id: 0, name: 'Todas' }, ...data];
      setCategories(newCategories);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const { data: allProducts } = await apiCodeBurguer.get('products');

      const newProducts = allProducts.map(product => {
        return { ...product, formatedPrice: formatCurrency(product.price) };
      });

      setProducts(newProducts);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products);
    } else {
      const newFilteredProducts = products.filter(
        product => product.category_id === activeCategory
      );

      setFilteredProducts(newFilteredProducts);
    }
  }, [activeCategory, products]);

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
      <ProductsContainer>
        {filteredProducts &&
          filteredProducts.map(product => (
            <CardProduct key={product.id} product={product} />
          ))}
      </ProductsContainer>
    </Container>
  );
}

export default Products;
