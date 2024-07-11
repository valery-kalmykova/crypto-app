"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import addWatchedCurrency from "@/actions/add-watched-currency";
import getWatchedCurrenciesPrices from "@/actions/get-watched-currency-prices";
import { addNotificationPrice } from "@/actions/update-watched-currencies";
import Input from "./Input";
import addWatchedTrend from "@/actions/add-watched-trend";

const FormTrendBroke = (props: { price: string; activeCurrency: string }) => {
  const router = useRouter();
  const [priceStart, setPriceStart] = useState("");
  const [hourStart, setHourStart] = useState("");
  const [minuteStart, setMinuteStart] = useState("");
  const [priceEnd, setPriceEnd] = useState("");
  const [hourEnd, setHourEnd] = useState("");
  const [minuteEnd, setMinuteEnd] = useState("");

  async function handleSubmit() {
    const now = new Date();
    const startTime = now.setHours(Number(hourStart), Number(minuteStart), 0);
    const endTime = now.setHours(Number(hourEnd), Number(minuteEnd), 0);
    const diffTime = Math.abs(Math.round((startTime - endTime) / 60000));
    const diffPrice = Math.abs(Number(priceStart) - Number(priceEnd));
    const trendStep = diffPrice / (diffTime / 5);
    const trendType =
      Number(priceStart) - Number(priceEnd) > 0 ? "bear" : "bull";
    await addWatchedTrend(
      props.activeCurrency,
      priceEnd,
      endTime.toString(),
      trendStep.toString(),
      trendType
    );
    router.refresh();
  }

  return (
    <form
      action={handleSubmit}
      className={styles.formContainer}
      noValidate
      autoComplete="off"
    >
      <fieldset className={styles.fieldset}>
        <h3 className={styles.fieldsetTitle}>Start point</h3>
        <Input value={hourStart} setValue={setHourStart} label="Hour" />
        <Input value={minuteStart} setValue={setMinuteStart} label="Minute" />
        <Input
          value={priceStart}
          setValue={setPriceStart}
          label="Price"
          price={props.price}
        />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <h3 className={styles.fieldsetTitle}>End point</h3>
        <Input value={hourEnd} setValue={setHourEnd} label="Hour" />
        <Input value={minuteEnd} setValue={setMinuteEnd} label="Minute" />
        <Input
          value={priceEnd}
          setValue={setPriceEnd}
          label="Price"
          price={props.price}
        />
      </fieldset>
      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
};

export default FormTrendBroke;
