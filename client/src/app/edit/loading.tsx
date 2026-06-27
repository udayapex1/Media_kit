import React from 'react';
import { Skeleton } from '../../components/ui/Skeleton';
import { KitPreviewSkeleton } from '../../components/preview/KitPreviewSkeleton';

function EditorPanelSkeleton() {
  return (
    <div className="md:w-[45%] lg:w-[40%] h-full bg-cohere-white border-r border-cohere-hairline overflow-y-auto">
      <div className="p-6 md:p-8 flex flex-col gap-8 max-w-xl mx-auto pb-32">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-5 w-72 max-w-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="border border-cohere-hairline p-5 rounded-[16px] flex flex-col gap-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="border border-cohere-hairline p-5 rounded-[16px] flex flex-col gap-3">
          <Skeleton className="h-5 w-28" />
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>

        {[0, 1, 2].map((section) => (
          <div key={section} className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-10 w-32 rounded-[30px]" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-28 w-full rounded-[16px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EditLoading() {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-cohere-white text-cohere-ink font-sans">
      <EditorPanelSkeleton />
      <div className="hidden md:block md:w-[55%] lg:w-[60%] h-full bg-cohere-white">
        <KitPreviewSkeleton mode="edit" />
      </div>
    </div>
  );
}
