'use client';

import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { exportKitPdf } from '../../lib/api';

type Props = {
  username?: string;
  disabled?: boolean;
  className?: string;
};

export function DownloadPdfButton({ username, disabled = false, className = '' }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isDisabled = disabled || !username || isDownloading;

  const handleDownload = async () => {
    if (!username || isDisabled) return;

    setIsDownloading(true);
    setHasError(false);

    try {
      const blob = await exportKitPdf(username);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = `${username}-media-kit.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      setHasError(true);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDisabled}
      aria-busy={isDownloading}
      className={`inline-flex items-center justify-center gap-2 bg-cohere-nearblack text-cohere-white text-[14px] px-[20px] py-[10px] rounded-[32px] font-medium shadow-sm transition-colors disabled:cursor-not-allowed disabled:bg-cohere-hairline disabled:text-cohere-slate ${className}`}
      title={hasError ? 'PDF download failed' : undefined}
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      <span>{isDownloading ? 'Preparing PDF' : 'Download PDF'}</span>
    </button>
  );
}
