'use client';

import React, { useState } from 'react';
import { CreatorKit, isValidSlug } from '../../lib/types';
import { saveKit } from '../../lib/api';
import { useDebouncedAutosave } from '../../hooks/useDebouncedAutosave';
import { KitPreview } from '../../components/preview/KitPreview';
import { ProfileForm } from '../../components/editor/ProfileForm';
import { MetricsForm } from '../../components/editor/MetricsForm';
import { RateCardsForm } from '../../components/editor/RateCardsForm';
import { ThemeColorPicker } from '../../components/editor/ThemeColorPicker';
import { SaveStatusIndicator } from '../../components/editor/SaveStatusIndicator';

// Default initial state
const defaultKit: CreatorKit = {
  username: '',
  full_name: '',
  bio: '',
  theme_color: '#6366F1',
  base_currency: 'USD',
  metrics: [],
  rate_cards: []
};

export default function EditPage() {
  const [kit, setKit] = useState<CreatorKit>(defaultKit);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  
  // Custom wrapper for save so we can handle validation errors before hitting network
  const { status, syncedKit } = useDebouncedAutosave(kit, saveKit, 800);

  const handleChange = (updates: Partial<CreatorKit>) => {
    setKit(prev => ({ ...prev, ...updates }));
  };

  const isSlugValid = kit.username === '' || isValidSlug(kit.username);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-container">
      
      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-b border-muted bg-base shrink-0">
        <button 
          className={`flex-1 py-4 text-sm font-semibold transition-colors ${mobileTab === 'edit' ? 'text-accent border-b-2 border-accent' : 'text-gray-400'}`}
          onClick={() => setMobileTab('edit')}
        >
          Edit
        </button>
        <button 
          className={`flex-1 py-4 text-sm font-semibold transition-colors ${mobileTab === 'preview' ? 'text-accent border-b-2 border-accent' : 'text-gray-400'}`}
          onClick={() => setMobileTab('preview')}
        >
          Preview
        </button>
      </div>

      {/* Editor Panel (Left) */}
      <div 
        className={`md:w-[45%] lg:w-[40%] h-full bg-base border-r border-muted overflow-y-auto ${mobileTab === 'edit' ? 'block' : 'hidden md:block'}`}
      >
        <div className="p-6 md:p-8 flex flex-col gap-8 max-w-xl mx-auto pb-32">
          
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Kit Editor</h1>
            <p className="text-gray-400 text-sm">Design your media kit and rate card instantly.</p>
            <SaveStatusIndicator status={status} />
          </div>

          <div className="flex flex-col gap-2 bg-container border border-muted p-5 rounded-lg">
            <label className="text-sm font-semibold">Username URL Slug</label>
            <input 
              className={`bg-base border p-3 rounded text-white ${isSlugValid ? 'border-muted focus:border-accent' : 'border-red-500 focus:border-red-500'}`}
              placeholder="e.g. jane-doe-123"
              value={kit.username}
              onChange={(e) => handleChange({ username: e.target.value.toLowerCase() })}
            />
            {!isSlugValid && (
              <p className="text-red-500 text-xs mt-1">Must be lowercase alphanumeric, dashes, 3-50 chars.</p>
            )}
          </div>

          <div className="bg-container border border-muted p-5 rounded-lg">
            <ThemeColorPicker 
              color={kit.theme_color || '#6366F1'} 
              onChange={(c) => handleChange({ theme_color: c })} 
            />
          </div>

          <ProfileForm kit={kit} onChange={handleChange} />
          
          <hr className="border-muted" />
          
          <MetricsForm kit={kit} onChange={handleChange} />
          
          <hr className="border-muted" />

          <RateCardsForm kit={kit} onChange={handleChange} />

        </div>
      </div>

      {/* Preview Panel (Right) */}
      <div 
        className={`md:w-[55%] lg:w-[60%] h-full bg-base relative ${mobileTab === 'preview' ? 'block' : 'hidden md:block'}`}
      >
        <KitPreview kit={kit} mode="edit" />
        
        {/* View live button in top right of preview */}
        {kit.username && isSlugValid && (
          <a 
            href={`/kit/${kit.username}`}
            target="_blank" rel="noreferrer"
            className="absolute top-6 right-6 bg-accent hover:bg-accent/80 text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg transition-colors z-10 hidden md:block"
          >
            View Live Kit
          </a>
        )}
      </div>

    </div>
  );
}
