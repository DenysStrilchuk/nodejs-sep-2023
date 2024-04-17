const foo = () => {
    console.log(__dirname);
    console.log(__filename);
    console.log(process.cwd());
}

console.log('Hello from helper');
module.exports = {foo};