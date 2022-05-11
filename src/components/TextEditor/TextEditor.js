import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css';

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  return (
    <div className="text-editor-box">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
      />
    </div>
  );
}
