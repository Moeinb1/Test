const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();



//// server path
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.writeFileSync('server.log', log + '\n')

    next();

});

app.use((req, res, next) => {

    res.render('offline.hbs');


});



// GET POST PUT PATCH DELETE ------> Http Request

// http://www.roxo.ir/vue.js---> GET Request
/// localhost :3000
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('upperCase', (txt) => {
    return txt.toUpperCase();
})
app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'home',
        'welcomMessages': 'welcom to your account mr Bagheri',
        currentyYear: new Date().getFullYear()
    });

});


app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'درباره اونها 563466',
        currentyYear: new Date().getFullYear()
    });

});



app.listen(3000, () => {
    console.log('server run on 3000 port')
});