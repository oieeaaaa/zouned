/*
***************************************
Component: Search
Author: Joimee
Description:
***************************************
*/
export default ({ onSubmit, onChange, value }) => (
  <form className="search" onSubmit={onSubmit}>
    <div className="search-box">
      <input
        className="search__input"
        name="search"
        type="search"
        placeholder="e.g., zen"
        onChange={onChange}
        value={value}
        required
      />
      <button className="search__btn" type="submit">Search</button>
    </div>
  </form>
);
