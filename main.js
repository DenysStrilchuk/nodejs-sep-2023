// Створити папку "baseFolder". В ній створити 5 папок, в кожній з яких створити по 5 файлів з розширенням txt.
// Вивести в консоль шляхи до кожного файлу чи папки, також вивести поряд інформацію про те, чи є це файл чи папка.

const fsPromises = require('node:fs/promises');
const path = require('node:path');

async function foo() {
    try {
        await fsPromises.mkdir(path.join(__dirname, 'baseFolder'), {recursive: true})
    }catch (e) {
        console.error(e)
    }
}

void foo();