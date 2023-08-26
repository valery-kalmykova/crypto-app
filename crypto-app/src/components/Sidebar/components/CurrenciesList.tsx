"use client";

import styles from "../styles.module.css";
import Link from "next/link";

const CurreciesList = ({ allCurrencies }: any) => {
  return (
    <ul className={styles.list}>
      {Object.values(allCurrencies).map((item: any, i: any) => {
        return (
          <Link href={`/${item.symbol}`} key={i} className={styles.itemLink}>
            <li
              className={styles.item}
              style={item.checked && { color: "#90caf9" }}
            >
              {item.symbol}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default CurreciesList;
