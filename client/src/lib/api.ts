import { CreatorKit } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function saveKit(kit: CreatorKit): Promise<CreatorKit> {
  const res = await fetch(`${API_URL}/api/kit/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(kit)
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to save kit');
  }
  return res.json();
}

export async function getKit(username: string): Promise<CreatorKit> {
  const res = await fetch(`${API_URL}/api/kit/${username}`, {
    // using cache: 'no-store' in production or next specific opts, but we rely on simple fetch for now
    cache: 'no-store' 
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error('Not Found');
    throw new Error('Failed to fetch kit');
  }
  return res.json();
}

export async function convertCurrency(amount: number, from: string, to: string) {
  const res = await fetch(`${API_URL}/api/currency/convert?amount=${amount}&from=${from}&to=${to}`);
  if (!res.ok) throw new Error('Failed to convert currency');
  return res.json(); // { amount, from, to, rate, converted }
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('image', file);
  
  const res = await fetch(`${API_URL}/api/upload/image`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Failed to upload image');
  return res.json();
}

export async function exportKitPdf(username: string): Promise<Blob> {
  const res = await fetch(`${API_URL}/api/kit/${username}/export-pdf`, {
    method: 'POST'
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to export PDF');
  }

  return res.blob();
}
