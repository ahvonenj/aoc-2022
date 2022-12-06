/*
        [J]         [B]     [T]    
        [M] [L]     [Q] [L] [R]    
        [G] [Q]     [W] [S] [B] [L]
[D]     [D] [T]     [M] [G] [V] [P]
[T]     [N] [N] [N] [D] [J] [G] [N]
[W] [H] [H] [S] [C] [N] [R] [W] [D]
[N] [P] [P] [W] [H] [H] [B] [N] [G]
[L] [C] [W] [C] [P] [T] [M] [Z] [W]
 1   2   3   4   5   6   7   8   9 

*/

const solve = (initialInput) => {
    let stacks = 
    [
    //    0    1    2    3    4    5    6    7    8
        [' ', ' ', 'J', ' ', ' ', 'B', ' ', 'T', ' '],
        [' ', ' ', 'M', 'L', ' ', 'Q', 'L', 'R', ' '],
        [' ', ' ', 'G', 'Q', ' ', 'W', 'S', 'B', 'L'],
        ['D', ' ', 'D', 'T', ' ', 'M', 'G', 'V', 'P'],
        ['T', ' ', 'N', 'N', 'N', 'D', 'J', 'G', 'N'],
        ['W', 'H', 'H', 'S', 'C', 'N', 'R', 'W', 'D'],
        ['N', 'P', 'P', 'W', 'H', 'H', 'B', 'N', 'G'],
        ['L', 'C', 'W', 'C', 'P', 'T', 'M', 'Z', 'W']
    ];

    const getCrates = (stackNum) => {
        return stacks.map(row => row[stackNum]).filter(c => c !== ' ');
    }

    const getStack = (stackNum) => {
        return stacks.map(row => row[stackNum]);
    }

    const getStackSpace = (stackNum) => {
        let space = 0;
        let stackCrates = stacks.map(row => row[stackNum]);

        for(let i = 0; i < stackCrates.length; i++) {
            if(stackCrates[i] === ' ') {
                space++;
            } else {
                break;
            }
        }

        return space;
    }

    const getTopIndex = (stackNum) => {
        return getStackSpace(stackNum);
    }

    const setCrates = (stackNum, crates) => {
        const topIndex = getTopIndex(stackNum);
        for(let y = topIndex; y > 0; y--) {
            stacks[y][stackNum] = crates[y];
        }
    }

    const grabCrates = (stackNum, n) => {
        let stackCrates = getCrates(stackNum);
        let stack = getStack(stackNum);
        let grabbed = stack.filter(c => c !== ' ').slice(0, n);
        
        let newStack = stack;
        let removals = n;
        let i = 0;

        while(removals > 0) {
            if(stack[i] === ' ') {
                i++;
                continue;
            }

            newStack[i] = ' ';
            removals--;
        }
        return {
            crates: grabbed,
            newStack: newStack
        }
    }

    const moveCrates = (crateCount, fromStackNum, toStackNum) => {
        if(crateCount > getStackSpace(toStackNum)) {
            const diff = crateCount - getStackSpace(toStackNum);
            let i = diff;
            while(i > 0 ) {
                stacks.unshift(new Array(9).fill(' '));
                i--;
            }
        }

        let grabbed = grabCrates(fromStackNum, crateCount);
        setCrates(toStackNum, grabbed.crates.reverse());
        setCrates(fromStackNum, grabbed.newStack);
    }

    const instructions = initialInput.map(i => {
        let parse = /move (\d{1,2}) from (\d{1,2}) to (\d{1,2})/.exec(i);
        let crateCount = parseInt(parse[1], 10);
        let from = parseInt(parse[2], 10) - 1;
        let to = parseInt(parse[3], 10) - 1;
        return {
            crateCount,
            from,
            to
        };
    });

    console.table(stacks);

    instructions.slice(0, 2).forEach(i => {
        console.log(`Crates: ${i.crateCount}, From: ${i.from}, To: ${i.to}`)
        moveCrates(i.crateCount, i.from, i.to);
        console.table(stacks);
    });

    //console.table(stacks);
}

export default solve;