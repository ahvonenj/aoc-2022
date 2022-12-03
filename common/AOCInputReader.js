import fs from "fs/promises";

const getInputDataForPuzzle = async (puzzleNum) => {
    let data = await fs.readFile(`./${puzzleNum}/input.txt`, 'utf-8');
    return data.split('\r\n');
}

export default getInputDataForPuzzle;