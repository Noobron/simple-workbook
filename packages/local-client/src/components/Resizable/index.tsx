import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { Constants } from "../../constants/constants";
import "./style.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(
    window.innerWidth * Constants.EDITOR.MAX_WIDTH_SCALE
  );

  useEffect(() => {
    let timer: any;

    const updateDimensions = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * Constants.EDITOR.MAX_WIDTH_SCALE < width) {
          setWidth(window.innerHeight * Constants.EDITOR.MAX_WIDTH_SCALE);
        }
      }, 100);
    };

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [width]);

  // Default props based on direction
  if (direction === "vertical") {
    resizableProps = {
      height: 300,
      minConstraints: [Infinity, Constants.EDITOR.MIN_VERTICAL_HEIGHT],
      maxConstraints: [
        Infinity,
        innerHeight * Constants.EDITOR.MAX_HEIGHT_SCALE,
      ],
      width: Infinity,
      resizeHandles: ["s"],
    };
  } else {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      minConstraints: [innerWidth * Constants.EDITOR.MIN_WIDTH_SCALE, Infinity],
      maxConstraints: [innerWidth * Constants.EDITOR.MAX_WIDTH_SCALE, Infinity],
      width: width,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
