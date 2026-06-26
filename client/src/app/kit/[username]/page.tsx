import React from 'react';
import { getKit } from '../../../lib/api';
import { KitPreview } from '../../../components/preview/KitPreview';
import { notFound } from 'next/navigation';

export default async function PublicKitPage({ params }: { params: { username: string } }) {
  try {
    const kit = await getKit(params.username);
    return (
      <main className="h-screen w-full">
        <KitPreview kit={kit} mode="view" />
      </main>
    );
  } catch (err: any) {
    if (err.message === 'Not Found') {
      notFound();
    }
    
    return (
      <div className="h-screen w-full flex items-center justify-center bg-cohere-white text-cohere-ink">
        <div className="text-center">
          <h1 className="text-[24px] font-medium text-cohere-errorred mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>Error loading kit</h1>
          <p className="text-cohere-slate">Please try again later.</p>
        </div>
      </div>
    );
  }
}
