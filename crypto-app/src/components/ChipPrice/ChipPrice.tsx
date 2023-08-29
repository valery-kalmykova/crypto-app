"use client";

import { deleteNotification } from "@/lib/shared";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

const ChipPrice = (props: {
  activeCurrency: string;
  data: { prices: string[] };
  currentPrice: string;
}) => {
  const prices = props.data?.prices;
  const activeCurrency = props.activeCurrency;
  const router = useRouter();

  const handleDelete = async (price: string) => {
    deleteNotification({prices, price, activeCurrency})
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
