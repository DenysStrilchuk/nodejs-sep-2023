const http = require('node:http');


const users = [
    { id: 1, name:'Maksym', email:'feden@gmail.com', password:'we123'},
    { id: 2, name: 'Iryna', email: 'iryna@example.com', password: 'qwerty' },
    { id: 3, name: 'Oleh', email: 'oleg@example.com', password: 'password123' },
    { id: 4, name: 'Anna', email: 'anna@example.com', password: 'annapass' },
    { id: 5, name: 'Petro', email: 'petro@example.com', password: 'petro123' },
    { id: 6, name: 'Kateryna', email: 'katya@example.com', password: 'katya456' },
    { id: 7, name: 'Vitaliy', email: 'vitaliy@example.com', password: 'vitalikpass' },
    { id: 8, name: 'Natalia', email: 'natalya@example.com', password: 'natalyapass' },
    { id: 9, name: 'Ihor', email: 'igor@example.com', password: 'igor789' },
    { id: 10, name: 'Yulia', email: 'yulia@example.com', password: 'yuliapass' }
]

async function foo() {
    try {
        const server = http.createServer((req,res)=>{
            if (req.method === 'GET' && req.url === '/users') {
                res.end(JSON.stringify(users));
            }
            res.end('Hello from Node.js');
        });
        server.listen(3000,'0.0.0.0', ()=>{
            console.log('server is running at http://0.0.0.0:3000/')
        })
    } catch (e) {
        console.error(e)
    }
}

void foo();

