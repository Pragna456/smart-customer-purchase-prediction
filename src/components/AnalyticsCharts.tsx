import React, { useState } from 'react';
import { 
  ScatterChart, 
  PieChart as PieIcon, 
  BarChart3, 
  LineChart as LineIcon, 
  CheckCircle, 
  Users, 
  CircleDot, 
  TrendingUp, 
  Pin,
  Sparkles
} from 'lucide-react';
import { PredictionResult, SyntheticCustomer } from '../types';
import { HISTORICAL_CUSTOMERS, CLUSTERS } from '../data';

interface AnalyticsChartsProps {
  currentPrediction: PredictionResult | null;
}

export default function AnalyticsCharts({ currentPrediction }: AnalyticsChartsProps) {
  const [hoveredDot, setHoveredDot] = useState<SyntheticCustomer | null>(null);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);
  const [showLossMetric, setShowLossMetric] = useState<boolean>(false);

  // --- Chart 1 data: Cluster Distribution Breakdowns for Pie ---
  const clusterCounts = CLUSTERS.map((clust) => {
    const pts = HISTORICAL_CUSTOMERS.filter((c) => c.clusterId === clust.id);
    const percentage = Math.round((pts.length / HISTORICAL_CUSTOMERS.length) * 100);
    return {
      cluster: clust,
      count: pts.length,
      percentage
    };
  });

  // --- Chart 2 data: Average Income & spend per cluster for Bar Graph ---
  const clusterAverages = CLUSTERS.map((clust) => {
    const pts = HISTORICAL_CUSTOMERS.filter((c) => c.clusterId === clust.id);
    const avgIncome = pts.length ? Math.round(pts.reduce((sum, p) => sum + p.income, 0) / pts.length) : 0;
    const avgSpend = pts.length ? Math.round(pts.reduce((sum, p) => sum + p.spendingScore, 0) / pts.length) : 0;
    return {
      cluster: clust,
      avgIncome,
      avgSpend
    };
  });

  // --- Chart 3 data: Training accuracy over epochs (Line) ---
  const epochData = [
    { epoch: 0, accuracy: 52, loss: 0.95 },
    { epoch: 10, accuracy: 64, loss: 0.72 },
    { epoch: 20, accuracy: 78, loss: 0.51 },
    { epoch: 30, accuracy: 84, loss: 0.38 },
    { epoch: 40, accuracy: 89, loss: 0.29 },
    { epoch: 50, accuracy: 91, loss: 0.22 },
    { epoch: 60, accuracy: 93, loss: 0.17 },
    { epoch: 70, accuracy: 94.1, loss: 0.13 },
    { epoch: 80, accuracy: 94.5, loss: 0.11 },
    { epoch: 90, accuracy: 94.6, loss: 0.09 },
    { epoch: 100, accuracy: 94.8, loss: 0.08 }
  ];

  return (
    <div id="analytics-tab-panel" className="space-y-6 px-4 sm:px-6">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/[0.06] pb-4 gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-400" />
            <span>Interactive Analytics Workspace</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Real-time clustering spaces, segmentation indices, and models evaluation trends.
          </p>
        </div>

        {/* Dynamic coordinate overlay flag */}
        {currentPrediction && (
          <div className="inline-flex items-center space-x-2 rounded-md bg-amber-500/10 border border-amber-500/20 px-3 py-1 font-mono text-[10px] text-amber-300">
            <Pin className="h-3.5 w-3.5 animate-bounce" />
            <span>Telemetry Locked: [{currentPrediction.input.income}k, {currentPrediction.input.spendingScore}%]</span>
          </div>
        )}
      </div>

      {/* CHARTS GRAPHICS BLOCK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* CHART A: 3D-Coordinate Feature Space (Cluster Scatter plot!) */}
        <div className="glass-card rounded-2xl p-5 border border-white/[0.04]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-white text-sm flex items-center gap-1.5">
                <ScatterChart className="h-4.5 w-4.5 text-blue-400" />
                <span>Feature Space Cluster Plot</span>
              </h3>
              <p className="text-[11px] text-zinc-500">
                Evaluating Annual Income ($k) vs Spending Affinity (1-100).
              </p>
            </div>
            <span className="font-mono text-[9px] text-zinc-500">2D COORDINATES</span>
          </div>

          {/* Scatter Canvas Grid built inside SVG */}
          <div className="relative border border-white/[0.04] bg-zinc-950/40 rounded-xl p-4 overflow-hidden h-[300px]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              
              {/* Grid Lines */}
              <line x1="20" y1="0" x2="20" y2="90" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="40" y1="0" x2="40" y2="90" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="60" y1="0" x2="60" y2="90" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="80" y1="0" x2="80" y2="90" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              
              <line x1="10" y1="18" x2="100" y2="18" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="10" y1="36" x2="100" y2="36" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="10" y1="54" x2="100" y2="54" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="10" y1="72" x2="100" y2="72" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />

              {/* Bottom (X) and Left (Y) Axes lines */}
              <line x1="10" y1="90" x2="100" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Historic training data dots */}
              {HISTORICAL_CUSTOMERS.map((pt) => {
                // Map Income $15k-$150k dynamically to SVG-X values (10 to 95)
                const xVal = 10 + ((pt.income - 15) / (150 - 15)) * 85;
                // Map spending score 1-100 to SVG-Y values (90 to 10) - invert since SVG starts from top
                const yVal = 90 - (pt.spendingScore / 100) * 80;
                
                // Dot size correspond to age (18 to 70 mapped to radius 1.2 to 2.8)
                const radius = 1.0 + ((pt.age - 18) / (70 - 18)) * 1.5;

                // Color mapping
                const colors = ['#06b6d4', '#ec4899', '#10b981', '#a855f7', '#eab308'];
                const ptColor = colors[pt.clusterId] || '#cbd5e1';

                return (
                  <circle
                    key={pt.id}
                    cx={xVal}
                    cy={yVal}
                    r={radius}
                    fill={ptColor}
                    opacity={hoveredDot && hoveredDot.id !== pt.id ? 0.25 : 0.75}
                    className="cursor-pointer transition-all duration-300 hover:opacity-100 hover:r-[3.5]"
                    onMouseEnter={() => setHoveredDot(pt)}
                    onMouseLeave={() => setHoveredDot(null)}
                  />
                );
              })}

              {/* ACTIVE PREDICTION COORDINATES (Target vector) */}
              {currentPrediction && (() => {
                const actInc = currentPrediction.input.income;
                const actSpend = currentPrediction.input.spendingScore;
                const actAge = currentPrediction.input.age;

                const actX = 10 + ((actInc - 15) / (150 - 15)) * 85;
                const actY = 90 - (actSpend / 100) * 80;
                const actRadius = 1.0 + ((actAge - 18) / (70 - 18)) * 1.5 + 1.5;

                // Choose matching cluster outline
                const colors = ['#06b6d4', '#ec4899', '#10b981', '#a855f7', '#eab308'];
                const targetColor = colors[currentPrediction.cluster.id];

                return (
                  <g className="relative">
                    {/* Ring aura */}
                    <circle 
                      cx={actX} 
                      cy={actY} 
                      r={actRadius + 3} 
                      fill="none" 
                      stroke={targetColor} 
                      strokeWidth="1.2" 
                      opacity="0.9"
                      className="animate-pulse"
                    />
                    {/* Concentric pulsing vector */}
                    <circle 
                      cx={actX} 
                      cy={actY} 
                      r={actRadius + 6} 
                      fill="none" 
                      stroke="#fbbf24" 
                      strokeWidth="0.8" 
                      opacity="0.75"
                      strokeDasharray="4,2"
                      style={{ transformOrigin: `${actX}px ${actY}px`, animation: 'spin-slow 6s linear infinite' }}
                    />
                    {/* Solid core pinpoint */}
                    <circle 
                      cx={actX} 
                      cy={actY} 
                      r={actRadius} 
                      fill="#fbbf24" 
                      stroke="#ffffff" 
                      strokeWidth="1.2" 
                      className="shadow-2xl"
                    />
                  </g>
                );
              })()}

            </svg>

            {/* Float Legends */}
            <div className="absolute top-2 left-12 font-mono text-[8px] text-zinc-600">Spend High (Y-axis)</div>
            <div className="absolute bottom-6 right-2 font-mono text-[8px] text-zinc-600 text-right">Income Max (X-axis)</div>

            {/* Mouse Tooltip portal */}
            {hoveredDot && (() => {
              const matchingClust = CLUSTERS.find(c => c.id === hoveredDot.clusterId);
              return (
                <div className="absolute pointer-events-none rounded border border-white/5 bg-zinc-950/95 p-2 shadow-xl bottom-3 left-3 text-[10px] font-mono leading-tight max-w-[200px]">
                  <div className="font-bold text-white">Customer Profile #{hoveredDot.id}</div>
                  <div className="text-zinc-400 mt-1">Age: {hoveredDot.age} | Income: ${hoveredDot.income}k</div>
                  <div className="text-zinc-400">Spending Score: {hoveredDot.spendingScore}/100</div>
                  <div className="mt-1.5 font-bold uppercase text-[9px] text-indigo-400">
                    {matchingClust?.name}
                  </div>
                </div>
              );
            })()}

            {/* Pulsing Coordinates overlay details */}
            {currentPrediction && (
              <div className="absolute top-3 right-3 pointer-events-none rounded border border-amber-500/20 bg-zinc-950/95 p-2 font-mono text-[10px] shadow-lg leading-none">
                <span className="text-amber-400 font-bold">● SIMULATOR TARGET</span>
                <div className="text-zinc-500 text-[9px] mt-1">Income: ${currentPrediction.input.income}k | Spend: {currentPrediction.input.spendingScore} | Age: {currentPrediction.input.age}</div>
              </div>
            )}
          </div>

          {/* Color Key */}
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] font-mono justify-center">
            {CLUSTERS.map((c) => (
              <div key={c.id} className="flex items-center space-x-1.5">
                <span className={`inline-block h-2 w-2 rounded-full bg-gradient-to-tr ${c.color}`} />
                <span className="text-zinc-400">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART B: Dynamic Database Cohort Breakdown (Pie Ring Chart) */}
        <div className="glass-card rounded-2xl p-5 border border-white/[0.04]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-white text-sm flex items-center gap-1.5">
                <PieIcon className="h-4.5 w-4.5 text-purple-400" />
                <span>Market Segmentation Breakdown</span>
              </h3>
              <p className="text-[11px] text-zinc-500">
                Segment density breakdown in simulated training database.
              </p>
            </div>
            <span className="font-mono text-[9px] text-zinc-500">PROPORTIONAL SHEETS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center h-[300px]">
            {/* SVG Ring representation */}
            <div className="sm:col-span-6 relative flex h-[210px] items-center justify-center">
              <svg className="w-full h-full max-w-[190px]" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="15.915" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4.5" />
                
                {/* 
                  Synthesizing exact proportional concentric rings.
                  Sizes: Frugal (16%), Impulse (16%), Elite VIP (16%), Stable Conservative (16%), Balanced Middle (36%).
                  Total = 100.
                */}
                <circle 
                  cx="20" cy="20" r="15.915" fill="none" 
                  stroke="#06b6d4" strokeWidth="5" 
                  strokeDasharray="16 84" strokeDashoffset="100" 
                  opacity={activeSegmentIndex === null || activeSegmentIndex === 0 ? 0.9 : 0.25}
                  className="cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ transformOrigin: '20px 20px' }}
                  onMouseEnter={() => setActiveSegmentIndex(0)}
                  onMouseLeave={() => setActiveSegmentIndex(null)}
                />
                <circle 
                  cx="20" cy="20" r="15.915" fill="none" 
                  stroke="#ec4899" strokeWidth="5" 
                  strokeDasharray="16 84" strokeDashoffset="84" 
                  opacity={activeSegmentIndex === null || activeSegmentIndex === 1 ? 0.9 : 0.25}
                  style={{ transformOrigin: '20px 20px' }}
                  className="cursor-pointer transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setActiveSegmentIndex(1)}
                  onMouseLeave={() => setActiveSegmentIndex(null)}
                />
                <circle 
                  cx="20" cy="20" r="15.915" fill="none" 
                  stroke="#10b981" strokeWidth="5" 
                  strokeDasharray="16 84" strokeDashoffset="68" 
                  opacity={activeSegmentIndex === null || activeSegmentIndex === 2 ? 0.9 : 0.25}
                  style={{ transformOrigin: '20px 20px' }}
                  className="cursor-pointer transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setActiveSegmentIndex(2)}
                  onMouseLeave={() => setActiveSegmentIndex(null)}
                />
                <circle 
                  cx="20" cy="20" r="15.915" fill="none" 
                  stroke="#a855f7" strokeWidth="5" 
                  strokeDasharray="16 84" strokeDashoffset="52" 
                  opacity={activeSegmentIndex === null || activeSegmentIndex === 3 ? 0.9 : 0.25}
                  style={{ transformOrigin: '20px 20px' }}
                  className="cursor-pointer transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setActiveSegmentIndex(3)}
                  onMouseLeave={() => setActiveSegmentIndex(null)}
                />
                <circle 
                  cx="20" cy="20" r="15.915" fill="none" 
                  stroke="#eab308" strokeWidth="5" 
                  strokeDasharray="36 64" strokeDashoffset="36" 
                  opacity={activeSegmentIndex === null || activeSegmentIndex === 4 ? 0.9 : 0.25}
                  style={{ transformOrigin: '20px 20px' }}
                  className="cursor-pointer transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setActiveSegmentIndex(4)}
                  onMouseLeave={() => setActiveSegmentIndex(null)}
                />
              </svg>

              {/* Dynamic Center Metrics */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <Users className="h-4.5 w-4.5 text-indigo-400 mb-0.5" />
                <span className="font-display text-lg font-bold text-white leading-none">
                  {activeSegmentIndex !== null ? `${clusterCounts[activeSegmentIndex].percentage}%` : '100%'}
                </span>
                <span className="font-mono text-[8px] text-zinc-500 tracking-wider">
                  {activeSegmentIndex !== null ? clusterCounts[activeSegmentIndex].cluster.name.substring(0, 10) + '.' : 'SEGMENTS'}
                </span>
              </div>
            </div>

            {/* List key detail selectors */}
            <div className="sm:col-span-6 flex flex-col space-y-2 select-none justify-center">
              {clusterCounts.map((node, i) => {
                const isCurrentActive = activeSegmentIndex === i;
                return (
                  <div
                    key={node.cluster.id}
                    className={`rounded-lg p-2 border transition-all duration-300 ${
                      isCurrentActive 
                        ? 'border-indigo-500/20 bg-indigo-500/5'
                        : 'border-transparent bg-zinc-950/10 hover:bg-zinc-950/40'
                    }`}
                    onMouseEnter={() => setActiveSegmentIndex(i)}
                    onMouseLeave={() => setActiveSegmentIndex(null)}
                  >
                    <div className="flex justify-between items-center text-xs font-mono">
                      <div className="flex items-center space-x-1.5">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-tr ${node.cluster.color}`} />
                        <span className="text-zinc-300 font-medium font-display leading-none">{node.cluster.name}</span>
                      </div>
                      <span className="text-zinc-500 text-[10px]">{node.percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CHART C: Cluster Spend vs Income (Bar Chart) */}
        <div className="glass-card rounded-2xl p-5 border border-white/[0.04]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-white text-sm flex items-center gap-1.5">
                <BarChart3 className="h-4.5 w-4.5 text-indigo-400" />
                <span>Cluster Income & Spending Index Compare</span>
              </h3>
              <p className="text-[11px] text-zinc-500">
                Average Annual Income vs Spending Scores per cluster.
              </p>
            </div>
            <span className="font-mono text-[9px] text-zinc-500">HISTOGRAMS COMPARE</span>
          </div>

          <div className="relative border border-white/[0.03] bg-zinc-950/40 rounded-xl p-4 flex items-end justify-between h-[230px]">
            {clusterAverages.map((avg) => {
              // Normalize rates to max heights
              // max income is around $120k. Map spend (100) and income (120) to scaling factor 0.8
              const incomeHeight = `${Math.min(100, Math.round((avg.avgIncome / 150) * 100))}%`;
              const spendHeight = `${avg.avgSpend}%`;

              return (
                <div key={avg.cluster.id} className="flex-1 flex flex-col items-center mx-1 group select-none">
                  
                  {/* Visual columns block in absolute bounds */}
                  <div className="w-full flex items-end gap-1 px-1 h-[140px] relative">
                    {/* Income column (Blue) */}
                    <div 
                      style={{ height: incomeHeight }}
                      className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-sm shadow-[0_0_8px_rgba(59,130,246,0.15)] relative group-hover:from-blue-500 transition-all duration-500"
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none rounded bg-zinc-900 border border-white/5 py-0.5 px-1 font-mono text-[8px] text-blue-300 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap z-10">
                        Inc: ${avg.avgIncome}k
                      </div>
                    </div>

                    {/* Spend column (Purple) */}
                    <div 
                      style={{ height: spendHeight }}
                      className="flex-1 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-sm shadow-[0_0_8px_rgba(168,85,247,0.15)] relative group-hover:from-purple-500 transition-all duration-500"
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none rounded bg-zinc-900 border border-white/5 py-0.5 px-1 font-mono text-[8px] text-purple-300 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap z-10">
                        Score: {avg.avgSpend}
                      </div>
                    </div>
                  </div>

                  {/* Node label */}
                  <div className="mt-3 text-center border-t border-white/[0.04] pt-1.5 w-full">
                    <span className="font-display font-medium text-[9px] text-zinc-400 line-clamp-1">
                      {avg.cluster.name.split(' ')[0]}
                    </span>
                    <span className="font-mono text-[8.5px] text-zinc-600 block mt-0.5 leading-none">
                      ID #{avg.cluster.id}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Graph Legend */}
          <div className="mt-3.5 flex justify-center space-x-6 text-[10px] font-mono p-1 rounded-lg bg-zinc-950/20 border border-white/[0.03]">
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-sm bg-gradient-to-tr from-blue-600 to-indigo-500" />
              <span className="text-zinc-500">Average Annual Income ($)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-sm bg-gradient-to-tr from-purple-600 to-pink-500" />
              <span className="text-zinc-500">Average Spending Score Index</span>
            </div>
          </div>
        </div>

        {/* CHART D: Gradient Boosting Loss & Validation AUC (Line Chart) */}
        <div className="glass-card rounded-2xl p-5 border border-white/[0.04]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-white text-sm flex items-center gap-1.5">
                <LineIcon className="h-4.5 w-4.5 text-emerald-400" />
                <span>Gradient Boosting Convergence Curve</span>
              </h3>
              <p className="text-[11px] text-zinc-500">
                Evaluating model training indices across sequential boosting rounds.
              </p>
            </div>
            {/* Chart toggle mechanism to switch between Accuracy and Loss profiles */}
            <div className="flex rounded-md bg-zinc-950 border border-white/5 p-0.5">
              <button 
                onClick={() => setShowLossMetric(false)}
                className={`px-2 py-0.5 rounded font-mono text-[9px] ${!showLossMetric ? 'bg-indigo-500/10 text-white border border-indigo-500/20' : 'text-zinc-500'}`}
              >
                ACCURACY
              </button>
              <button 
                onClick={() => setShowLossMetric(true)}
                className={`px-2 py-0.5 rounded font-mono text-[9px] ${showLossMetric ? 'bg-indigo-500/10 text-white border border-indigo-500/20' : 'text-zinc-500'}`}
              >
                LOSS CURVE
              </button>
            </div>
          </div>

          <div className="relative border border-white/[0.03] bg-zinc-950/40 rounded-xl p-4 overflow-hidden h-[230px]">
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
              
              {/* Grid guide vectors */}
              <line x1="2" y1="5" x2="98" y2="5" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="2" y1="15" x2="98" y2="15" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="2" y1="25" x2="98" y2="25" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="2" y1="35" x2="98" y2="35" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              <line x1="2" y1="45" x2="98" y2="45" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />

              {/* Draw Line Curve */}
              {(() => {
                let pointsStr = '';
                epochData.forEach((d, i) => {
                  const x = 5 + (d.epoch / 100) * 90;
                  // Map values
                  const val = showLossMetric ? (d.loss / 1.0) * 100 : (d.accuracy / 100) * 100;
                  // Invert since 0 starts at top
                  const y = 45 - (val / 100) * 40;
                  pointsStr += `${x},${y} `;
                });

                const fillColor = showLossMetric ? '#ef4444' : '#10b981';
                const gradID = showLossMetric ? 'redLineGrad' : 'greenLineGrad';

                return (
                  <g>
                    {/* Shadow Gradient under Path */}
                    <path
                      d={`M 5,45 ${pointsStr} L 95,45 Z`}
                      fill={`url(#${gradID})`}
                      opacity="0.1"
                    />

                    {/* Plot Outline Path */}
                    <polyline
                      fill="none"
                      stroke={fillColor}
                      strokeWidth="1.8"
                      points={pointsStr}
                      strokeLinecap="round"
                    />

                    {/* Definitions for fill gradients */}
                    <defs>
                      <linearGradient id="greenLineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="redLineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Epoch node indicators */}
                    {epochData.map((d) => {
                      const x = 5 + (d.epoch / 100) * 90;
                      const val = showLossMetric ? (d.loss / 1.0) * 100 : (d.accuracy / 100) * 100;
                      const y = 45 - (val / 100) * 40;

                      return (
                        <circle
                          key={d.epoch}
                          cx={x}
                          cy={y}
                          r="1"
                          fill="#ffffff"
                          stroke={fillColor}
                          strokeWidth="0.8"
                          className="cursor-pointer hover:r-[2.2] transition-all"
                        />
                      );
                    })}
                  </g>
                );
              })()}

            </svg>

            {/* Left and Right metrics overlays */}
            <div className="absolute top-2 left-4 font-mono text-[8px] text-zinc-500">
              {showLossMetric ? 'Loss scale [1.0 -> 0.0]' : 'Target Validation Accuracy [0% - 100%]'}
            </div>
            <div className="absolute bottom-2 right-4 font-mono text-[8px] text-zinc-500">
              {'Epoch Iterations [0 -> 100 rounds]'}
            </div>
          </div>

          {/* Summary notes */}
          <div className="mt-3.5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <div className="flex items-center space-x-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>Convergence matched at Epoch #64. No over-fitting signals detected.</span>
            </div>
            <span>K-Fold Split: 80/20</span>
          </div>

        </div>

      </div>

    </div>
  );
}
