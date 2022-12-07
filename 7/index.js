import FileSystem from './class/filesystem.js';
import File from './class/file.js';
import Directory from './class/directory.js';

const solve = (initialInput) => {
    const filesystemTrace = initialInput.map((line) => {
        let cmd = null;
        let args = null;
        let out1 = null;
        let out2 = null;

        if(line.indexOf('$ cd') > -1) {
            const [dollar, cd, path] = line.split(' ');
            cmd = cd;
            args = path;
        }
        else if(line.indexOf('$ ls') > -1) {
            const [dollar, ls] = line.split(' ');
            cmd = ls;
            args = null;
        }
        else if(line.indexOf('dir ') > -1) {
            const [dir, name] = line.split(' ');
            out1 = dir;
            out2 = name;
        }
        else {
            const [size, fileName] = line.split(' ');
            out1 = size;
            out2 = fileName;
        }

        return {
            cmd,
            args,
            out1,
            out2
        }
    });

    const fileSystem = new FileSystem();

    filesystemTrace.forEach((trace) => {
        //console.log(trace, fileSystem.currentDirectory.name)

        if(trace.cmd === 'cd') {
            if(trace.args === '/')
                fileSystem.currentDirectory = fileSystem.root;
            else if (trace.args === '..')
                fileSystem.currentDirectory = fileSystem.currentDirectory.parent;
            else
                fileSystem.currentDirectory = fileSystem.currentDirectory.directories.find((directory) => directory.name === trace.args);
        }
        else if(trace.cmd === 'ls') {
            const list = fileSystem.currentDirectory.ls();
            //list.files.forEach((file) => console.log(file.size, file.name));
            //list.directories.forEach((directory) => console.log('dir', directory.name));
        }
        else if(trace.out1 === 'dir') {
            fileSystem.currentDirectory.directories.push(new Directory(trace.out2, fileSystem.currentDirectory));
        }
        else {
            fileSystem.currentDirectory.files.push(new File(trace.out2, trace.out1));
        }

    });

    fileSystem.printFileTree();
}

export default solve;