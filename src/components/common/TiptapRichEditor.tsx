'use client';

import React, { useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ImageIcon,
  Minus,
  Eraser,
  Pilcrow,
  FileCode,
  Upload,
  Link as LinkIcon,
  Trash2,
  Globe,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { AppButton } from '@/components/common/AppButton';
import { FormInput } from '@/components/common/FormInput';
import { cn } from '@/lib/utils';

interface TiptapRichEditorProps {
  label?: string;
  value?: string;
  onChange?: (html: string) => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
  className?: string;
}

export const TiptapRichEditor: React.FC<TiptapRichEditorProps> = ({
  label,
  value = '',
  onChange,
  error,
  helperText,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [, forceRender] = useState(0);

  // Dialog State for Image URL Input
  const [imageUrlDialogOpen, setImageUrlDialogOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // Helper to convert File -> Base64 Data URL and insert into Tiptap
  const insertImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src && editor) {
        editor.chain().focus().setImage({ src }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onSelectionUpdate: () => {
      forceRender((n) => n + 1);
    },
    onTransaction: () => {
      forceRender((n) => n + 1);
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
      forceRender((n) => n + 1);
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-invert max-w-none min-h-[260px] p-4 text-xs font-sans text-slate-100 focus:outline-none custom-scrollbar',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
          const files = Array.from(event.dataTransfer.files);
          const imageFile = files.find((f) => f.type.startsWith('image/'));
          if (imageFile) {
            event.preventDefault();
            insertImageFile(imageFile);
            setIsDragging(false);
            return true;
          }
        }
        setIsDragging(false);
        return false;
      },
    },
  });

  if (!editor) {
    return null;
  }

  const isImageActive = editor.isActive('image');

  const handleDeleteSelectedImage = () => {
    if (editor && isImageActive) {
      editor.chain().focus().deleteSelection().run();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      insertImageFile(e.target.files[0]);
    }
  };

  const handleConfirmImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim() && editor) {
      editor.chain().focus().setImage({ src: urlInput.trim() }).run();
      setUrlInput('');
      setImageUrlDialogOpen(false);
    }
  };

  // Base fixed button class to ensure 100% constant layout height (no jumping or size changes)
  const baseBtnClass =
    'h-8 px-2 flex items-center justify-center rounded-lg border border-transparent transition-all cursor-pointer hover:bg-slate-800/80 hover:text-white shrink-0';

  return (
    <TooltipProvider delayDuration={150}>
      <div className="space-y-1.5 w-full">
        {label && (
          <Label className="block text-xs font-mono font-semibold text-slate-300">
            {label}
          </Label>
        )}

        {/* Hidden File Input for Image Upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Shadcn UI Modal Dialog for Web Image URL */}
        <Dialog open={imageUrlDialogOpen} onOpenChange={setImageUrlDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Sisipkan Gambar dari Web URL</span>
              </DialogTitle>
              <DialogDescription>
                Masukkan link URL gambar publik (HTTPS) untuk ditambahkan ke artikel dokumentasi.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleConfirmImageUrl} className="space-y-4 py-2">
              <FormInput
                label="URL Gambar *"
                placeholder="https://images.unsplash.com/photo-..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                autoFocus
              />

              <DialogFooter className="gap-2 sm:gap-0">
                <AppButton
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setImageUrlDialogOpen(false)}
                >
                  Batal
                </AppButton>
                <AppButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!urlInput.trim()}
                  leftIcon={<ImageIcon className="w-4 h-4" />}
                >
                  Sisipkan Gambar
                </AppButton>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Main Glassmorphism Editor Container */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={() => setIsDragging(false)}
          className={cn(
            'rounded-2xl border border-slate-800 bg-slate-950/90 overflow-hidden shadow-xl transition-all relative',
            isDragging && 'border-cyan-400 ring-2 ring-cyan-400/50 bg-slate-900/90',
            error && 'border-rose-500 focus-within:ring-1 focus-within:ring-rose-500',
            className
          )}
        >
          {/* Drag & Drop Visual Overlay */}
          {isDragging && (
            <div className="absolute inset-0 z-50 bg-indigo-950/90 backdrop-blur-md flex flex-col items-center justify-center border-2 border-dashed border-cyan-400 rounded-2xl pointer-events-none space-y-2">
              <Upload className="w-10 h-10 text-cyan-400 animate-bounce" />
              <p className="text-sm font-mono font-bold text-cyan-300">Lepaskan Gambar Di Sini (Drag & Drop)</p>
              <p className="text-xs text-slate-400">Format yang didukung: PNG, JPG, WEBP, GIF</p>
            </div>
          )}

          {/* Word-Style Toolbar Ribbon with Fixed Height */}
          <div className="bg-slate-900/90 px-2 py-1.5 border-b border-slate-800 flex flex-wrap items-center min-h-[48px] gap-1 text-slate-300 select-none">
            {/* Text Style Section */}
            <div className="flex items-center gap-0.5 pr-2 border-r border-slate-800">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(
                      baseBtnClass,
                      editor.isActive('bold') &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Bold (Teks Tebal)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(
                      baseBtnClass,
                      editor.isActive('italic') &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Italic (Teks Miring)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={cn(
                      baseBtnClass,
                      editor.isActive('strike') &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <Strikethrough className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Strikethrough (Teks Coret)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={cn(
                      baseBtnClass,
                      editor.isActive('code') &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <Code className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Inline Code</TooltipContent>
              </Tooltip>
            </div>

            {/* Headings Section */}
            <div className="flex items-center gap-0.5 px-2 border-r border-slate-800">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={cn(
                      baseBtnClass,
                      'font-mono text-xs gap-1',
                      editor.isActive('heading', { level: 1 }) &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <Heading1 className="w-4 h-4" />
                    <span className="text-[10px] font-bold">H1</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Heading 1 (Judul Utama)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn(
                      baseBtnClass,
                      'font-mono text-xs gap-1',
                      editor.isActive('heading', { level: 2 }) &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <Heading2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold">H2</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Heading 2 (Sub-Judul)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={cn(
                      baseBtnClass,
                      'font-mono text-xs gap-1',
                      editor.isActive('heading', { level: 3 }) &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <Heading3 className="w-4 h-4" />
                    <span className="text-[10px] font-bold">H3</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Heading 3 (Sub-Sub Judul)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={cn(
                      baseBtnClass,
                      'font-mono text-xs',
                      editor.isActive('paragraph') && !editor.isActive('heading') && 'bg-slate-800 text-white font-bold'
                    )}
                  >
                    <Pilcrow className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Normal Paragraph</TooltipContent>
              </Tooltip>
            </div>

            {/* Lists & Blocks Section */}
            <div className="flex items-center gap-0.5 px-2 border-r border-slate-800">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={cn(
                      baseBtnClass,
                      editor.isActive('bulletList') &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Bullet List (Daftar Poin)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={cn(
                      baseBtnClass,
                      editor.isActive('orderedList') &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Numbered List (Daftar Angka)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={cn(
                      baseBtnClass,
                      editor.isActive('blockquote') &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Quote Block (Kutipan)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={cn(
                      baseBtnClass,
                      editor.isActive('codeBlock') &&
                        'bg-indigo-600/40 text-cyan-300 font-bold border-indigo-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    )}
                  >
                    <FileCode className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Code Block</TooltipContent>
              </Tooltip>
            </div>

            {/* Insert & Delete Image Section */}
            <div className="flex items-center gap-0.5 px-2 border-r border-slate-800">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(baseBtnClass, 'text-cyan-400 font-mono text-xs gap-1')}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-[10px] hidden sm:inline font-bold">Upload</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Upload File Gambar dari Komputer</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setImageUrlDialogOpen(true)}
                    className={cn(baseBtnClass, 'text-indigo-400')}
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Sisipkan Gambar dari Web URL</TooltipContent>
              </Tooltip>

              {/* Delete Selected Image Button */}
              {isImageActive && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleDeleteSelectedImage}
                      className={cn(
                        baseBtnClass,
                        'bg-rose-500/20 text-rose-400 border-rose-500/40 hover:bg-rose-500 hover:text-white animate-pulse gap-1'
                      )}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-[10px] font-bold">Hapus Gambar</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="text-rose-400 border-rose-500/50">Hapus Gambar Terpilih</TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className={baseBtnClass}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Garis Pembatas (Horizontal Rule)</TooltipContent>
              </Tooltip>
            </div>

            {/* Undo / Redo & Clear Formatting */}
            <div className="flex items-center gap-0.5 pl-2 ml-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className={cn(baseBtnClass, 'disabled:opacity-30 disabled:hover:bg-transparent')}
                  >
                    <Undo className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className={cn(baseBtnClass, 'disabled:opacity-30 disabled:hover:bg-transparent')}
                  >
                    <Redo className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    className={cn(baseBtnClass, 'hover:bg-rose-500/20 hover:text-rose-400 text-slate-400')}
                  >
                    <Eraser className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-rose-400 border-rose-500/40">Hapus Seluruh Format Text</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Tiptap Editable Canvas Area */}
          <div className="bg-[#090d16] min-h-[280px] relative">
            <EditorContent editor={editor} />

            {/* Floating Action Badge when Image is Selected */}
            {isImageActive && (
              <div className="absolute top-3 right-3 z-40 bg-slate-900/95 border border-cyan-500/50 p-2 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-2 text-xs font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Gambar Terpilih
                </span>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleDeleteSelectedImage}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold border border-rose-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus (Delete)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {error ? (
          <p className="text-xs text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400">{helperText}</p>
        ) : null}
      </div>
    </TooltipProvider>
  );
};
