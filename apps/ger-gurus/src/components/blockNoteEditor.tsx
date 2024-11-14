'use client';

import { BlockNoteEditor, SpecificPartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useBlockNoteEditor } from '@blocknote/react';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export default function Editor({ onChange, initialContent, editable }: EditorProps) {

const {resolvedTheme}= useTheme
 const editor: BlockNoteEditor=useBlockNoteEditor({
  editable, initialContent: initialContent ? JSON.parse{initialContent} as SpecificPartialBlock[]: undefined,
  onEditorContentChange: (editor)=>{
    onChange(JSON.stringify(editor.topLevelBlocks, null,2))
  } 
 })
  // Creates a new editor instance.

  // Renders the editor instance using a React component.
  return (
    <>
      <BlockNoteView editor={editor} />;
    </>
  );
}
