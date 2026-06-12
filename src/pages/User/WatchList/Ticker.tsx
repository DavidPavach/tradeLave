import { useEffect, useMemo, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Utils
import { cn } from "@/lib/utils";

// Icons
import { TrendUp, TrendDown, Activity } from "iconsax-reactjs";

type ChartPoint = {
  time: string;
  price: number;
};

const SYMBOL = "SPCX";

function generateSeed({ marketPrice }: { marketPrice: number }): ChartPoint[] {

  const points: ChartPoint[] = [];

  let price = marketPrice - 4 + Math.random() * 2;

  for (let i = 60; i >= 0; i--) {
    price += (Math.random() - 0.48) * 0.6;

    price = Math.max(
      marketPrice - 8,
      Math.min(marketPrice + 8, price)
    );

    const now = Date.now() - i * 20000;

    const d = new Date(now);

    points.push({
      time: `${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
      price: Number(price.toFixed(2)),
    });
  }

  return points;
}

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: ChartPoint;
  }>;
};

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-card shadow-xl px-3 py-2 border border-border/50 rounded-lg text-[10px] md:text-[11px] xl:text-xs">
      <p className="text-muted-foreground">
        {payload[0]?.payload?.time}
      </p>

      <p className="font-bold text-[11px] text-primary md:text-xs xl:text-sm">
        ${payload[0]?.value?.toFixed(2)}
      </p>
    </div>
  );
};

export default function SpacexTicker({ price }: { price: number }) {

  const BASE_PRICE = price || 135;

  const [data, setData] = useState<ChartPoint[]>(
    () =>
      generateSeed({
        marketPrice: BASE_PRICE,
      })
  );

  const [blink, setBlink] = useState(false);

  const intervalRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setData(
      generateSeed({
        marketPrice: BASE_PRICE,
      })
    );
  }, [BASE_PRICE]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setData((prev) => {

        const last = prev[prev.length - 1]?.price ?? BASE_PRICE;
        const next = Number((last + (Math.random() - 0.49) * 0.5).toFixed(2));

        const clamped = Math.max(
          BASE_PRICE - 10,
          Math.min(BASE_PRICE + 12, next)
        );

        const now = new Date();

        const point: ChartPoint = {
          time: `${now
            .getHours()
            .toString()
            .padStart(2, "0")}:${now
              .getMinutes()
              .toString()
              .padStart(2, "0")}`,
          price: clamped,
        };

        return [...prev.slice(-80), point];
      });

      setBlink(true);

      const timeout = setTimeout(() => {
        setBlink(false);
      }, 300);

      return () => clearTimeout(timeout);
    }, 1800);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [BASE_PRICE]);

  const current = data[data.length - 1]?.price ?? BASE_PRICE;
  const open = data[0]?.price ?? BASE_PRICE;
  const change = current - open;

  const changePct = open > 0 ? ((change / open) * 100).toFixed(2) : "0.00";

  const isPos = change >= 0;

  const high = useMemo(() =>
    data.length
      ? Math.max(
        ...data.map((d) => d.price)
      )
      : BASE_PRICE,
    [data, BASE_PRICE]
  );

  const low = useMemo(() =>
    data.length
      ? Math.min(
        ...data.map((d) => d.price)
      )
      : BASE_PRICE,
    [data, BASE_PRICE]
  );

  const gradientId = isPos ? "tickerGreenGrad" : "tickerRedGrad";
  const strokeColor = isPos ? "#34d399" : "#f87171";
  const fillFrom = isPos ? "rgba(52,211,153,0.18)" : "rgba(248,113,113,0.18)";

  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 p-4 border-border/30 border-b">
        <div className="flex gap-3">
          <img src="/stocks/spacex.png" alt="SpaceX logo" className="rounded-md size-6 md:size-7 xl:size-8" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm md:text-base xl:text-lg montserrat">
                {SYMBOL}
              </span>

              <span className="bg-muted/50 px-2 py-0.5 rounded-full text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                SpaceX
              </span>

              <span className="flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] text-emerald-400 md:text-[11px] xl:text-xs">
                <Activity className="size-3 md:size-3.5 xl:size-4 animate-pulse" />
                LIVE
              </span>
            </div>

            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
              Space Exploration Technologies Corp.
            </p>
          </div>
        </div>

        <div className="flex items-end gap-3 sm:text-right">
          <span
            className={cn(
              "font-bold text-xl md:text-2xl xl:text-3xl transition-colors duration-300 montserrat",
              blink ? isPos ? "text-emerald-300" : "text-red-300" : "text-foreground"
            )}
          >
            ${current.toFixed(2)}
          </span>

          <span className={cn("flex items-center gap-1 pb-1 font-semibold text-[11px] md:text-xs xl:text-sm montserrat",
            isPos ? "text-emerald-400" : "text-red-400"
          )}>
            {isPos ? (
              <TrendUp className="size-4" />
            ) : (
              <TrendDown className="size-4" />
            )}

            {isPos ? "+" : ""}
            {change.toFixed(2)} (
            {isPos ? "+" : ""}
            {changePct}%)
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="px-2 pt-4 pb-2" style={{ height: 240 }}>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={fillFrom} />

                <stop offset="100%" stopColor="rgba(0,0,0,0)" />

              </linearGradient>
            </defs>

            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={Math.floor(data.length / 6)}
            />

            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
              width={48}
            />

            <Tooltip
              content={<CustomTooltip />}
            />

            <ReferenceLine
              y={open}
              stroke="hsl(var(--border))"
              strokeDasharray="4 4"
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{
                r: 4,
                fill: strokeColor,
              }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-3 border-border/30 border-t divide-x divide-border/30">
        {[
          {
            label: "Open",
            value: `$${open.toFixed(2)}`,
          },
          {
            label: "High",
            value: `$${high.toFixed(2)}`,
            colour: "text-emerald-400",
          },
          {
            label: "Low",
            value: `$${low.toFixed(2)}`,
            colour: "text-red-400",
          },
        ].map(({ label, value, colour }) => (
          <div key={label} className="px-4 py-3 text-center">
            <p className="text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] uppercase tracking-widest">
              {label}
            </p>

            <p className={cn("font-bold text-[11px] md:text-xs xl:text-sm montserrat", colour)}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}