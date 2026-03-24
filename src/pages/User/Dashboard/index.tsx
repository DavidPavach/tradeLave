// Hooks
import { useDashboardValues, useUserDetails } from '@/services/queries.service';

// Components
import CoinProfile from './CoinProfile';
import Summary from './Summary';
import { ErrorScreen } from '@/components/ErrorComponents';
import ReferralBox from './Referral';

const Dashboard = () => {
    const dashboardQuery = useDashboardValues();
    const userDetailsQuery = useUserDetails();

    const isLoading =
        dashboardQuery.isLoading ||
        dashboardQuery.isFetching ||
        userDetailsQuery.isLoading ||
        userDetailsQuery.isFetching;

    const hasError =
        dashboardQuery.isError ||
        userDetailsQuery.isError;

    const handleRetry = () => {
        dashboardQuery.refetch();
        userDetailsQuery.refetch();
    };

    if (hasError) {
        return (
            <ErrorScreen
                variant="fullscreen"
                size="sm"
                type="500"
                onRetry={handleRetry}
            />
        );
    }

    return (
        <main>
            <Summary
                accountId={userDetailsQuery.data?.data?.accountId}
                totalBalance={dashboardQuery.data?.data?.totalBalance ?? 0}
                activeStakes={dashboardQuery.data?.data?.totalStakes ?? 0}
                totalRois={dashboardQuery.data?.data?.totalROIs ?? 0}
                totalReferrals={dashboardQuery.data?.data?.totalRewards ?? 0}
                isLoading={isLoading}
            />
            <CoinProfile />
            <ReferralBox referralCode={userDetailsQuery.data?.data?.accountId} />
        </main>
    );
};

export default Dashboard;
