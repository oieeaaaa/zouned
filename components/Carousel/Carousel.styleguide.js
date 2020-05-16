/*
*******************************
Stylguide for Carousel.

NOTE: Not for production use
*******************************
*/

import Carousel from './Carousel';

const carouselList = [
  {
    name: 'Wonder Boy',
    img: 'https://bit.ly/2zCM6iI',
  },
  {
    name: 'Cat',
    img: 'https://bit.ly/35XkSiZ',
  },
  {
    name: 'White Flower',
    img: 'https://bit.ly/3dLDo0G',
  },
];

export default () => (
  <div className="carousel--styleguide">
    <Carousel list={carouselList} />
    <style jsx>
      {`
          .carousel--styleguide {
            grid-column: 2 / -2;
          }
      `}
    </style>
  </div>
);
