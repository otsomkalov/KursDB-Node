module.exports=(app)=>{
    app.post('*',require('./logout'));

    app.get('/',require('./index').get);

    app.get('/login',require('./login').get);

    app.post('/login',require('./login').post);

    app.get('/register',require('./register').get);

    app.post('/register',require('./register').post);

    app.get('/statements',require('./statements').get);

    app.post('/statements',require('./statements').post);

    app.get('/about',(req,res)=>{res.render('about')});

    app.get('/contacts',(req,res)=>{res.render('contacts')});

    app.get('/profile',require('./profile').get);

    app.get('*',(req,res,next)=>{next(404)});
};