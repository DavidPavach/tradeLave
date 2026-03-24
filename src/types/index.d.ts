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