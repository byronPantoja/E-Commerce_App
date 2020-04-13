const fs = require("fs");

class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error("Creating a repository requires a filename");
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, "[]");
        }
    }

    async getAll() {
        //Open the file called this.filename
        read its msContentScript
    }
}

new UsersRepository("users.json");