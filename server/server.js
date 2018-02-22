const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const passport = require('./strategies/sql.localstrategy');
const sessionConfig = require('./modules/session-middleware');

// Route includes
const familyRouter = require('./routes/family.router');
const childRouter = require('./routes/child.router');
const eventRouter = require('./routes/event.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/family', familyRouter);
app.use('/api/child', childRouter);
app.use('/api/event', eventRouter);

// Serve static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 2828;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
