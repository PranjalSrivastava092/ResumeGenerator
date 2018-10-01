require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('middlewares/auth');
const errorHandler = require('middlewares/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(auth());

app.use('/users', require('./users/controller'));
// app.use('/doc', require('./doc/controller'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, () => {
    console.log('Server listening on port ' + port);
});