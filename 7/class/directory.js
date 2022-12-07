class Directory {
    name;
    files;
    directories;
    parent;
    dir

    constructor(name, parent) {
        this.name = name;
        this.files = [];
        this.directories = [];
        this.parent = parent;
    }

    ls() {
        return {
            files: this.files,
            directories: this.directories
        }
    }
}

export default Directory;