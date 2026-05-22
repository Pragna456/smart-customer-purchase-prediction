import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Layers, 
  Activity, 
  Database, 
  Target, 
  Terminal, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  LineChart,
  Users
} from 'lucide-react';
import { TabType, PredictionResult } from './types';
import { CLUSTERS } from './data';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StatsCards from './components/StatsCards';
import PredictionCard from './components/PredictionCard';
import AnalyticsCharts from './components/AnalyticsCharts';
import AIInsights from './components/AIInsights';

interface StreamLog {
  id: string;
  timestamp: string;
  age: number;
  income: number;
  spend: number;
  clusterName: string;
  status: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [currentPrediction, setCurrentPrediction] = useState<PredictionResult | null>(null);
  const [predictionCount, setPredictionCount] = useState<number>(0);
  const [averageProbability, setAverageProbability] = useState<number>(0);
  const [streamLogs, setStreamLogs] = useState<StreamLog[]>([]);

  // Calculate moving average of prediction stats
  const handlePredictionComplete = (result: PredictionResult) => {
    setCurrentPrediction(result);
    setPredictionCount(prev => prev + 1);
    setAverageProbability(prev => {
      if (prev === 0) return result.purchaseProbability;
      return Math.round((prev * 4 + result.purchaseProbability) / 5);
    });
  };

