import { useState } from "react";
import { toast } from "react-fox-toast";

// Enums, Services and Utils
import { COINS, coinMeta } from "@/enum";
import { useAdminCreateTx, useAdminUpdateUser } from "@/services/mutations.service";
import { useAdminUserBalance } from "@/services/queries.service";
import { formatCurrency, getUpdatedFields, notEmpty, toNumberSafe } from "@/utils/format";

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ErrorScreen } from "@/components/ErrorComponents";
import { KYCSection } from "./KycSection";

// Icons
import { Loader } from "lucide-react";

const defaultBalance = {
    bitcoin: 0,
    dogecoin: 0,
    ethereum: 0,
    ripple: 0,
    "shiba inu": 0,
    solana: 0,
    "usd coin": 0,
    "tether erc20": 0,
    "tether trc20": 0
}

export default function Profile({ profile }: { profile: User }) {


    const { data, isLoading, isFetching, isError, refetch } = useAdminUserBalance(profile._id);
    const userData: UserBalance = data?.data || defaultBalance;
    const userBalance = Object.entries(userData).map(([key, amount]) => ({
        key,
        amount,
        meta: coinMeta[key],
    }));

    const [userDetails, setUserDetails] = useState<UpdateUserPayload>({
        email: profile.email,
        userName: profile.userName,
        country: profile.country,
        address: profile.address ?? "",
        gender: profile.gender as "male" | "female" | "other",
        phoneNumber: profile.phoneNumber,
        password: '',
        byPass: profile.byPass,
        isVerified: profile.isVerified,
        isSuspended: profile.isSuspended,
    });

    const [tx, setTx] = useState(() => ({
        transactionType: "deposit",
        coin: COINS[0],
        amount: "0",
        network: "",
        walletAddress: "",
        status: "successful",
    }));

    // Functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const resetTx = () => {
        setTx({
            transactionType: "deposit",
            coin: COINS[0],
            amount: "0",
            network: "",
            walletAddress: "",
            status: "successful",
        })
    }

    const updateUser = useAdminUpdateUser();
    const handleUpdate = () => {

        const updatedFields = getUpdatedFields(profile, userDetails);
        const payload = { ...updatedFields, email: profile.email };
        if (notEmpty(updatedFields)) {
            updateUser.mutate(payload, {
                onSuccess: (response) => {
                    toast.success(response.message || "User Details was updated successfully");
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onError: (error: any) => {
                    const message = error?.response?.data?.message;
                    toast.error(message || "Failed to update user details, kindly try again later.");
                },
            })
        } else {
            return toast.error("Kindly update a value to continue.")
        }
    }

    const createTx = useAdminCreateTx();
    const handleCreate = () => {
        const amount = toNumberSafe(tx.amount);
        if (!amount || amount <= 0) {
            return toast.error("Enter a valid amount greater than 0.");
        }
        const payload = { ...tx, amount: toNumberSafe(tx.amount), user: profile._id }
        createTx.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.message || "User Transaction was created successfully");
                resetTx();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message;
                toast.error(message || "Failed to create new transaction for the user, kindly try again later.");
            },
        })
    }

    return (
        <section>
            <Card className="bg-card border-border text-card-foreground">
                <CardHeader className="flex md:flex-row flex-col md:justify-between md:items-center gap-3 px-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="border border-border size-12">
                            <AvatarImage src={profile.profilePicture || undefined} alt={profile.userName || "User"} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                TL
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <CardTitle className="text-base md:text-lg truncate capitalize">
                                {profile.userName || "User"}
                            </CardTitle>
                            <CardDescription className="truncate">{profile.email}</CardDescription>
                        </div>
                    </div>
                    <p className="bg-muted/40 px-3 py-1 ring-border rounded-full ring-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                        AccountID: {profile.accountId}
                    </p>
                </CardHeader>

                <CardContent className="px-4 pt-0">
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="justify-start bg-muted/30 w-full">
                            <TabsTrigger value="profile" className="data-[state=active]:text-primary">
                                Profile
                            </TabsTrigger>
                            <TabsTrigger value="transaction" className="data-[state=active]:text-primary">
                                New Transaction
                            </TabsTrigger>
                        </TabsList>

                        {/* PROFILE TAB */}
                        <TabsContent value="profile" className="mt-4">
                            <div className="gap-4 grid md:grid-cols-12">
                                {/* Left: Read-only quick facts */}
                                <Card className="md:col-span-4 bg-background border-border">
                                    <CardHeader className="px-4">
                                        <CardTitle className="text-base md:text-lg xl:text-xl">Account</CardTitle>
                                        <CardDescription className="text-[11px] md:text-xs xl:text-sm">Current flags & essentials</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 px-4">
                                        <div className="flex justify-between items-center gap-3">
                                            <span className="text-muted-foreground">Verified</span>
                                            <span className={profile.isVerified ? "text-primary" : "text-muted-foreground"}>
                                                {profile.isVerified ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center gap-3">
                                            <span className="text-muted-foreground">Suspended</span>
                                            <span className={profile.isSuspended ? "text-destructive" : "text-muted-foreground"}>
                                                {profile.isSuspended ? "Yes" : "No"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center gap-3">
                                            <span className="text-muted-foreground">ByPass</span>
                                            <span className={profile.byPass ? "text-primary" : "text-muted-foreground"}>
                                                {profile.byPass ? "On" : "Off"}
                                            </span>
                                        </div>

                                        <Separator className="my-2" />

                                        <div className="space-y-1">
                                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Country</p>
                                            <p className="font-medium text-foreground">{profile.country}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Gender</p>
                                            <p className="font-medium capitalize">{profile.gender}</p>
                                        </div>

                                        <Separator className="my-2" />

                                        <p className="mt-4 font-semibold text-base md:text-lg xl:text-xl capitalize">User Balance</p>
                                        {(isLoading || isFetching) &&
                                            <Loader className="size-5 md:size-6 xl:size-7 animate-spin" />
                                        }
                                        {isError &&
                                            <ErrorScreen variant="card" size="sm" type="500" onRetry={refetch} />
                                        }
                                        {data && data.data &&
                                            <div className="bg-card border border-border rounded-2xl divide-y divide-border">
                                                {userBalance.map((r) => {
                                                    const name = r.meta?.name ?? r.key;
                                                    const symbol = r.meta?.symbol ?? r.key.toUpperCase();
                                                    const logo = r.meta?.logo;

                                                    return (
                                                        <div key={r.key} className="flex justify-between items-center gap-3 px-4 py-3">
                                                            <div className="flex items-center gap-3 min-w-0">
                                                                <div className="bg-background border border-border rounded-2xl size-9 overflow-hidden">
                                                                    {logo ? (
                                                                        <img src={logo} alt={name} className="p-1 w-full h-full object-contain" />
                                                                    ) : (
                                                                        <div className="flex justify-center items-center w-full h-full font-semibold text-muted-foreground text-xs">
                                                                            {symbol.slice(0, 3)}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <div className="font-semibold text-[11px] md:text-xs xl:text-sm truncate">{name}</div>
                                                                    <div className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs truncate">{symbol}</div>
                                                                </div>
                                                            </div>

                                                            <div className="text-right">
                                                                <div className="font-semibold text-[11px] md:text-xs xl:text-sm montserrat">{formatCurrency(r.amount)}</div>
                                                                <div className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs capitalize">{r.key}</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        }

                                    </CardContent>
                                </Card>

                                {/* Right: Update form */}
                                <Card className="md:col-span-8 bg-background border-border">
                                    <CardHeader className="px-4">
                                        <CardTitle className="text-base md:text-lg xl:text-xl">KYC and Profile Update</CardTitle>
                                        <CardDescription className="text-[11px] md:text-xs xl:text-sm">View User KYC and Edit user details.</CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4 px-4">
                                        <KYCSection kyc={profile.kyc} />
                                        <div className="gap-4 grid md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="userName">Username</Label>
                                                <Input id="userName" value={userDetails.userName} name="userName" onChange={handleChange} className="bg-card" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country</Label>
                                                <Input id="country" value={userDetails.country} name="country" onChange={handleChange} className="bg-card" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                                <Input id="phoneNumber" value={userDetails.phoneNumber} name="phoneNumber" onChange={handleChange} className="bg-card" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="address">Address</Label>
                                                <Input id="address" value={userDetails.address} name="address" onChange={handleChange} className="bg-card" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Gender</Label>
                                                <Select
                                                    value={userDetails.gender}
                                                    onValueChange={(v) => setUserDetails((p) => ({ ...p, gender: v as UpdateUserPayload["gender"] }))}>
                                                    <SelectTrigger className="bg-card">
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">male</SelectItem>
                                                        <SelectItem value="female">female</SelectItem>
                                                        <SelectItem value="other">other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <Input id="password" type="password" value={userDetails.password} onChange={handleChange}
                                                    className="bg-card" placeholder="Enter new password" />
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="gap-4 grid md:grid-cols-3">
                                            <div className="flex justify-between items-center bg-card p-3 border border-border rounded-2xl">
                                                <div>
                                                    <p className="font-medium text-[11px] md:text-xs xl:text-sm">ByPass</p>
                                                    <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Allow bypass rules</p>
                                                </div>
                                                <Switch checked={userDetails.byPass}
                                                    onCheckedChange={(v) => setUserDetails((p) => ({ ...p, byPass: v }))}
                                                />
                                            </div>

                                            <div className="flex justify-between items-center bg-card p-3 border border-border rounded-2xl">
                                                <div>
                                                    <p className="font-medium text-[11px] md:text-xs xl:text-sm">Verified</p>
                                                    <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Mark user as verified</p>
                                                </div>
                                                <Switch checked={userDetails.isVerified}
                                                    onCheckedChange={(v) => setUserDetails((p) => ({ ...p, isVerified: v }))} />
                                            </div>

                                            <div className="flex justify-between items-center bg-card p-3 border border-border rounded-2xl">
                                                <div>
                                                    <p className="font-medium text-[11px] md:text-xs xl:text-sm">Suspended</p>
                                                    <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Disable the account</p>
                                                </div>
                                                <Switch checked={userDetails.isSuspended}
                                                    onCheckedChange={(v) => setUserDetails((p) => ({ ...p, isSuspended: v }))} />
                                            </div>
                                        </div>

                                        <div className="flex justify-end items-center gap-2">
                                            <Button type="button" onClick={handleUpdate} className="bg-primary text-primary-foreground">
                                                {updateUser.isPending ? <>Saving...<Loader className="inline ml-0.5 size-4 animate-spin" /></> : "Save changes"}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* NEW TRANSACTION TAB */}
                        <TabsContent value="transaction" className="mt-4">
                            <Card className="bg-background border-border">
                                <CardHeader className="px-4">
                                    <CardTitle className="text-base md:text-lg xl:text-xl">Create Transaction</CardTitle>
                                    <CardDescription className="text-[11px] md:text-xs xl:text-sm">Start a new transaction for this user.</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4 px-4">
                                    <div className="gap-4 grid md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Transaction Type</Label>
                                            <Select value={tx.transactionType} onValueChange={(v) => setTx((p) => ({ ...p, transactionType: v as string }))}>
                                                <SelectTrigger className="bg-card">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="deposit">Deposit</SelectItem>
                                                    <SelectItem value="withdrawal">withdrawal</SelectItem>
                                                    <SelectItem value="bonus">Bonus</SelectItem>
                                                    <SelectItem value="penalty">Penalty</SelectItem>
                                                    <SelectItem value="referral">Referral</SelectItem>
                                                    <SelectItem value="roi">Roi</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Transaction Coin</Label>
                                            <Select value={tx.coin} onValueChange={(v) => setTx((p) => ({ ...p, coin: v as string }))}>
                                                <SelectTrigger className="bg-card">
                                                    <SelectValue placeholder="Select Coin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {COINS.map((coin) => (
                                                        <SelectItem key={`admin-tx-${coin}`} value={`${coin}`}>{coin}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="amount">Amount</Label>
                                            <Input id="amount" inputMode="decimal" value={tx.amount}
                                                onChange={(e) => setTx((p) => ({ ...p, amount: e.target.value }))} className="bg-card montserrat" placeholder="0.00" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="network">Network</Label>
                                            <Input id="network"
                                                value={tx.network}
                                                onChange={(e) => setTx((p) => ({ ...p, network: e.target.value }))}
                                                className="bg-card"
                                            />
                                        </div>
                                        {tx.transactionType === "withdrawal" &&
                                            <div className="space-y-2">
                                                <Label htmlFor="walletAddress">Wallet Address</Label>
                                                <Input id="walletAddress" value={tx.walletAddress}
                                                    onChange={(e) => setTx((p) => ({ ...p, recipientAccountId: e.target.value }))}
                                                    className="bg-card" />
                                            </div>
                                        }

                                        <div className="space-y-2">
                                            <Label>Transaction Status</Label>
                                            <Select value={tx.status} onValueChange={(v) => setTx((p) => ({ ...p, status: v as string }))}>
                                                <SelectTrigger className="bg-card">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["successful", "failed", "pending"].map((status) => (
                                                        <SelectItem key={`admin-tx-${status}`} value={`${status}`}>{status}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center">
                                        <Button type="button" onClick={handleCreate} className="bg-primary text-primary-foreground">
                                            {createTx.isPending ? <>Creating...<Loader className="inline ml-0.5 size-4 animate-spin" /></> : "Create transaction"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </section >
    );
}