import React from 'react';

export function SaveStatusIndicator({ status }: { status: 'idle' | 'saving' | 'saved' | 'error' }) {
  if (status === 'idle') return null;

  return (
    <div className="flex items-center text-sm mt-4">
      {status === 'saving' && <span className="text-gray-400">Saving...</span>}
      {status === 'saved' && <span className="text-green-500">Saved</span>}
      {status === 'error' && <span className="text-red-500">Save failed — retrying</span>}
    </div>
  );
}
