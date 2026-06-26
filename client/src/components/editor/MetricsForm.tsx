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
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Metrics</h2>
        <button 
          onClick={addMetric}
          className="flex items-center gap-1 text-sm bg-container border border-muted hover:border-accent px-3 py-1.5 rounded transition-colors"
        >
          <Plus size={16} /> Add Platform
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {metrics.map(metric => (
            <motion.div 
              key={metric.id}
              initial={{ opacity: 0, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-container border border-muted p-4 rounded flex flex-col gap-3 overflow-hidden"
            >
              <div className="flex gap-2">
                <select 
                  className="bg-base border border-muted p-2 rounded text-white flex-1 capitalize"
                  value={metric.platform}
                  onChange={(e) => updateMetric(metric.id, { platform: e.target.value as MetricPlatform })}
                >
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <input 
                  className="bg-base border border-muted p-2 rounded text-white flex-1"
                  placeholder="Handle (e.g. janedoe)"
                  value={metric.handle}
                  onChange={(e) => updateMetric(metric.id, { handle: e.target.value })}
                />
                <button 
                  onClick={() => removeMetric(metric.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Followers</label>
                  <input 
                    type="number" min="0"
                    className="bg-base border border-muted p-2 rounded text-white w-full"
                    value={metric.followers || ''}
                    onChange={(e) => updateMetric(metric.id, { followers: Number(e.target.value) })}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Engagement (%)</label>
                  <input 
                    type="number" min="0" step="0.1"
                    className="bg-base border border-muted p-2 rounded text-white w-full"
                    value={metric.engagement || ''}
                    onChange={(e) => updateMetric(metric.id, { engagement: Number(e.target.value) })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {metrics.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4 border border-dashed border-muted rounded">
            No metrics added yet.
          </p>
        )}
      </div>
    </div>
  );
}
