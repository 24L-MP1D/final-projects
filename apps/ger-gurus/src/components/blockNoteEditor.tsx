import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';

export default function Editor({ editor }: { editor: any }) {
  // Creates a new editor instance.

  // Renders the editor instance using a React component.
  return (
    <>
      <BlockNoteView editor={editor} />;
    </>
  );
}
