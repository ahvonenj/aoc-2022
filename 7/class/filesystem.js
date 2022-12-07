import Directory from './directory.js';

class FileSystem {

    root;
    currentDirectory;

    constructor() {
        this.root = new Directory("/", null);
        this.currentDirectory = this.root;
    }

    // Windows-style directory- and file tree printing function
    Tree() {
        
    }

    printFileTree() {
        const printFileTree = (directory, depth) => {
            // '└'
            let dirRepeat;
            if(depth === 0)
                dirRepeat = 0;
            else if(depth === 1)
                dirRepeat = 0;
            else
                dirRepeat = (depth - 1);

            let fileRepeat;
            if(depth === 0)
                fileRepeat = 0;
            else if(depth === 1)
                fileRepeat = 1;
            else
                fileRepeat = (depth - 1);

            const dirIndent = depth === 0 ? '' : '│' + '   │'.repeat(dirRepeat) + '─'.repeat(4)
            const fileIndent = '│' + '   │'.repeat(fileRepeat) + ' '.repeat(8);
            const clearIndent = '│' + '   │'.repeat(fileRepeat) + ' '.repeat(8);
            const clearIndent2 = '│' + '   │'.repeat(fileRepeat + 1) + ' '.repeat(8);

            console.log(`${dirIndent}${directory.name === '/' ? 'root' : directory.name} dep: ${depth}`);

            directory.files.forEach((file) => console.log(fileIndent + file.name));

            if(directory.files.length === 0)
                console.log(clearIndent2);
            else
                console.log(clearIndent);

            directory.directories.forEach((directory, i) => printFileTree(directory, depth + 1));
            console.log(clearIndent);
        }

        printFileTree(this.root, 0);
    }
}

export default FileSystem;