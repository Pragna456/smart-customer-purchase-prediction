import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  RefreshCcw, 
  ShieldAlert, 
  CircleDot, 
  ChevronRight,
  TrendingUp,
  Brain,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { PredictionInput, PredictionResult } from '../types';
import { predictCustomerBehavior } from '../data';

interface PredictionCardProps {
  onPredictionComplete: (result: PredictionResult) => void;
}

const PRESETS = [
  { name: 'Elite Member (VIP)', age: 34, income: 115, spendingScore: 89, description: 'High income, high spending affinity.' },
  { name: 'Frugal Saver', age: 52, income: 25, spendingScore: 15, description: 'Low income, cautious purchases.' },
  { name: 'Afluent Conservative', age: 55, income: 110, spendingScore: 18, description: 'High income, low brand attachments.' },
  { name: 'Trend-Focused Youth', age: 24, income: 35, spendingScore: 82, description: 'Low income, high impulsive buys.' },
  { name: 'Balanced Household', age: 41, income: 58, spendingScore: 52, description: 'Middle class baseline consumer.' }
];

const LOADING_SEQS = [
  'Initializing XGBoost decision nodes...',
  'Extracting normalized 3D coordinates (Age, Income, Spend)...',
  'Interpreting minimum distance to K-Means centroids...',
  'Compiling decision paths across boosting trees 1-4...',
  'Mapping probability outcomes through Sigmoid activation...',
  'Synthesizing ultimate consumer cluster recommendation...'
];

