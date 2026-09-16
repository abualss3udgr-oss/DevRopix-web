import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Users, Calendar, Cpu } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { t, settings } = useApp();

  const statItems = [
    {
      icon: <Briefcase className="w-6 h-6 text-indigo-400" />,
      value: `${settings.stats_projects}+`,
      label: t.stats.projectsDone,
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      value: `${settings.stats_clients}+`,
      label: t.stats.happyClients,
    },
    {
      icon: <Calendar className="w-6 h-6 text-indigo-400" />,
      value: `${settings.stats_years}+`,
      label: t.stats.experienceYears,
    },
    {
      icon: <Cpu className="w-6 h-6 text-indigo-400" />,
      value: `${settings.stats_technologies}+`,
      label: t.stats.technologiesCount,
    },
  ];

  return (
    <section className="py-16 bg-[#36366F] text-white relative overflow-hidden">
      {/* Background Accent Grid / Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center">
          {statItems.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-indigo-400/50 transition-all duration-300 flex flex-col items-center justify-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
