import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Gameover from "./components/Gameover.jsx";
import Log from "./components/Log";
import { useState } from "react"
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = 
{
  'X' : 'Player1',
  'O' : 'Player2'
}

function deriveActivePlayer(turns)
{
  let activePlayer = "X";

  if(turns.length > 0 && turns[0].player === "X")
  {
    activePlayer = "O";
  }

  return activePlayer;
}

function deriveWinner(currentGameBoard)
{
  let winner = null;
  
  for(let combination of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol = currentGameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = currentGameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = currentGameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
    {
      winner = firstSquareSymbol;
    }
  }
  return winner
}

function deriveGameBoard(gameTurns, gameBoard)
{
  let currentGameBoard = [...gameBoard.map(arr => [...arr])];

  for(const turn of gameTurns)
  {
      const {square, player} = turn;
      const {row, col} = square;

      currentGameBoard[row][col] = player;
  }
  return currentGameBoard;
}
function App() {
  const [gameTurns, updateGameturn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let currentGameBoard = deriveGameBoard(gameTurns, initialGameBoard);
  
  
  let winner = deriveWinner(currentGameBoard);

  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSetCurrentPlayer(rowIndex, colIndex)
  {
    updateGameturn((prevTurns) =>
      {
        let activePlayer = deriveActivePlayer(prevTurns);

        const updatedTurns = [{square:{row: rowIndex, col: colIndex}, player: activePlayer}, ...prevTurns];

        return updatedTurns;
      }
    )

  }

  function restartMatch()
  {
    updateGameturn([]);
  }

  return(
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player"> 
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        {(winner || hasDraw) && <Gameover winner={winner} onRestart={restartMatch}/>}
        <GameBoard onSelectSquare={handleSetCurrentPlayer} gameTurn={currentGameBoard}/>
      </div>

      <Log gameTurnLog={gameTurns} />
    </main>
  )
  
}

export default App
