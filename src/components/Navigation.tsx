import { Brain, LayoutDashboard, Cpu, LineChart, Sparkles } from 'lucide-react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Monitor', icon: LayoutDashboard },
    { id: 'predictions', label: 'Simulator', icon: Brain },
    { id: 'analytics', label: 'Analytics Workspace', icon: LineChart },
    { id: 'insights', label: 'ML Insights', icon: Cpu },
  ] as const;

  return (
    <nav id="app-navbar" className="sticky top-0 z-50 w-full border-b border-white/[0.1] bg-white/[0.03] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Futuristic Brand Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex cursor-pointer items-center space-x-2 group"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 transition-transform duration-300 group-hover:scale-105">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
            <Brain className="relative h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold tracking-wide text-white uppercase sm:text-base">
              Aegis<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">.Predict</span>
            </span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest sm:block hidden">
              K-Means & XGBoost Tensor v4.2
            </span>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                id={`nav-${item.id}`}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex items-center space-x-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-300 md:text-sm sm:px-3.5 sm:py-2 ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:bg-white/[0.03] hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 transition-transform duration-300 ${
                  isActive ? 'text-blue-400' : 'text-zinc-400 group-hover:scale-110'
                }`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Connection Indicator (Purely decorative & humble representation of connection status) */}
        <div className="hidden items-center space-x-2 rounded-full border border-white/[0.05] bg-zinc-950/40 px-3 py-1.5 font-mono text-[10px] text-zinc-400 lg:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-zinc-500">LOCAL MODEL STANDBY</span>
        </div>

      </div>
    </nav>
  );
}
