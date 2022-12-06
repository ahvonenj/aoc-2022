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
        ["L","N","W","T","D"," "," "," "],
        ["C","P","H"," "," "," "," "," "],
        ["W","P","H","N","D","G","M","J"],
        ["C","W","S","N","T","Q","L"," "],
        ["P","H","C","N"," "," "," "," "],
        ["T","H","N","D","M","W","Q","B"],
        ["M","B","R","J","G","S","L"," "],
        ["Z","N","W","G","V","B","R","T"],
        ["W","G","D","N","P","L"," "," "]
    ];

    const renderStacks = (cap = null) => {
        let nStacks = stacks.slice();
        if(cap !== null) {
            nStacks = nStacks.map(s => s.slice(0, cap));
        }
        
        console.table(nStacks); 
    }

    const denormalizeStackCap = () => {
        let nStacks = stacks.slice();

        const maxStack = Math.max(...nStacks.map(s => s.filter(c => c !== ' ').length));   

        nStacks = nStacks.map(s => {
            let stack = s.slice();
            let diff = maxStack - s.length;
           
            if(diff > 0) {
                stack = stack.concat(Array(diff).fill(' '));
            }
            else if (diff < 0) {
                stack = stack.slice(0, maxStack);
            }

            return stack;
        });

        stacks = nStacks;
    }

    const tops = () => {
        let nStacks = stacks.slice();
        return nStacks.map(s => s.slice().reverse().find(c => c !== ' '));
    }

    const stackCrates = (stackNum, crates) => {
        let nStacks = stacks.slice();

        const top = nStacks[stackNum].findIndex(c => c === ' ');
        let i = top;

        for(let j = 0; j < crates.length; j++) {
            if(top === -1)
                nStacks[stackNum].push(crates[j]);
            else
                nStacks[stackNum][i] = crates[j];

            i++;
        }

        stacks = nStacks;

        denormalizeStackCap();
    }

    const setCrates = (stackNum, crates) => {
        stacks[stackNum] = crates;
        denormalizeStackCap();
    }

    const grabCrates = (stackNum, n) => {
        let nStacks = stacks.slice();

        const availCrates = nStacks[stackNum].filter(c => c !== ' ')
        const crates = availCrates.slice(availCrates.length - n);
        const stackDiff = nStacks[stackNum].length - (availCrates.length - n);
        const newStack = availCrates.slice(0, availCrates.length - n).concat(Array(stackDiff).fill(' '));

        return {
            crates: crates.slice(),
            newStack: newStack
        }
    }

    const moveCrates = (crateCount, fromStackNum, toStackNum) => {
        let grabbed = grabCrates(fromStackNum, crateCount);
        stackCrates(toStackNum, grabbed.crates);
        setCrates(fromStackNum, grabbed.newStack);
        return grabbed;
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

    renderStacks();
    instructions.slice().forEach((i, idx) => {     
        const grabbed = moveCrates(i.crateCount, i.from, i.to);
        //console.log(`#${idx}. move ${i.crateCount} from ${i.from} to ${i.to}, grabbed: ${grabbed.crates} (${grabbed.crates.length})`)
        //renderStacks();
    })

    renderStacks();
    console.log(tops().join(''));
}

export default solve;