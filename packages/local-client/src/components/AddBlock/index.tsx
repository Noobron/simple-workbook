import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useActions } from "../../hooks/useActions";
import { CodeExtensionContext } from "../BlockList";
import styles from "./style.module.css";

interface AddBlockProps {
  prevBlockId: string | null;
  forceVisible?: boolean;
}

const AddBlock: React.FC<AddBlockProps> = ({ prevBlockId, forceVisible }) => {
  const { insertBlockAfter } = useActions();
  const { extension, setExtension } = useContext(CodeExtensionContext);

  return (
    <div
      className={`${styles["add-block"]} ${
        forceVisible ? styles["force-visible"] : ""
      }`}
    >
      <div className={styles["add-buttons"]}>
        {/* Add Code */}
        <Button
          variant="light"
          onClick={() => {
            insertBlockAfter(
              prevBlockId,
              "code",
              extension?.content,
              extension?.bindId
            );
            if (setExtension) setExtension({});
          }}
        >
          <i className="fas fa-plus sm align-self-center"></i>
          <i className="fas h4 fa-file-code mt-1"></i>
        </Button>

        {/* Add Text */}
        <Button
          variant="light"
          onClick={() => insertBlockAfter(prevBlockId, "text")}
        >
          <i className="fas fa-plus sm align-self-center"></i>
          <i className="fas h4 fa-file-text mt-1"></i>
        </Button>
      </div>

      <div className={styles["divider"]} />
    </div>
  );
};

export default AddBlock;
