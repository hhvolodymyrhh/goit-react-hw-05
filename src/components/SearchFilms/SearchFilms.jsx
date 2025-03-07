import css from "./SearchFilms.module.css";
import { useState } from "react";

function SearchFilms({takeQuery}) {

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    takeQuery(query.toLowerCase().trim());
    e.target.reset();
  };

  return (
    <form className={css.search_form} onSubmit={handleSubmit}>
      <input
        className={css.search_input}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button className={css.search_button} type="submit">search</button>
    </form>
  );
};

export default SearchFilms
