//Format Date and Time
export const formatDate = (dateInput: Date | string | number, variant: "long" | "short" = "long") => {
    const date = new Date(dateInput);

    if (variant === "short") {
        const datePart = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "2-digit",
        });

        const timePart = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        return `${datePart}, ${timePart}`;
    }

    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Format Time Left
export function formatTimeLeft(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;

    return `${seconds}s`;
}

//Format currency
export const formatCurrency = (value: number, max = 2) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", minimumFractionDigits: max, maximumFractionDigits: 2,
    }).format(value)
}

//Format cryptocurrency amount
export const formatCryptoAmount = (value: number) => {
    if (value < 0.01) return value.toFixed(4);
    if (value < 1) return value.toFixed(3);
    if (value < 1000) return value.toFixed(2);
    return value.toFixed(2);
};

// Format Address
export const formatAddress = (address: string) => {
    if (address.length < 10) return address
    const start = address.substring(0, 4)
    const end = address.substring(address.length - 4)
    return `${start}...${end}`
}

//Format Coin Percentage
export const formatPercentage = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

export function formatPrice(value: number, symbol: string) {
    if (symbol === "SHIB") return `$${value.toFixed(6)}`;
    if (value < 1) return `$${value.toFixed(4)}`;

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatChange(value: number) {
    const abs = Math.abs(value).toFixed(2);
    return `${value >= 0 ? "+" : "-"}${abs}%`;
}

export type CoinKey =
    | 'bitcoin' | 'ethereum' | 'tether trc20' | 'tether erc20'
    | 'solana' | 'usd coin' | 'dogecoin' | 'ripple' | 'shiba inu';

function isHex(s: string, length: number, allow0x = false) {
    const re = allow0x
        ? new RegExp(`^(?:0x)?[0-9a-fA-F]{${length}}$`)
        : new RegExp(`^[0-9a-fA-F]{${length}}$`);
    return re.test(s);
}

function isBase58(s: string) {
    return /^[1-9A-HJ-NP-Za-km-z]+$/.test(s);
}

function isBech32(s: string) {
    return /^[a-z0-9]{1,83}1[ac-hj-np-z02-9]+$/.test(s);
}

function isRippleXAddr(s: string) {
    // Basic XRP classic/ripple address (starts with r, base58) or X-address (starts with X)
    return (/^r[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(s) || /^X[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(s));
}

export function isValidTxHashForCoin(coin: CoinKey, input?: string): boolean {
    if (!input) return false;
    const s = input.trim();
    if (!s) return false;

    switch (coin) {
        case 'ethereum':
        case 'usd coin': // USDC on EVM
        case 'tether erc20':
        case 'shiba inu': // ERC-20 tokens use EVM tx hashes
            // EVM tx hash: 0x + 64 hex chars (allow optional 0x)
            return isHex(s, 64, true);

        case 'bitcoin':
            // Bitcoin txid: 64 hex chars (no 0x)
            return isHex(s, 64, false);

        case 'tether trc20':
            // Tron tx hashes are hex (32 bytes) commonly shown as 64 hex chars (sometimes uppercase)
            return isHex(s, 64, false);

        case 'solana':
            // Solana uses base58, typical length ~88, allow range
            return isBase58(s) && s.length >= 20 && s.length <= 120;

        case 'dogecoin':
            // Doge txids are hex, 64 chars
            return isHex(s, 64, false);

        case 'ripple':
            // Ripple/XRP uses base58 classic addresses for accounts and X-address; tx hashes are 64 hex
            // Ripple transaction hash is typically 64 hex characters
            if (isHex(s, 64, false)) return true;
            // also accept X-address/classic address formats if user pasted address instead of hash
            return isRippleXAddr(s);

        default:
            // Fallback: accept common formats (EVM/hex or base58/bech32) with reasonable lengths
            if (isHex(s, 64, true)) return true;
            if (isBase58(s) && s.length >= 20 && s.length <= 120) return true;
            if (isBech32(s) && s.length >= 14 && s.length <= 200) return true;
            return false;
    }
}

export type valueType = string | number | boolean | Date | object | null

// Get Updated Object
export const getUpdatedFields = (original: Record<string, valueType>, current: Record<string, valueType>) => {

    const updated: Record<string, valueType> = {};

    Object.keys(current).forEach((key) => {
        const newValue = current[key];
        const oldValue = original[key];

        if (
            newValue !== "" &&
            newValue !== oldValue
        ) {
            updated[key] = newValue;
        }
    });

    return updated;
};

// Make sure there is a key value pair
export function notEmpty(record: Record<string, valueType>): boolean {
    return Object.keys(record).some(key => record[key] !== '');
}

// Convert to Number
export function toNumberSafe(v: string) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}
