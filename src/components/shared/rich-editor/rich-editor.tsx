'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Label } from '@/components/ui/label';
import { RichEditorToolbar } from './rich-editor-toolbar';
import { RichEditorImageDialog } from './rich-editor-image-dialog';
import { RichEditorProps } from './types';
import { cn } from '@/lib/utils';

export const RichEditor: React.FC<RichEditorProps> = ({
  label,
  value = '',
  onChange,
  error,
  helperText,
  className,
}) => {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

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
        HTMLAttributes: {
          class: 'rounded-xl max-w-full my-4 border border-slate-700 shadow-xl',
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'prose prose-invert max-w-none focus:outline-none min-h-[220px] p-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange?.(currentEditor.getHTML());
    },
  });

  const handleInsertUrl = (url: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleInsertFile = (file: File) => {
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

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <Label className="block text-xs font-semibold text-slate-300">
          {label}
        </Label>
      )}

      <div
        className={cn(
          'rounded-2xl border border-slate-800 bg-slate-900/90 shadow-sm focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400 transition-all overflow-hidden',
          error && 'border-rose-500 focus-within:ring-rose-500',
          className
        )}
      >
        <RichEditorToolbar
          editor={editor}
          onOpenImageDialog={() => setImageDialogOpen(true)}
        />
        <div className="bg-[#090d16] p-2 min-h-[240px]">
          <EditorContent editor={editor} />
        </div>
      </div>

      <RichEditorImageDialog
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        onInsertUrl={handleInsertUrl}
        onInsertFile={handleInsertFile}
      />

      {error ? (
        <p className="text-[11px] text-rose-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
