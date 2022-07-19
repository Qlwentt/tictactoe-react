export function getWinner (board) {
    const mark = {
        "X": 1,
        "O": -1,
        "3": "X",
        "-3": "O",
    }
    const tally = {
        rows : [0, 0, 0],
        cols : [0, 0, 0],
        diagX : 0,
        diagY : 0
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const move = board[i][j];
            if (move !== "") {
                tally.rows[i] += mark[board[i][j]];
                tally.cols[j] += mark[board[i][j]];
                if (i === j) {
                    tally.diagX += mark[board[i][j]];
                }
                if (i + j === 2) {
                    tally.diagY += mark[board[i][j]];
                }
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        if (Math.abs(tally.rows[i]) === 3) {
            return mark[tally.rows[i].toString()];
        }
        if (Math.abs(tally.cols[i]) === 3) {
            return mark[tally.cols[i].toString()];
        }
        if (Math.abs(tally.diagX) === 3) {
            return mark[tally.diagX.toString()];
        }
        if (Math.abs(tally.diagY) === 3) {
            return mark[tally.diagY.toString()];
        }
    }
    return null
  }