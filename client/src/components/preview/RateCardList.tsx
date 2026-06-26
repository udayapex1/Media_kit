'use client';

import React from 'react';
import { CreatorKit } from '../../lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  kit: CreatorKit;
  convertedRates?: Record<string, string>; // Maps rc.id to converted price string
}

export function RateCardList({ kit, convertedRates }: Props) {
  const rateCards = kit.rate_cards || [];

  if (rateCards.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-6 text-white border-b border-muted pb-2">Rate Matrix</h3>
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {rateCards.map(rc => {
            const displayPrice = convertedRates?.[rc.id] || `${kit.base_currency || 'USD'} ${rc.price.toLocaleString()}`;

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                key={rc.id}
                className="bg-container border border-muted/50 rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:border-accent/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold text-white">{rc.name || 'Unnamed Service'}</h4>
                    {rc.turnaround && (
                      <span className="bg-muted text-gray-300 text-xs px-2 py-1 rounded-md font-medium tracking-wide">
                        {rc.turnaround}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                    {rc.description || 'No description provided.'}
                  </p>
                </div>

                <div className="shrink-0 flex md:block items-center justify-between border-t border-muted md:border-0 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="md:hidden text-xs text-gray-500 uppercase font-semibold tracking-wider">Rate</div>
                  <div className="bg-accent/10 text-accent font-black text-xl px-4 py-2 rounded-lg border border-accent/20 text-right min-w-[120px]">
                    {displayPrice}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
