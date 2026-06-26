import React from 'react';

interface Props {
  color: string;
  onChange: (color: string) => void;
}

export function ThemeColorPicker({ color, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-400 font-medium">Theme Accent</label>
      <div className="flex items-center gap-3">
        <input 
          type="color" 
          value={color} 
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 p-0 border-0 rounded-full cursor-pointer bg-transparent"
        />
        <span className="text-sm font-mono">{color}</span>
      </div>
    </div>
  );
}
