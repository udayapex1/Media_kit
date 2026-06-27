'use client';

import React, { CSSProperties } from 'react';
import { CreatorKit } from '../../lib/types';
import { ProfileCard } from './ProfileCard';
import { MetricsGrid } from './MetricsGrid';
import { RateCardList } from './RateCardList';
import { CurrencySelector } from './CurrencySelector';
import { KitPreviewSkeleton } from './KitPreviewSkeleton';

interface Props {
  kit: CreatorKit;
  mode: 'edit' | 'view';
  loading?: boolean;
}

export function KitPreview({ kit, mode, loading = false }: Props) {
  // Converted rates state, managed by the CurrencySelector when in view mode
  const [convertedRates, setConvertedRates] = React.useState<Record<string, string>>({});

  if (loading) return <KitPreviewSkeleton mode={mode} />;

  // Theme variable applied directly to style
  const style = {
    '--theme-accent': kit.theme_color || '#6366F1'
  } as CSSProperties;

  return (
    <div 
      style={style} 
      className="w-full h-full bg-cohere-white text-cohere-ink overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 flex flex-col min-h-full">
        {mode === 'view' && (
          <div className="flex justify-end mb-12">
            <CurrencySelector kit={kit} onConverted={setConvertedRates} />
          </div>
        )}
        
        <ProfileCard kit={kit} />
        <MetricsGrid kit={kit} />
        <RateCardList kit={kit} convertedRates={convertedRates} />
        
        <div className="mt-auto pt-20 pb-8 text-center text-gray-600 text-sm">
          Media kit generated dynamically.
        </div>
      </div>
    </div>
  );
}
