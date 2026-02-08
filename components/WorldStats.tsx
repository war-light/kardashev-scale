import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingDown, Heart, Zap, ExternalLink } from "lucide-react";
import { PopulationChart } from "@/components/PopulationChart";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  year?: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  extra?: React.ReactNode;
  link?: { label: string; url: string };
}

function StatCard({ title, value, unit, year, icon, description, color, extra, link }: StatCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
        <div
          className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-baseline space-x-1">
          <div className="text-2xl font-bold text-white">{value}</div>
          {unit && <div className="text-xs text-zinc-500">{unit}</div>}
        </div>
        <p className="text-xs text-zinc-500 mt-1">{description}</p>

        {extra && <div className="mt-4 flex-1">{extra}</div>}

        <div className="mt-auto pt-4 flex items-center justify-between">
          {year && (
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              Latest: {year}
            </div>
          )}
          {link && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-cyan-500 hover:text-cyan-400 flex items-center gap-1 transition-colors uppercase tracking-widest font-bold"
            >
              {link.label} <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface WorldStatsProps {
  stats: {
    population: { value: number; year: string } | null;
    lifeExpectancy: { value: number; year: string } | null;
    energyUsage: { value: number; year: string } | null;
    topLifeExpectancy: any[];
  };
  populationHistory: any[];
}

export function WorldStats({ stats, populationHistory }: WorldStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
    return num.toLocaleString();
  };

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
      <StatCard
        title="World Population"
        value={stats.population ? formatNumber(stats.population.value) : "---"}
        year={stats.population?.year}
        icon={<Users className="w-4 h-4" />}
        description={`Total number of humans on Earth.`}
        extra={<PopulationChart data={populationHistory} />}
        color="blue"
        link={{ label: "Source", url: "https://data.worldbank.org/indicator/SP.POP.TOTL" }}
      />
      <StatCard
        title="Life Expectancy"
        value={stats.lifeExpectancy ? stats.lifeExpectancy.value.toFixed(1) : "---"}
        unit="years"
        year={stats.lifeExpectancy?.year}
        icon={<Heart className="w-4 h-4" />}
        description="Average years a newborn is expected to live."
        color="rose"
        link={{ label: "Source", url: "https://data.worldbank.org/indicator/SP.DYN.LE00.IN" }}
        extra={
          stats.topLifeExpectancy.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                Top Countries
              </div>
              <ul className="space-y-1">
                {stats.topLifeExpectancy.map((c, i) => (
                  <li key={i} className="flex justify-between text-[11px]">
                    <span className="text-zinc-400">{c.country.value}</span>
                    <span className="text-rose-400 font-mono">{c.value.toFixed(1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      />
      <StatCard
        title="Energy Usage"
        value={stats.energyUsage ? formatNumber(stats.energyUsage.value) : "---"}
        unit="kg oe/cap"
        year={stats.energyUsage?.year}
        icon={<Zap className="w-4 h-4" />}
        description="Energy use per capita (oil equivalent)."
        color="amber"
        link={{ label: "Source", url: "https://data.worldbank.org/indicator/EG.USE.PCAP.KG.OE" }}
      />
    </div>
  );
}