import React from 'react';
import { 
  GitCommit, 
  GitPullRequest, 
  Layers, 
  Activity, 
  ArrowRight, 
  Terminal, 
  Sparkles,
  HelpCircle,
  Network
} from 'lucide-react';
import { PredictionResult } from '../types';

interface AIInsightsProps {
  currentPrediction: PredictionResult | null;
}

export default function AIInsights({ currentPrediction }: AIInsightsProps) {
  // Safe fallback trace if no model has run
  const defaultTrace = [
    {
      treeIndex: 1,
      splitFeature: 'Spending Score',
      splitValue: 30,
      decision: 'Spending Score is within neutral bounds (30 - 59)',
      weightContribution: 0.15
    },
    {
      treeIndex: 2,
      splitFeature: 'Age',
      splitValue: 33,
      decision: 'Age is in mid-range bracket (34 - 49)',
      weightContribution: 0.08
    },
    {
      treeIndex: 3,
      splitFeature: 'Annual Income',
      splitValue: 35,
      decision: 'Annual Income is stable ($35k - $84k)',
      weightContribution: 0.12
    },
    {
      treeIndex: 4,
      splitFeature: 'Income-Spend Cross-Factor',
      splitValue: 1.5,
      decision: 'Interactive coordinates product is normal',
      weightContribution: 0.05
    }
  ];

  const traceToRender = currentPrediction ? currentPrediction.treeTrace : defaultTrace;

  // Let's sum weights to show math logs
  const totalLogOdds = traceToRender.reduce((sum, t) => sum + t.weightContribution, 0.05); // including base index
  const probabilityPercent = Math.round((1 / (1 + Math.exp(-totalLogOdds))) * 100);

  return (
    <div id="ai-insights-workspace" className="space-y-6 px-4 sm:px-6">
      
      {/* SECTION HEADER */}
      <div className="border-b border-white/[0.06] pb-4">
        <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
          <Network className="h-5 w-5 text-purple-400" />
          <span>Algorithmic Decision Tree & Segment Insights</span>
        </h2>
        <p className="text-xs text-zinc-400">
          Academic debugger mapping K-Means vector mathematics and Gradient Boosting sequential leaves.
        </p>
      </div>

      {/* MULTI MODULE PRESENTATION PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT: XGBOOST SEQUENTIAL LOSS SOLVER TREE ROADMAP */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-white/[0.04]">
            
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-white text-sm flex items-center gap-1.5">
                  <GitPullRequest className="h-4.5 w-4.5 text-purple-400" />
                  <span>Sequential Booster Tree Leaves Debugger</span>
                </h3>
                <p className="text-[11px] text-zinc-500">
                  Gradient boosting reduces residual loss recursively. Observe how positive or negative scores accumulate.
                </p>
              </div>
              <span className="font-mono text-[9px] text-emerald-400 uppercase font-semibold">Live Tree Logs</span>
            </div>

            {/* Tree Flow Grid */}
            <div className="space-y-3 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-[1px] before:bg-white/[0.08]">
              
              {/* Prior Base Bias Score */}
              <div className="flex items-start space-x-3 relative">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-zinc-950 font-mono text-xs font-bold text-zinc-400 shadow-md">
                  P0
                </div>
                <div className="flex-1 rounded-xl border border-white/[0.03] bg-zinc-950/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-200">Base Prior Bias Log-Odds</span>
                    <span className="font-mono text-[11px] text-zinc-500">+0.05 log-odds</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed">
                    Prior raw probability balance initialized before recursive boosting splits compile.
                  </p>
                </div>
              </div>

              {/* Loop and draw Trees dynamically */}
              {traceToRender.map((node, i) => {
                const isPositive = node.weightContribution >= 0;
                return (
                  <div key={node.treeIndex} className="flex items-start space-x-3 relative">
                    {/* Circle Node Badge */}
                    <div className={`z-10 flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-sm font-bold shadow-md ${
                      isPositive 
                        ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400' 
                        : 'border-rose-500/20 bg-rose-500/5 text-rose-400'
                    }`}>
                      T{node.treeIndex}
                    </div>

                    {/* Decision detail */}
                    <div className="flex-1 rounded-xl border border-white/[0.03] bg-zinc-950/20 p-3.5 transition hover:border-white/[0.06]">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                            Boosting Tree Iteration #{node.treeIndex} (Target: {node.splitFeature})
                          </span>
                          <h4 className="font-display font-semibold text-zinc-200 text-xs mt-0.5">
                            {node.decision}
                          </h4>
                        </div>
                        <div className={`font-mono text-xs font-bold text-right sm:mt-0 mt-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isPositive ? '+' : ''}{node.weightContribution.toFixed(2)} logRes
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Sigmoid Aggregation formula */}
              <div className="flex items-start space-x-3 relative">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono text-sm font-bold shadow-md animate-pulse">
                  f(x)
                </div>
                <div className="flex-1 rounded-xl border border-blue-500/10 bg-blue-500/5 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-0.5">
                    <div>
                      <span className="font-mono text-[9px] text-blue-300 uppercase font-semibold">SIGMOID PROBABILITY TRANSFORMATION</span>
                      <div className="font-mono text-xs font-bold text-zinc-200 mt-0.5">
                        p = 1 / (1 + e^-({totalLogOdds.toFixed(2)} log-odds))
                      </div>
                    </div>
                    <div className="text-right sm:mt-0 mt-2">
                      <span className="font-mono text-[9px] text-zinc-400 uppercase block">Calculated propensity</span>
                      <span className="font-display text-lg font-bold text-emerald-400">{probabilityPercent}%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT: K-MEANS DISTANCES & THEORY MATH */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* Explanation card 1 */}
          <div className="glass-card rounded-2xl p-5 border border-white/[0.04]">
            <span className="font-mono text-[9px] uppercase tracking-wider text-purple-400">
              Unsupervised clustering
            </span>
            <h3 className="font-display font-bold text-white text-sm mt-1 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-purple-400" />
              <span>K-Means Mathematical Bounds</span>
            </h3>
            
            <p className="text-xs leading-relaxed text-zinc-400 mt-2">
              K-Means organizes non-labeled telemetry by minimizing geometric variances between elements. In this application, we analyze coordinate values across coordinates space:
            </p>

            <div className="mt-4 rounded-xl bg-zinc-950 p-3.5 border border-white/[0.04] space-y-3 font-mono text-[11px] text-zinc-400">
              <div className="text-white font-semibold">Distance Formula used:</div>
              <div className="bg-black/60 p-2 rounded text-center text-blue-300 font-bold overflow-x-auto whitespace-nowrap">
                d = √ [ w₁ΔAge² + w₂ΔIncome² + w₃ΔSpend² ]
              </div>
              <p className="text-[10px] text-zinc-500">
                Weights normalize different dimensional scales, matching large income bounds smoothly into 3D relative spaces.
              </p>
            </div>
          </div>

          {/* Explanation card 2 */}
          <div className="glass-card rounded-2xl p-5 border border-white/[0.04] flex-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-indigo-400">
              Boosting Tree Residuals
            </span>
            <h3 className="font-display font-bold text-white text-sm mt-1 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-indigo-400" />
              <span>Why Gradient Boosting?</span>
            </h3>
            
            <p className="text-xs leading-relaxed text-zinc-400 mt-2">
              Unlike individual Random Forests which average independent trees, Gradient Boosting compiles sequential trees where each subsequent tree fits directly on the residual error (loss) of previous decisions.
            </p>

            <div className="mt-3.5 space-y-2">
              <div className="rounded-lg bg-zinc-950/60 p-2.5 border border-white/5 flex items-start space-x-2">
                <span className="mt-[2px] leading-none text-emerald-400 font-bold">✓</span>
                <p className="text-[11px] text-zinc-400 font-mono">
                  Optimizes non-linear correlation boundaries flawlessly.
                </p>
              </div>

              <div className="rounded-lg bg-zinc-950/60 p-2.5 border border-white/5 flex items-start space-x-2">
                <span className="mt-[2px] leading-none text-emerald-400 font-bold">✓</span>
                <p className="text-[11px] text-zinc-400 font-mono">
                  Sparsity-aware splitting handles extreme customer score variations with minimal pre-processing.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
