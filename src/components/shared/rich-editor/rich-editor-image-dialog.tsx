'use client';

import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { FormInput } from '../form-input';
import { AppButton } from '../app-button';
import { ImageDialogProps } from './types';
import { Globe, Upload, ImageIcon } from 'lucide-react';

export const RichEditorImageDialog: React.FC<ImageDialogProps> = ({
  open,
  onOpenChange,
  onInsertUrl,
  onInsertFile,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitUrl = () => {
    if (urlInput.trim()) {
      onInsertUrl(urlInput.trim());
      setUrlInput('');
      onOpenChange(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onInsertFile(file);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-950/95 border-slate-800 text-slate-100 backdrop-blur-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            <span>Sisipkan Gambar ke Editor</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            Unggah file gambar dari komputer lokal Anda atau masukkan URL gambar web langsung.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Option 1: URL Input */}
          <div className="space-y-2">
            <FormInput
              label="URL Gambar Web"
              placeholder="https://example.com/screenshot.png"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-950 px-3 text-[11px] font-mono text-slate-500 uppercase tracking-widest absolute">
              Atau
            </span>
          </div>

          {/* Option 2: Local File Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Unggah File Lokal (PNG, JPG, WebP)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 rounded-xl border border-dashed border-slate-700 hover:border-cyan-400/60 bg-slate-900/60 hover:bg-slate-900 flex flex-col items-center justify-center gap-2 text-slate-300 transition-colors cursor-pointer group"
            >
              <Upload className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-xs font-medium">Klik untuk memilih file dari komputer</span>
            </button>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between">
          <AppButton variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Batal
          </AppButton>
          <AppButton
            variant="primary"
            size="sm"
            onClick={handleSubmitUrl}
            disabled={!urlInput.trim()}
            leftIcon={<Globe className="w-3.5 h-3.5" />}
          >
            Sisipkan via URL
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
