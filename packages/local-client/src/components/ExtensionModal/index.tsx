import { useState } from "react";
import { Form, ModalProps } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import {
  BlockContentType,
  CodeExtension,
  defaultBlockContent,
} from "../../state";
import "./style.css";

interface ExtensionModalProps extends ModalProps {
  handleClose(
    codeExtension: CodeExtension | undefined,
    clearSelection: boolean
  ): void;
  blockId: string;
  content: BlockContentType;
}

const ExtensionModal: React.FC<ExtensionModalProps> = ({
  show,
  content,
  blockId,
  handleClose,
}) => {
  const [selectJS, toggleJS] = useState(false);
  const [selectHTML, toggleHTML] = useState(false);
  const [selectCSS, toggleCSS] = useState(false);

  const [bindJS, toggleBind] = useState(false);

  const prepareExtensionOptions = () => {
    let codeExtension: CodeExtension | undefined = undefined;

    if (selectJS || selectCSS || selectHTML) {
      codeExtension = {
        content: {
          javascript: selectJS
            ? content.javascript
            : defaultBlockContent.javascript,

          html: selectHTML ? content.html : defaultBlockContent.html,

          css: selectCSS ? content.css : defaultBlockContent.css,

          text: "",
        },
        contentId: blockId,
      };
    }

    if (bindJS) {
      codeExtension = { ...codeExtension, bindId: blockId };
    }

    handleClose(codeExtension, false);
  };

  const clearSelection = () => {
    toggleBind(false);
    toggleHTML(false);
    toggleCSS(false);
    toggleJS(false);

    handleClose(undefined, true);
  };

  return (
    <Modal show={show} onHide={() => handleClose(undefined, false)}>
      <Modal.Header closeButton>
        <Modal.Title>Extend Code Block</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="js-content">
            <Form.Check
              name="extend-js"
              type="switch"
              label="Extend Javascript"
              defaultChecked={selectJS}
              onClick={() => toggleJS(!selectJS)}
            />

            <Form.Check
              name="bind-js"
              label="Bind"
              defaultChecked={bindJS}
              onClick={() => toggleBind(!bindJS)}
            />
          </div>

          <Form.Check
            name="extend-html"
            type="switch"
            label="Extend HTML"
            defaultChecked={selectHTML}
            onClick={() => toggleHTML(!selectHTML)}
          />

          <Form.Check
            name="extend-css"
            type="switch"
            label="Extend CSS"
            defaultChecked={selectCSS}
            onClick={() => toggleCSS(!selectCSS)}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={clearSelection}>
          Clear Selection
        </Button>

        <Button variant="primary" onClick={prepareExtensionOptions}>
          Save extension options
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExtensionModal;
