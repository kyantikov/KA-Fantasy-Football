const express = require('express')
const bodyParser = require('body-parser');
var db = require('./models')
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public/dist/public'))

app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,

}))

require('./config/routes')(app, db); 
db.sequelize.sync().then(function(){
    app.listen(6969, () => {
        console.log("listening at port 6969") 
    })
});

require('./config/mysql')