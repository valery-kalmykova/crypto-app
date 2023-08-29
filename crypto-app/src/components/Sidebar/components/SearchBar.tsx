"use client";

import styles from "../styles.module.css";

const SearchBar = ({ setSearchText, searchText, onlyWatched }: any) => {
  return (
    <div>
      <div className={styles.title}>Whatchlist</div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Search"
          type="search"
          onChange={({ target }) => setSearchText(target.value)}
          value={searchText}
          disabled={onlyWatched}
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