export default function PredictionCard({ onPredictionComplete }: PredictionCardProps) {
  const [inputs, setInputs] = useState<PredictionInput>({
    age: 35,
    income: 60,
    spendingScore: 50
  });

  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [loadStep, setLoadStep] = useState(0);
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);

  // Load a preset archetype immediately
  const handleLoadPreset = (preset: typeof PRESETS[0]) => {
    setInputs({
      age: preset.age,
      income: preset.income,
      spendingScore: preset.spendingScore
    });
    // If we have a result active, instantly predict for convenience
    if (loadingState === 'success') {
      const res = predictCustomerBehavior({
        age: preset.age,
        income: preset.income,
        spendingScore: preset.spendingScore
      });
      setCurrentResult(res);
      onPredictionComplete(res);
    }
  };

  const handleInputChange = (field: keyof PredictionInput, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState('loading');
    setLoadStep(0);
  };

  // Step-by-step fake neural processing animation sequence
  useEffect(() => {
    if (loadingState !== 'loading') return;

    if (loadStep < LOADING_SEQS.length) {
      const delay = 350 + Math.random() * 200;
      const timer = setTimeout(() => {
        setLoadStep(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Finished simulation, update state
      const resultObj = predictCustomerBehavior(inputs);
      setCurrentResult(resultObj);
      onPredictionComplete(resultObj);
      setLoadingState('success');
    }
  }, [loadingState, loadStep, inputs]);

  const handleReset = () => {
    setLoadingState('idle');
    setCurrentResult(null);
  };

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* LEFT: Simulation Input Controls (5 columns on large screen) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* Archetype Quick-Loaders */}
            <div className="glass-card rounded-2xl p-4 border border-white/[0.05]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-2">
                Aegis.Tensor Preset Clusters
              </span>
              <div className="flex flex-col space-y-2">
                {PRESETS.map((preset) => {
                  const isActive = inputs.age === preset.age && 
                                   inputs.income === preset.income && 
                                   inputs.spendingScore === preset.spendingScore;
                  return (
                    <button
                      key={preset.name}
                      onClick={() => handleLoadPreset(preset)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-all duration-300 ${
                        isActive
                          ? 'border border-blue-500/30 bg-blue-500/10 text-white'
                          : 'border border-transparent bg-zinc-950/40 text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium font-display translate-y-[1px]">{preset.name}</span>
                        <span className="text-[10px] text-zinc-500 line-clamp-1">{preset.description}</span>
                      </div>
                      <div className="font-mono text-[10px] text-blue-400/80">
                        {preset.age}y/{preset.income}k/{preset.spendingScore}%
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Form Card */}
            <form onSubmit={handlePredict} className="glass-card rounded-2xl p-6 border border-white/[0.05] flex-1">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display font-medium text-white flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-purple-400" />
                  <span>Telemetry Sliders</span>
                </h3>
                <span className="font-mono text-[10px] rounded-full bg-zinc-900 px-2 py-0.5 text-zinc-500">
                  INPUT_VECTOR
                </span>
              </div>

              {/* Slider 1: Age */}
              <div id="slider-container-age" className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="input-age" className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                    <span>Age Range</span>
                  </label>
                  <span className="font-mono text-xs font-bold text-blue-400">{inputs.age} years</span>
                </div>
                <input
                  id="input-age"
                  type="range"
                  min="18"
                  max="70"
                  value={inputs.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  disabled={loadingState === 'loading'}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                  <span>18y (Min)</span>
                  <span>70y (Max)</span>
                </div>
              </div>

              {/* Slider 2: Income */}
              <div id="slider-container-income" className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="input-income" className="text-xs font-semibold text-zinc-400">
                    Annual Income
                  </label>
                  <span className="font-mono text-xs font-bold text-indigo-400">${inputs.income}k / year</span>
                </div>
                <input
                  id="input-income"
                  type="range"
                  min="15"
                  max="150"
                  value={inputs.income}
                  onChange={(e) => handleInputChange('income', parseInt(e.target.value))}
                  disabled={loadingState === 'loading'}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-50"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                  <span>$15k</span>
                  <span>$150k</span>
                </div>
              </div>

              {/* Slider 3: Spending Score */}
              <div id="slider-container-spending" className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="input-spending" className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                    <span>Spending Affinity</span>
                    <HelpCircle className="h-3 w-3 text-zinc-600 cursor-help" title="Index score reflecting historical buying rate." />
                  </label>
                  <span className="font-mono text-xs font-bold text-purple-400">{inputs.spendingScore} / 100</span>
                </div>
                <input
                  id="input-spending"
                  type="range"
                  min="1"
                  max="100"
                  value={inputs.spendingScore}
                  onChange={(e) => handleInputChange('spendingScore', parseInt(e.target.value))}
                  disabled={loadingState === 'loading'}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500 disabled:opacity-50"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                  <span>1 (Passive)</span>
                  <span>100 (Frequent)</span>
                </div>
              </div>

              {/* Large Modern Trigger Button */}
              <button
                id="btn-predict-behavior"
                type="submit"
                disabled={loadingState === 'loading'}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-3.5 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-indigo-500/20 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
              >
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {loadingState === 'loading' ? (
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="font-mono text-xs">CALCULATING PROBABILITY...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5">
                    <Brain className="h-4 w-4 animate-pulse" />
                    <span className="tracking-wide">PREDICT CUSTOMER BEHAVIOR</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Results Display Panels (7 columns on large screen) */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[350px]">
            
            {/* State A: Idle (No runs executed yet) */}
            {loadingState === 'idle' && (
              <div className="glass-card flex flex-col items-center justify-center rounded-2xl border border-white/[0.04] p-10 text-center scale-95 opacity-90 h-full">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 shadow-lg text-zinc-500 animate-pulse">
                  <Brain className="h-7 w-7 text-zinc-400" />
                </div>
                <h4 className="mt-4 font-display font-medium text-zinc-100 text-lg">Machine Learning Standby</h4>
                <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-zinc-400">
                  Slide the telemetry variables or load an archetype from the presets panel to compute mathematical buying propensity.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                  <span className="rounded bg-zinc-900 border border-white/5 py-1 px-2 font-mono text-[9px] text-zinc-400">K-MEANS EUCLID DIST</span>
                  <span className="rounded bg-zinc-900 border border-white/5 py-1 px-2 font-mono text-[9px] text-zinc-400">XGBOOST LOG ODDS</span>
                  <span className="rounded bg-zinc-900 border border-white/5 py-1 px-2 font-mono text-[9px] text-zinc-400">SIGMOID CLASSIFIER</span>
                </div>
              </div>
            )}

            {/* State B: Loading Pipeline Feedback */}
            {loadingState === 'loading' && (
              <div className="glass-card flex flex-col justify-center rounded-2xl border border-white/[0.04] p-8 h-full">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold text-blue-400">NEURAL GRAPH COMPLIANCE IN PROGRESS</span>
                  <span className="font-mono text-xs font-bold text-zinc-400">
                    {Math.round((loadStep / LOADING_SEQS.length) * 100)}%
                  </span>
                </div>

                {/* Animated Futuristic Radial Loader */}
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
                  <svg className="absolute h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.02)" strokeWidth="4" fill="none" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="42" 
                      stroke="url(#progressGrad)" 
                      strokeWidth="5" 
                      fill="none" 
                      strokeDasharray="263"
                      strokeDashoffset={263 - (263 * (loadStep / LOADING_SEQS.length))}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                    <defs>
                      <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex flex-col items-center justify-center text-center">
                    <CircuitPulseIcon className="h-8 w-8 text-indigo-400 animate-bounce" />
                    <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 mt-1">EVALUATING</span>
                  </div>
                </div>

                {/* Loading Logs console terminal */}
                <div className="mt-8 overflow-hidden rounded-lg bg-black/60 p-3.5 border border-white/[0.05] shadow-inner">
                  <div className="font-mono text-[11px] text-zinc-400 space-y-1.5">
                    {LOADING_SEQS.slice(0, loadStep + 1).map((log, idx) => {
                      const isLast = idx === loadStep;
                      return (
                        <div key={idx} className={`flex items-start space-x-1.5 ${isLast ? 'text-blue-400 animate-pulse' : 'text-zinc-500'}`}>
                          <ChevronRight className="h-3 w-3 mt-[1.5px] flex-shrink-0" />
                          <span>{log}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* State C: Successfully computed outputs */}
            {loadingState === 'success' && currentResult && (
              <div className="glass-card overflow-hidden rounded-2xl border border-white/[0.05] p-5 sm:p-6 shadow-2xl animate-fade-in relative">
                
                {/* Visual Glow Layer based on assigned cluster */}
                <div className={`absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-tr ${currentResult.cluster.color} opacity-[0.22] blur-3xl`} />

                <div className="relative flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4 sm:mb-5">
                  <div className="flex items-center space-x-2.5">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${currentResult.cluster.color} shadow-lg`}>
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base sm:text-lg">
                        {currentResult.customerType}
                      </h4>
                      <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500 tracking-wider uppercase">
                        K-Means Centroid Alignment: ID #{currentResult.cluster.id}
                      </p>
                    </div>
                  </div>

                  {/* Redo button */}
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-1.5 rounded-md border border-white/5 bg-zinc-900/60 hover:bg-zinc-800 px-2.5 py-1 font-mono text-[10px] text-zinc-400 transition"
                  >
                    <RefreshCcw className="h-3 w-3" />
                    <span>RESET</span>
                  </button>
                </div>

                {/* Metrics Panels */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4 sm:mb-5">
                  
                  {/* Left: Purchase Propensity Score Ring */}
                  <div className="rounded-xl border border-white/[0.04] bg-zinc-950/40 p-4 shrink-0 flex items-center gap-4">
                    <div className="relative flex h-20 w-20 items-center justify-center flex-shrink-0">
                      <svg className="absolute h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.03)" strokeWidth="5" fill="none" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="42" 
                          stroke={currentResult.purchaseProbability >= 50 ? '#10b981' : '#f43f5e'} 
                          strokeWidth="6" 
                          fill="none" 
                          strokeDasharray="263"
                          strokeDashoffset={263 - (263 * (currentResult.purchaseProbability / 100))}
                          strokeLinecap="round"
                          className="shadow-md transition-all duration-1000"
                        />
                      </svg>
                      <div className="text-center">
                        <div className="font-display text-lg font-bold text-white">
                          {currentResult.purchaseProbability}%
                        </div>
                        <div className="font-mono text-[8px] text-zinc-500">PROPENSITY</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                        Purchase Prediction
                      </div>
                      <div className={`text-base font-bold font-display mt-0.5 ${
                        currentResult.willPurchase ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {currentResult.willPurchase ? 'HIGH PURCHASE INTENT' : 'CONSERVATIVE RESISTANCE'}
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">
                        {currentResult.customerTypeDescription}
                      </p>
                    </div>
                  </div>

                  {/* Right: Confidence Rate & Prediction Score */}
                  <div className="rounded-xl border border-white/[0.04] bg-zinc-950/40 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                        <div className="flex flex-col">
                          <span className="font-mono text-[9px] uppercase text-zinc-500 leading-none">Model Certainty</span>
                          <span className="font-display font-semibold text-zinc-200 mt-0.5">{currentResult.confidenceScore}% Acc</span>
                        </div>
                      </div>
                      <div className="h-6 w-[1px] bg-white/[0.06]" />
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-4.5 w-4.5 text-blue-400" />
                        <div className="flex flex-col">
                          <span className="font-mono text-[9px] uppercase text-zinc-500 leading-none">Index Weight</span>
                          <span className="font-display font-semibold text-zinc-200 mt-0.5">{currentResult.predictionScore}/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/[0.03] pt-2 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-zinc-500">K-Means Cluster Group:</span>
                      <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${currentResult.cluster.color} px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm`}>
                        {currentResult.cluster.name}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Subtitle / Details Card */}
                <div className="rounded-xl border border-white/[0.04] bg-zinc-950/40 p-4 mb-4 sm:mb-5">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-indigo-400 mb-1.5">
                    Assigned Cluster Insights
                  </div>
                  <h5 className="font-display font-semibold text-zinc-100 text-sm">
                    {currentResult.cluster.tagline}
                  </h5>
                  <p className="text-xs leading-relaxed text-zinc-400 mt-1">
                    {currentResult.cluster.description}
                  </p>
                  
                  {/* Bullet Characteristics */}
                  <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
                    {currentResult.cluster.characteristics.map((char, index) => (
                      <div key={index} className="flex items-start space-x-1 font-mono text-[10px] text-zinc-400">
                        <CircleDot className="h-2 w-2 text-indigo-500 mt-[3px] flex-shrink-0" />
                        <span>{char}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Automated Recommendation Rule */}
                <div className="rounded-xl border border-indigo-500/10 bg-indigo-500/5 p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-10 w-10 bg-indigo-500/10 rounded-bl-xl flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="font-mono text-[10px] font-bold uppercase text-indigo-300">
                    AI recommendation engine output
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-300 font-medium mt-1 pr-6">
                    "{currentResult.aiRecommendation}"
                  </p>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

// Custom decoration icon mimicking dynamic circuitry pulsing
function CircuitPulseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
