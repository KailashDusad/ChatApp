const http = require('http');
const express = require('express');
const path = require('path')
// const mongoose = require('mongoose');

// main().catch(err => console.log(err));
// async function main(){
//     await mongoose.connect('mongodb://127.0.0.1:27017/KdTest')
//     console.log('We are connected with KdTest db');
// }

// const cricSchema = new mongoose.Schema({
//     name: String,
//     username: String,
//     email: String,
//     password: String,
//     confpassword: String
// })

// const kitten = mongoose.model('chatapp', cricSchema);
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/static/pug'))
// app.use(cors());
app.use('/static', express.static('static'));
// app.use(express.urlencoded());


app.get('/', (req,res)=>{
    res.status(200).render('index.pug');
})

// app.post('/', (req, res) => {
//     const userData = new kitten(req.body);
//     userData.save();
//     // kitten.find('name')
//     //     .then(crirweb => {
//     //         console.log(crirweb);
//     //     })
//     //     .catch(err => console.log(err));
//     res.status(200).render('index.pug');
// })

app.listen(5005, ()=>{
    console.log('Web running at port 5002');
})