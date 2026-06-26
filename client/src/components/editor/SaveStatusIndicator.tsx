import React from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export function SaveStatusIndicator({ status }: { status: 'idle' | 'saving' | 'saved' | 'error' }) {
  if (status === 'idle') return null;

  return (
    <div className="flex items-center gap-1.5 text-[12px] font-medium mt-1">
      {status === 'saving' && <><Loader2 className="w-3.5 h-3.5 text-cohere-slate animate-spin" /><span className="text-cohere-slate">Saving...</span></>}
      {status === 'saved' && <><CheckCircle2 className="w-3.5 h-3.5 text-cohere-blue" /><span className="text-cohere-blue">Saved</span></>}
      {status === 'error' && <><AlertCircle className="w-3.5 h-3.5 text-cohere-errorred" /><span className="text-cohere-errorred">Save failed — retrying</span></>}
    </div>
  );
}
