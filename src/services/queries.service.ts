import { useQuery } from "@tanstack/react-query";

// APIs
import { adminDetailsFn, adminGetAdminFn, adminGetIntsFn, adminGetPlansFn, adminGetUserFn, adminReferralFn, adminTxsFn, adminUserBalanceFn, fetchDashboardValuesFn, fetchPricesFn, getAllIntsFn, getAllPlansFn, getAllTxsFn, getCoinDetailsFn, getCoinTransactionsFn, getDepositRtsFn, getUserBalanceFn, getUserDepositRequestsFn, getUserDetailsFn, getUserReferralFn, getUsersFn, getUserTypeTransactionFn } from "./api.service";

// Get Dashboard Values
export function useDashboardValues() {
    return useQuery({
        queryKey: ['dashboardValues'],
        queryFn: () => fetchDashboardValuesFn()
    })
}

//Get Prices
export function usePrices() {
    return useQuery({
        queryKey: ['prices'],
        queryFn: () => fetchPricesFn()
    })
}

//Get Current logged In User Details
export function useUserDetails() {
    return useQuery({
        queryKey: ["userDetails"],
        queryFn: () => getUserDetailsFn()
    })
}

//Get Current Logged In User Balance
export function useUserBalance() {
    return useQuery({
        queryKey: ['userBalance'],
        queryFn: () => getUserBalanceFn()
    })
}

// Get User Bank Transfer Requests
export function useUserDeposits(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ['userDeposits', page, limit],
        queryFn: () => getUserDepositRequestsFn(page, limit)
    })
}

// Get Coin Details
export function useGetCoinDetails(coin: string) {
    return useQuery({
        queryKey: [`${coin}_details`],
        queryFn: () => getCoinDetailsFn(coin)
    })
}

// Get Coin Transactions
export function useUserCoinTransactions(coin: string, page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: [`${coin}_transactions`, page, limit],
        queryFn: () => getCoinTransactionsFn(coin, page, limit)
    })
}

// Get Plans
export function usePlans() {
    return useQuery({
        queryKey: ["allPlans"],
        queryFn: () => getAllPlansFn()
    })
}

// Get any Transaction type you want
export function useUserTypeTransactions(type: string, page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: [`${type}_transactions`, page, limit],
        queryFn: () => getUserTypeTransactionFn(type, page, limit)
    })
}

// Get all user Transactions
export function useUserAllTxs(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ['transactions', page, limit],
        queryFn: () => getAllTxsFn(page, limit),
        staleTime: 0,
    });
}


// Get all user Investments
export function useUserAllInts(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ['investments'],
        queryFn: () => getAllIntsFn(page, limit)
    })
}

// Get all user referrals
export function useUserAllRefs() {
    return useQuery({
        queryKey: ['referrals'],
        queryFn: () => getUserReferralFn()
    })
}


// Administrations

// Get all transactions
export function useAdminTxs(type: string, page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ["adminTransactions", type, page, limit],
        queryFn: () => adminTxsFn(type, page, limit)
    })
}

// Get all Deposit Requests
export function useAdminRts(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ["adminDepositRts", page, limit],
        queryFn: () => getDepositRtsFn(page, limit)
    })
}

// Get all Users
export function useAdminUsers(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ["adminUsers", page, limit],
        queryFn: () => getUsersFn(page, limit)
    })
}

// Get a User  with full option
export function useAdminGetUser(value: string) {
    return useQuery({
        queryKey: ["adminUser", value],
        queryFn: () => adminGetUserFn(value),
        enabled: value.length >= 6
    })
}

// Get User Balance
export function useAdminUserBalance(userId: string) {
    return useQuery({
        queryKey: [`${userId}-balance`],
        queryFn: () => adminUserBalanceFn(userId)
    })
}

// Get Plans
export function useAdminPlans() {
    return useQuery({
        queryKey: [`adminPlans`],
        queryFn: () => adminGetPlansFn()
    })
}

// Get Investments
export function useAdminInts(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: [`adminInvestments`, page, limit],
        queryFn: () => adminGetIntsFn(page, limit)
    })
}

//Get Referrals
export function useAdminRefs(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: [`adminReferrals`, page, limit],
        queryFn: () => adminReferralFn(page, limit)
    })
}


// Get all Admins
export function useGetAdmins() {
    return useQuery({
        queryKey: ["admins"],
        queryFn: () => adminGetAdminFn(),
    })
}

// Get Current Logged In Admin
export function useGetCurrentAdmin() {
    return useQuery({
        queryKey: ["currentAdmin"],
        queryFn: () => adminDetailsFn(),
    })
}