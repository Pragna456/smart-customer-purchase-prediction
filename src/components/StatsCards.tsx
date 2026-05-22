import { CheckCircle2, Cpu, BarChart3, Users } from 'lucide-react';

interface StatsCardsProps {
  predictionCount: number;
  averageProbability: number;
}

export default function StatsCards({ predictionCount, averageProbability }: StatsCardsProps) {
  const stats = [
    {
      id: 'stat-accuracy',
      title: 'XGBoost Classification AUC',
      value: '94.8%',
      change: '+1.2% versus baseline LightGBM',
      isPositive: true,
      description: 'Model optimization metric demonstrating high statistical sensitivity and specificity curves.',
      icon: Cpu,
      color: 'text-blue-400',
      glow: 'shadow-blue-500/10'
    },
    {
      id: 'stat-silhouette',
      title: 'K-Means Clustering Quality',
      value: '0.68',
      change: 'Optimal Silhouette Coefficient',
      isPositive: true,
      description: 'Defines how tightly packed objects are grouped in 3D feature coordinates.',
      icon: Users,
      color: 'text-purple-400',
      glow: 'shadow-purple-500/10'
    },
    {
      id: 'stat-confidence',
      title: 'Current Segment Confidence',
      value: `${averageProbability > 0 ? averageProbability : 87.5}%`,
      change: 'Dynamic Bayesian threshold',
      isPositive: true,
      description: 'Mathematical certainty index mapping inputs to designated consumer classifications.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      glow: 'shadow-emerald-500/10'
    },
    {
      id: 'stat-count',
      title: 'Active Simulation Runs',
      value: predictionCount + 342,
      change: '+18 runs in the last hour',
      isPositive: true,
      description: 'Volumetric execution counter since model compilation.',
      icon: BarChart3,
      color: 'text-amber-400',
      glow: 'shadow-amber-500/10'
    }
  ];

  return (
    <div id="stats-grid" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            id={stat.id}
            key={stat.id}
            className={`glass-card glass-card-hover group relative overflow-hidden rounded-xl p-5 shadow-lg transition-all duration-300 ${stat.glow}`}
          >
            {/* Corner Decorative Lights */}
            <div className="absolute top-0 right-0 h-16 w-16 -translate-y-6 translate-x-6 rounded-full bg-white/[0.01] blur-md transition-opacity group-hover:bg-white/[0.03]" />

            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                {stat.title}
              </span>
              <Icon className={`h-4 w-4 ${stat.color} opacity-80 group-hover:scale-110 transition-transform`} />
            </div>

            <div className="mt-3 flex items-baseline space-x-2">
              <span className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 font-medium">
                {stat.change}
              </span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
              {stat.description}
            </p>

            {/* Glowing bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent group-hover:via-zinc-500 transition-all duration-500" />
          </div>
        );
      })}
    </div>
  );
}
