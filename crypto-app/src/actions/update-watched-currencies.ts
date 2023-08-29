'use server'

import prisma from "@/lib/clients/prisma";

export const addNotificationPrice = async (name: string, price: string) => {
  const currency = await prisma.currency.findUnique({
    where: { name: name },
  });
  let newprices = currency?.prices!;
  newprices.push(price);
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

export const deleteNotificationPrice = async (name: string, price: string) => {
  const currency = await prisma.currency.findUnique({
    where: { name: name },
  });
  let newprices = currency?.prices!;
  newprices.splice(newprices.indexOf(price), 1);
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
}