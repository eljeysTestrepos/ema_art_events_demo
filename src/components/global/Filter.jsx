const Filter = () => {
  return (
    <form>
      <h1>Filter er her</h1>
      <label htmlFor="">dates</label>
      <select
        name="dates"
        id="dates"
        className="w-50 border-2 border-solid border-(--color-btn-bg) rounded-sm"
      >
        <option value=""></option>
        <option value=""></option>
      </select>

      <label htmlFor="">locations</label>
      <select
        name="locations"
        id="locations"
        className="w-50 border-2 border-solid border-(--color-btn-bg) rounded-sm"
      >
        <option value=""></option>
        <option value=""></option>
      </select>
    </form>
  );
};

export default Filter;
