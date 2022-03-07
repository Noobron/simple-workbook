import React from "react";
import { Block } from "../../../state";
import ActionBar from "../../ActionBar";
import CodeBlock from "../../CodeBlock";
import TextBlock from "../../TextBlock";
import styles from "./style.module.css";

interface BlockListItemProps {
  block: Block;
}

const BlockListItem: React.FC<BlockListItemProps> = ({ block }) => {
  let item: JSX.Element;

  if (block.type === "code") {
    item = (
      <>
        <div className={styles["action-bar-wrapper"]}>
          <ActionBar blockId={block.id} />
        </div>
        <CodeBlock
          blockId={block.id}
          content={block.content}
          bindId={block.bindTo}
        />
      </>
    );
  } else {
    item = (
      <>
        <TextBlock blockId={block.id} content={block.content} />
        <ActionBar blockId={block.id} />
      </>
    );
  }

  return <div className={styles["block-list-item"]}>{item}</div>;
};

export default BlockListItem;
