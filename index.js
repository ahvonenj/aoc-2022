import getInputDataForPuzzle from "./common/AOCInputReader.js";

const args = process.argv.slice(2);

if(!args[0]) {
    console.error("Puzzle number not given, quitting");
    process.exit();
}

const puzzleNum = parseInt(args[0]);

const main = async () => {
    let input = await getInputDataForPuzzle(puzzleNum);
    const solve = (await import(`./${puzzleNum}/index.js`)).default;

    solve(input);
}

main();
