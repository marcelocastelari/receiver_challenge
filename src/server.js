const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})