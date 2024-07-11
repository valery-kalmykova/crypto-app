"use server";

import prisma from "@/lib/clients/prisma";

const deleteWatchedTrend = async (name: string) => {
  const currency = await prisma.currency.findUnique({
    where: { name: name },
  });
  if (currency!.prices?.length > 0) {
    await prisma.currency.update({
      where: {
        name: String(name),
      },
      data: {
        lastTrendPrice: null,
        lastTrendPriceTime: null,
        trendStep: null,
        trendType: null,
      },
    });
  } else {
    await prisma.currency.delete({
      where: {
        name: String(name),
      },
    });
  }
};

export default deleteWatchedTrend;
