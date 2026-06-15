import { useMutation, useQueryClient } from "@tanstack/react-query";

// API Endpoints
import { adminCreatePlanFn, adminCreateTxFn, adminDeletePlanFn, adminDeletePurchaseRequestFn, adminDeleteStockTxFn, adminEditIntsFn, adminUpdateFn, adminUpdatePlanFn, adminUpdateRequestFn, adminUpdateSettings, adminUpdateStockTxFn, adminUpdateTxFn, adminUpdateUserFn, authAdminFn, buyShareFn, createDepositRequestFn, createNotificationFn, createUserFn, deleteDepositRtFn, deleteReferralFn, deleteTxFn, editDepositRtFn, loginUserFn, newDepositFn, NewInvestmentFn, newRequestFn, newTransactionFn, newWithdrawalFn, passResetVerifyFn, patchDepositDetailsFn, resendVerificationFn, resetPasswordFn, sellShareFn, updateDetailsFn, updateProfilePictureFn, updateRequestFn, userKycFn, verifyPassResetOtpFn, verifyUserFn } from "./api.service";

//Create New Users
export function useRegisterUser() {
    return useMutation({
        mutationFn: (data: UserCreation) => createUserFn(data),
        onError: (error) => {
            console.error("Registration failed:", error);
        }
    })
}

//Resend Verification Email
export function useResendVerification() {
    return useMutation({
        mutationFn: () => resendVerificationFn(),
        onError: (error) => {
            console.error("Resend Verification Code failed:", error);
        }
    })
}

//Verify User
export function useVerifyUser() {
    return useMutation({
        mutationFn: (data: { verificationCode: string }) => verifyUserFn(data),
        onError: (error) => {
            console.error("User Verification failed:", error);
        }
    })
}

// Password Reset Verification
export function usePasswordResetVerification() {

    return useMutation({
        mutationFn: (data: { email: string }) => passResetVerifyFn(data),
        onError: (error) => {
            console.error("Password reset otp email failed:", error);
        }
    })
}

// Verify Password OTP
export function useVerifyPasswordResetOTP() {

    return useMutation({
        mutationFn: (data: { email: string, otp: string }) => verifyPassResetOtpFn(data),
        onError: (error) => {
            console.error("User password reset verification failed:", error);
        }
    })
}

// Reset Password
export function usePasswordReset() {

    return useMutation({
        mutationFn: (data: { email: string; password: string; }) => resetPasswordFn(data),
        onError: (error) => {
            console.error("User password reset failed:", error);
        }
    })
}

//Kyc
export function useUserKyc() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => userKycFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Kyc failed:", error);
        }
    })
}

// Authenticate Users
export function useAuthUser() {
    return useMutation({
        mutationFn: (data: UserAuth) => loginUserFn(data),
        onError: (error) => {
            console.error("Login failed:", error);
        },
    })
}

// Create New Bank Transfer Request
export function useCreateDepositRequest() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: createRequest) => createDepositRequestFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDeposits'] });
        },
        onError: (error) => {
            console.error("User bank transfer request failed:", error);
        }
    })
}

// Patch Bank Transfer Request Details
export function usePatchDepositDetails() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => patchDepositDetailsFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDeposits'] });
        },
        onError: (error) => {
            console.error("User deposit details update failed:", error);
        }
    })
}

// Create new Transaction
export function useNewTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: NewTransaction) => newTransactionFn(data),
        onSuccess: (_result, variables) => {
            const typeKey = `${variables.transactionType ?? variables.transactionType}_transactions`;
            queryClient.invalidateQueries({ queryKey: [typeKey] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: (error) => {
            console.error('User new transaction failed:', error);
        },
    });
}

// Create new Investment
export function useNewInvestment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: NewInvestment) => NewInvestmentFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investments'] });
        },
        onError: (error) => {
            console.error('User new investment failed:', error);
        },
    });
}

// Update Profile Picture
export function useUpdateProfilePicture() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => updateProfilePictureFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Profile Picture Update failed:", error);
        }
    })
}

// Update User Profile
export function useUpdateUserProfile() {

    const queryClient = useQueryClient();
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: (data: any) => updateDetailsFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Profile Update failed:", error);
        }
    })
}

// Create a new deposit
export function useNewStockDeposit() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: NewStockDeposit) => newDepositFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock-history'] });
            queryClient.invalidateQueries({ queryKey: ['stock-balance'] });
            queryClient.invalidateQueries({ queryKey: ['stock-portfolio'] });
        },
        onError: (error) => {
            console.error("User Stock Deposit failed:", error);
        }
    })
}

// Create a new withdrawal
export function useNewStockWithdrawal() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: NewStockWithdrawal) => newWithdrawalFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock-history'] });
            queryClient.invalidateQueries({ queryKey: ['stock-balance'] });
            queryClient.invalidateQueries({ queryKey: ['stock-portfolio'] });
        },
        onError: (error) => {
            console.error("User Stock Withdrawal failed:", error);
        }
    })
}

// Buy new shares
export function useNewShares() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: BuyShares) => buyShareFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock-history'] });
            queryClient.invalidateQueries({ queryKey: ['stock-balance'] });
            queryClient.invalidateQueries({ queryKey: ['stock-portfolio'] });
            queryClient.invalidateQueries({ queryKey: ['stock-transactions'] });
        },
        onError: (error) => {
            console.error("Buying of Shares failed:", error);
        }
    })
}


