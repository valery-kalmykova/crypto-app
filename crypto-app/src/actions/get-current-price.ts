'use server'

import { baseUrlFutures } from "@/lib/shared";

export const getCurrentPrice = async (symbol: string) => {
  const response = await fetch(
    `${baseUrlFutures}/fapi/v1/ticker/price?symbol=${symbol}`,
    { cache: "no-store" }
  );
  const data: any = await response.json();
  const price = data.price;
  return price;
};
