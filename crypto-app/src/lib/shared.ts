import deleteWatchedCurrency from "@/actions/delete-watched-currency";
import { deleteNotificationPrice } from "@/actions/update-watched-currencies";

export const baseUrlFutures = "https://fapi.binance.com";

export const destructureBinanceRes = (data: any) => {
    const [
      timestamp,
      open,
      high,
      low,
      close,
      volume,
      closeTime,
      quoteAssetVolume,
      numberOfTrades,
      takerBuyBaseAssetVolume,
      takerBuyQuoteAssetVolume,
      ignored,
    ] = data[0];
    return {
      timestamp,
      open,
      high,
      low,
      close,
      volume,
      closeTime,
      quoteAssetVolume,
      numberOfTrades,
      takerBuyBaseAssetVolume,
      takerBuyQuoteAssetVolume,
      ignored,
    };
  };

  export const sortArray = (arr: any[]) => {
    return arr.sort((a: any, b: any) => (a.symbol > b.symbol ? 1 : -1));
  };

  export const deleteNotification = async (props: {prices: string[], price: string, activeCurrency: string}) => {
    if (props.prices.length === 1) {
      await fetch(`/api/currencies/${props.activeCurrency}`, {
        method: "DELETE",
      });
    } else {
      await fetch(`/api/currencies/${props.activeCurrency}`, {
        method: "PATCH",
        body: JSON.stringify({ price: props.price }),
      });
    }
  };

  export const deleteNotificationServer = async (props: {prices: string[], price: string, activeCurrency: string}) => {
    if (props.prices.length === 1) {
      await deleteWatchedCurrency(props.activeCurrency)
    } else {
      await deleteNotificationPrice(props.activeCurrency, props.price)
    }
  };