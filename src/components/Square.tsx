import React from "react";
import { Box } from "../models/Box";

interface SquareProps {
  i: number;
  squareClick: () => void;
  b: Box;
  squareClass: string;
}

export const Square = (props: SquareProps) => {
  const { i, squareClick, b, squareClass } = props;
  const handleClick = () => {
    squareClick();
  };
  return (
    <button
      type="button"
      className={`${squareClass} box`}
      onClick={handleClick}
    >
      {b[i]}
    </button>
  );
};
