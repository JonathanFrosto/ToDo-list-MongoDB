const express = require('express');
const bodyParser = require('body-parser');
const date = require('./date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const items = [
    {
        id: 0,
        description: 'Click in the plus signal to add new items'
    },
    {
        id: 1,
        description: 'Click on the trash can to delete items'
    }
];

app.get('/', (req,res) =>{
    res.render('index', {
        day: date.getDay(),
        fullDate: date.getDate(),
        arr:items
    });
});

app.post('/', (req,res) => {
    const newItem = {
        id: items.length,
        description: req.body.task,
    };
    items.push(newItem);

    res.redirect('/');
});

app.post('/delete', (req,res) => {
    const ind = req.body.id;

    if(ind == items.length - 1){
        items.splice(ind, 1);
    }
    else{
        items.splice(ind, 1);
        items.forEach(item => {
            item.id = -1;
        });
    }
    res.redirect('/');
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});