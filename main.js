const afs = require('node:fs/promises');
const fs = require('node:fs');
const readline = require('node:readline/promises');
const path = require('node:path');

const filePath = path.join('emails.txt');

const email = async () => {
    const fileStream = fs.createReadStream(filePath, 'utf-8');
    const rl = readline.createInterface({input:fileStream});
    try {
        for await (const line of rl){
            if (line.includes("gmail.com")){
                const emailRes = line.split("").splice(34)
                const email = emailRes.join("")
                await afs.appendFile('res.txt', `${email}\n`)
            }
        }
    }finally {
        await rl.close()
    }
}

email()