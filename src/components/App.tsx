import React, { useState, useEffect } from "react";
import { Button, Row } from "reactstrap";
import { uid } from "react-uid";

import { Box, D, Status } from "../models/Box";
import { Square } from "./Square";

import "bootstrap/dist/css/bootstrap.css";
import "../styles.css";

const STARTING_MOVE = 0;
const ARRAY_LENGTH = 9;
const reset: D[] = Array(ARRAY_LENGTH).fill(D.E);

const App = () => {
  const [turn, setTurn] = useState<D>(D.X);
  const [isWinner, setIsWinner] = useState<Status>(Status.PLAYING);
  const [b, setB] = useState<Box>(reset);
  const [moves, setMoves] = useState<number>(STARTING_MOVE);

  const computeStatus = () => {
    if (moves === 9 && isWinner === Status.PLAYING) {
      return <span className="ml-3 mt-3">{Status.DRAW}</span>;
    }
    if (isWinner === Status.PLAYING) {
      return `Next Player: ${turn}`;
    }
    return turn === D.X ? `${Status.WINNER} ${D.O}` : `${Status.WINNER} ${D.X}`;
  };

  const status = computeStatus();

  useEffect(() => {
    if (
      (b[0] === b[1] && b[0] === b[2] && b[0] !== D.E) ||
      (b[3] === b[4] && b[3] === b[5] && b[3] !== D.E) ||
      (b[6] === b[7] && b[6] === b[8] && b[6] !== D.E) ||
      (b[0] === b[3] && b[0] === b[6] && b[0] !== D.E) ||
      (b[1] === b[4] && b[1] === b[7] && b[1] !== D.E) ||
      (b[2] === b[5] && b[2] === b[8] && b[2] !== D.E) ||
      (b[0] === b[4] && b[0] === b[8] && b[0] !== D.E) ||
      (b[2] === b[4] && b[2] === b[6] && b[2] !== D.E)
    ) {
      setIsWinner(Status.WINNER);
    }
  }, [b]);

  const handleSquareClick = (i: number) => () => {
    if (b[i] !== D.E || isWinner === Status.WINNER) {
      return;
    }
    setMoves((m) => m + 1);
    if (turn === D.X) {
      setTurn(D.O);
    } else {
      setTurn(D.X);
    }

    setB({ ...b, [i]: turn });
  };

  const renderSquare = (i: number, squareClass?: string) => {
    return (
      <Square
        i={i}
        squareClass={squareClass || ""}
        squareClick={handleSquareClick(i)}
        b={b}
      />
    );
  };

  return (
    <div className="ml-5 mt-3">
      <h3>{status}</h3>
      <div className="floatContainer">
        {Array(9)
          .fill(null)
          .map((_, i) =>
            i % 3 === 0 ? (
              <span key={uid(i)}>{renderSquare(i, "clearLeft")}</span>
            ) : (
              <span key={uid(i)}>{renderSquare(i)}</span>
            )
          )}
      </div>
      <Row className="ml-3 mt-3">
        <Button
          onClick={() => {
            setTurn(D.X);
            setB(reset);
            setIsWinner(Status.PLAYING);
            setMoves(STARTING_MOVE);
          }}
        >
          Reset
        </Button>
      </Row>
    </div>
  );
};
export default App;
