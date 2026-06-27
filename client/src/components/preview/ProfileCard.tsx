import React from 'react';
import { CreatorKit } from '../../lib/types';
import { User } from 'lucide-react';
import { ProfileCardSkeleton } from './KitPreviewSkeleton';

export function ProfileCard({ kit, loading = false }: { kit: CreatorKit; loading?: boolean }) {
  if (loading) return <ProfileCardSkeleton />;

  const displayName = kit.full_name || kit.username || 'Anonymous Creator';
  const handle = kit.username ? `@${kit.username}` : '';

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-cohere-stone rounded-[22px] overflow-hidden border border-cohere-borderlight flex items-center justify-center">
        {kit.profile_image_url ? (
          <img 
            src={kit.profile_image_url} 
            alt={displayName}
            className="w-full h-full object-cover aspect-square"
          />
        ) : (
          <User className="text-cohere-slate w-12 h-12" />
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <div>
          <h1 className="text-[48px] md:text-[60px] font-normal leading-[1.0] tracking-[-1.2px] text-cohere-black mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>
            {displayName}
          </h1>
          {handle && <p className="text-accent font-medium text-[16px]">{handle}</p>}
        </div>

        {kit.bio && (
          <p className="text-cohere-ink leading-[1.5] max-w-xl text-[16px] md:text-[18px] text-balance">
            {kit.bio}
          </p>
        )}
      </div>
    </div>
  );
}
