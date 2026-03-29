import { useEffect } from 'react';
import { Bold, Italic, Strikethrough, Heading2, List, ListOrdered } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// ------------------------------------------------------------------
// KOMPONEN MENU BAR (TOOLBAR TIPTAP)
// ------------------------------------------------------------------
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-100 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded-md transition-colors ${
          editor.isActive('bold') ? 'bg-emerald-200 text-emerald-800' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded-md transition-colors ${
          editor.isActive('italic') ? 'bg-emerald-200 text-emerald-800' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded-md transition-colors ${
          editor.isActive('strike') ? 'bg-emerald-200 text-emerald-800' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Strikethrough size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded-md transition-colors ${
          editor.isActive('heading', { level: 2 }) ? 'bg-emerald-200 text-emerald-800' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Heading2 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded-md transition-colors ${
          editor.isActive('bulletList') ? 'bg-emerald-200 text-emerald-800' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded-md transition-colors ${
          editor.isActive('orderedList') ? 'bg-emerald-200 text-emerald-800' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <ListOrdered size={18} />
      </button>
    </div>
  );
};

// ------------------------------------------------------------------
// KOMPONEN EDITOR UTAMA
// ------------------------------------------------------------------
export const RichTextEditor = ({ content, onChange }: { content: string, onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        className: 'min-h-[150px] max-h-[300px] overflow-y-auto p-4 bg-white rounded-b-lg outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 bg-gray-50">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};