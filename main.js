const express = require('express');
const app = express();

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

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/users', function(req, res) {
    res.status(230).send(users);
});

app.post('/users', function(req, res) {
    res.status(230).send(users);
});

app.listen(3000,'0.0.0.0', ()=>{
    console.log('server is running at http://0.0.0.0:3000/')
})


