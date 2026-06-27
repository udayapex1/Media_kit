'use client';

import React from 'react';
import { CreatorKit, MetricPlatform } from '../../lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaySquare, Camera, MessageCircle, Gamepad2, Link as LinkIcon } from 'lucide-react';
import { MetricsGridSkeleton } from './KitPreviewSkeleton';

const PlatformIcon = ({ platform, className }: { platform: MetricPlatform, className?: string }) => {
  switch (platform) {
    case 'youtube': return <PlaySquare className={className} />;
    case 'instagram': return <Camera className={className} />;
    case 'twitter': return <MessageCircle className={className} />;
    case 'twitch': return <Gamepad2 className={className} />;
    default: return <LinkIcon className={className} />;
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export function MetricsGrid({ kit, loading = false }: { kit: CreatorKit; loading?: boolean }) {
  if (loading) return <MetricsGridSkeleton />;

  const metrics = kit.metrics || [];

  if (metrics.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-[24px] font-medium mb-6 text-cohere-black border-b border-cohere-hairline pb-4" style={{ fontFamily: 'Geist, sans-serif' }}>Audience Metrics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {metrics.map(m => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={m.id}
              className="bg-cohere-white border border-cohere-borderlight rounded-[16px] p-[24px] relative overflow-hidden group hover:border-cohere-slate transition-colors shadow-sm"
            >
              {/* Subtle accent bar on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/30 group-hover:bg-accent transition-colors" />
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={m.platform} className="w-5 h-5 text-cohere-slate" />
                  <span className="capitalize font-semibold text-cohere-ink text-[16px]">{m.platform}</span>
                </div>
                <span className="text-[14px] text-cohere-slate font-mono uppercase tracking-wider truncate max-w-[120px]">@{m.handle}</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-[36px] leading-[1] font-medium tracking-[-0.32px] text-cohere-black" style={{ fontFamily: 'Geist, sans-serif' }}>{formatNumber(m.followers)}</span>
                  <span className="text-[14px] text-cohere-slate uppercase tracking-wider font-mono">Followers</span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-[20px] font-medium text-accent">{m.engagement}%</span>
                  <span className="text-[14px] text-cohere-slate uppercase tracking-wider font-mono">Engagement</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
