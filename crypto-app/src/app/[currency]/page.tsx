import { getCurrentPrice } from "@/actions/get-current-price";
import styles from "./styles.module.css";
import Form from "@/components/FormPrice/Form";
import ChipPrice from "@/components/ChipPrice/ChipPrice";
import getWatchedCurrenciesPrices from "@/actions/get-watched-currency-prices";

export default async function CurrencyPage({
  params,
}: {
  params: { currency: string };
}) {
  const currentPrice = await getCurrentPrice(params.currency);
  const watchedData = await getWatchedCurrenciesPrices(params.currency);
  
  return (
    <div className={styles.container}>
      <Form price={currentPrice} activeCurrency={params.currency} />
      <ChipPrice
        activeCurrency={params.currency}
        data={watchedData}
        currentPrice={currentPrice}
      />
    </div>
  );
}
