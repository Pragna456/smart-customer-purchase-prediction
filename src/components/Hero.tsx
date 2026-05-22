import { Sparkles, Cpu, Layers } from 'lucide-react';

export default function Hero() {
  return (
    <header className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12 text-center">
      
      {/* Decorative Gradient Glows Behind Header */}
      <div className="absolute top-0 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/10 to-purple-800/10 blur-[100px]" />
      
      {/* Visual Badge */}
      <div className="inline-flex items-center space-x-2 rounded-full border border-blue-500/25 bg-blue-500/5 px-3.5 py-1.5 backdrop-blur-md mb-4 sm:mb-6 animate-fade-in">
        <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
        <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-blue-300 uppercase">
          Graduate Defense Showcase & Presentation
        </span>
      </div>

      <div className="mx-auto max-w-4xl px-4">
        {/* Main Title heading  */}
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Smart Customer{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Purchase Prediction
          </span>{' '}
          System
        </h1>

        {/* Small subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base lg:text-lg">
          Simulating neural pipeline segmentation using unsupervised <strong className="text-blue-300">K-Means Centroid Clustering</strong> and sequential <strong className="text-purple-300">XGBoost Gradient Boosting</strong> structures to optimize dynamic conversions on modern retail telemetry.
        </p>

        {/* Dynamic AI-themed Animated Tech Ring */}
        <div className="relative mx-auto mt-8 flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
          
          {/* Pulsing Radial Background Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-md animate-pulse" />

          {/* Rotating Outer Tech Path */}
          <svg className="absolute h-full w-full animate-spin-slow text-blue-500/40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="30 15 40 10" />
          </svg>

          {/* Opposite Rotating Ring */}
          <svg className="absolute h-full w-full text-purple-500/30" style={{ animation: 'spin 12s linear infinite reverse' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="10 30 15 15" />
          </svg>

          {/* Glowing Center Core */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.1] bg-black/80 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Cpu className="h-6 w-6 text-indigo-400 animate-pulse" />
          </div>

          {/* Feature Badges orbiting */}
          <div className="absolute -top-1 -right-4 flex items-center space-x-1 rounded-md border border-white/5 bg-zinc-900/90 px-2 py-0.5 shadow-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            <span className="font-mono text-[9px] font-semibold text-zinc-400 uppercase">K-Means</span>
          </div>

          <div className="absolute -bottom-1 -left-4 flex items-center space-x-1 rounded-md border border-white/5 bg-zinc-900/90 px-2 py-0.5 shadow-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <span className="font-mono text-[9px] font-semibold text-zinc-400 uppercase">boosting</span>
          </div>

        </div>

      </div>

      {/* Tailwind handles slow spin nicely */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </header>
  );
}
