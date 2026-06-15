//Configs and Types
import { axiosUnauthInstance, getAxiosAuthInstance } from './config.service';

const axiosUser = getAxiosAuthInstance();
const axiosAdmin = getAxiosAuthInstance('admin');


// Create a User
export const createUserFn = async (data: UserCreation) => {
    const response = await axiosUnauthInstance.post("users/create", data);
    return response.data;
}

// Resend Email Verification
export const resendVerificationFn = async () => {
    const response = await axiosUser.get("users/resend");
    return response;
}

// Verify User
export const verifyUserFn = async (data: { verificationCode: string }) => {
    const response = await axiosUser.post("users/verify", data);
    return response.data;
}

// Password Reset Verification
export const passResetVerifyFn = async (data: { email: string }) => {
    const response = await axiosUnauthInstance.post("auth/passwordResetVerification", data);
    return response.data;
}

// Verify Password Reset OTP
export const verifyPassResetOtpFn = async (data: { email: string, otp: string }) => {
    const response = await axiosUnauthInstance.post("auth/verifyPasswordResetOTP", data);
    return response.data;
}

// Reset Password
export const resetPasswordFn = async (data: { email: string, password: string }) => {
    const response = await axiosUnauthInstance.post("auth/resetPassword", data);
    return response.data;
}

// Submit Kyc
export const userKycFn = async (data: FormData) => {
    const response = await axiosUser.patch("users/kyc", data);
    return response.data;
};

// Login User
export const loginUserFn = async (data: UserAuth) => {
    const response = await axiosUnauthInstance.post("auth/login", data);
    return response.data;
};

// Delete Notification
export const deleteNotificationFn = async (id: string) => {
    const response = await axiosUser.delete(`notifications/delete/${id}`);
    return response.data;
}

// Fetch Dashboard Values
export const fetchDashboardValuesFn = async () => {
    const response = await axiosUser.get("transactions/dashboardValues");
    return response.data;
}

// Fetch Prices
export const fetchPricesFn = async () => {
    const response = await axiosUser.get("transactions/fetchPrices");
    return response.data;
}

// Get logged in user details
export const getUserDetailsFn = async () => {
    const response = await axiosUser.get("users/currentUser")
    return response.data;
}

// Get logged in user balance
export const getUserBalanceFn = async () => {
    const response = await axiosUser.get(`users/getBalance`)
    return response.data;
}

// Get a users bank transfer request
export const getUserDepositRequestsFn = async (page: number, limit: number) => {
    const response = await axiosUser.get(`requests/get?page=${page} &limit=${limit}`);
    return response.data;
}

// Create a new bank transfer request
export const createDepositRequestFn = async (data: createRequest) => {
    const response = await axiosUser.post("requests/create", data);
    return response.data;
}

// Edit bank transfer request details
export const patchDepositDetailsFn = async (data: FormData) => {
    const response = await axiosUser.patch(`requests/update`, data);
    return response.data;
}

// Fetch coin details
export const getCoinDetailsFn = async (coin: string) => {
    const response = await axiosUser.get(`transactions/getCoinDetails/${coin}`);
    return response.data;
}

// Fetch coin transactions
export const getCoinTransactionsFn = async (coin: string, page: number, limit: number) => {
    const response = await axiosUser.get(`transactions/getCoinTransactions/${coin}?page=${page}&limit=${limit}`)
    return response.data;
}

// Plans
export const getAllPlansFn = async () => {
    const response = await axiosUser.get(`plans/get`)
    return response.data;
}

// Fetch Type Transactions
export const getUserTypeTransactionFn = async (type: string, page?: number, limit?: number) => {
    const response = await axiosUser.get(`transactions/typeTransactions/${type}?page=${page}&limit=${limit}`);
    return response.data;
}

// Create new Transaction
export const newTransactionFn = async (data: NewTransaction) => {
    const response = await axiosUser.post(`transactions/create`, data);
    return response.data;
}

// Fetch all transactions
export const getAllTxsFn = async (page?: number, limit?: number) => {
    const response = await axiosUser.get(`transactions/userTransactions?page=${page}&limit=${limit}`);
    return response.data;
}

// Create new Investment
export const NewInvestmentFn = async (data: NewInvestment) => {
    const response = await axiosUser.post(`investments/create`, data);
    return response.data;
}

// Fetch all Investments
export const getAllIntsFn = async (page?: number, limit?: number) => {
    const response = await axiosUser.get(`investments/get?page=${page}&limit=${limit}`);
    return response.data;
}

