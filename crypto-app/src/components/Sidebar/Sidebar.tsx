"use client";

import styles from "./styles.module.css";
import { getBinanceCurrencies } from "@/actions/get-binance-currencies";
import { getWatchedCurrencies } from "@/actions/get-watched-currencies";
import { useEffect, useState } from "react";
import { sortArray } from "@/lib/shared";
import SearchBar from "./components/SearchBar";
import SwitchMode from "./components/Switch";
import CurreciesList from "./components/CurrenciesList";

export default function Sidebar() {
  const [perpertualContracts, setPerpertualContracts] = useState<any[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [onlyWatched, setOnlyWatched] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setIsLoading(true);
    async function getCurrencies() {
      const [currencies, watchedCurrencies] = await Promise.all([
        getBinanceCurrencies(),
        getWatchedCurrencies(),
      ]);
      const contracts = currencies.symbols.filter(
        (item: any) => item.contractType === "PERPETUAL"
      );
      for (let i = 0; i < watchedCurrencies.length; i++) {
        contracts.map((item: { symbol: string; checked: boolean }) =>
          item.symbol === watchedCurrencies[i].name
            ? (item.checked = true)
            : null
        );
      }
      setPerpertualContracts(sortArray(contracts));
      setIsLoading(false);
    }
    getCurrencies();
  }, []);

  if (isLoading) return null;

  return (
    <div className={styles.container}>
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
      <CurreciesList
        allCurrencies={perpertualContracts}
        searchText={searchText}
        onlyWatched={onlyWatched}
      />
    </div>
  );
}
