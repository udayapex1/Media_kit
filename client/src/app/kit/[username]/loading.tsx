import React from 'react';
import { KitPreviewSkeleton } from '../../../components/preview/KitPreviewSkeleton';

export default function PublicKitLoading() {
  return (
    <main className="h-screen w-full">
      <KitPreviewSkeleton mode="view" />
    </main>
  );
}
