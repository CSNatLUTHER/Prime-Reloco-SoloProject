const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const eventRouter = require('./routes/event.router');
const itemRouter = require('./routes/item.router');
const boxRouter = require('./routes/box.router');
const messageRouter = require('./routes/message.router');
const eventUserRouter = require('./routes/event_user.router');
const photoUploadRouter = require('./routes/photo_upload.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/item', itemRouter);
app.use('/api/box', boxRouter);
app.use('/api/message', messageRouter);
app.use('/api/event_user', eventUserRouter);
app.use('/api/photo', photoUploadRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5005;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
