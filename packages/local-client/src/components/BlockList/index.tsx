import {
  createContext,
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CodeExtension } from "../../state";
import AddBlock from "../AddBlock";
import BlockListItem from "./BlockListItem";
import "./style.css";

// set default code extension context as empty
export const CodeExtensionContext = createContext<{
  extension?: CodeExtension;
  setExtension?: Dispatch<SetStateAction<CodeExtension>>;
}>({});

const BlockList: React.FC = () => {
  const blocks = useTypedSelector(({ blocks: { order, data } }) =>
    order.map((id) => data[id])
  );

  const { fetchBlocks } = useActions();

  useEffect(() => {
    fetchBlocks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [extension, setExtension] = useState<CodeExtension>({});

  return (
    <div className="block-list">
      <CodeExtensionContext.Provider value={{ extension, setExtension }}>
        <AddBlock forceVisible={blocks.length === 0} prevBlockId={null} />
        {blocks.map((block) => {
          return (
            <Fragment key={block.id}>
              <BlockListItem block={block} />
              <AddBlock prevBlockId={block.id} />
            </Fragment>
          );
        })}
      </CodeExtensionContext.Provider>
    </div>
  );
};

export default BlockList;
