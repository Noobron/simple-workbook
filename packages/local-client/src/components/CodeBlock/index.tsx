import CodeInput from "./CodeInput";
import ExecutionResult from "./ExecutionResult";
import Resizable from "../Resizable";
import { BlockProps } from "../../state";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from "./style.module.css";

interface CodeBlockProps extends BlockProps {}

const CodeBlock: React.FC<CodeBlockProps> = ({ blockId, content, bindId }) => {
  const bundleState = useTypedSelector(({ bundles }) => bundles[blockId]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 13px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeInput blockId={blockId} content={content} bindId={bindId} />
        </Resizable>

        {bundleState && bundleState.loading ? (
          <div className={styles["spinner-wrapper"]}>
            <div className={`${styles["spinner-cover"]} text-primary `}>
              <div className="spinner-border" role="status" />
              Loading ...
            </div>
          </div>
        ) : (
          <ExecutionResult blockId={blockId} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeBlock;
