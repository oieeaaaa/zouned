/*
***************************************
Component: Minimal Card
Author: Joimee
Description:
***************************************
*/
export default ({ label, onClick }) => (
  <button className="minimalcard" type="button" onClick={onClick}>
    <h3 className="minimalcard__title">{label}</h3>
  </button>
);
