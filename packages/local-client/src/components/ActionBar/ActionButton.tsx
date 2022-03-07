import { Button } from "react-bootstrap";

interface ActionButtonProps {
  onClick(): any;
  buttonClass?: string;
  iconClass?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  buttonClass,
  iconClass,
}) => {
  return (
    <Button
      className={`mx-1 btn-sm rounded-0 + ${buttonClass}`}
      onClick={onClick}
    >
      <span className="icon">
        <i className={`fas ${iconClass}`}></i>
      </span>
    </Button>
  );
};

export default ActionButton;
