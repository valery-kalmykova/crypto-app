import { getCurrentPrice } from "@/actions/get-current-price";
import styles from "./styles.module.css";
import Form from "@/components/FormPrice/Form";
import ChipPrice from "@/components/ChipPrice/ChipPrice";
import getWatchedCurrenciesPrices from "@/actions/get-watched-currency-prices";
import FormTrendBroke from "@/components/FormTrendBroke/FormTrendBroke";

export default async function CurrencyPage({
  params,
}: {
  params: { currency: string };
}) {
  const currentPrice = await getCurrentPrice(params.currency);
  const watchedData = await getWatchedCurrenciesPrices(params.currency);

  return (
    <div className={styles.container}>
      <h2>Follow price</h2>
      <Form price={currentPrice} activeCurrency={params.currency} />
      <ChipPrice
        activeCurrency={params.currency}
        data={watchedData}
        currentPrice={currentPrice}
      />
      <h2>Follow trend</h2>
      <FormTrendBroke price={currentPrice} activeCurrency={params.currency} />
    </div>
  );
}
