const { WebcastPushConnection } = require('tiktok-live-connector');
const express = require('express');

const app = express();

let latestComment = "";

const tiktokUsername = "insert_here_the_tiktokusername";

const tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

tiktokLiveConnection.connect()
    .then(state => {
        console.log(`Connected to roomId ${state.roomId}`);
    })
    .catch(err => {
        console.error('Failed to connect', err);
    });

tiktokLiveConnection.on('chat', data => {

    console.log(`${data.uniqueId}: ${data.comment}`);

    latestComment = `${data.uniqueId}:${data.comment}`;
});

app.get('/comment', (req, res) => {
    res.json({
        comment: latestComment
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
