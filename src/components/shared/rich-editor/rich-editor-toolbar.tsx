'use client';

import React from 'react';
import { Editor } from '@tiptap/react';
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
} from 'lucide-react';
import { RichEditorToolbarButton } from './rich-editor-toolbar-button';

export interface RichEditorToolbarProps {
  editor: Editor | null;
  onOpenImageDialog: () => void;
}

export const RichEditorToolbar: React.FC<RichEditorToolbarProps> = ({
  editor,
  onOpenImageDialog,
}) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-950/90 border-b border-slate-800/80 rounded-t-xl sticky top-0 z-10 backdrop-blur-md">
      {/* Text Format Group */}
      <div className="flex items-center gap-0.5 border-r border-slate-800/80 pr-1.5 mr-1">
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={<Bold className="w-3.5 h-3.5" />}
          label="Tebal (Ctrl+B)"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={<Italic className="w-3.5 h-3.5" />}
          label="Miring (Ctrl+I)"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          icon={<Strikethrough className="w-3.5 h-3.5" />}
          label="Coret"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          icon={<Code className="w-3.5 h-3.5" />}
          label="Kode Inline"
        />
      </div>

      {/* Heading Level Group */}
      <div className="flex items-center gap-0.5 border-r border-slate-800/80 pr-1.5 mr-1">
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          icon={<Pilcrow className="w-3.5 h-3.5" />}
          label="Paragraf Normal"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          icon={<Heading1 className="w-3.5 h-3.5" />}
          label="Heading 1"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={<Heading2 className="w-3.5 h-3.5" />}
          label="Heading 2"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          icon={<Heading3 className="w-3.5 h-3.5" />}
          label="Heading 3"
        />
      </div>

      {/* List & Structure Group */}
      <div className="flex items-center gap-0.5 border-r border-slate-800/80 pr-1.5 mr-1">
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={<List className="w-3.5 h-3.5" />}
          label="Daftar Bullet"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={<ListOrdered className="w-3.5 h-3.5" />}
          label="Daftar Nomor"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={<Quote className="w-3.5 h-3.5" />}
          label="Kutipan (Quote)"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          icon={<FileCode className="w-3.5 h-3.5" />}
          label="Blok Kode Program"
        />
      </div>

      {/* Media & Divider Group */}
      <div className="flex items-center gap-0.5 border-r border-slate-800/80 pr-1.5 mr-1">
        <RichEditorToolbarButton
          onClick={onOpenImageDialog}
          icon={<ImageIcon className="w-3.5 h-3.5 text-cyan-400" />}
          label="Sisipkan Gambar"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          icon={<Minus className="w-3.5 h-3.5" />}
          label="Garis Pembatas (Divider)"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          icon={<Eraser className="w-3.5 h-3.5" />}
          label="Bersihkan Format"
        />
      </div>

      {/* Undo & Redo History */}
      <div className="flex items-center gap-0.5 ml-auto">
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          icon={<Undo className="w-3.5 h-3.5" />}
          label="Urungkan (Undo)"
        />
        <RichEditorToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          icon={<Redo className="w-3.5 h-3.5" />}
          label="Ulangi (Redo)"
        />
      </div>
    </div>
  );
};
