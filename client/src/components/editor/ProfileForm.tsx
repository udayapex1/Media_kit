import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2 } from 'lucide-react';
import { CreatorKit } from '../../lib/types';
import { uploadImage } from '../../lib/api';

interface Props {
  kit: CreatorKit;
  onChange: (updates: Partial<CreatorKit>) => void;
}

export function ProfileForm({ kit, onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      // Optimistic preview
      const objectUrl = URL.createObjectURL(file);
      onChange({ profile_image_url: objectUrl });
      
      try {
        setIsUploading(true);
        const { url } = await uploadImage(file);
        onChange({ profile_image_url: url });
      } catch (err) {
        console.error('Failed to upload image:', err);
      } finally {
        setIsUploading(false);
      }
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[24px] leading-[1.3] font-medium text-cohere-black" style={{ fontFamily: 'Geist, sans-serif' }}>Profile</h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-cohere-ink">Display Name</label>
        <input 
          className="bg-cohere-white border border-cohere-hairline p-[12px] rounded-[8px] text-cohere-ink text-[16px] outline-none transition-colors focus:border-[#9b60aa] focus:ring-1 focus:ring-[#9b60aa]"
          value={kit.full_name || ''}
          onChange={(e) => onChange({ full_name: e.target.value })}
          placeholder="e.g. Jane Doe"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-cohere-ink">Biography</label>
        <textarea 
          className="bg-cohere-white border border-cohere-hairline p-[12px] rounded-[8px] text-cohere-ink text-[16px] outline-none transition-colors focus:border-[#9b60aa] focus:ring-1 focus:ring-[#9b60aa] min-h-[120px]"
          value={kit.bio || ''}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="Tell brands about yourself..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-cohere-ink">Profile Photo</label>
        <div 
          {...getRootProps()} 
          className={`border border-dashed p-8 flex flex-col items-center justify-center rounded-[16px] cursor-pointer transition-colors
            ${isDragActive ? 'border-[#1863dc] bg-cohere-paleblue' : 'border-cohere-hairline hover:border-cohere-slate bg-cohere-white'}`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <Loader2 className="mb-3 text-cohere-blue animate-spin" size={24} />
          ) : (
            <Upload className="mb-3 text-cohere-slate" size={24} />
          )}
          {isDragActive ? (
            <p className="text-[14px] text-cohere-ink font-medium">Drop the image here ...</p>
          ) : (
            <p className="text-[14px] text-cohere-slate text-center">
              {isUploading ? 'Uploading...' : 'Drag & drop a photo here, or click to select'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
