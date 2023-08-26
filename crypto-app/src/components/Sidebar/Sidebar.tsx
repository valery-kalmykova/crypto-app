import styles from "./styles.module.css";
import { getBinanceCurrencies } from "@/actions/get-binance-currencies";
import { getWatchedCurrencies } from "@/actions/get-watched-currencies";
import { sortArray } from "@/lib/shared";
import SidebarContainer from "./components/SidebarContainer";

export const revalidate = 0;

const SortedCurrencyList = async () => {
  const currenciesData = await getBinanceCurrencies();
  const watchedCurrenciesData = await getWatchedCurrencies();
  const [currencies, watchedCurrencies] = await Promise.all([
    currenciesData,
    watchedCurrenciesData,
  ]);
  const perpertualContracts = currencies.symbols.filter(
    (item: any) => item.contractType === "PERPETUAL"
  );
  for (let i = 0; i < watchedCurrencies.length; i++) {
    perpertualContracts.map((item: { symbol: string; checked: boolean }) =>
      item.symbol === watchedCurrencies[i].name ? (item.checked = true) : null
    );
  }
  const sortedData = sortArray(perpertualContracts);
  return sortedData;
};

async function Sidebar() {
  const sortedData = await SortedCurrencyList();

  return (
    <div className={styles.container}>
      <SidebarContainer sortedData={sortedData} />
    </div>
  );
}

export default Sidebar;
