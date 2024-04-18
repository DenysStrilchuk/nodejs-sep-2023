// Створити папку "baseFolder". В ній створити 5 папок, в кожній з яких створити по 5 файлів з розширенням txt.
// Вивести в консоль шляхи до кожного файлу чи папки, також вивести поряд інформацію про те, чи є це файл чи папка.

const fsPromises = require('node:fs/promises');
const path = require('node:path');

async function foo() {
    try {
        for (let i = 1; i < 6; i++) {
            const folderPath = path.join(__dirname, 'baseFolder', `file${i}`);
            await fsPromises.mkdir(folderPath, {recursive:true});
            console.log(`${folderPath} - is a folder`);
            for (let j = 1; j < 6; j++) {
                const filePath = path.join(folderPath, `text${j}.txt`);
                await fsPromises.writeFile(filePath, `Some content ${j}`);
                console.log(`${filePath} - is a file`);
            }
        }
    }catch (e) {
        console.error(e)
    }
}

void foo();

