'use server'

export const getBinanceCurrencies = async () => {
  const response = await fetch("https://fapi.binance.com/fapi/v1/exchangeInfo", { cache: "no-store" });
  return response.json();
};
