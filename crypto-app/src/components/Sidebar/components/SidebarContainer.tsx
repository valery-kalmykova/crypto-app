"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import CurreciesList from "./CurrenciesList";
import SwitchMode from "./Switch";

const SidebarContainer = (props: { sortedData: any[] }) => {
  const [onlyWatched, setOnlyWatched] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allCurrencies, setAllCurrencies] = useState<any[]>([]);

  useEffect(() => {
    setAllCurrencies(props.sortedData);
    if (onlyWatched) {
      const newArr = allCurrencies.filter((item: any) => item.checked === true);
      setAllCurrencies(newArr);
    }
    if (searchText.length > 0) {
      const newArr = allCurrencies.filter((item: any) =>
        (item.symbol || "").toLowerCase().includes(searchText.toLowerCase())
      );
      setAllCurrencies(newArr);
    }
  }, [onlyWatched, searchText, props.sortedData, allCurrencies]);

  return (
    <div>
      <SearchBar
        setSearchText={setSearchText}
        searchText={searchText}
        onlyWatched={onlyWatched}
        setOnlyWatched={setOnlyWatched}
      />
      <SwitchMode
        onlyWatched={onlyWatched}
        setOnlyWatched={setOnlyWatched}
        searchText={searchText}
      />
      <CurreciesList allCurrencies={allCurrencies} />
    </div>
  );
};

export default SidebarContainer;
