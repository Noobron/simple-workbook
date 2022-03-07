import Editor, { EditorDidMount, EditorProps } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import prettier from "prettier";
import babelParser from "prettier/parser-babel";
import htmlParser from "prettier/parser-html";
import cssParser from "prettier/parser-postcss";
import styles from "./style.module.css";
import { EditorLanguages } from "../../state";
import { Button } from "react-bootstrap";

interface MonacoEditorProps extends EditorProps {
  onChange?(value: string): void;
  onExecute?(): void;
  tabSize?: number;
}

const defaultProps: Partial<MonacoEditorProps> = {
  language: "javascript",
  theme: "vs-dark",
  height: "100%",
  options: {
    wordWrap: "on",
    showUnused: false,
    folding: false,
    lineNumbersMinChars: 3,
    minimap: { enabled: false },
    fontSize: 16,
    scrollBeyondLastLine: false,
    automaticLayout: true,
  },
  value: "",
  tabSize: 2,
};

const formatLanguageOptions = [
  {
    plugins: [babelParser],
    parser: "babel",
  },
  {
    plugins: [htmlParser],
    parser: "html",
  },
  {
    plugins: [cssParser],
    parser: "css",
  },
];

const MonacoEditor: React.FC<MonacoEditorProps> = (props) => {
  const editorRef = useRef<any>();
  const [language, setLanguage] = useState<number>(EditorLanguages.javascript);

  useEffect(() => {
    if (props.language) {
      switch (props.language) {
        case EditorLanguages[EditorLanguages.javascript]:
          setLanguage(EditorLanguages.javascript);
          break;
        case EditorLanguages[EditorLanguages.html]:
          setLanguage(EditorLanguages.html);
          break;
        case EditorLanguages[EditorLanguages.css]:
          setLanguage(EditorLanguages.css);
          break;
      }
    }
  }, [props.language]);

  const onFormatClick = () => {
    const code = editorRef.current.getModel().getValue();

    // don't format in case of any syntax errors
    try {
      const formattedCode = prettier
        .format(code, {
          parser: formatLanguageOptions[language].parser,
          plugins: formatLanguageOptions[language].plugins,
          useTabs: true,
        })
        .replace(/\n$/, "");

      editorRef.current.setValue(formattedCode);
    } catch (err) {}
  };

  const onEditorDidMount: EditorDidMount = (getContents, standaloneEditor) => {
    editorRef.current = standaloneEditor;
    standaloneEditor.onDidChangeModelContent(() => {
      if (props.onChange) {
        props.onChange(getContents());
      }
    });

    standaloneEditor.getModel()?.updateOptions({ tabSize: props.tabSize });
  };

  return (
    <div className={styles["editor-wrapper"]}>
      <div className={styles["editor-options"]}>
        {/* Format the code */}
        <Button
          type="button"
          variant="outline-info"
          className="rounded-0 btn-sm"
          onClick={onFormatClick}
        >
          Format
        </Button>

        {/* Execute the code */}
        <Button
          type="button"
          variant="outline-primary"
          className="rounded-0 btn-sm"
          onClick={props.onExecute}
        >
          Run
        </Button>
      </div>

      <Editor editorDidMount={onEditorDidMount} {...props} />
    </div>
  );
};

MonacoEditor.defaultProps = defaultProps;

export default MonacoEditor;