// Update Profile Picture
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfilePictureFn = async (data: FormData): Promise<any> => {
    const response = await axiosUser.patch(`users/updateProfilePicture`, data);
    return response.data;
}

// Update Other Details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateDetailsFn = async (data: any): Promise<any> => {
    const response = await axiosUser.patch(`users/update`, data);
    return response.data;
}

// Fetch a user's referrals
export const getUserReferralFn = async () => {
    const response = await axiosUser.get(`referrals/get`);
    return response.data;
}

// Fetch User Stock Balance
export const getStockBalanceFn = async () => {
    const response = await axiosUser.get(`stocks/balance`);
    return response.data;
}

// Fetch Stock Prices
export const getStockPricesFn = async () => {
    const response = await axiosUser.get(`stocks/stock-prices`);
    return response.data;
}

// Create New Deposit
export const newDepositFn = async (data: NewStockDeposit) => {
    const response = await axiosUser.post(`stocks/deposit`, data);
    return response.data;
}

// Create New Withdrawal
export const newWithdrawalFn = async (data: NewStockWithdrawal) => {
    const response = await axiosUser.post(`stocks/withdraw`, data);
    return response.data;
}

// Fetch Stock History
export const stockHistoryFn = async (page?: number, limit?: number) => {
    const response = await axiosUser.get(`stocks/my-history?page=${page}&limit=${limit}`);
    return response.data;
}

// Fetch Portfolio
export const portfolioFn = async () => {
    const response = await axiosUser.get(`stocks/portfolio`);
    return response.data;
}

// Buy Share
export const buyShareFn = async (data: BuyShares) => {
    const response = await axiosUser.post(`stocks/trade/buy`, data);
    return response.data;
}

// Sell Share
export const sellShareFn = async (data: SellShares) => {
    const response = await axiosUser.post(`stocks/trade/sell`, data);
    return response.data;
}

// Fetch Stock Transactions
export const fetchShareTxsFn = async (symbol: string) => {
    const response = await axiosUser.get(`stocks/history/${symbol}`);
    return response.data;
}

// Fetch the Settings
export const fetchSettingsFn = async () => {
    const response = await axiosUser.get(`settings/get`);
    return response.data;
}

// Fetch Purchase Requests
export const fetchRequestsFn = async () => {
    const response = await axiosUser.get(`stock-requests/get`);
    return response.data;
}

// New Purchase Request
export const newRequestFn = async (data: { stockSymbol: string, shares: number }) => {
    const response = await axiosUser.post(`stock-requests/new`, data);
    return response.data;
}

// Update Purchase Request
export const updateRequestFn = async (data: FormData) => {
    const response = await axiosUser.patch(`stock-requests/update`, data);
    return response.data;
}

// Administration


// Admin Authentication
export const authAdminFn = async (data: { email: string, password: string }) => {
    const response = await axiosUnauthInstance.post(`auth/adminLogin`, data);
    return response.data;
}

// Fetch all Transactions
export const adminTxsFn = async (type: string, page?: number, limit?: number) => {
    const response = await axiosAdmin.get(`transactions/getAllTransactions/${type}?page=${page}&limit=${limit}`);
    return response.data;
}

// Update Transaction
export const adminUpdateTxFn = async (data: { status: string, transactionId: string }) => {
    const response = await axiosAdmin.patch(`transactions/updateTransaction`, data);
    return response.data;
}

// Delete Transaction
export const deleteTxFn = async (transactionId: string) => {
    const response = await axiosAdmin.delete(`transactions/delete/${transactionId}`);
    return response.data;
}

// Fetch all Deposit Requests (Bank Deposit Option)
export const getDepositRtsFn = async (page?: number, limit?: number) => {
    const response = await axiosAdmin.get(`requests/getAll?page=${page}&limit=${limit}`);
    return response.data;
}

// Update Deposit Request (Bank Deposit Option)
export const editDepositRtFn = async (data: EditDepositRequest) => {
    const response = await axiosAdmin.patch(`requests/updateRequest`, data);
    return response.data;
}

// Delete Deposit Request
export const deleteDepositRtFn = async (depositId: string) => {
    const response = await axiosAdmin.delete(`requests/deleteRequest/${depositId}`);
    return response.data;
}

// Fetch all users
export const getUsersFn = async (page?: number, limit?: number) => {
    const response = await axiosAdmin.get(`users/allUsers?page=${page}&limit=${limit}`);
    return response.data;
}

