export const baseUrlFutures = "https://fapi.binance.com";

export const destructureBinanceRes = (data: any) => {
    const [
      timestamp,
      open,
      high,
      low,
      close,
      volume,
      closeTime,
      quoteAssetVolume,
      numberOfTrades,
      takerBuyBaseAssetVolume,
      takerBuyQuoteAssetVolume,
      ignored,
    ] = data[0];
    return {
      timestamp,
      open,
      high,
      low,
      close,
      volume,
      closeTime,
      quoteAssetVolume,
      numberOfTrades,
      takerBuyBaseAssetVolume,
      takerBuyQuoteAssetVolume,
      ignored,
    };
  };

  export const sortArray = (arr: any[]) => {
    return arr.sort((a: any, b: any) => (a.symbol > b.symbol ? 1 : -1));
  };