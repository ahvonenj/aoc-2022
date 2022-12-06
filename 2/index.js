const charMap = {
    'A': 'R',
    'B': 'P',
    'C': 'S',
    'X': 'loss',
    'Y': 'draw',
    'Z': 'win',
}

const scoreMap = {
    'R': 1,
    'P': 2,
    'S': 3
}

const winScoreMap = {
    'win': 6,
    'loss': 0,
    'draw': 3,
}

// Left = opponent, right = me
const winMap = {
    'RP': 'win',
    'PS': 'win',
    'SR': 'win',
    'RS': 'loss',
    'PR': 'loss',
    'SP': 'loss',
    'RR': 'draw',
    'PP': 'draw',
    'SS': 'draw'
}

const solve = (initialInput) => {
    let moves = initialInput.map(i => {
        const move = i.split(' ');

        return { 
            opponent: charMap[move[0]], 
            me: charMap[move[1]]
        };
    });

    const scores = moves.map(move => {
        const win = winMap[`${move.opponent}${move.me}`];
        const playScore = scoreMap[move.me];
        const winScore = winScoreMap[win];

        return {
            moves: move,
            win,
            playScore,
            winScore,
            totalScore: playScore + winScore
        }
    });

    const scores2 = moves.map(move => {
        const shouldResultIn = move.me;
        let myPlay = null;

        for(const play in winMap) {
            const opp = play.split('')[0];
            if(winMap[play] === shouldResultIn && opp === move.opponent) {
                myPlay = play.split('')[1];
                break;
            }
        }

        const playScore = scoreMap[myPlay];
        const winScore = winScoreMap[shouldResultIn];
        
        return {
            totalScore: playScore + winScore
        }
    });

    //console.log(scores.reduce((acc, v) => acc + v.totalScore, 0))
    console.log(scores2.reduce((acc, v) => acc + v.totalScore, 0))
}

export default solve;

/*A -> R
B -> P
C -> S
X -> LOSS
Y -> DRAW
Z -> WIN

RLOSS -> S
RDRAW -> R
RWIN -> P
PLOSS -> R
PDRAW -> P
PWIN -> S
SLOSS -> P
SDRAW -> S
SWIN -> R

R -> 1
P -> 2
S -> 3

B Z -> PWIN -> S
B X -> PLOSS -> R
C Y -> SDRAW -> S*/