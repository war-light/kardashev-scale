"use client";

import { useState, useEffect } from "react";
import { KardashevChart, KardashevPoint } from "@/components/KardashevChart";
import { KardashevSidebar } from "@/components/KardashevSidebar";
import { WorldStats } from "@/components/WorldStats";
import { PovertyChart } from "@/components/PovertyChart";
import { WorldDataService } from "@/lib/api-service";

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<KardashevPoint | null>(null);
  const [povertyHistory, setPovertyHistory] = useState<any[]>([]);
  const [stats, setStats] = useState<{
    population: { value: number; year: string } | null;
    lifeExpectancy: { value: number; year: string } | null;
    energyUsage: { value: number; year: string } | null;
    topLifeExpectancy: any[];
  }>({
    population: null,
    lifeExpectancy: null,
    energyUsage: null,
    topLifeExpectancy: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const [pop, poverty, life, energy, topLife] = await Promise.all([
        WorldDataService.getPopulation(),
        WorldDataService.getPovertyRate(),
        WorldDataService.getLifeExpectancy(),
        WorldDataService.getEnergyUsagePerCapita(),
        WorldDataService.getTopCountriesLifeExpectancy(),
      ]);

      setPovertyHistory(poverty || []);

      const getLatest = (data: any[]) => {
        const latest = data?.find((d) => d.value !== null);
        return latest ? { value: latest.value, year: latest.date } : null;
      };

      setStats({
        population: getLatest(pop),
        lifeExpectancy: getLatest(life),
        energyUsage: getLatest(energy),
        topLifeExpectancy: topLife,
      });
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto px-6 py-12 md:py-20 md:px-12">
        <header className="mb-12 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            KARDASHEV SCALE
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Measuring a civilization's level of technological advancement based on the amount of energy they
            are able to use.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start mb-16">
          <div className="space-y-8">
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <KardashevChart onSelect={setSelectedPoint} />
            </section>

            <section className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                <h3 className="text-cyan-400 font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  Type I
                </h3>
                <p className="text-zinc-400 text-sm">
                  A civilization that can harness all the energy of its home planet.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                <h3 className="text-blue-400 font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  Type II
                </h3>
                <p className="text-zinc-400 text-sm">
                  A civilization capable of harnessing the total energy output of its parent star.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
                <h3 className="text-purple-400 font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  Type III
                </h3>
                <p className="text-zinc-400 text-sm">
                  A civilization that can control energy on the scale of its entire host galaxy.
                </p>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-8 h-auto lg:h-[calc(100vh-8rem)]">
            <KardashevSidebar point={selectedPoint} />
          </aside>
        </div>

        <section className="mt-16 pt-16 border-t border-white/5">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Global Indicators</h2>
            <p className="text-zinc-500 text-sm">
              Real-world data points reflecting humanity's current state.
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
            <WorldStats stats={stats} />
            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
              <PovertyChart data={povertyHistory} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
