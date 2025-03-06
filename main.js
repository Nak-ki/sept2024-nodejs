const express = require('express');
const {userService} = require("./services/user.service");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/users', async (req, res)=>{
    const result = await userService.getAll();
    res.json(result)
})
app.get('/users/:id', async (req, res)=>{
    const id = req.params.id;
    const result = await userService.getById(id);
    res.json(result)
})
app.post('/users', async (req, res)=>{
    const user = req.body;
    const result = await userService.create(user);
    res.json(result)
})

app.put('/users/:id', async (req, res)=>{
    const user = req.body;
    const id = req.params.id;
    const result = await userService.update(id, user);
    res.json(result)
})

app.delete('/users/:id', async (req, res)=>{
    const id = req.params.id;
    await userService.delete(id);
})

app.listen(5000, ()=>{
    console.log('server running on 5000 port');
})