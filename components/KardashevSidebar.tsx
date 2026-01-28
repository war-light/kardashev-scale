import { KardashevPoint } from "./KardashevChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, Calendar, Info, CheckCircle2 } from "lucide-react";

interface KardashevSidebarProps {
  point: KardashevPoint | null;
}

export function KardashevSidebar({ point }: KardashevSidebarProps) {
  if (!point) {
    return (
      <Card className="h-full bg-white/5 border-white/10 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="p-4 rounded-full bg-white/5 border border-white/10">
          <Info className="w-8 h-8 text-zinc-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-zinc-300 font-medium">No Point Selected</h3>
          <p className="text-zinc-500 text-sm">
            Hover over the chart to explore humanity's progress through time.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-white/5 border-white/10 backdrop-blur-xl overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-500">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-3 py-1">
            Stage {point.value.toFixed(1)}
          </Badge>
          <div className="flex items-center text-zinc-500 text-xs font-mono">
            <Calendar className="w-3 h-3 mr-1" />
            {point.year < 0 ? `${Math.abs(point.year)} BCE` : point.year}
          </div>
        </div>
        <CardTitle className="text-3xl font-black tracking-tight text-white">{point.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center text-zinc-400 text-sm font-medium">
            <Info className="w-4 h-4 mr-2 text-blue-400" />
            Overview
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">{point.description}</p>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-4">
          <div className="flex items-center text-zinc-400 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 mr-2 text-cyan-400" />
            Key Milestones
          </div>
          <ul className="space-y-3">
            {point.milestones.map((milestone, index) => (
              <li key={index} className="flex items-start group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/50 mr-3 group-hover:bg-cyan-400 transition-colors" />
                <span className="text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors">
                  {milestone}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4">
          <div className="p-4 rounded-xl bg-linear-to-br from-cyan-500/10 to-blue-600/10 border border-white/5 space-y-2">
            <div className="flex items-center text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Zap className="w-3 h-3 mr-1" />
              Energy Consumption
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {point.value.toFixed(2)} <span className="text-zinc-500 text-sm font-normal">K-Scale</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
