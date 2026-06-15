// ID Types
export const ID_TYPES = [
  { value: "passport", label: "Passport" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "national_id", label: "National ID Card" },
  { value: "residence_permit", label: "Residence Permit" },
]

// Gender options
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer not to say", label: "Prefer not to say" },
]

// Maximum file size (20MB in bytes)
export const MAX_FILE_SIZE = 10 * 1024 * 1024

export const COINS = ["bitcoin", "ethereum", "tether trc20", "tether erc20", "solana", "usd coin", "dogecoin", "ripple", "shiba inu"]

export type CoinKey = keyof typeof coinMeta;
export type MarketRow = {
  key: CoinKey;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change24h: number;
};

// Map complex coin names to API (Price) keys
export const coinMap: Record<string, string> = {
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
  ripple: 'ripple',
  'tether trc20': 'tether',
  'tether erc20': 'tether',
  solana: 'solana',
  'shiba inu': 'shiba-inu',
  dogecoin: 'dogecoin',
  "usd coin": 'usd-coin'
};

// Coin Logos, Symbol and Name
export const coinMeta: Record<string, { name: string; symbol: string; logo: string }> = {
  bitcoin: { name: "Bitcoin", symbol: "BTC", logo: "/coins/bitcoin.svg" },
  ethereum: { name: "Ethereum", symbol: "ETH", logo: "/coins/ethereum.svg" },
  "tether trc20": { name: "Tether TRC20", symbol: "USDT", logo: "/coins/tether.svg" },
  "tether erc20": { name: "Tether ERC20", symbol: "USDT", logo: "/coins/tether.svg" },
  solana: { name: "Solana", symbol: "SOL", logo: "/coins/solana.svg" },
  dogecoin: { name: "Dogecoin", symbol: "DOGE", logo: "/coins/dogecoin.svg" },
  "usd coin": { name: "USD Coin", symbol: "USDC", logo: "/coins/usdc.svg" },
  ripple: { name: "Ripple", symbol: "XRP", logo: "/coins/xrp.svg" },
  "shiba inu": { name: "Shiba Inu", symbol: "SHIB", logo: "/coins/shiba_inu.svg" },
};

// Minimum Deposit
export const MINI_DEPOSIT_USD = import.meta.env.VITE_MINI_DEPOSIT_USD;

// Coin Wallets and QR Codes
export const paymentMeta: Record<string, { qrCode: string, walletAddress: string }> = {
  bitcoin: { qrCode: "/wallets/btc.jpeg", walletAddress: "bc1qeh6xmkq0hr7dt44ljsswzg536pj2uvffp4evua" },
  ethereum: { qrCode: "/wallets/eth.jpeg", walletAddress: "0x06629BDcBB0BBF6B18Da3f68D5FB4B8f28828fac" },
  "tether trc20": { qrCode: "/wallets/trc20.jpeg", walletAddress: "TVQVr411u17XXoFb3jvAkkSMLVBNdmKScf" },
  "tether erc20": { qrCode: "/wallets/erc20.jpeg", walletAddress: "0x06629BDcBB0BBF6B18Da3f68D5FB4B8f28828fac" },
  solana: { qrCode: "/wallets/sol.jpeg", walletAddress: "4Cz3yBPJjaoACosiUoit1gfmgbh2by4D6VkXZatZyjsb" },
  dogecoin: { qrCode: "/wallets/dogecoin.jpeg", walletAddress: "DBdmbaw4X13cyjBZT5gr8Vy6F4rMbd3EEe" },
  "usd coin": { qrCode: "/wallets/usdc.jpeg", walletAddress: "0x06629BDcBB0BBF6B18Da3f68D5FB4B8f28828fac" },
  ripple: { qrCode: "/wallets/xrp.jpeg", walletAddress: "rNG5awqdzzHo13ZDfSdFzeNuDmdQYBaNXN" },
  "shiba inu": { qrCode: "/wallets/shiba-inu.jpeg", walletAddress: "0x06629BDcBB0BBF6B18Da3f68D5FB4B8f28828fac" },
}

// Stocks
export const stockMeta: Record<string, { logo: string, name: string }> = {
  AAPL: { logo: "/stocks/aapl.svg", name: "Apple Inc." },
  GOOGL: { logo: "/stocks/googl.svg", name: "Alphabet Inc (Google) Class A" },
  TSLA: { logo: "/stocks/tsla.svg", name: "Tesla, Inc." },
  MSFT: { logo: "/stocks/msft.svg", name: "Microsoft Corp." },
  AMZN: { logo: "/stocks/amzn.svg", name: "Amazon.com, Inc." },
  SPCX: { logo: "/stocks/spacex.png", name: "Space Exploration Tech. Corp." }
}

// Stock Payment Meta
export const stockPaymentMeta: Record<string, { qrCode: string, walletAddress: string }> = {
  "tether erc20": { qrCode: "/stockWallet/erc20.jpeg", walletAddress: "0x3e3eBA0B763d8D1307b34864B5Da3542d7B746bd" },
  "tether trc20": { qrCode: "/stockWallet/trc20.jpeg", walletAddress: "TVUuvWiADZhDAApD6B3cciYH8ptSPidceG" },
  ethereum: { qrCode: "/stockWallet/ethereum.jpeg", walletAddress: "0x3e3eBA0B763d8D1307b34864B5Da3542d7B746bd" },
  bitcoin: { qrCode: "/stockWallet/bitcoin.jpeg", walletAddress: "bc1qnzny4mswfalyesrv2czjjejy774w9mmlnta7mh" }
}

// Page Limit
export const PAGE_LIMIT = 50