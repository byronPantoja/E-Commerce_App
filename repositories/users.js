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
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: "utf8",
            })
        );
    }

    async create(attrs) {
        const records = await this.getAll();
        records.push(attrs);

        await fs.promises.writeFile(this.filename, JSON.stringify(records));
    }
}

const test = async() => {
    const repo = new UsersRepository("users.json");
    await repo.create({ email: "test@test.com", password: "password" });
    const users = await repo.getAll();

    console.log(users);
};

test();
