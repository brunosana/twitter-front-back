const { uuid } = require('uuidv4');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());

const twitters = [];

app.get('/', (request, response) => {
    return response.json({
        message: "API Working"
    });
});

app.get('/twitters', (request, response) => {
    const { username } = request.query;
    console.log(username);
    const result = username ? twitters.filter(t => t.userName == username) : twitters;
    console.log(result);
    return response.json(result);
});

app.get('/twitters/:id', (request, response) => {
    const { id } = request.params;
    const tweetID = twitters.findIndex(t => t.id == id);
    if (tweetID < 0){
        return response.status(204).json({message: "Tweet not found"});
    }
    return response.json(twitters[tweetID]);
})

app.post('/twitters', (request, response) =>{
    const { userName, message } = request.body;
    const tweet = {
        id: uuid(),
        userName,
        message,
        likes: 0
    }
    twitters.push(tweet);
    return response.json(tweet);
});

app.listen(3333);