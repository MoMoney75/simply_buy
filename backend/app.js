const express = require('express');
const session = require('express-session')
const app = express();
const userRouter = require('./routes/users');
const historyRouter = require('./routes/history');
const wishlistRouter = require('./routes/wishlist');
const PORT = process.env.PORT || 3001;
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'MAKESHIFTSECRETKEY',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } 
}));

app.use('/users',userRouter);
app.use('/history', historyRouter);
app.use('/wishlist', wishlistRouter);


/* If none of the routes are found in the request, this 404 error
   hanlding middleware will run */
/* 404 error handler */
app.use(function(req,res,next){
    return next(new Error("404, Page Not Found"))
})

/* Any other error that make it past the 404 middleware will be handled here */
app.use(function(err,req,res,next){
    if(process.env.NODE_ENV !== 'test'){
        console.error(err.stack);
    }
        const status = err.status || 500;
        const message = err.message;

        return res.status(status).json({
            error: {message, status},
        })
});

app.listen(PORT, ()=> console.log(`Backend is running on port ${PORT} ...`))

module.exports = app;

