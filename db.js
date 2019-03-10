const mongoose = require('mongoose');

const uri = "mongodb://admin:admin123@ds163825.mlab.com:63825/url-shortener"; // ? MLab db

mongoose.connect(uri, {useNewUrlParser: true}, (err) => {
    if(err) return console.log("err :: ", err)
    console.log("Connected to DB..")
});