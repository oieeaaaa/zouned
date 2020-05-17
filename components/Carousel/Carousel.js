/*
***************************************
Component: Carousel
Author: Joimee
Description:
***************************************
*/
import Flickity from 'react-flickity-component';

export default ({ list, initialIndex, ...rest }) => {
  const options = {
    contain: true,
    initialIndex,
  };

  return (
    <Flickity
      className="carousel"
      options={options}
      elementType="div"
      static
      {...rest}
    >
      {list.map(listItem => (
        <div className="carousel__item" key={listItem.title}>
          <img src={listItem.imgSrc} alt={listItem.title} />
        </div>
      ))}
    </Flickity>
  );
};
