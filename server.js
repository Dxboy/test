const express = require('express');

const server = express();
server.all('/', (req, res)=>{
    res.send('NEVER GONNA GIVE YOU UP! NEVER GONNA LET YOU DOWN! NEVER GONNA RUN AWAY AND DESERT YOU! LMAO')
})

function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive;