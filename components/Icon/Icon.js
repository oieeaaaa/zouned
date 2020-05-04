/*
***************************************
Component: Icon
Author: Joimee
Description:
***************************************
*/
import { ReactSVG } from 'react-svg';

export default ({
  src,
  ...rest
}) => (
  <ReactSVG className="icon" src={`/icons/${src}`} {...rest} />
);
