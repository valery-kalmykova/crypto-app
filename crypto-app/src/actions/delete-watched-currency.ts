'use server'

import prisma from "@/lib/clients/prisma";

const deleteWatchedCurrency = async (name: string) => {
  await prisma.currency.delete({
    where: {
      name: String(name),
    },
  });
};

export default deleteWatchedCurrency;