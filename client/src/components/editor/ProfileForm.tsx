import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { CreatorKit } from '../../lib/types';

interface Props {
  kit: CreatorKit;
  onChange: (updates: Partial<CreatorKit>) => void;
}

export function ProfileForm({ kit, onChange }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const objectUrl = URL.createObjectURL(file);
      onChange({ profile_image_url: objectUrl });
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Profile</h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400 font-medium">Display Name</label>
        <input 
          className="bg-container border border-muted p-2 rounded text-white"
          value={kit.full_name || ''}
          onChange={(e) => onChange({ full_name: e.target.value })}
          placeholder="e.g. Jane Doe"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400 font-medium">Biography</label>
        <textarea 
          className="bg-container border border-muted p-2 rounded text-white min-h-[100px]"
          value={kit.bio || ''}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="Tell brands about yourself..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400 font-medium">Profile Photo</label>
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed p-6 flex flex-col items-center justify-center rounded cursor-pointer transition-colors
            ${isDragActive ? 'border-accent bg-accent/10' : 'border-muted hover:border-accent/50'}`}
        >
          <input {...getInputProps()} />
          <Upload className="mb-2 text-gray-400" size={24} />
          {isDragActive ? (
            <p className="text-sm text-gray-300">Drop the image here ...</p>
          ) : (
            <p className="text-sm text-gray-400 text-center">
              Drag & drop a photo here, or click to select
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
