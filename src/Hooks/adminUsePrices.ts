// Enums and Hooks
import { coinMap } from "@/enum";
import { usePrices } from "@/services/queries.service";

export const useCoinPrice = (internalCoinKey: string) => {
  const { data: PricesData } = usePrices();

  // Handle missing data immediately
  if (!PricesData?.data || !internalCoinKey) return 0;


  const apiId = coinMap[internalCoinKey];
  
  // Look up the price or default to 0
  const price = PricesData.data[apiId]?.usd || 0;

  return price;
};