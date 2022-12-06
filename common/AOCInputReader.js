import fs from "fs/promises";

const getInputDataForPuzzle = async (puzzleNum) => {
    let data = await fs.readFile(`./${puzzleNum}/input.txt`, 'utf-8');
    data = data.replaceAll('\r\n', '\n');
    return data.split('\n');
}

export default getInputDataForPuzzle;