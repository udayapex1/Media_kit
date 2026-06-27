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
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-[24px] leading-[1.3] font-medium text-cohere-black" style={{ fontFamily: 'Geist, sans-serif' }}>Rate Matrix</h2>
        <button 
          onClick={addCard}
          className="flex items-center gap-2 text-[14px] font-medium bg-transparent border border-cohere-slate text-cohere-nearblack hover:bg-cohere-paleblue hover:border-cohere-blue px-[24px] py-[8px] rounded-[30px] transition-colors"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {rateCards.map(rc => (
            <motion.div 
              key={rc.id}
              initial={{ opacity: 0, scale: 0.95, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-cohere-white border border-cohere-borderlight p-[20px] rounded-[16px] flex flex-col gap-4 overflow-hidden"
            >
              <div className="flex gap-3">
                <input 
                  className="bg-cohere-stone border-0 p-[10px] rounded-[8px] text-cohere-ink text-[14px] font-medium outline-none transition-colors ring-1 ring-transparent focus:ring-[#9b60aa] flex-1"
                  placeholder="Service Name (e.g. Dedicated Video)"
                  value={rc.name}
                  onChange={(e) => updateCard(rc.id, { name: e.target.value })}
                />
                <button 
                  onClick={() => removeCard(rc.id)}
                  className="p-2 text-[#b30000] hover:bg-[#b30000]/10 rounded-full transition-colors flex shrink-0 items-center justify-center"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <textarea 
                className="bg-cohere-stone border-0 p-[10px] rounded-[8px] text-cohere-ink text-[14px] outline-none transition-colors ring-1 ring-transparent focus:ring-[#9b60aa] w-full min-h-[80px]"
                placeholder="Description of the deliverable..."
                value={rc.description}
                onChange={(e) => updateCard(rc.id, { description: e.target.value })}
              />

              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-[12px] text-cohere-slate">Price ({kit.base_currency})</label>
                  <input 
                    type="number" min="0"
                    className="bg-cohere-stone border-0 p-[10px] rounded-[8px] text-cohere-ink text-[14px] outline-none transition-colors ring-1 ring-transparent focus:ring-[#9b60aa] w-full"
                    value={rc.price || ''}
                    onChange={(e) => updateCard(rc.id, { price: Number(e.target.value) })}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-[12px] text-cohere-slate">Turnaround Time</label>
                  <input 
                    className="bg-cohere-stone border-0 p-[10px] rounded-[8px] text-cohere-ink text-[14px] outline-none transition-colors ring-1 ring-transparent focus:ring-[#9b60aa] w-full"
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
          <p className="text-[14px] text-cohere-slate text-center py-6 border border-dashed border-cohere-hairline rounded-[16px]">
            No rate cards added yet.
          </p>
        )}
      </div>
    </div>
  );
}
