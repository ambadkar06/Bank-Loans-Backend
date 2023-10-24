const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());


//This is CORS Ref:https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
var whitelist = ['http://localhost:8081',/** other domains if any */]
var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));
// 1) MIDDLEWARES Morgan is used for debugging

app.use(morgan('tiny'));
// 2)MIDDLEWARE json is used for injecting the body attribute in the pipeline
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 3) MIDDLE ROUTES loading
const loanRouter = require('./routes/loanRouter');
const customerRouter = require('./routes/customerRouter');
const ledgerRouter = require('./routes/ledgerRouter');
const authRouter = require('./routes/authRouter');
app.use('/api/v1/loan', loanRouter);
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/ledger', ledgerRouter);
app.use('/api/v1/auth', authRouter);
module.exports = app;