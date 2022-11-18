const express = require('express')
const colors = require('colors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')

const connectDB = require('./config/db')

//const datagen = require('./data_gen')

const app = express()

connectDB();



app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV ==='development'
}))


//datagen(5);
app.listen(port, console.log(`Server running on port ${port}`))