const express = require('express');
const app = express();
const session = require('express-session');
const cookies = require('cookie-parser');

const userLoggedMiddleware = require('./middlewares/users/userLoggedMiddleware');
const rememberUserCookie = require('./middlewares/users/rememberUserCookie');

app.use(session({
    secret: 'secret word!',
    resave: false,
    saveUninitialized: false,
  }));

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(rememberUserCookie)

app.use(express.urlencoded( {extended : false} ));
app.use(express.json());
const methodOverride = require("method-override");
app.use(methodOverride ("_method"));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const mainRoutes = require ('./routers/mainRoutes');
const productsRoutes = require ('./routers/productsRoutes');
const usersRoutes = require ('./routers/usersRoutes');
app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

const categorysApiRouter = require("./routers/api/categorysApiRouter")
const productsApiRouter = require("./routers/api/productsApiRouter")
const usersApiRouter = require('./routers/api/usersApiRouter');
app.use('/api/users', usersApiRouter);
app.use("/api/products", productsApiRouter)
app.use("/api/categorys",categorysApiRouter)


app.listen(process.env.PORT || 3005, () => {
    console.log('Servidor corriendo');
});