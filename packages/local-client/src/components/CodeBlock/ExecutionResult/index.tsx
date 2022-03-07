import "./style.css";

interface ExecutionResultProps {
  blockId: string;
}

const ExecutionResult: React.FC<ExecutionResultProps> = ({ blockId }) => {
  return (
    <div className="iframe-wrapper">
      {/* Iframe element for rendering the result */}
      <iframe
        name={blockId}
        title="result"
        loading="lazy"
        spellCheck="false"
        allowFullScreen={true}
        allow="accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
        sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-scripts allow-top-navigation-by-user-activation"
        src=""
      ></iframe>
    </div>
  );
};

export default ExecutionResult;
