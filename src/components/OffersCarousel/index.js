import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';

import Offers from '../../assets/offer.png';
import api from '../../services/api';
import formatCurrency from '../../utils/formatCurrency';
import { Container, CategoryImg, Image, Button, ContainerItems } from './style';

function OffersCarousel() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    async function loadOffers() {
      const { data } = await api.get('products');
      const onlyOffers = data
        .filter(product => product.offer)
        .map(product => {
          return { ...product, formattedPrice: formatCurrency(product.price) };
        });
      setOffers(onlyOffers);
    }
    loadOffers();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 }
  ];

  return (
    <Container>
      <CategoryImg src={Offers} alt="logo-ofertas" />

      <Carousel
        itemsToShow={4}
        style={{ width: '90%' }}
        breakPoints={breakPoints}
      >
        {offers &&
          offers.map(product => (
            <ContainerItems key={product.id}>
              <Image src={product.url} alt="produto-imagem" />
              <p>{product.name}</p>
              <p>{product.formattedPrice}</p>
              <Button>Peça agora</Button>
            </ContainerItems>
          ))}
      </Carousel>
    </Container>
  );
}

export default OffersCarousel;
