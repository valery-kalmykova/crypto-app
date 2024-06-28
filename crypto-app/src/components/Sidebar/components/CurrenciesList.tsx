import styles from "../styles.module.css";
import CurrencyItem from "./CurrencyItem";

const CurreciesList = ({ allCurrencies, searchText, onlyWatched }: any) => {
  const items: any = [];

  allCurrencies.forEach((element: any) => {
    if (onlyWatched && !element.checked) {
      return;
    }
    if (element.symbol.toLowerCase().indexOf(searchText.toLowerCase()) === -1) {
      return;
    }
    items.push(<CurrencyItem item={element} key={element.symbol} />);
  });

  return <ul className={styles.list}>{items}</ul>;
};

export default CurreciesList;
