"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import addWatchedCurrency from "@/actions/add-watched-currency";
import getWatchedCurrenciesPrices from "@/actions/get-watched-currency-prices";
import { addNotificationPrice } from "@/actions/update-watched-currencies";

const Form = (props: { price: string; activeCurrency: string }) => {
  const router = useRouter();
  const [price, setPrice] = useState("");

  async function handleSubmit(data: FormData) {
    const currency = await getWatchedCurrenciesPrices(props.activeCurrency);
    const price = data.get("price")?.toString();

    if (price !== "0") {
      if (currency) {
        await addNotificationPrice(props.activeCurrency, price!);
      } else {
        await addWatchedCurrency(props.activeCurrency, price!);
      }
    }

    setPrice("");
    router.refresh();
  }

  const handleChange = (event: any) => {
    if (isNaN(event.target.value)) {
      event.target.value.replace("");
    } else {
      const result = event.target.value;
      setPrice(result);
    }
  };

  return (
    <form
      action={handleSubmit}
      className={styles.formContainer}
      noValidate
      autoComplete="off"
    >
      <input
        value={price}
        onChange={(event) => handleChange(event)}
        className={styles.input}
        type="string"
        name="price"
        placeholder={props.price}
      />
      <button className={styles.button} type="submit">
        Add
      </button>
    </form>
  );
};

export default Form;
