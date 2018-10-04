const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../middlewares/db');
const User = db.User;

describe('Mongodb connection test', function() {
    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useCreateIndex: true });
        const dbs = mongoose.connection;
        dbs.on('error', console.error.bind(console, 'connection error'));
        dbs.once('open', () => {
            console.log('connected to test database!');
            done();
        })
    })

    describe('Test Database Collection', () => {
        it('New user saved to database', (done) => {
            var testUser = User({
                username: 'john doe',
                email: 'johndoe@gmail.com',
                password: '123456'
            })

            testUser.save(done)
        })

        it('Dont save incorrect format to database', (done) => {
            var wrongSave = User({
                notUsername: 'not john doe',
                notEmail: 'not johndoe@gmail.com',
                notPassword: 'not 123456'
            })

            wrongSave.save(err => {
                if (err) return done()
                throw new Error('Saving error!')
            })
        })

        it('Should retrieve data from test database', (done) => {
            User.find({email: 'johndoe@gmail.com'}, (err, name) => {
                if (err) throw err
                if (name.length === 0) throw new Error('No data!')
                done()
            })
        })
    })

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done)
        })
    })
})