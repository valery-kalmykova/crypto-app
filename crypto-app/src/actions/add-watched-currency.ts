'use server'

import prisma from "@/lib/clients/prisma";

const addWatchedCurrency = async (name: string, price: string) => {
  await prisma.currency.create({
    data: {
      name: name,
      prices: [price],
    },
  });
};

export default addWatchedCurrency;