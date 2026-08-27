export interface RichEditorProps {
  label?: string;
  value?: string;
  onChange?: (html: string) => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
  className?: string;
}

export interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsertUrl: (url: string) => void;
  onInsertFile: (file: File) => void;
}
