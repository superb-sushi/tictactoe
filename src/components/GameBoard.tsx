import { useState } from "react";
import "../styles/GameBoard.css"
import { BoardState } from "../schema/BoardState"
import bo from "../assets/B-O.png"
import ao from "../assets/A-O.png"
import bx from "../assets/B-X.png"
import ax from "../assets/B-O.png"


const GameBoard = () => {

    const [boardState, setBoardState] = useState<BoardState>(new BoardState());

    const [activePlayer, setActivePlayer] = useState<number>(1)

    const [gameEnd, setGameEnd] = useState<boolean>(false)

    const handleClick = (r: number, c: number) => {
        if (!gameEnd) {
            if (boardState.update_board(r, c, activePlayer) == 0) {
                setActivePlayer( activePlayer == 1 ? 2 : 1)
            }
            setBoardState(boardState);
            if (boardState.check_winner() == 1) {
                console.log("X wins!")
                setGameEnd(true)
            } else if (boardState.check_winner() == 2) {
                console.log("O wins!")
                setGameEnd(true)
            } else {
                if (boardState.check_left_board_space() == 0) {
                    console.log("Its a draw!")
                    setGameEnd(true)
                }
            }
        } else {
            console.log("Game has already ended!")
        }
    }

  return (
    <div className="aspect-square h-[75%] flex-col flex">
        <div id="row-1" className="h-1/3 w-full flex items-end">
            <div className="B-box aspect-square flex flex-row h-full justify-center items-center" id="box-1" onClick={() => handleClick(0, 0)}>
                {boardState.board[0][0] != 0 ? <img className="h-[90%]" src={boardState.board[0][0] == 1 ? bx : bo} /> : <></>}
            </div>
            <div className="B-box aspect-square flex flex-row h-full justify-center items-center" id="box-2" onClick={() => handleClick(0, 1)}>
                {boardState.board[0][1] != 0 ? <img className="h-[90%]" src={boardState.board[0][1] == 1 ? bx : bo} /> : <></>}
            </div>
            <div className="B-box aspect-square flex flex-row h-full justify-center items-center" id="box-3" onClick={() => handleClick(0, 2)}>
                {boardState.board[0][2] != 0 ? <img className="h-[90%]" src={boardState.board[0][2] == 1 ? bx : bo} /> : <></>}
            </div>
        </div>
        <div id="row-2" className="h-1/3 w-full flex">
            <div className="B-box aspect-square flex flex-row h-full justify-center items-center" id="box-4" onClick={() => handleClick(1, 0)}>
                {boardState.board[1][0] != 0 ? <img className="h-[90%]" src={boardState.board[1][0] == 1 ? bx : bo} /> : <></>}
            </div>
            <div className="B-box aspect-square flex flex-row h-full justify-center items-center" id="box-5" onClick={() => handleClick(1, 1)}>
                {boardState.board[1][1] != 0 ? <img className="h-[90%]" src={boardState.board[1][1] == 1 ? bx : bo} /> : <></>}
            </div>
            <div className="B-box aspect-square flex flex-row h-full justify-center items-center" id="box-6" onClick={() => handleClick(1, 2)}>
                {boardState.board[1][2] != 0 ? <img className="h-[90%]" src={boardState.board[1][2] == 1 ? bx : bo} /> : <></>}
            </div>
        </div>
        <div id="row-3" className="h-1/3 w-full flex">
            <div className="B-box aspect-square flex flex-row h-full justify-center items-center" id="box-7" onClick={() => handleClick(2, 0)}>
                {boardState.board[2][0] != 0 ? <img className="h-[90%]" src={boardState.board[2][0] == 1 ? bx : bo} /> : <></>}
            </div>
            <div className="B-box aspect-square flex flex-row h-full justify-center items-center" id="box-8" onClick={() => handleClick(2, 1)}>
                {boardState.board[2][1] != 0 ? <img className="h-[90%]" src={boardState.board[2][1] == 1 ? bx : bo} /> : <></>}   
            </div>
            <div className="B-box aspect-square flex flex-row h-full justify-center items-center" id="box-9" onClick={() => handleClick(2, 2)}>
                {boardState.board[2][2] != 0 ? <img className="h-[90%]" src={boardState.board[2][2] == 1 ? bx : bo} /> : <></>}
            </div>
        </div>
    </div>
  )
}

export default GameBoard