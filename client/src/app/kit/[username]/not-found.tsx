import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-base text-white p-6 text-center">
      <div className="bg-container border border-muted p-10 rounded-2xl max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Geist, sans-serif' }}>
          Kit Not Found
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          This media kit doesn't exist yet, or it may have been removed. 
        </p>
        <Link 
          href="/edit" 
          className="inline-block bg-accent hover:bg-accent/80 transition-colors text-white font-semibold py-3 px-6 rounded-lg w-full"
        >
          Create your own Media Kit
        </Link>
      </div>
    </div>
  );
}
