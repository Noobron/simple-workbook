import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { Constants } from "../../../constants/constants";
import { BlockProps, CodeExtension, EditorLanguages } from "../../../state";
import styles from "./style.module.css";
import jsIcon from "../../../assets/icons/js-icon.png";
import htmlIcon from "../../../assets/icons/html-icon.png";
import cssIcon from "../../../assets/icons/css-icon.png";
import MonacoEditor from "../../MonacoEditor";
import { useActions } from "../../../hooks/useActions";
import ExtensionModal from "../../ExtensionModal";
import { CodeExtensionContext } from "../../BlockList";

interface CodeInputProps extends BlockProps {}

const languageItemList = [
  {
    language: EditorLanguages.javascript,
    icon: jsIcon,
  },
  {
    language: EditorLanguages.html,
    icon: htmlIcon,
  },
  {
    language: EditorLanguages.css,
    icon: cssIcon,
  },
];

const CodeInput: React.FC<CodeInputProps> = ({ blockId, content, bindId }) => {
  const { updateBlock, createBundle } = useActions();
  const [show, setShow] = useState(false);
  const { extension, setExtension } = useContext(CodeExtensionContext);

  const jsInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isSelectedForExtension =
    extension?.bindId === blockId || extension?.contentId === blockId;

  const [language, setLanguage] = useState<EditorLanguages>(
    EditorLanguages.javascript
  );

  // code currently being viewed by the user
  const [input, setInput] = useState(content.javascript);

  // set input to the latest code of a language
  const loadInput = (languageToLoad: EditorLanguages) => {
    switch (languageToLoad) {
      case EditorLanguages.javascript:
        setInput(content.javascript);
        break;
      case EditorLanguages.html:
        setInput(content.html);
        break;
      case EditorLanguages.css:
        setInput(content.css);
        break;
    }
  };

  const updateExtensionOptions = (
    codeExtension: CodeExtension | undefined = undefined,
    clearSelection: boolean = false
  ) => {
    setShow(false);

    if (setExtension) {
      if (codeExtension && !clearSelection) {
        setExtension(codeExtension);
      } else if (clearSelection) {
        setExtension({});
      }
    }
  };

  // update input to contents of selected language both on change and on init
  useEffect(() => {
    switch (language) {
      case EditorLanguages.javascript:
        updateBlock(blockId, input, EditorLanguages.javascript);
        break;
      case EditorLanguages.html:
        updateBlock(blockId, input, EditorLanguages.html);
        break;
      case EditorLanguages.css:
        updateBlock(blockId, input, EditorLanguages.css);
        break;
    }
  }, [language, input, updateBlock, blockId]);

  const changeLanguage = (selectedLanguage: EditorLanguages) => {
    setLanguage(selectedLanguage);
    loadInput(selectedLanguage);
  };

  return (
    <>
      <form
        method="POST"
        ref={formRef}
        action={Constants.BUNDLER.HTML_FILE_SERVER_URL}
        target={blockId}
        className={styles["code-input-wrapper"]}
      >
        {/* Languages Tab */}
        <Tab.Container
          onSelect={(activeKey) => changeLanguage(parseInt(activeKey!))}
          defaultActiveKey={EditorLanguages.javascript}
        >
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {languageItemList.map((item, index) => {
                  return (
                    <Nav.Item className={styles["nav-item"]} key={index}>
                      <Nav.Link eventKey={item.language}>
                        <img alt="language-icon" src={item.icon}></img>
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
                <Button
                  className="mx-1 btn-sm mt-2"
                  variant={isSelectedForExtension ? "success" : "primary"}
                  onClick={() => setShow(true)}
                >
                  {isSelectedForExtension ? "Selected" : "Extend"}
                </Button>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>

        {/* Text area for HTML/CSS/JS Code */}
        <MonacoEditor
          value={input}
          language={EditorLanguages[language]}
          onExecute={() => {
            createBundle(
              blockId,
              content.javascript,
              jsInputRef,
              formRef,
              bindId
            );
          }}
          onChange={(code: string) => setInput(code)}
        />

        {/* Hidden Input field for JS. `jsInputRef` is used here to store the bundled code for form submission.*/}
        <input
          ref={jsInputRef}
          readOnly={true}
          name="workbook-js"
          hidden={true}
        ></input>

        {/* Hidden Input field for CSS*/}
        <input
          value={content.css}
          readOnly={true}
          name="workbook-css"
          hidden={true}
        ></input>

        {/* Hidden Input field for HTML*/}
        <input
          value={content.html}
          readOnly={true}
          name="workbook-html"
          hidden={true}
        ></input>
      </form>

      <ExtensionModal
        blockId={blockId}
        content={content}
        show={show}
        handleClose={updateExtensionOptions}
      />
    </>
  );
};

export default CodeInput;
