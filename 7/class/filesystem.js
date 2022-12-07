import Directory from './directory.js';

class FileSystem {

    root;
    currentDirectory;

    constructor() {
        this.root = new Directory("/", null);
        this.currentDirectory = this.root;
    }

    getTotalSize() {
        let dirs = [];
        const _getTotalSize = (directory) => {
            let totalSize = directory.files.reduce((acc, file) => acc + file.size, 0);
            directory.directories.forEach((directory) => totalSize += _getTotalSize(directory));
            //console.log(`directory: ${directory.name}, totalSize: ${totalSize}`)
            dirs.push({
                directory: directory.name,
                totalSize: totalSize
            })
            return totalSize;
        }

        _getTotalSize(this.root);

        let fileSystemSize = 70000000;
        let usedSpace = dirs.find(d => d.directory === '/').totalSize;
        let currentSpace = fileSystemSize - usedSpace;
        let updateSpaceNeeded = 30000000;
        let spaceToFind = updateSpaceNeeded - currentSpace;

        console.log(fileSystemSize, currentSpace, spaceToFind);

        let potentialDirs = dirs.filter((d) => d.totalSize >= spaceToFind && d.directory !== '/');
        let correctDir = Math.min(...potentialDirs.map((d) => d.totalSize));
        console.table(potentialDirs);
        console.log(correctDir, Math.abs(spaceToFind - correctDir));
    }

    printFileTree() {
        const _printFileTree = (directory, depth) => {
            console.log(`${' '.repeat(depth * 4)} - ${directory.name} (dir)`);

            let thisDirSize = directory.files.reduce((acc, file) => acc + file.size, 0);

            directory.files.forEach((file) => console.log(`${' '.repeat((depth + 1) * 4)} - ${file.name} (file, size=${file.size})`));
            directory.directories.forEach((directory, i) => thisDirSize += _printFileTree(directory, depth + 1));
            console.log(`${' '.repeat(depth * 4)} ${thisDirSize} (total)`);
            return thisDirSize;
        };

        _printFileTree(this.root, 0);
    }
}

export default FileSystem;