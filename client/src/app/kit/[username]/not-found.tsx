import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-cohere-white text-cohere-ink p-6 text-center">
      <div className="bg-cohere-white border border-cohere-borderlight p-10 rounded-[22px] max-w-md w-full shadow-sm">
        <h1 className="text-[32px] font-medium mb-4 text-cohere-black" style={{ fontFamily: 'Geist, sans-serif', letterSpacing: '-0.32px' }}>
          Kit Not Found
        </h1>
        <p className="text-cohere-slate mb-8 leading-[1.5] text-[16px]">
          This media kit doesn't exist yet, or it may have been removed. 
        </p>
        <Link 
          href="/edit" 
          className="inline-block bg-cohere-nearblack hover:bg-cohere-nearblack/90 transition-colors text-cohere-white font-medium py-[12px] px-[24px] rounded-[32px] w-full text-[14px]"
        >
          Create your own Media Kit
        </Link>
      </div>
    </div>
  );
}
