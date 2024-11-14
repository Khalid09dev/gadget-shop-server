const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//mongodb
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sds1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const dbConnect = async (req, res) => {
    try {
        client.connect();
        console.log('database connected successfully');
    } catch (error) {
        console.log(error.name, error.message);
    }
};
dbConnect();

app.get('/', (req, res) => {
    res.send(`server is running at ${port}`);
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})