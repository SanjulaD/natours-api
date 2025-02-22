const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(console.log('MongoDB Connected')).catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on Port : ${PORT}`);
});