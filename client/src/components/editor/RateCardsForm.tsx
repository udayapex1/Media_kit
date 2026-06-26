import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus } from 'lucide-react';
import { CreatorKit, RateCard } from '../../lib/types';

interface Props {
  kit: CreatorKit;
  onChange: (updates: Partial<CreatorKit>) => void;
}

export function RateCardsForm({ kit, onChange }: Props) {
  const rateCards = kit.rate_cards || [];

  const addCard = () => {
    const newCard: RateCard = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      price: 0,
      turnaround: ''
    };
    onChange({ rate_cards: [...rateCards, newCard] });
  };

  const removeCard = (id: string) => {
    onChange({ rate_cards: rateCards.filter(rc => rc.id !== id) });
  };

  const updateCard = (id: string, updates: Partial<RateCard>) => {
    onChange({
      rate_cards: rateCards.map(rc => rc.id === id ? { ...rc, ...updates } : rc)
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Rate Matrix</h2>
        <button 
          onClick={addCard}
          className="flex items-center gap-1 text-sm bg-container border border-muted hover:border-accent px-3 py-1.5 rounded transition-colors"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {rateCards.map(rc => (
            <motion.div 
              key={rc.id}
              initial={{ opacity: 0, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-container border border-muted p-4 rounded flex flex-col gap-3 overflow-hidden"
            >
              <div className="flex gap-2">
                <input 
                  className="bg-base border border-muted p-2 rounded text-white flex-1 font-medium"
                  placeholder="Service Name (e.g. Dedicated Video)"
                  value={rc.name}
                  onChange={(e) => updateCard(rc.id, { name: e.target.value })}
                />
                <button 
                  onClick={() => removeCard(rc.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <textarea 
                className="bg-base border border-muted p-2 rounded text-white w-full text-sm min-h-[60px]"
                placeholder="Description of the deliverable..."
                value={rc.description}
                onChange={(e) => updateCard(rc.id, { description: e.target.value })}
              />

              <div className="flex gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Price ({kit.base_currency})</label>
                  <input 
                    type="number" min="0"
                    className="bg-base border border-muted p-2 rounded text-white w-full"
                    value={rc.price || ''}
                    onChange={(e) => updateCard(rc.id, { price: Number(e.target.value) })}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Turnaround Time</label>
                  <input 
                    className="bg-base border border-muted p-2 rounded text-white w-full"
                    placeholder="e.g. 7 days"
                    value={rc.turnaround}
                    onChange={(e) => updateCard(rc.id, { turnaround: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {rateCards.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4 border border-dashed border-muted rounded">
            No rate cards added yet.
          </p>
        )}
      </div>
    </div>
  );
}
