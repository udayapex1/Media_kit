'use client';

import React from 'react';
import { CreatorKit } from '../../lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock } from 'lucide-react';

interface Props {
  kit: CreatorKit;
  convertedRates?: Record<string, string>; // Maps rc.id to converted price string
}

export function RateCardList({ kit, convertedRates }: Props) {
  const rateCards = kit.rate_cards || [];

  if (rateCards.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-[24px] font-medium mb-6 text-cohere-black border-b border-cohere-hairline pb-4" style={{ fontFamily: 'Geist, sans-serif' }}>Rate Matrix</h3>
      <div className="flex flex-col gap-6">
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
                className="bg-cohere-white border border-cohere-borderlight rounded-[16px] p-[24px] flex flex-col md:flex-row md:justify-between md:items-center gap-6 hover:border-cohere-slate transition-colors shadow-sm"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-accent" />
                      <h4 className="text-[20px] font-medium text-cohere-black" style={{ fontFamily: 'Geist, sans-serif' }}>{rc.name || 'Unnamed Service'}</h4>
                    </div>
                    {rc.turnaround && (
                      <span className="flex items-center gap-1.5 bg-cohere-stone text-cohere-slate text-[12px] px-[8px] py-[4px] rounded-[6px] font-medium tracking-wide">
                        <Clock className="w-3 h-3" />
                        {rc.turnaround}
                      </span>
                    )}
                  </div>
                  <p className="text-cohere-ink text-[16px] leading-[1.5] max-w-2xl pl-7">
                    {rc.description || 'No description provided.'}
                  </p>
                </div>

                <div className="shrink-0 flex md:block items-center justify-between border-t border-cohere-hairline md:border-0 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="md:hidden text-[12px] text-cohere-slate uppercase font-mono tracking-wider mb-2">Rate</div>
                  <div className="bg-accent/10 text-accent font-medium text-[20px] px-[20px] py-[12px] rounded-[32px] border border-accent/20 text-center min-w-[140px]">
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
