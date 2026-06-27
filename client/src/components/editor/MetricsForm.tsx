import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus } from 'lucide-react';
import { CreatorKit, Metric, MetricPlatform } from '../../lib/types';

interface Props {
  kit: CreatorKit;
  onChange: (updates: Partial<CreatorKit>) => void;
}

const PLATFORMS: MetricPlatform[] = ['youtube', 'instagram', 'tiktok', 'twitter', 'twitch', 'other'];

export function MetricsForm({ kit, onChange }: Props) {
  const metrics = kit.metrics || [];

  const addMetric = () => {
    const newMetric: Metric = {
      id: crypto.randomUUID(),
      platform: 'youtube',
      handle: '',
      followers: 0,
      engagement: 0
    };
    onChange({ metrics: [...metrics, newMetric] });
  };

  const removeMetric = (id: string) => {
    onChange({ metrics: metrics.filter(m => m.id !== id) });
  };

  const updateMetric = (id: string, updates: Partial<Metric>) => {
    onChange({
      metrics: metrics.map(m => m.id === id ? { ...m, ...updates } : m)
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-[24px] leading-[1.3] font-medium text-cohere-black" style={{ fontFamily: 'Geist, sans-serif' }}>Metrics</h2>
        <button 
          onClick={addMetric}
          className="flex items-center gap-2 text-[14px] font-medium bg-transparent border border-cohere-slate text-cohere-nearblack hover:bg-cohere-paleblue hover:border-cohere-blue px-[24px] py-[8px] rounded-[30px] transition-colors"
        >
          <Plus size={16} /> Add Platform
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {metrics.map(metric => (
            <motion.div 
              key={metric.id}
              initial={{ opacity: 0, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-cohere-white border border-cohere-borderlight p-[20px] rounded-[16px] flex flex-col gap-4 overflow-hidden"
            >
              <div className="flex gap-3">
                <select 
                  className="bg-cohere-stone border-0 p-[10px] rounded-[8px] text-cohere-ink text-[14px] outline-none transition-colors ring-1 ring-transparent focus:ring-[#9b60aa] flex-1 capitalize"
                  value={metric.platform}
                  onChange={(e) => updateMetric(metric.id, { platform: e.target.value as MetricPlatform })}
                >
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <input 
                  className="bg-cohere-stone border-0 p-[10px] rounded-[8px] text-cohere-ink text-[14px] outline-none transition-colors ring-1 ring-transparent focus:ring-[#9b60aa] flex-1"
                  placeholder="Handle (e.g. janedoe)"
                  value={metric.handle}
                  onChange={(e) => updateMetric(metric.id, { handle: e.target.value })}
                />
                <button 
                  onClick={() => removeMetric(metric.id)}
                  className="p-2 text-[#b30000] hover:bg-[#b30000]/10 rounded-full transition-colors flex shrink-0 items-center justify-center"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-[12px] text-cohere-slate">Followers</label>
                  <input 
                    type="number" min="0"
                    className="bg-cohere-stone border-0 p-[10px] rounded-[8px] text-cohere-ink text-[14px] outline-none transition-colors ring-1 ring-transparent focus:ring-[#9b60aa] w-full"
                    value={metric.followers || ''}
                    onChange={(e) => updateMetric(metric.id, { followers: Number(e.target.value) })}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-[12px] text-cohere-slate">Engagement (%)</label>
                  <input 
                    type="number" min="0" step="0.1"
                    className="bg-cohere-stone border-0 p-[10px] rounded-[8px] text-cohere-ink text-[14px] outline-none transition-colors ring-1 ring-transparent focus:ring-[#9b60aa] w-full"
                    value={metric.engagement || ''}
                    onChange={(e) => updateMetric(metric.id, { engagement: Number(e.target.value) })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {metrics.length === 0 && (
          <p className="text-[14px] text-cohere-slate text-center py-6 border border-dashed border-cohere-hairline rounded-[16px]">
            No metrics added yet.
          </p>
        )}
      </div>
    </div>
  );
}