  // Generate scrolling telemetry raw arrival feed to look like an active enterprise platform
  useEffect(() => {
    const clusterOptions = CLUSTERS;
    const generateLog = () => {
      const randomAge = Math.floor(Math.random() * (70 - 18) + 18);
      const randomIncome = Math.floor(Math.random() * (150 - 15) + 15);
      const randomSpend = Math.floor(Math.random() * 100 + 1);
      
      // select standard cluster approximation
      let likelyCluster = clusterOptions[4]; // default Balanced Middle
      if (randomIncome < 45 && randomSpend < 35) likelyCluster = clusterOptions[0];
      else if (randomIncome < 50 && randomSpend > 60) likelyCluster = clusterOptions[1];
      else if (randomIncome > 80 && randomSpend < 35) likelyCluster = clusterOptions[2];
      else if (randomIncome > 80 && randomSpend > 65) likelyCluster = clusterOptions[3];

      const newLog: StreamLog = {
        id: `TX-${Math.floor(Math.random() * 9000 + 1000)}`,
        timestamp: new Date().toLocaleTimeString(),
        age: randomAge,
        income: randomIncome,
        spend: randomSpend,
        clusterName: likelyCluster.name,
        status: randomSpend > 45 ? 'RESONANT' : 'CONSERVATIVE'
      };

      setStreamLogs(prev => [newLog, ...prev.slice(0, 14)]);
    };

    // Populate initial logs quickly
    for (let i = 0; i < 5; i++) {
      generateLog();
    }

    // Interval to append new visitor arrivals
    const interval = setInterval(generateLog, 4800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="smart-ml-approot" className="min-h-screen bg-[#020617] text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white relative">
      
      {/* GLOWING AMBIENT BACKGROUND BLOBS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617]">
        {/* Background glow purple */}
        <div className="absolute top-[-100px] left-[-100px] h-[400px] w-[400px] rounded-full bg-purple-600 opacity-20 blur-[100px] blur-blob-1" />
        {/* Background glow blue */}
        <div className="absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-blue-600 opacity-25 blur-[100px] blur-blob-2" />
        {/* Underbody vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617] pointer-events-none" />
      </div>

      {/* STICKY FUTURISTIC NAVBAR */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* HERO HEROICS (ONLY DISPLAY ON MONITOR OR SIMULATOR TABS TO FOCUS SCREEN RETENTION) */}
      {(activeTab === 'dashboard' || activeTab === 'predictions') && <Hero />}

      {/* CORE WORKSPACE CONTENT CONTROLLER */}
      <main className="mx-auto max-w-7xl pb-24 space-y-8 animate-fade-in">
        
        {/* TAB 1: MONITOR & OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div id="panel-dashboard" className="space-y-8">
            
            {/* KPI statistics meters */}
            <StatsCards 
              predictionCount={predictionCount} 
              averageProbability={averageProbability} 
            />

            {/* SECTIONS DETAILED LAYOUT FOR DASHBOARD (CLUSTER OVERVIEW & TELEMETRY STREAM) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 px-4 sm:px-6">
              
              {/* LEFT COLUMN: Clusters Breakdown Directory (7 columns) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="glass-card rounded-2xl p-5 border border-white/[0.04]">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                        <Layers className="h-4.5 w-4.5 text-blue-400" />
                        <span>K-Means Model Segment Classifications</span>
                      </h3>
                      <p className="text-[11px] text-zinc-500">
                        Operational consumer categorizations structured based on normalized euclidean distances.
                      </p>
                    </div>
                    <span className="font-mono text-[9px] rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-blue-300 uppercase font-semibold">
                      5 Cohorts Defined
                    </span>
                  </div>

                  {/* Loop and draw static cluster cards with gorgeous custom details */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {CLUSTERS.map((c) => (
                      <div 
                        key={c.id} 
                        onClick={() => setActiveTab('predictions')}
                        className="rounded-xl border border-white/[0.03] bg-zinc-950/20 p-4 transition-all duration-300 hover:border-white/[0.08] hover:bg-zinc-950/60 cursor-pointer group hover:scale-[1.01]"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${c.color} px-2 py-0.5 font-mono text-[9px] font-bold text-white`}>
                            GROUP ID #{c.id}
                          </span>
                          <span className="font-mono text-[9px] text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            TEST MODEL →
                          </span>
                        </div>
                        <h4 className="mt-2.5 font-display font-medium text-zinc-200 text-sm">{c.name}</h4>
                        <p className="mt-1 text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                          {c.description}
                        </p>
                        <div className="mt-3.5 border-t border-white/[0.03] pt-2 flex items-center justify-between text-[9px] font-mono text-zinc-500">
                          <span>Inc: {c.incomeRange}</span>
                          <span>Spend: {c.spendingRange}</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Visual Call-to-Action for Simulator */}
                    <div 
                      onClick={() => setActiveTab('predictions')}
                      className="rounded-xl border border-dashed border-indigo-500/20 bg-indigo-500/[0.02] p-4 flex flex-col items-center justify-center text-center hover:bg-indigo-500/[0.05] hover:border-indigo-500/30 transition-all cursor-pointer group"
                    >
                      <Sparkles className="h-6 w-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <h4 className="mt-2 font-display font-medium text-indigo-300 text-xs">Run Interactive Simulator</h4>
                      <p className="mt-0.5 text-[10px] text-zinc-500 max-w-[190px]">
                        Input synthetic customer features to run visual prediction traces.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT COLUMN: Real-Time Stream Simulator Arrivals Feed (5 columns) */}
              <div className="lg:col-span-5 h-full">
                <div className="glass-card rounded-2xl p-5 border border-white/[0.04] flex flex-col h-full">
                  <div className="mb-4 flex items-center justify-between col-span-12">
                    <div>
                      <h3 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                        <Terminal className="h-4.5 w-4.5 text-purple-400 animate-pulse" />
                        <span>Live Telemetry Stream Arrival Feed</span>
                      </h3>
                      <p className="text-[11px] text-zinc-500">
                        Simulating raw retail transactions being classified on the standby model.
                      </p>
                    </div>
                    <span className="font-mono text-[9px] text-zinc-500 self-start mt-0.5">ACTIVE SOCKET</span>
                  </div>

                  {/* Visitor terminal box */}
                  <div className="flex-1 rounded-xl bg-black/80 font-mono text-[10.5px] p-3 border border-white/[0.04] shadow-inner overflow-hidden max-h-[360px] min-h-[300px]">
                    <div className="text-zinc-600 border-b border-white/[0.03] pb-1.5 mb-2 flex justify-between">
                      <span>STRE_PACK_ID</span>
                      <span>TELEMETRIC_VECTOR</span>
                    </div>
                    <div id="stream-scroller" className="space-y-2 h-[320px] overflow-y-auto pr-1">
                      {streamLogs.map((log) => (
                        <div key={log.id} className="flex justify-between items-start gap-1 py-1 border-b border-white/[0.02] hover:bg-white/[0.01]">
                          <div className="flex items-start space-x-1">
                            <span className="text-purple-400 font-bold shrink-0">{log.id}</span>
                            <span className="text-zinc-500 leading-none shrink-0">[{log.timestamp}]</span>
                            <span className="text-zinc-400">
                              Age <strong className="text-zinc-300">{log.age}</strong> | Inc: <strong className="text-zinc-300">${log.income}k</strong> | Sp: <strong className="text-zinc-300">{log.spend}%</strong>
                            </span>
                          </div>
                          <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded leading-none shrink-0 ${
                            log.status === 'RESONANT' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {log.clusterName.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SIMULATOR CONSOLE */}
        {activeTab === 'predictions' && (
          <div id="panel-predictions" className="space-y-8">
            <PredictionCard onPredictionComplete={handlePredictionComplete} />
          </div>
        )}

        {/* TAB 3: ANALYTICS VISUALIZER */}
        {activeTab === 'analytics' && (
          <div id="panel-analytics" className="space-y-8">
            <AnalyticsCharts currentPrediction={currentPrediction} />
          </div>
        )}

        {/* TAB 4: ML DECISION PATH INSIGHTS */}
        {activeTab === 'insights' && (
          <div id="panel-insights" className="space-y-8">
            <AIInsights currentPrediction={currentPrediction} />
          </div>
        )}

      </main>

      {/* MASTER FOOTER ACADEMIC CREDITS */}
      <footer className="border-t border-white/[0.04] py-8 text-center bg-black/60 backdrop-blur-md relative font-mono text-[10px] text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-1.5 text-zinc-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-zinc-300 uppercase">Aegis Model Pipeline Validated</span>
          </div>
          <div className="text-center sm:text-right">
            <div>COMPUTER SCIENCE & ARTIFICIAL INTELLIGENCE GRADUATE DISSERTATION</div>
            <div className="mt-1 text-zinc-600">SMART CUSTOMER PURCHASE PREDICTION SYSTEM frontend DEPLOYED V4.2</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
