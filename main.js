const express = require('express');
const app = express();
const {reader} = require('./fs.service');

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/users', async (req, res) => {
    const users = await reader();
    res.json(users);
});

// app.post('/users', (req, res) => {
//     // res.status(230).send(users);
// });

app.get('/users/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    const users = await reader();

    const user = users.find((user) => user.id ===  userId);
    if (!user) {
        res.status(404).json('User  not found');
    }
    res.json(user);
});



app.listen(3000,'0.0.0.0', ()=>{
    console.log('server is running at http://0.0.0.0:3000/')
})


