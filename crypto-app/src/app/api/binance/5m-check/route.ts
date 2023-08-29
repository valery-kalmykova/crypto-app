import deleteWatchedCurrency from "@/actions/delete-watched-currency";
import { deleteNotificationPrice } from "@/actions/update-watched-currencies";
import prisma from "@/lib/clients/prisma";
import { baseUrlFutures, destructureBinanceRes } from "@/lib/shared";
import { Ialtcoins, AltcoinPrices } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const fetchAltcoinPrices = async (
  altcoins: Ialtcoins[],
  intervalVal: string
): Promise<AltcoinPrices> => {
  const altcoinPrices: AltcoinPrices = {};

  const serverTime = await fetch(`${baseUrlFutures}/fapi/v1/time`, {
    cache: "no-store",
  });
  const serverTimeData = await serverTime.json();
  const interval = intervalVal;
  const limit = 1000;
  let startTime;
  if (interval === "5m") {
    startTime =
      new Date(serverTimeData.serverTime).setSeconds(0, 0) - 5 * 60 * 1000;
  } else if (interval === "4h") {
    startTime =
      new Date(serverTimeData.serverTime).setSeconds(0, 0) - 4 * 60 * 60 * 1000;
  }

  for (let i = 0; i < altcoins.length; i++) {
    let altcoin = "";
    altcoins[i].name
      ? (altcoin = altcoins[i].name)
      : (altcoin = altcoins[i].symbol!);
    const response = await fetch(
      `${baseUrlFutures}/fapi/v1/klines?symbol=${altcoin}&interval=${interval}&limit=${limit}&startTime=${startTime}`,
      { cache: "no-store" }
    );
    const data: any[][] = await response.json();
    const { high, low, open, close } = destructureBinanceRes(data);
    altcoinPrices[altcoin] = {
      max: parseFloat(high),
      min: parseFloat(low),
      open: parseFloat(open),
      close: parseFloat(close),
    };
  }

  return altcoinPrices;
};

const sendTelegramNotification = async (message: string): Promise<void> => {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.CHAT_ID;
  console.log(chatId);
  await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`
  );
};

// const deleteWatchedCurrency = async (name: string) => {
//   await prisma.currency.delete({
//     where: {
//       name: String(name),
//     },
//   });
// };

// const deleteNotificationPrice = async (name: string, price: string) => {  
//   const currency = await prisma.currency.findUnique({
//     where: { name: name },
//   });
//   let newprices = currency?.prices!;
//   newprices.splice(newprices.indexOf(price), 1);
//   await prisma.currency.update({
//     where: {
//       name: String(name),
//     },
//     data: {
//       prices: {
//         set: newprices,
//       },
//     },
//   });
// }

export async function GET(request: NextRequest) {
  const altcoins = await prisma.currency.findMany();
  const prices = await fetchAltcoinPrices(altcoins, "5m");
  if (altcoins.length > 0) {
    for (let i = 0; i < altcoins.length; i++) {
      const targetAltcoin = altcoins[i].name;
      const targetPrice = altcoins[i].prices;
      const targetAltcoinMaxPrice = prices[targetAltcoin]?.max;
      const targetAltcoinMinPrice = prices[targetAltcoin]?.min;
      for (let i = 0; i < targetPrice.length; i++) {
        if (
          Number(targetPrice[i]) >= targetAltcoinMinPrice &&
          Number(targetPrice[i]) <= targetAltcoinMaxPrice
        ) {
          await sendTelegramNotification(
            `${targetAltcoin} target price ${targetPrice[i]} reached.`
          );
          if (targetPrice.length === 1) {
            await deleteWatchedCurrency(targetAltcoin)
          } else {
            await deleteNotificationPrice(targetAltcoin, targetPrice[i])
          }
          continue;
        }
      }
      continue;
    }
  }
  return NextResponse.json(altcoins);
}
