import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";


import { useInputStore } from "../store";

function Editor() {
  const input = useInputStore((state) => state.input);

  const updateInput = useInputStore((state) => state.updateInput);

  return (
    <div className="w-1/2 border-r-4 px-2 mx-2">
      <AceEditor
        
        placeholder="Placeholder Text"
        mode="markdown"
        theme="github"
        name="Editor"
        fontSize={16}
        lineHeight={19}
        showPrintMargin={false}
        showGutter={false}
        onChange={updateInput}
        highlightActiveLine={false}
        value={input}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: false,
          tabSize: 2,
        }}
        wrapEnabled={true}
        width="100%"
        height="100%"
        
      />
    </div>
  );
}



export default Editor;
