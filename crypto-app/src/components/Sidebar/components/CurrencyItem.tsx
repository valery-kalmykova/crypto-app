import Link from "next/link";
import styles from "../styles.module.css";

export default function CurrencyItem({ item }: any) {
  return (
    <Link href={`/${item.symbol}`} className={styles.itemLink}>
      <li className={styles.item} style={item.checked && { color: "#90caf9" }}>
        {item.symbol}
      </li>
    </Link>
  );
}
