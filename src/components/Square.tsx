import React from "react";
import { Box } from "../models/Box";

interface SquareProps {
  i: number;
  squareClick: () => void;
  b: Box;
}

export const Square = (props: SquareProps) => {
  const { i, squareClick, b } = props;
  const handleClick = () => {
    squareClick();
  };
  return (
    <button type="button" className="square" onClick={handleClick}>
      {b[Number(i)]}
    </button>
  );
};
