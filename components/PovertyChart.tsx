"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface PovertyData {
  date: string;
  value: number | null;
}

interface PovertyChartProps {
  data: PovertyData[];
}

const chartConfig = {
  value: {
    label: "Poverty Rate (%)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function PovertyChart({ data }: PovertyChartProps) {
  // Filter out null values and sort by date
  const chartData = data
    .filter((d) => d.value !== null)
    .sort((a, b) => parseInt(a.date) - parseInt(b.date))
    .map((d) => ({
      year: d.date,
      value: d.value,
    }));

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-emerald-400">Poverty Rate Trend</CardTitle>
        <CardDescription className="text-zinc-500">
          Percentage of population living on less than $2.15 a day (2017 PPP).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillPoverty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="rgba(255,255,255,0.3)"
              fontSize={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="rgba(255,255,255,0.3)"
              fontSize={10}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Area
              dataKey="value"
              type="monotone"
              fill="url(#fillPoverty)"
              fillOpacity={1}
              stroke="#10b981"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
