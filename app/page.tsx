"use client";

import { KardashevChart, KardashevPoint } from "@/components/KardashevChart";
import { KardashevSidebar } from "@/components/KardashevSidebar";
import { PovertyChart } from "@/components/PovertyChart";
import { TypeOne } from "@/components/type_definitions/TypeOne";
import { TypeThree } from "@/components/type_definitions/TypeThree";
import { TypeTwo } from "@/components/type_definitions/TypeTwo";
import { WorldStats } from "@/components/WorldStats";
import { WorldDataService } from "@/lib/api-service";
import { basicStore } from "@/store/basicStore";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<KardashevPoint | null>(null);
  const [povertyHistory, setPovertyHistory] = useState<any[]>([]);
  const [populationHistory, setPopulationHistory] = useState<any[]>([]);
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

  const { selectedType, updateSelectedType } = basicStore();

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
      setPopulationHistory(pop || []);

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
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      {/* Background Glows */}
      <div className="relative z-10 mx-auto px-6 py-12 md:py-20 md:px-12">
        <header className="mb-12 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl text-white font-extralight">KARDASHEV SCALE</h1>
          <p className="text-green-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Measuring a civilization's level of technological advancement based on the amount of energy they
            are able to use.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start mb-16">
          <div>
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <KardashevChart onSelect={setSelectedPoint} />
            </section>

            <section className="grid md:grid-cols-3 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <div className="p-6 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-pointer" onClick={() => updateSelectedType(1)}>
                <h3 className="text-cyan-400 font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  Type I
                </h3>
                <p className="text-white text-sm">
                  A civilization that can harness all the energy of its home planet.
                </p>
              </div>
              <div className="p-6 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-pointer" onClick={() => updateSelectedType(2)}>
                <h3 className="text-blue-400 font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  Type II
                </h3>
                <p className="text-white text-sm">
                  A civilization capable of harnessing the total energy output of its parent star.
                </p>
              </div>
              <div className="p-6 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-pointer" onClick={() => updateSelectedType(3)}>
                <h3 className="text-purple-400 font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  Type III
                </h3>
                <p className="text-white text-sm">
                  A civilization that can control energy on the scale of its entire host galaxy.
                </p>
              </div>
            </section>
            {selectedType === 1 && <TypeOne />}
            {selectedType === 2 && <TypeTwo />}
            {selectedType === 3 && <TypeThree />}
          </div>

          <aside className="lg:sticky lg:top-8 h-auto lg:h-[calc(100vh-8rem)]">
            <KardashevSidebar point={selectedPoint} />
          </aside>
        </div>

        <section className="mt-16 pt-16 border-t border-white/5">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Global Indicators</h2>
            <p className="text-sm">Real-world data points reflecting humanity's current state.</p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
            <WorldStats stats={stats} populationHistory={populationHistory} />
            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
              <PovertyChart data={povertyHistory} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
