import React from 'react';
import { CreatorKit } from '../../lib/types';
import { motion, AnimatePresence } from 'framer-motion';

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export function MetricsGrid({ kit }: { kit: CreatorKit }) {
  const metrics = kit.metrics || [];

  if (metrics.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-6 text-white border-b border-muted pb-2">Audience Metrics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {metrics.map(m => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={m.id}
              className="bg-container border border-muted/50 rounded-xl p-5 relative overflow-hidden group hover:border-accent/50 transition-colors"
            >
              {/* Subtle accent bar on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/30 group-hover:bg-accent transition-colors" />
              
              <div className="flex justify-between items-start mb-4">
                <span className="capitalize font-semibold text-gray-300">{m.platform}</span>
                <span className="text-sm text-gray-500 font-mono truncate max-w-[100px]">@{m.handle}</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black tracking-tight text-white">{formatNumber(m.followers)}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Followers</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-lg font-bold text-accent">{m.engagement}%</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Engagement</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
