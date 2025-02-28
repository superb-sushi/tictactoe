import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/GameBoard.css"
import { BoardState } from "../schema/BoardState"
import bo from "../assets/B-O.png"
import ao from "../assets/A-O.png"
import bx from "../assets/B-X.png"
import ax from "../assets/A-X.png"

import { Button } from "@/components/ui/button"


const GameBoard = ({playerRole, setPlayerRole, activePlayer, setActivePlayer}: {playerRole: number, setPlayerRole: Dispatch<SetStateAction<number>>, activePlayer: number, setActivePlayer: Dispatch<SetStateAction<number>>}) => {

    const [boardState, setBoardState] = useState<BoardState>(new BoardState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]));

    const [gameEnd, setGameEnd] = useState<boolean>(false)

    const [winner, setWinner] = useState<number>(0)

    const handleRestart = () => {
        setBoardState(new BoardState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]))
        setActivePlayer(1)
        setGameEnd(false)
        setWinner(0)
        setPlayerRole(1)
    }

    useEffect(() => {
        setBoardState(boardState)
    }, [activePlayer])

    const handleClick = (r: number, c: number) => {
        if (!gameEnd) {
            // Player's Turn
            if (boardState.update_board(r, c, playerRole) == 0) {
                setActivePlayer(activePlayer + 1)
                setBoardState(boardState);
                if (boardState.check_winner() == 1) {
                    console.log("X wins!")
                    setWinner(1)
                    setGameEnd(true)
                    return;
                } else if (boardState.check_winner() == 2) {
                    console.log("O wins!")
                    setWinner(2)
                    setGameEnd(true)
                    return;
                } else {
                    if (boardState.check_left_board_space() == 0) {
                        console.log("Its a draw!")
                        setGameEnd(true)
                        return;
                    }
                }
            
            // AI's turn - vary the depth limit using the 3rd parameter
            let boardStateAfterStrategicMove = boardState.minimax(boardState.board, playerRole, 3, true)
            boardState.board = boardStateAfterStrategicMove
            setActivePlayer(activePlayer + 1)
            setBoardState(boardState);
            if (boardState.check_winner() == 1) {
                console.log("X wins!")
                setWinner(1)
                setGameEnd(true)
                return;
            } else if (boardState.check_winner() == 2) {
                console.log("O wins!")
                setWinner(2)
                setGameEnd(true)
                return;
            } else {
                if (boardState.check_left_board_space() == 0) {
                    console.log("Its a draw!")
                    setGameEnd(true)
                    return;
                }
            }
        }
        } else {
            console.log("Game has already ended!")
        }
    }

  return (
    <>
    {gameEnd 
    ? <div className="fixed bg-stone-700/98 h-[150px] w-[400px] rounded-lg flex flex-col justify-center items-center">
        <div className="text-2xl font-bold mb-5">{winner == playerRole ? "Player has won!" : winner != 0 ? "AI has won!" : "It's a tie!"}</div>
        <Button variant="default" className="w-[40%] cursor-pointer" onClick={handleRestart}>Restart?</Button>
      </div>
    : <></>
    }
    <div className="aspect-square h-[75%] flex-col flex">
        <div id="row-1" className="h-1/3 w-full flex items-end">
            <div className={playerRole == 1 ? "A-box aspect-square flex flex-row h-full justify-center items-center" : "B-box aspect-square flex flex-row h-full justify-center items-center"} id="box-1" onClick={() => handleClick(0, 0)}>
                {boardState.board[0][0] != 0 ? <img className="h-[90%]" src={boardState.board[0][0] == 1 && playerRole == 1 ? ax : boardState.board[0][0] == 1 ? bx : playerRole == 1 ? ao : bo} /> : <></>}
            </div>
            <div className={playerRole == 1 ? "A-box aspect-square flex flex-row h-full justify-center items-center" : "B-box aspect-square flex flex-row h-full justify-center items-center"} id="box-2" onClick={() => handleClick(0, 1)}>
                {boardState.board[0][1] != 0 ? <img className="h-[90%]" src={boardState.board[0][1] == 1 && playerRole == 1 ? ax : boardState.board[0][1] == 1 ? bx : playerRole == 1 ? ao : bo} /> : <></>}
            </div>
            <div className={playerRole == 1 ? "A-box aspect-square flex flex-row h-full justify-center items-center" : "B-box aspect-square flex flex-row h-full justify-center items-center"} id="box-3" onClick={() => handleClick(0, 2)}>
                {boardState.board[0][2] != 0 ? <img className="h-[90%]" src={boardState.board[0][2] == 1 && playerRole == 1 ? ax : boardState.board[0][2] == 1 ? bx : playerRole == 1 ? ao : bo} /> : <></>}
            </div>
        </div>
        <div id="row-2" className="h-1/3 w-full flex">
            <div className={playerRole == 1 ? "A-box aspect-square flex flex-row h-full justify-center items-center" : "B-box aspect-square flex flex-row h-full justify-center items-center"} id="box-4" onClick={() => handleClick(1, 0)}>
                {boardState.board[1][0] != 0 ? <img className="h-[90%]" src={boardState.board[1][0] == 1 && playerRole == 1 ? ax : boardState.board[1][0] == 1 ? bx : playerRole == 1 ? ao : bo} /> : <></>}
            </div>
            <div className={playerRole == 1 ? "A-box aspect-square flex flex-row h-full justify-center items-center" : "B-box aspect-square flex flex-row h-full justify-center items-center"} id="box-5" onClick={() => handleClick(1, 1)}>
                {boardState.board[1][1] != 0 ? <img className="h-[90%]" src={boardState.board[1][1] == 1 && playerRole == 1 ? ax : boardState.board[1][1] == 1 ? bx : playerRole == 1 ? ao : bo} /> : <></>}
            </div>
            <div className={playerRole == 1 ? "A-box aspect-square flex flex-row h-full justify-center items-center" : "B-box aspect-square flex flex-row h-full justify-center items-center"} id="box-6" onClick={() => handleClick(1, 2)}>
                {boardState.board[1][2] != 0 ? <img className="h-[90%]" src={boardState.board[1][2] == 1 && playerRole == 1 ? ax : boardState.board[1][2] == 1 ? bx : playerRole == 1 ? ao : bo} /> : <></>}
            </div>
        </div>
        <div id="row-3" className="h-1/3 w-full flex">
            <div className={playerRole == 1 ? "A-box aspect-square flex flex-row h-full justify-center items-center" : "B-box aspect-square flex flex-row h-full justify-center items-center"} id="box-7" onClick={() => handleClick(2, 0)}>
                {boardState.board[2][0] != 0 ? <img className="h-[90%]" src={boardState.board[2][0] == 1 && playerRole == 1 ? ax : boardState.board[2][0] == 1 ? bx : playerRole == 1 ? ao : bo} /> : <></>}
            </div>
            <div className={playerRole == 1 ? "A-box aspect-square flex flex-row h-full justify-center items-center" : "B-box aspect-square flex flex-row h-full justify-center items-center"} id="box-8" onClick={() => handleClick(2, 1)}>
                {boardState.board[2][1] != 0 ? <img className="h-[90%]" src={boardState.board[2][1] == 1 && playerRole == 1 ? ax : boardState.board[2][1] == 1 ? bx : playerRole == 1 ? ao : bo} /> : <></>}   
            </div>
            <div className={playerRole == 1 ? "A-box aspect-square flex flex-row h-full justify-center items-center" : "B-box aspect-square flex flex-row h-full justify-center items-center"} id="box-9" onClick={() => handleClick(2, 2)}>
                {boardState.board[2][2] != 0 ? <img className="h-[90%]" src={boardState.board[2][2] == 1 && playerRole == 1 ? ax : boardState.board[2][2] == 1 ? bx : playerRole == 1 ? ao : bo} /> : <></>}
            </div>
        </div>
    </div>
    </>
  )
}

export default GameBoard