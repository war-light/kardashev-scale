"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export type KardashevPoint = {
  year: number;
  value: number;
  title: string;
  description: string;
  milestones: string[];
};

const chartData: KardashevPoint[] = [
  {
    year: -10000,
    value: 0.0,
    title: "Dawn of Civilization",
    description:
      "The beginning of the Holocene epoch. Humans are hunter-gatherers, just starting to form permanent settlements.",
    milestones: [
      "First permanent settlements",
      "Domestication of plants and animals",
      "Invention of the wheel",
    ],
  },
  {
    year: 0,
    value: 0.1,
    title: "Classical Antiquity",
    description:
      "The height of the Roman and Han empires. Sophisticated engineering and large-scale agriculture.",
    milestones: ["Aqueducts and road systems", "Advanced metallurgy", "Global trade networks"],
  },
  {
    year: 1800,
    value: 0.2,
    title: "Industrial Revolution",
    description: "The transition to new manufacturing processes. Steam power and the rise of factories.",
    milestones: ["Steam engine", "Mass production", "Urbanization"],
  },
  {
    year: 1900,
    value: 0.35,
    title: "Electrical Age",
    description: "The widespread adoption of electricity and internal combustion engines.",
    milestones: ["Electric power grids", "Automobiles", "Radio communication"],
  },
  {
    year: 1950,
    value: 0.5,
    title: "Atomic & Space Age",
    description: "The dawn of nuclear power and the beginning of space exploration.",
    milestones: ["Nuclear energy", "First satellite (Sputnik)", "Transistor invention"],
  },
  {
    year: 2025,
    value: 0.7,
    title: "Information Age",
    description: "The digital revolution. Global connectivity and the rise of artificial intelligence.",
    milestones: [
      "Internet and World Wide Web",
      "Renewable energy transition",
      "Advanced AI and Quantum Computing",
    ],
  },
  {
    year: 2050,
    value: 0.85,
    title: "Fusion Breakthrough",
    description: "Commercial fusion energy becomes viable, providing nearly limitless clean power.",
    milestones: ["First commercial fusion plant", "Global smart grid completion", "Lunar mining operations"],
  },
  {
    year: 2100,
    value: 1.0,
    title: "Type I Civilization",
    description: "Humanity achieves mastery over all planetary energy resources.",
    milestones: ["Planetary weather control", "Deep-sea habitats", "Orbital solar arrays"],
  },
  {
    year: 2200,
    value: 1.25,
    title: "Solar Expansion",
    description: "Permanent colonies on Mars and the outer solar system. Mastery of asteroid mining.",
    milestones: ["Mars terraforming begins", "Asteroid belt industrialization", "Space elevators"],
  },
  {
    year: 2500,
    value: 1.6,
    title: "Interstellar Bridge",
    description: "The first generation-ships are launched. Mastery of the entire solar system.",
    milestones: ["Interstellar probes", "Oort cloud exploration", "Advanced antimatter propulsion"],
  },
  {
    year: 3000,
    value: 2.0,
    title: "Type II Civilization",
    description: "Humanity begins harnessing the total energy output of the Sun.",
    milestones: ["Dyson Swarm completion", "Stellar engineering", "Interstellar colonization"],
  },
];

const chartConfig = {
  value: {
    label: "Kardashev Scale",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface KardashevChartProps {
  onSelect?: (point: KardashevPoint | null) => void;
}

export function KardashevChart({ onSelect }: KardashevChartProps) {
  return (
    <Card className="w-full bg-black/40 border-white/10 backdrop-blur-xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-500">
          Humanity's Progress
        </CardTitle>
        <CardDescription className="text-white">
          Progress on the Kardashev Scale from the dawn of civilization to the present and our speculative future.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
            onMouseMove={(state) => {
              if (state.activePayload && state.activePayload.length > 0) {
                onSelect?.(state.activePayload[0].payload as KardashevPoint);
              }
            }}
            onMouseLeave={() => {
              // Optionally keep the last selected point or clear it
              // onSelect?.(null);
            }}
          >
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="white" stopOpacity={0.8} />
                <stop offset="95%" stopColor="white" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => (value < 0 ? `${Math.abs(value)} BCE` : value)}
              stroke="rgba(255,255,255,0.4)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 2.1]}
              stroke="rgba(255,255,255,0.4)"
            />
            <ChartTooltip
              cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 2 }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="value"
              type="monotone"
              fill="url(#fillValue)"
              fillOpacity={0.4}
              stroke="white"
              strokeWidth={3}
              animationDuration={2000}
              activeDot={{ r: 6, fill: "white", stroke: "cyan", strokeWidth: 2 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
