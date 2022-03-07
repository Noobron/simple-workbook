import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { BlockProps } from "../../state";
import "./style.css";

interface TextBlockProps extends BlockProps {}

const TextBlock: React.FC<TextBlockProps> = ({ blockId, content }) => {
  const { updateBlock } = useActions();

  const editorRef = useRef<HTMLDivElement | null>(null);
  const [onEditMode, setEditMode] = useState(false);
  const editorInputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditMode(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const editorInputTextElement =
        editorRef.current.querySelector(".w-md-editor-text");

      const preElement = editorRef.current.querySelector(
        "pre.w-md-editor-text-pre.wmde-markdown-color"
      );

      const editorTextElement = document.createElement("div");
      editorInputRef.current = editorTextElement;
      editorInputRef.current.innerHTML = content.text;

      if (preElement)
        editorInputTextElement?.replaceChild(editorTextElement, preElement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEditMode]);

  useEffect(() => {
    if (editorInputRef.current) {
      editorInputRef.current.innerHTML = content.text
        .replaceAll("<", "&lt")
        .replaceAll(">", "&gt");
    }
  }, [content.text]);

  if (onEditMode) {
    return (
      <div ref={editorRef}>
        <MDEditor
          value={content.text}
          onChange={(v) => {
            updateBlock(blockId, v!);
          }}
        />
      </div>
    );
  }

  return (
    <div className="card" onClick={() => setEditMode(true)}>
      <div className="card-body">
        <MDEditor.Markdown source={content.text} />
      </div>
    </div>
  );
};

export default TextBlock;
