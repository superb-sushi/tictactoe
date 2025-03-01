export class BoardState {
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    worstMoveForPlayer: Array<Array<number>> = []
    bestMoveForPlayer: Array<Array<number>> = []

    constructor(b: Array<Array<number>>) {
        this.board = b
    }

    update_board(r: number, c: number, player: number): number {
        if (this.board[r][c] == 0) {
            this.board[r][c] = player == 1 ? 1 : 2
            return 0; //no errors
        } else {
            return 1; //have error
        }
    }

    check_left_board_space(): number {
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                count = this.board[i][j] == 0 ? count + 1 : count
            }
        }
        return count
    }

    check_winner(): number {
        for (let i = 0; i < 3; i++) {
            // Check each row
            if (this.board[i][0] != 0 && this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2]) {
                return this.board[i][0]
            }
            //Check each column
            if (this.board[0][i] != 0 && this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i]) {
                return this.board[0][i]
            }
        }
        // Check Diagonals
        if (this.board[0][0] != 0 && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) {
            return this.board[0][0]
        }
        if (this.board[2][0] != 0 && this.board[2][0] == this.board[1][1] && this.board[1][1] == this.board[0][2]) {
            return this.board[2][0]
        }
        return 0; //no winners
    }

    is_terminal(boardState: Array<Array<number>>): boolean {
        let temp = new BoardState(boardState);
        return temp.check_winner() != 0 ? true : temp.check_left_board_space() == 0
    }

    // heuristic here follows that of tutorial
    evaluate_board_state(boardState: Array<Array<number>>, playerRole: number): number {
        let temp = new BoardState(boardState);
        let winner = temp.check_winner();
        if (winner == playerRole) {
            return 5
        } else if (winner != 0) {
            return -5
        } else if (temp.check_left_board_space() == 0) {
            return 0
        }

        let count = 0
        for (let r = 0; r < 3; r++) {
            //Check Possible Row Wins
            if ((boardState[r][0] == playerRole || boardState[r][0] == 0) && (boardState[r][1] == playerRole || boardState[r][1] == 0) && (boardState[r][2] == playerRole  || boardState[r][2] == 0)) {
                count++
            }
            //Check Possible Row Wins for Opponent
            if (((boardState[r][0] != playerRole && boardState[r][0] != 0) || boardState[r][0] == 0) && ((boardState[r][1] != playerRole && boardState[r][1] != 0) || boardState[r][1] == 0) && ((boardState[r][2] != playerRole && boardState[r][2] != 0)  || boardState[r][2] == 0)) {
                count--
            }
            //Check Possible Column Wins
            if ((boardState[0][r] == playerRole || boardState[0][r] == 0) && (boardState[1][r] == playerRole || boardState[1][r] == 0) && (boardState[2][r] == playerRole  || boardState[2][r] == 0)) {
                count++
            }
            //Check Possible Column Wins for Opponent
            if (((boardState[0][r] != playerRole && boardState[0][r] != 0) || boardState[0][r] == 0) && ((boardState[1][r] != playerRole && boardState[1][r] != 0) || boardState[1][r] == 0) && ((boardState[2][r] != playerRole && boardState[2][r] != 0)  || boardState[2][r] == 0)) {
                count--
            }
        }
        //Check Possible Diagonal Wins
        if ((boardState[0][0] == playerRole || boardState[0][0] == 0) && (boardState[1][1] == playerRole || boardState[1][1] == 0) && (boardState[2][2] == playerRole || boardState[2][2] == 0)) {
            count++
        }
        if ((boardState[2][0] == playerRole || boardState[2][0] == 0) && (boardState[1][1] == playerRole || boardState[1][1] == 0) && (boardState[0][2] == playerRole || boardState[0][2] == 0)) {
            count++
        }
        //Check Possible Diagonal Wins for Opponent
        if (((boardState[0][0] != playerRole && boardState[0][0] != 0) || boardState[0][0] == 0) && ((boardState[1][1] != playerRole && boardState[1][1] != 0) || boardState[1][1] == 0) && ((boardState[2][2] != playerRole && boardState[2][2] != 0) || boardState[2][2] == 0)) {
            count--
        }
        if (((boardState[2][0] != playerRole && boardState[2][0] != 0) || boardState[2][0] == 0) && ((boardState[1][1] != playerRole && boardState[1][1] != 0) || boardState[1][1] == 0) && ((boardState[0][2] != playerRole && boardState[0][2] != 0) || boardState[0][2] == 0)) {
            count--
        }
        return count
    }

    generate_next_possible_states(currBoardState: Array<Array<number>>, playerRole: number): Array<Array<Array<number>>> {
        let nextPossibleStates: Array<Array<Array<number>>> = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let copy = currBoardState.map(e => ({ ... e }));
                if (copy[i][j] == 0) {
                    copy[i][j] = playerRole
                    nextPossibleStates.push(copy)
                }
            }
        }
        return nextPossibleStates
    }

    max_value(boardState: Array<Array<number>>, playerRole: number, depth: number, depthLimit: number): number{
        if (this.is_terminal(boardState) || depth ==  depthLimit) {
            return this.evaluate_board_state(boardState, playerRole)
        }
        let v = -100;
        let nextPossibleStates = this.generate_next_possible_states(boardState, playerRole)
        for (let i = 0; i < nextPossibleStates.length; i++) {
            let min = this.min_value(nextPossibleStates[i], playerRole, depth + 1, depthLimit);
            if (depth == 0) console.log("#", i, "MAX:", min, nextPossibleStates[i])
            if (min > v) {
                v = min
                if (depth == 0) this.bestMoveForPlayer = nextPossibleStates[i]
            }
        }
        return v
    }

    min_value(boardState: Array<Array<number>>, playerRole: number, depth: number, depthLimit: number): number{
        if (this.is_terminal(boardState) || depth == depthLimit) {
            return this.evaluate_board_state(boardState, playerRole)
        }
        let v = 100;
        let nextPossibleStates = this.generate_next_possible_states(boardState, playerRole == 1 ? 2 : 1)
        for (let i = 0; i < nextPossibleStates.length; i++) {
            let max = this.max_value(nextPossibleStates[i], playerRole, depth + 1, depthLimit);
            if (depth == 0) console.log("#", i, "MIN:", max, nextPossibleStates[i])
            // console.log(v)
            if (max < v) {
                v = max
                if (depth == 0) {
                    this.worstMoveForPlayer = nextPossibleStates[i]
                    // console.log("Min Picked:", this.worstMoveForPlayer, "Value:", v)
                }
            }
        }
        return v
    }

    minimax(boardState: Array<Array<number>>, playerRole: number, depthLimit: number, isAi: boolean): Array<Array<number>> {
        if (!isAi) {
            const v = this.max_value(boardState, playerRole, 0, depthLimit)
            console.log(v)
            return this.bestMoveForPlayer;
        } else {
            const v = this.min_value(boardState, playerRole, 0, depthLimit)
            console.log(v)
            return this.worstMoveForPlayer;
        }
    }
}