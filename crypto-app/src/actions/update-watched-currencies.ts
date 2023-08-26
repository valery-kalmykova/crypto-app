'use server'

import prisma from "@/lib/clients/prisma";

const updateWatchedCurrencies = async (name: string, price: string) => {
  const currency = await prisma.currency.findUnique({
    where: { name: name },
  });
  let newprices = currency?.prices!;
  if (newprices.includes(price)) {
    newprices.splice(newprices.indexOf(price), 1);
  } else {
    newprices.push(price);
  }
  await prisma.currency.update({
    where: {
      name: String(name),
    },
    data: {
      prices: {
        set: newprices,
      },
    },
  });
};

export default updateWatchedCurrencies;