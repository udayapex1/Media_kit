import { useState, useEffect, useRef } from 'react';
import { CreatorKit, isValidSlug } from '../lib/types';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useDebouncedAutosave(
  kit: CreatorKit,
  saveFn: (kit: CreatorKit) => Promise<CreatorKit>,
  delay: number = 800
) {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const initialRender = useRef(true);
  const [syncedKit, setSyncedKit] = useState<CreatorKit | null>(null);

  useEffect(() => {
    // Don't save on initial mount
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!isValidSlug(kit.username)) {
      setStatus('error');
      return;
    }

    setStatus('saving');

    const handler = setTimeout(async () => {
      try {
        const saved = await saveFn(kit);
        setSyncedKit(saved); // reconcile state if needed by caller
        setStatus('saved');
      } catch {
        setStatus('error');
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [kit, saveFn, delay]);

  return { status, syncedKit };
}
