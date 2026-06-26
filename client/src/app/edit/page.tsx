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
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-cohere-white text-cohere-ink font-sans">
      
      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-b border-cohere-hairline bg-cohere-white shrink-0">
        <button 
          className={`flex-1 py-4 text-sm font-medium transition-colors ${mobileTab === 'edit' ? 'text-cohere-blue border-b-2 border-cohere-blue' : 'text-cohere-slate'}`}
          onClick={() => setMobileTab('edit')}
        >
          Edit
        </button>
        <button 
          className={`flex-1 py-4 text-sm font-medium transition-colors ${mobileTab === 'preview' ? 'text-cohere-blue border-b-2 border-cohere-blue' : 'text-cohere-slate'}`}
          onClick={() => setMobileTab('preview')}
        >
          Preview
        </button>
      </div>

      {/* Editor Panel (Left) */}
      <div 
        className={`md:w-[45%] lg:w-[40%] h-full bg-cohere-white border-r border-cohere-hairline overflow-y-auto ${mobileTab === 'edit' ? 'block' : 'hidden md:block'}`}
      >
        <div className="p-6 md:p-8 flex flex-col gap-8 max-w-xl mx-auto pb-32">
          
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] leading-[1.2] tracking-[-0.32px] font-medium text-cohere-black" style={{ fontFamily: 'Geist, sans-serif' }}>Kit Editor</h1>
            <p className="text-cohere-slate text-[16px]">Design your media kit and rate card instantly.</p>
            <SaveStatusIndicator status={status} />
          </div>

          <div className="flex flex-col gap-2 bg-cohere-white border border-cohere-hairline p-5 rounded-[16px]">
            <label className="text-[14px] font-medium text-cohere-ink">Username URL Slug</label>
            <input 
              className={`bg-cohere-white border p-3 rounded-[8px] text-cohere-ink text-[16px] outline-none transition-colors ${isSlugValid ? 'border-cohere-borderlight focus:border-[#9b60aa] focus:ring-1 focus:ring-[#9b60aa]' : 'border-cohere-errorred focus:border-cohere-errorred'}`}
              placeholder="e.g. jane-doe-123"
              value={kit.username}
              onChange={(e) => handleChange({ username: e.target.value.toLowerCase() })}
            />
            {!isSlugValid && (
              <p className="text-[#b30000] text-[12px] mt-1">Must be lowercase alphanumeric, dashes, 3-50 chars.</p>
            )}
          </div>

          <div className="bg-cohere-white border border-cohere-hairline p-5 rounded-[16px]">
            <ThemeColorPicker 
              color={kit.theme_color || '#6366F1'} 
              onChange={(c) => handleChange({ theme_color: c })} 
            />
          </div>

          <ProfileForm kit={kit} onChange={handleChange} />
          
          <hr className="border-cohere-hairline" />
          
          <MetricsForm kit={kit} onChange={handleChange} />
          
          <hr className="border-cohere-hairline" />

          <RateCardsForm kit={kit} onChange={handleChange} />

        </div>
      </div>

      {/* Preview Panel (Right) */}
      <div 
        className={`md:w-[55%] lg:w-[60%] h-full bg-cohere-white relative ${mobileTab === 'preview' ? 'block' : 'hidden md:block'}`}
      >
        <KitPreview kit={kit} mode="edit" />
        
        {/* View live button in top right of preview */}
        {kit.username && isSlugValid && (
          <a 
            href={`/kit/${kit.username}`}
            target="_blank" rel="noreferrer"
            className="absolute top-6 right-6 bg-cohere-nearblack text-cohere-white text-[14px] px-[24px] py-[12px] rounded-[32px] font-medium shadow-sm transition-colors z-10 hidden md:block"
          >
            View Live Kit
          </a>
        )}
      </div>

    </div>
  );
}
