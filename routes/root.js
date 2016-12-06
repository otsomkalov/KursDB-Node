module.exports=(app)=>{
    app.delete('/logout',require('./logout'));

    app.get('/',require('./index').get);

    app.get('/query',require('./query').get);

    app.post('/query',require('./query').post);

    app.get('/login',require('./login').get);

    app.post('/login',require('./login').post);

    app.get('/register',require('./register').get);

    app.post('/register',require('./register').post);

    app.get('/statements',require('./statements').get);

    app.get('/statements/:id',require('./report').get);

    app.post('/statements',require('./statements').post);

    app.delete('/statements',require('./statements').delete);

    app.put('/statements',require('./statements').put);

    app.get('/employees',require('./employees').get);

    app.delete('/employees',require('./employees').delete);

    app.get('/about',(req,res)=>{res.render('about')});

    app.get('/contacts',(req,res)=>{res.render('contacts')});

    app.get('/profile',require('./profile').get);

    app.post('/sort',require('./sort').post);

    app.get('/statistics',require('./statistics').get);

    app.get('*',(req,res,next)=>{next(404)});
};