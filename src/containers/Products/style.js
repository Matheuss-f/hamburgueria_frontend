import styled from 'styled-components';

export const Container = styled.div`
  background: #e5e5e5;
  min-height: 100vh;
`;

export const ProductsImg = styled.img`
  width: 100%;
`;

export const CategoriesMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 20px;
`;

export const CategoryButton = styled.button`
  cursor: pointer;
  border: none;
  border-bottom: ${props => props.isActiveCategory && '2px solid #9758A6'};
  color: ${props => (props.isActiveCategory ? '#9758A6' : '#9a9a9d')};
  font-size: 17px;
  line-height: 20px;
  background-color: transparent;
  padding-bottom: 5px;
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 40px;
  justify-items: center;
  margin-top: 20px;
`;