// Sell Shares
export function useSellShares() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SellShares) => sellShareFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock-history'] });
            queryClient.invalidateQueries({ queryKey: ['stock-balance'] });
            queryClient.invalidateQueries({ queryKey: ['stock-portfolio'] });
            queryClient.invalidateQueries({ queryKey: ['stock-transactions'] });
        },
        onError: (error) => {
            console.error("Selling of Shares failed:", error);
        }
    })
}

// New Purchase Request
export function usePurchaseRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { stockSymbol: string, shares: number }) => newRequestFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchase-requests'] });
        },
        onError: (error) => {
            console.error("New Stock Purchase Request failed:", error);
        }
    })
}

// Update Purchase Request
export function useUpdateRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => updateRequestFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchase-requests'] });
        },
        onError: (error) => {
            console.error("Stock Purchase Request Update failed:", error);
        }
    })
}



// Administration


// Admin Authentication
export function useAdminAuth() {

    return useMutation({
        mutationFn: (data: { email: string, password: string }) => authAdminFn(data),
        onError: (error) => {
            console.error("Admin authentication:", error);
        }
    })
}

// Update Transaction
export function useAdminUpdateTx() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { status: string, transactionId: string }) => adminUpdateTxFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTransactions'] });
        },
        onError: (error) => {
            console.error("Transaction Editing failed:", error);
        },
    })
}

// Delete Transaction
export function useAdminDeleteTx() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (transactionId: string) => deleteTxFn(transactionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTransactions'] });
        },
        onError: (error) => {
            console.error("Transaction Deletion failed:", error);
        },
    })
}


// Edit Deposit Request
export function useAdminEditRt() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EditDepositRequest) => editDepositRtFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminDepositRts'] });
        },
        onError: (error) => {
            console.error("Deposit Request Edit failed:", error);
        },
    })
}


// Delete Deposit Request
export function useAdminDeleteRt() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (depositId: string) => deleteDepositRtFn(depositId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminDepositRts'] });
        },
        onError: (error) => {
            console.error("Deposit Request Deletion failed:", error);
        },
    })
}

// Update User Details
export function useAdminUpdateUser() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AdminUpdateUser) => adminUpdateUserFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
        onError: (error) => {
            console.error("User Update failed:", error);
        }
    })
}

// Create User Transaction
export function useAdminCreateTx() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TxPayload) => adminCreateTxFn(data),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["adminTransactions"] });

            // `variables` is the TxPayload you passed into mutate()
            queryClient.invalidateQueries({
                queryKey: [`${variables.user}-balance`],
            });
        },
        onError: (error) => {
            console.error("Create User Transaction failed:", error);
        },
    });
}

// Edit Plan
export function useAdminEditPlan() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EditPlanPayload) => adminUpdatePlanFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminPlans'] });
        },
        onError: (error) => {
            console.error("Plan Update failed:", error);
        }
    })
}

// Create Plan
export function useAdminCreatePlan() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Omit<EditPlanPayload, 'planId'>) => adminCreatePlanFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminPlans'] });
        },
        onError: (error) => {
            console.error("Plan Creation failed:", error);
        }
    })
}

// Delete Plan
export function useAdminDeletePlan() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (planId: string) => adminDeletePlanFn(planId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminPlans'] });
        },
        onError: (error) => {
            console.error("Plan Deletion failed:", error);
        }
    })
}

// Edit Investment
export function useAdminEditInts() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { investmentId: string, status: string }) => adminEditIntsFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminInvestments'] });
        },
        onError: (error) => {
            console.error("Investment Editing failed:", error);
        },
    })
}

// Delete Referral
export function useAdminReferral() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (referralId: string) => deleteReferralFn(referralId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminReferrals'] });
        },
        onError: (error) => {
            console.error("Referral Deletion failed:", error);
        },
    })
}

// Update Other Admin
export function useAdminUpdate() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AdminUpdate) => adminUpdateFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
            queryClient.invalidateQueries({ queryKey: ['currentAdmin'] });
        },
        onError: (error) => {
            console.error("Delete Wallet failed:", error);
        }
    })
}

// Create Notification
export function useAdminNotification() {

    return useMutation({
        mutationFn: (data: NotificationPayload) => createNotificationFn(data),
        onError: (error) => {
            console.error("Create Notification:", error);
        }
    })
}

// Update Stock Transaction
export function useAdminUpdateStockTx() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { id: string, status: string }) => adminUpdateStockTxFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock-transactions'] });
        },
        onError: (error) => {
            console.error("Failed to update stock transaction:", error);
        }
    })
}

// Delete Stock Transaction
export function useAdminDeleteStockTx() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => adminDeleteStockTxFn(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock-transactions'] });
        },
        onError: (error) => {
            console.error("Failed to delete stock transaction:", error);
        }
    })
}

// Update Stock Request Purchase
export function useAdminUpdateRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => adminUpdateRequestFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-purchase-requests'] });
        },
        onError: (error) => {
            console.error("Stock Purchase Request Update failed:", error);
        }
    })
}

// Delete Stock Request Purchase
export function useAdminDeletePurchase() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => adminDeletePurchaseRequestFn(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-purchase-requests'] });
        },
        onError: (error) => {
            console.error("Failed to delete stock purchase request:", error);
        }
    })
}

// Update Settings
export function useAdminUpdateSettings() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SettingsPayload) => adminUpdateSettings(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-settings'] });
        },
        onError: (error) => {
            console.error("Failed to update settings:", error);
        }
    })
}