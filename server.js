const express = require('express');
const bodyParser = require('body-parser');
const date = require('./date.js');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/greenListDB', {useNewUrlParser:true, useUnifiedTopology: true});

const itemSchema = new mongoose.Schema({
    _id: Number,
    description: String
});

const Item = mongoose.model('task', itemSchema);

const item1 = new Item({
    _id: 0,
    description: 'Click in the plus signal to add new items'
});

const item2 = new Item({
    _id: 1,
    description: 'Click on the trash can to delete items'
});

const defaultItems = [item1, item2];

let itemsLength = 0;
app.get('/', (req,res) =>{

    Item.find({}, (err,docs) => {
        if(!err){
            if(docs.length === 0){
                Item.insertMany(defaultItems, err => {
                    if(!err){
                        console.log('Os itens padrão foram adicionados!');
                        res.redirect('/');
                    }
                })
            }
            else{
                res.render('index', {
                    day: date.getDay(),
                    fullDate: date.getDate(),
                    arr: docs
                });
                itemsLength = docs.length;
            }
        }
    });

});

app.post('/', (req,res) => {
    const newItem = new Item ({
        _id: itemsLength,
        description: req.body.task,
    });

    newItem.save();

    res.redirect('/');
});

app.post('/delete', (req,res) => {
    const ind = req.body.id;
    console.log(ind);

    Item.deleteOne({_id: ind}, err => {
        if(err){
            console.log(err);
        }
    });

    res.redirect('/');
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});