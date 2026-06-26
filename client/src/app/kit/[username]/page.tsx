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
      <div className="h-screen w-full flex items-center justify-center bg-base text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error loading kit</h1>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }
}
