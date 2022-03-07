import { useActions } from "../../hooks/useActions";
import ActionButton from "./ActionButton";
import styles from "./style.module.css";

interface ActionBarProps {
  blockId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ blockId }) => {
  const { moveBlock, deleteBlock } = useActions();

  return (
    <div className={styles["action-bar"]}>
      <ActionButton
        buttonClass="btn-warning"
        iconClass="fa-arrow-up"
        onClick={() => moveBlock(blockId, "up")}
      />

      <ActionButton
        buttonClass="btn-warning"
        iconClass="fa-arrow-down"
        onClick={() => moveBlock(blockId, "down")}
      />

      <ActionButton
        buttonClass="btn-danger"
        iconClass="fa-trash"
        onClick={() => deleteBlock(blockId)}
      />
    </div>
  );
};

export default ActionBar;
