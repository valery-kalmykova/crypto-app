"use client";

import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

const ChipPrice = (props: {
  activeCurrency: string;
  data: any;
  currentPrice: string;
}) => {
  const prices = props.data?.prices;
  const router = useRouter();

  const handleDelete = async (price: string) => {
    if (prices!.length === 1) {
      await fetch(`/api/currencies/${props.activeCurrency}`, {
        method: "DELETE",
      });
    } else {
      await fetch(`/api/currencies/${props.activeCurrency}`, {
        method: "PATCH",
        body: JSON.stringify({ price: price }),
      });
    }
    router.refresh();
  };

  return (
    <div>
      {prices &&
        Object.values(prices).map((price: any, i: any) => {
          return (
            <div className={styles.chip} key={i}>
              {Number(price) >= Number(props.currentPrice) ? (
                <span style={{ color: "#66bb6a" }}>{price}</span>
              ) : (
                <span style={{ color: "#d32f2f" }}>{price}</span>
              )}
              <span
                className={styles.buttonClose}
                onClick={() => {
                  handleDelete(price);
                }}
              >
                &times;
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ChipPrice;
