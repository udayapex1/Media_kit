import React from 'react';
import { CreatorKit } from '../../lib/types';
import { User } from 'lucide-react';

export function ProfileCard({ kit }: { kit: CreatorKit }) {
  const displayName = kit.full_name || kit.username || 'Anonymous Creator';
  const handle = kit.username ? `@${kit.username}` : '';

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-muted/30 rounded-2xl overflow-hidden border border-muted/50 flex items-center justify-center">
        {kit.profile_image_url ? (
          <img 
            src={kit.profile_image_url} 
            alt={displayName}
            className="w-full h-full object-cover aspect-square"
          />
        ) : (
          <User className="text-gray-500 w-12 h-12" />
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1" style={{ fontFamily: 'Geist, sans-serif' }}>
            {displayName}
          </h1>
          {handle && <p className="text-accent font-medium">{handle}</p>}
        </div>

        {kit.bio && (
          <p className="text-gray-300 leading-relaxed max-w-xl text-sm md:text-base text-balance">
            {kit.bio}
          </p>
        )}
      </div>
    </div>
  );
}
