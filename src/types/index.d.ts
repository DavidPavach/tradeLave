// Transactions
type TransactionType = 'deposit' | 'withdrawal' | 'bonus' | 'penalty' | 'referral' | 'roi';

type TransactionStatus = 'successful' | 'failed' | 'pending';

type TransactionCoin = 'bitcoin' | 'ethereum' | 'tether trc20' | 'tether erc20'
  | 'solana' | 'usd coin' | 'dogecoin' | 'ripple' | 'shiba inu'

declare type Transaction = {
  _id: string;
  user: string;
  coin: TransactionCoin;
  transactionType: TransactionType;
  amount: number;
  coinAmount: number;
  network: string | null;
  walletAddress: string;
  transactionHash: string;
  status: TransactionStatus;
  details: Record<string, string | number>;
  createdAt: Date;
  updatedAt: Date;
};

declare type NewTransaction = {
  coin: TransactionCoin;
  transactionType: TransactionType;
  amount: number;
  coinAmount;
  transactionHash?: string;
  network?: string;
  walletAddress?: string;
}

// Admin Transaction Payload
declare type TxPayload = {
  user: string;
  coin: string;
  transactionType: string;
  amount: number;
  coinAmount: number;
  network?: string;
  walletAddress?: string;
  status: string;
};

// Bank Transfer Request Type
declare type DepositRequest = {
  _id: string,
  coin: string,
  amount: number,
  coinAmount: number,
  status: "pending" | "successful" | "failed" | "closed",
  hasPaid: boolean,
  details: {
    admin?: Array<{ message: string; at: string, file?: string }>
    user?: Array<{ message: string; at: string, file?: string }>
  },
  createdAt: Date,
  updatedAt: Date,
}

type DepositMessage = {
  message: string,
  at: string,
  file?: string
}

// Bank Transfer Request Details Props
declare type DepositRequestDetailsProps = {
  request: {
    _id: string,
    details: {
      admin?: DepositMessage[],
      user?: DepositMessage[],
    }
    hasPaid: boolean,
    status: string,
  }
}

// Plans
declare type Plans = {
  _id: string;
  title: string;
  type: "land" | "cryptocurrency";
  minValue: number;
  maxValue: number;
  roi: number;
  durationDays: number;
  maxExecutions: number;
  createdAt: Date;
  updatedAt: Date;
};

declare type EditPlanPayload = {
  planId: string;
  title: string;
  type: string;
  minValue: number;
  maxValue: number;
  roi: number;
  durationDays: number;
  maxExecutions: number;
};


// Investments
declare type NewInvestment = {
  coin: TransactionCoin
  plan: string;
  amount: number;
  rate: number;
}

declare type Investment = {
  _id: string;
  capital: number;
  coin: TransactionCoin;
  durationInDays: number;
  endsAt: string;
  startedAt: string;
  plan: string;
  returnAmount: number;
  roi: number;
  status: "active" | "completed" | "cancelled";
  roiTransactionId;
  createdAt: Date;
  updatedAt: Date;
};

// Referral
declare type Referral = {
  _id: string;
  rewardClaimed: number;
  createdAt: string;
  updatedAt: string;
  referrer: string;
  referredUser: {
    _id: string;
    id: string;
    userName: string;
    email: string;
    accountId: string;
    profilePicture?: string;
  };
}

// Stock History

type StockTxType = 'DEPOSIT' | 'WITHDRAWAL' | 'BUY' | 'SELL' | 'TRADE_SETTLEMENT';
type StockTxStats = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

declare type StockTxs = {
  _id: string;
  userId: string;
  type: StockTxType;
  status: StockTxStats;
  usdAmount: number;

  cryptoSymbol?: 'bitcoin' | 'ethereum' | 'tether trc20' | 'tether erc20';
  cryptoAmount?: number;
  walletAddress?: string;
  hash?: string;

  stockSymbol?: string;
  shares?: number;
  pricePerShare?: number;

  createdAt: string;
  updatedAt: string;
}

// Portfolio
type CryptoAsset = {
  symbol: string;
  amount: number;
  livePriceUsd: number;
  totalValueUsd: number;
}

type Stock = {
  symbol: string;
  shares: number;
  livePriceUsd: number;
  totalValueUsd: number;
}

type Assets = {
  crypto: CryptoAsset[];
  stocks: Stock[];
}

type Volumes = {
  totalDeposits: number;
  totalWithdrawals: number;
}

type Summary = {
  totalCryptoValueUsd: number;
  totalStockValueUsd: number;
  totalPortfolioValueUsd: number;
}

declare type Portfolio = {
  assets: Assets;
  recentActivity: StockTxType[];
  summary: Summary;
  volumes: Volumes;
};

// Settings
declare type Settings = {
  createdAt: string;
  minShares: number;
  noWithdrawal: boolean;
  sharePrice: number;
  updatedAt: string;
  _id: string;
};

// Stock Deposit Request

declare type Details = {
  admin?: Array<{ message: string; at: string, file?: string }>
  user?: Array<{ message: string; at: string, file?: string }>
}

declare type StockRequest = {
  createdAt: string;
  details: Details,
  hasPaid: boolean;
  shares: number;
  status: string;
  stockSymbol: string;
  updatedAt: string;
  usdAmount: number;
  user: string;
  __v: number;
  _id: string;
}

// Admin
declare type UserBrief = {
  _id: string;
  userName: string;
  email: string;
  accountId: string;
  profilePicture?: string;
};

// Transaction
declare type AdminTx = Transaction & {
  user: UserBrief;
};


// Investment
declare type AdminInts = Investment & {
  user: UserBrief;
}

// Stock Txs
declare type AdminStockTxs = {
  _id: string;
  userId: UserBrief;
  type: StockTxType;
  status: StockTxStats;
  usdAmount: number;

  cryptoSymbol?: 'bitcoin' | 'ethereum' | 'tether trc20' | 'tether erc20';
  cryptoAmount?: number;
  walletAddress?: string;
  hash?: string;

  stockSymbol?: string;
  shares?: number;
  pricePerShare?: number;

  createdAt: string;
  updatedAt: string;
}

// Stock Purchase Request
declare type AdminStockPurchase = {
  createdAt: string;
  details: Details,
  hasPaid: boolean;
  shares: number;
  status: string;
  stockSymbol: string;
  updatedAt: string;
  usdAmount: number;
  user: UserBrief;
  _id: string;
}