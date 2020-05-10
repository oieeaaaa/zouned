/*
***************************************
Component: Search
Author: Joimee
Description:
***************************************
*/
export default ({ onSubmit }) => (
  <form className="search" onSubmit={onSubmit}>
    <div className="search-box">
      <input
        className="search__input"
        type="search"
        placeholder="e.g., zen"
        required
      />
      <button className="search__btn" type="submit">Search</button>
    </div>
  </form>
);
