export class BoardState {
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

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
            // Check Diagonals
            if (this.board[0][0] != 0 && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) {
                return this.board[0][0]
            }
            if (this.board[2][0] != 0 && this.board[2][0] == this.board[1][1] && this.board[1][1] == this.board[0][2]) {
                return this.board[2][0]
            }
        }
        return 0; //no winners
    }
}