// Get a User
export const adminGetUserFn = async (value: string) => {
    const response = await axiosAdmin.get(`users/getUser/${value}`);
    return response.data;
}

// Update Users
export const adminUpdateUserFn = async (data: AdminUpdateUser) => {
    const response = await axiosAdmin.patch(`users/adminUpdate`, data);
    return response.data;
}

// Get User Balance
export const adminUserBalanceFn = async (userId: string) => {
    const response = await axiosAdmin.post(`transactions/getUserBalance/${userId}`);
    return response.data;
}

// Create User Transaction
export const adminCreateTxFn = async (data: TxPayload) => {
    const response = await axiosAdmin.post(`transactions/createUserTransaction`, data);
    return response.data;
}

// Get Plans for admin
export const adminGetPlansFn = async () => {
    const response = await axiosAdmin.get(`plans/get`)
    return response.data;
}

// Update Plan
export const adminUpdatePlanFn = async (data: EditPlanPayload) => {
    const response = await axiosAdmin.patch(`plans/update`, data);
    return response.data;
}

// Create Plan
export const adminCreatePlanFn = async (data: Omit<EditPlanPayload, "planId">) => {
    const response = await axiosAdmin.post(`plans/create`, data);
    return response.data;
}

// Delete Plan
export const adminDeletePlanFn = async (planId: string) => {
    const response = await axiosAdmin.delete(`plans/delete/${planId}`);
    return response.data;
}

// Get all Investments
export const adminGetIntsFn = async (page?: number, limit?: number) => {
    const response = await axiosAdmin.get(`investments/getAll?page=${page}&limit=${limit}`);
    return response.data;
}

// Update an Investment
export const adminEditIntsFn = async (data: { investmentId: string, status: string }) => {
    const response = await axiosAdmin.patch(`investments/update`, data);
    return response.data;
}

// Fetch all Referrals
export const adminReferralFn = async (page?: number, limit?: number) => {
    const response = await axiosAdmin.get(`referrals/getAll?page=${page}&limit=${limit}`);
    return response.data;
}

// Delete Referral
export const deleteReferralFn = async (referralId: string) => {
    const response = await axiosAdmin.delete(`referrals/delete/${referralId}`);
    return response.data;
}

// Get All Admins
export const adminGetAdminFn = async () => {
    const response = await axiosAdmin.get(`admins/getAdmins`);
    return response.data;
}

// Get Current Logged In Admin
export const adminDetailsFn = async () => {
    const response = await axiosAdmin.get(`admins/getDetails`);
    return response.data;
}

// Update Admin
export const adminUpdateFn = async (data: AdminUpdate) => {
    const response = await axiosAdmin.patch(`admins/updateAdmin`, data);
    return response.data;
}

// Create Notification
export const createNotificationFn = async (data: NotificationPayload) => {
    const response = await axiosAdmin.post(`notification/create`, data);
    return response.data;
}

// Fetch Stock Txs
export const adminGetStockTxsFn = async (page?: number, limit?: number) => {
    const response = await axiosAdmin.get(`stocks/history/all?page=${page}&limit=${limit}`);
    return response.data;
}

// Fetch Purchase Requests
export const adminGetRequestsFn = async (page?: number, limit?: number) => {
    const response = await axiosAdmin.get(`stock-requests/getAll?page=${page}&limit=${limit}`);
    return response.data;
}

// Update Stock Transactions
export const adminUpdateStockTxFn = async (data: { id: string, status: string }) => {
    const response = await axiosAdmin.put(`stocks/status`, data);
    return response.data;
}

// Update Purchase Request
export const adminUpdateRequestFn = async (data: FormData) => {
    const response = await axiosAdmin.patch(`stock-requests/update`, data);
    return response.data;
}

// Delete Stock Transaction
export const adminDeleteStockTxFn = async (id: string) => {
    const response = await axiosAdmin.delete(`stocks/history/${id}`);
    return response.data;
}

// Delete Stock Request
export const adminDeletePurchaseRequestFn = async (id: string) => {
    const response = await axiosAdmin.delete(`stock-requests/delete/${id}`);
    return response.data;
}

// Admin Get Settings
export const adminGetSettingsFn = async () => {
    const response = await axiosAdmin.get(`settings/get`);
    return response.data;
}

// Admin Update Settings
export const adminUpdateSettings = async (data: SettingsPayload) => {
    const response = await axiosAdmin.put(`settings/update`, data);
    return response.data;
}