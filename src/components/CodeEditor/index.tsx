import React from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import { color } from '@uiw/codemirror-extensions-color';
import * as events from '@uiw/codemirror-extensions-events';
import { javascript } from '@codemirror/lang-javascript';

interface CodeEditorProps {
  content: string; 
}

const CodeEditor: React.FC<CodeEditorProps> = ({ content }) => {
  const eventExt = events.content({
    focus: (evn: Event) => {
      console.log('focus', evn);
    },
    blur: (evn: Event) => {
      console.log('blur', evn);
    },
    // keydown: (evn: KeyboardEvent) => {
    //   if (evn.ctrlKey && evn.code === 'KeyS') {
    //     console.log('Saved!');
    //     evn.preventDefault();
    //   }
    // },
    keydown: function (this: HTMLElement, evn: KeyboardEvent | FocusEvent) {
      if (evn instanceof KeyboardEvent && evn.ctrlKey && evn.code === 'KeyS') {
        console.log('Saved!');
        evn.preventDefault();
      }
    },
  });

  return (
    <CodeMirror
      value={content || ` console.log("Hello!")`} 
      height="100vh"
      width='100%'
      style={{ fontSize: '14px' }}
      theme={andromeda}
      extensions={[color, javascript({ jsx: true }), EditorView.lineWrapping, eventExt]}
      onChange={(value: string, viewUpdate: EditorView.Update) => { console.log('value:', value); }}
      placeholder="Please enter the code."
    />
  );
}

export default CodeEditor;
