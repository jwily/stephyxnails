import { createContext, useContext, useState } from 'react';

const TotalPriceContext = createContext();

export const TotalPriceProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const updateTotalPrice = (newPrice) => {
    setTotalPrice(newPrice);
  };

  return (
    <TotalPriceContext.Provider value={{ totalPrice, updateTotalPrice }}>
      {children}
    </TotalPriceContext.Provider>
  );
};

export const useTotalPrice = () => useContext(TotalPriceContext);

