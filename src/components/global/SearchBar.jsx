"use client";

import Button from "./CustomButton";

const SearchBar = ({ params, searchParams }) => {
  const { q } = params;
  const { query } = searchParams;

  return (
    <form action={"/events"}>
      <input name="q" placeholder="Search here ..."></input>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
