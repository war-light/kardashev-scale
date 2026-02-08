"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface PopulationData {
  date: string;
  value: number | null;
}

interface PopulationChartProps {
  data: PopulationData[];
}

const chartConfig = {
  value: {
    label: "World Population",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function PopulationChart({ data }: PopulationChartProps) {
  // Filter out null values and sort by date
  const chartData = data
    .filter((d) => d.value !== null)
    .sort((a, b) => parseInt(a.date) - parseInt(b.date))
    .map((d) => ({
      year: d.date,
      value: d.value,
    }));

  return (
    <Card className="bg-transparent border-none">
      <CardContent>
        <ChartContainer config={chartConfig}>
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
              <linearGradient id="fillPopulation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
              tickFormatter={(value) => {
                if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
                if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
                return value.toLocaleString();
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Area
              dataKey="value"
              type="monotone"
              fill="url(#fillPopulation)"
              fillOpacity={1}
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
