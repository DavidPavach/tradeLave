import { useMutation, useQueryClient } from "@tanstack/react-query";

// API Endpoints
import { adminCreatePlanFn, adminCreateTxFn, adminDeletePlanFn, adminEditIntsFn, adminUpdateFn, adminUpdatePlanFn, adminUpdateTxFn, adminUpdateUserFn, authAdminFn, createDepositRequestFn, createNotificationFn, createUserFn, deleteDepositRtFn, deleteReferralFn, deleteTxFn, editDepositRtFn, loginUserFn, NewInvestmentFn, newTransactionFn, passResetVerifyFn, patchDepositDetailsFn, resendVerificationFn, resetPasswordFn, updateDetails, updateProfilePicture, userKycFn, verifyPassResetOtpFn, verifyUserFn } from "./api.service";

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
        mutationFn: (data: FormData) => updateProfilePicture(data),
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
        mutationFn: (data: any) => updateDetails(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Profile Update failed:", error);
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
export function useAdminNotification(){

    return useMutation({
        mutationFn: (data: NotificationPayload) => createNotificationFn(data),
        onError: (error) => {
            console.error("Create Notification:", error);
        }
    })
}