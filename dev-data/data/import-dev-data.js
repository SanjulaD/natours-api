const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(console.log('MongoDB Connected')).catch(err => console.log(err));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data successfully created!!");
        
    } catch (err) {
        console.log(err);
    }
    // eslint-disable-next-line no-process-exit
    process.exit();
}

// DELETE DATA FROM DB
const deletetData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data successfully deleted!!");
        // eslint-disable-next-line no-process-exit
        process.exit();
    } catch (err) {
        console.log(err);
    }
    // eslint-disable-next-line no-process-exit
    process.exit();
}

if(process.argv[2] === '--import') {
    importData();
} else if(process.argv[2] === '--delete') {
    deletetData();
}