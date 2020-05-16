/*
***************************************
Component: Carousel
Author: Joimee
Description:
***************************************
*/
import Flickity from 'react-flickity-component';

export default ({ list, activeIndex }) => {
  const options = {
    contain: true,
    initialIndex: activeIndex,
  };

  return (
    <Flickity
      className="carousel"
      options={options}
      elementType="div"
      static
    >
      {list.map(listItem => (
        <div className="carousel__item" key={listItem.name}>
          <img src={listItem.img} alt={listItem.name} />
        </div>
      ))}
    </Flickity>
  );
};
