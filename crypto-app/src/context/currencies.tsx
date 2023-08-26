'use client'

import React, {
  SetStateAction,
  Dispatch,
  ReactNode,
  useContext,
  useState,
  createContext,
} from "react";

type ContainerProps = {
  children: ReactNode;
};

type CurrencyContextType = {
  watchedCurrencies: any[];
  setwatchedCurrencies: Dispatch<SetStateAction<any[]>>;
};

const defaultValue = {
  watchedCurrencies: [],
  setwatchedCurrencies: () => {},
};

export const CurrencyContext = createContext<CurrencyContextType>(defaultValue);

export const CurrencyProvider = (props: ContainerProps) => {
  const [watchedCurrencies, setwatchedCurrencies] = useState<any[]>([]);

  return (
    <CurrencyContext.Provider
      value={{
        watchedCurrencies,
        setwatchedCurrencies,
      }}
    >
      {props.children}
    </CurrencyContext.Provider>
  );
};

export function useCurrencyContext() {
  return useContext(CurrencyContext);
}
