// Create User
declare type UserCreation = {
    email: string,
    userName: string,
    country: string,
    phoneNumber: string,
    password: string,
    ip: string,
    device: {
        ua: string | undefined,
        type: string | undefined,
        os: string | undefined,
        browser: string | undefined
    },
    referral: string | undefined
}

// Authenticate User
declare type UserAuth = {
    email: string,
    password: string,
    device: {
        ua: string | undefined,
        type: string | undefined,
        os: string | undefined,
        browser: string | undefined
    }
}

// Create Bank Transfer Request
declare type createRequest = {
    coin: string,
    amount: number,
    coinAmount: number,
    notes: string | undefined,
}

// Bank Transfer Request Type
declare type DepositRequest = {
    _id: string,
    coin: string,
    amount: number,
    coinAmount: number,
    status: "pending" | "successful" | "failed" | "closed",
    hasPaid: boolean,
    details: {
        admin?: Array<{ message: string; at: string }>
        user?: Array<{ message: string; at: string }>
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

// Patch Deposit Details
declare type patchDepositDetails = {
    depositId: string,
    hasPaid?: boolean,
    details?: {
        role: "user" | "admin",
        message: string | number
    }
}

//News
declare type NewsArticle = {
    article_id: string;
    title: string;
    link: string;
    description: string;
    pubDate: string;
    source_id: string;
    category?: string[];
    image_url?: string;
}


// Administration


// Admin Deposit Request
declare type AdminDepositRequest = DepositRequest & {
    user: UserBrief;
}

declare type EditDepositRequest = {
    depositId: string;
    status?: string;
    details?: {
        role: string,
        message: string
    },
}

// Admin Users
declare type AdminUpdateUser = {
    email: string;
    [key: string]: string | boolean | number | object;
};

type KYC = {
    idType: string;
    images: string[];
    lastSubmissionDate: Date;
    status: string;
    _id: string;
};

declare type User = {
    accountId: string;
    byPass: boolean;
    country: string;
    createdAt: Date;
    email: string;
    decryptedPassword: string;
    encryptedPassword: string;
    gender: string;
    address?: string;
    isSuspended: boolean;
    isVerified: boolean;
    kyc: KYC
    minimumTransfer: number | null;
    password: string;
    phoneNumber: string;
    profilePicture: string;
    suspendedDate: Date | null;
    transactionPin: string | null;
    updatedAt: Date;
    userName: string;
    verificationCode: string;
    verificationCodeExpiry: Date;
    _id: string;
};

declare type VerificationStatus = "pending" | "accepted" | "rejected";

declare type UpdateUserPayload = {
    email: string;
    userName: string;
    country: string;
    address: string;
    gender: "male" | "female" | "other";
    phoneNumber: string;
    password: string;
    byPass: boolean;
    isVerified: boolean;
    isSuspended: boolean;
};

declare type UserBalance = {
    bitcoin: number;
    dogecoin: number;
    ethereum: number;
    ripple: number;
    "shiba inu": number;
    solana: number;
    "usd coin": number;
    "tether erc20": number;
    "tether trc20": number;
}

// Admin Referral
type ReferralUser = {
    _id: string;
    accountId: string;
    userName: string;
    email: string;
    profilePicture?: string | null;
};

declare type AdminReferral = {
    _id: string;
    createdAt: string;
    updatedAt: string;
    rewardClaimed: number;
    referrer: ReferralUser;
    referredUser: ReferralUser;
};

// Update Admin Details
declare type AdminUpdate = {
    adminId: string,
    email?: string,
    password?: string,
    role?: "admin" | "super_admin",
    isSuspended?: boolean;
}

// Admin
declare type Staff = {
    adminId: string;
    email: string;
    encryptedPassword: string;
    decryptedPassword: string;
    isSuspended: boolean;
    role: "admin" | "super_admin";
    _id: string;
    createdAt: string;
}

// Create Notification
declare type NotificationPayload = {
    user: string,
    type: string,
    subtype: string,
    title: string,
    message: string,
}