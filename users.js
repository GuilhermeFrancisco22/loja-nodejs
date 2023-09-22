const fs = require("fs")
const crypto = require("crypto")
class UserRepository {
    //Criar Métodos
    constructor(filename) {
        if (!filename) {
            throw new Error("Tu precisa informar o nome de um arquivo!!")
        }
        this.filename = filename

        try {
            fs.accessSync(this.filename)
        } catch (error) {
            fs.writeFileSync(this.filename, "[]")
        }

    }
    //Criar Métodos

    async getAll() {
        //abrir o arquivo (tis.filename)
        // const contents = await fs.promises.readFile(this.filename)

        //fazer parser
        // const data = JSON.parse(contents)
        //ler conteudo
        // console.log(data)
        //retornar a lista
        return JSON.parse(await fs.promises.readFile(this.filename))
    }

    async creat(atributos) {
        //add idao atributo recebido
        atributos.id = this.randomId()
        //Ler meu arquivo
        const records = await this.getAll()
        //gravar no array records
        records.push(atributos)
        //devolver para o arquivo
        await this.writeAll(records)
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records))

    }

    randomId() {
        return crypto.randomBytes(4).toString('hex')
    }
}
//Teste dev

// new UserRepository("users.json")

const test = async () => {
    const repo = new UserRepository("users.json")
    await repo.creat({ nome: "Gui", email: "gui@gmail.br" })
    const users = await repo.getAll()
    console.log(users)
}

test()