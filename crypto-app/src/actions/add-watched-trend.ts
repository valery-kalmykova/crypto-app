"use server";

import prisma from "@/lib/clients/prisma";

const addWatchedTrend = async (
  name: string,
  price: string,
  time: string,
  trendStep: string,
  trendType: "bull" | "bear"
) => {
  const currency = await prisma.currency.findUnique({
    where: { name: name },
  });
  if (!currency) {
    await prisma.currency.create({
      data: {
        name: name,
        lastTrendPrice: price,
        lastTrendPriceTime: time,
        trendStep: trendStep,
        trendType: trendType,
      },
    });
  } else {
    await prisma.currency.update({
      where: {
        name: String(name),
      },
      data: {
        lastTrendPrice: price,
        lastTrendPriceTime: time,
        trendStep: trendStep,
        trendType: trendType,
      },
    });
  }
};

export default addWatchedTrend;
