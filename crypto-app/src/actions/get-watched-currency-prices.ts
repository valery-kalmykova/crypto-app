"use server";

import prisma from "@/lib/clients/prisma";

const getWatchedCurrenciesPrices = async (activeCurrency: string) => {
  const res = await prisma.currency.findUnique({
    where: {
      name: String(activeCurrency),
    },
  });
  if (!res) {
    return null;
  } else {
    return res;
  }
};

export default getWatchedCurrenciesPrices;
