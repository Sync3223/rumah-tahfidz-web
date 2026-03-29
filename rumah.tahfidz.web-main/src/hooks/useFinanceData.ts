import { useState, useEffect } from 'react';

export const useFinanceData = () => {
  const [financeData, setFinanceData] = useState({
    targetAmount: 50000000000, // Rp 50 Miliar
    collectedAmount: 500000000, // Rp 500 Juta
    lastUpdate: "2026-02-05"
  });

  useEffect(() => {
    const savedFinance = localStorage.getItem('finance_data');
    if (savedFinance) {
      setFinanceData(JSON.parse(savedFinance));
    }
  }, []);

  const updateFinance = (newData: typeof financeData) => {
    setFinanceData(newData);
    localStorage.setItem('finance_data', JSON.stringify(newData));
    window.dispatchEvent(new Event('storage'));
  };

  return { ...financeData, updateFinance };
};