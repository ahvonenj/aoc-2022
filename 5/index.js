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
    const initialStacks = 
    [
        ['J', ' ', ' ', 'B', ' ', 'T', ' ', ' ', ' '],
        ['M', 'L', ' ', 'Q', 'L', 'R', ' ', ' ', ' '],
        ['G', 'Q', ' ', 'W', 'S', 'B', 'L', ' ', ' '],
        ['D', ' ', 'D', 'T', ' ', 'M', 'G', 'V', 'P'],
        ['T', ' ', 'N', 'N', 'N', 'D', 'J', 'G', 'N'],
        ['W', 'H', 'H', 'S', 'C', 'N', 'R', 'W', 'D'],
        ['N', 'P', 'P', 'W', 'H', 'H', 'B', 'N', 'G'],
        ['L', 'C', 'W', 'C', 'P', 'T', 'M', 'Z', 'W']
    ];

    const instructions = initialInput.map(i => {
        let parse = /move (\d{1,2}) from (\d{1,2}) to (\d{1,2})/.exec(i);
        let move = parseInt(parse[1], 10);
        let from = parseInt(parse[2], 10);
        let to = parseInt(parse[3], 10);
        return {
            move,
            from,
            to
        };
    });

    console.table(instructions)
}

export default solve;