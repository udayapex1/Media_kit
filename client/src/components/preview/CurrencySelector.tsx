'use client';

import React, { useState, useEffect } from 'react';
import { CreatorKit } from '../../lib/types';
import { convertCurrency } from '../../lib/api';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'SGD', 'JPY'];

interface Props {
  kit: CreatorKit;
  onConverted: (convertedRates: Record<string, string>) => void;
}

export function CurrencySelector({ kit, onConverted }: Props) {
  const baseCurrency = kit.base_currency || 'USD';
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the base currency changes or we select the base currency, reset to default displays
    if (selectedCurrency === baseCurrency) {
      onConverted({}); // Empty means fallback to base currency
      return;
    }

    if (!kit.rate_cards || kit.rate_cards.length === 0) return;

    let active = true;

    const fetchConversions = async () => {
      setLoading(true);
      try {
        const newRates: Record<string, string> = {};
        // We can batch this or Promise.all it. Since it's a free API and we have caching, Promise.all is fine.
        await Promise.all(
          kit.rate_cards!.map(async (rc) => {
            const result = await convertCurrency(rc.price, baseCurrency, selectedCurrency);
            newRates[rc.id] = `${selectedCurrency} ${result.converted.toLocaleString()}`;
          })
        );
        
        if (active) {
          onConverted(newRates);
        }
      } catch (err) {
        console.error('Failed to convert currencies', err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchConversions();

    return () => {
      active = false;
    };
  }, [selectedCurrency, baseCurrency, kit.rate_cards, onConverted]);

  return (
    <div className="flex items-center gap-2 bg-cohere-white border border-cohere-borderlight p-1 rounded-[30px] shadow-sm self-end">
      <span className="text-[12px] text-cohere-slate font-medium ml-3">Display in:</span>
      <select 
        className="bg-transparent text-cohere-ink text-[14px] font-medium border-0 outline-none pr-2"
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
        disabled={loading}
      >
        {CURRENCIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      {loading && <span className="text-[12px] text-cohere-blue animate-pulse px-2">Updating...</span>}
    </div>
  );
}
