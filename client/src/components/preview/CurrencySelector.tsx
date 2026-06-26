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
    <div className="flex items-center gap-3 bg-container/50 border border-muted/50 p-2 rounded-lg backdrop-blur-sm self-end">
      <span className="text-sm text-gray-400 font-medium ml-2">Display in:</span>
      <select 
        className="bg-base border border-muted p-1.5 rounded text-white text-sm focus:border-accent outline-none"
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
        disabled={loading}
      >
        {CURRENCIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      {loading && <span className="text-xs text-accent animate-pulse px-2">Updating...</span>}
    </div>
  );
}
