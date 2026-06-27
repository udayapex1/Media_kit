import React, { CSSProperties } from 'react';
import { Skeleton } from '../ui/Skeleton';

type Props = {
  mode?: 'edit' | 'view';
};

export function ProfileCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <Skeleton className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-[22px]" />
      <div className="flex flex-col gap-3 pt-2 w-full max-w-xl">
        <Skeleton className="h-12 md:h-16 w-4/5 max-w-[440px]" />
        <Skeleton className="h-4 w-32" />
        <div className="flex flex-col gap-2 pt-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function MetricsGridSkeleton() {
  return (
    <div className="mt-16">
      <div className="border-b border-cohere-hairline pb-4 mb-6">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="bg-cohere-white border border-cohere-borderlight rounded-[16px] p-[24px] relative overflow-hidden shadow-sm"
          >
            <Skeleton className="absolute left-0 top-0 bottom-0 w-1 rounded-none" />
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-5 w-36" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RateCardListSkeleton() {
  return (
    <div className="mt-16">
      <div className="border-b border-cohere-hairline pb-4 mb-6">
        <Skeleton className="h-8 w-40" />
      </div>
      <div className="flex flex-col gap-6">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="bg-cohere-white border border-cohere-borderlight rounded-[16px] p-[24px] flex flex-col md:flex-row md:justify-between md:items-center gap-6 shadow-sm"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-7 w-52" />
              </div>
              <div className="flex flex-col gap-2 pl-0 md:pl-8">
                <Skeleton className="h-5 w-full max-w-xl" />
                <Skeleton className="h-5 w-4/5 max-w-lg" />
              </div>
            </div>
            <Skeleton className="h-12 w-[140px] rounded-[32px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CurrencySelectorSkeleton() {
  return (
    <div className="flex items-center gap-2 bg-cohere-white border border-cohere-borderlight p-2 rounded-[30px] shadow-sm self-end w-[172px]">
      <Skeleton className="h-4 w-20 ml-1" />
      <Skeleton className="h-5 w-12 rounded-[6px]" />
    </div>
  );
}

export function KitPreviewSkeleton({ mode = 'view' }: Props) {
  const style = {
    '--theme-accent': '#1863dc'
  } as CSSProperties;

  return (
    <div
      style={style}
      className="w-full h-full bg-cohere-white text-cohere-ink overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 flex flex-col min-h-full">
        {mode === 'view' && (
          <div className="flex justify-end mb-12">
            <CurrencySelectorSkeleton />
          </div>
        )}
        <ProfileCardSkeleton />
        <MetricsGridSkeleton />
        <RateCardListSkeleton />
        <div className="mt-auto pt-20 pb-8 flex justify-center">
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
    </div>
  );
}
