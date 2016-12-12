module.exports=(app)=>{
    app.delete('/logout',require('./general/logout'));

    app.get('/',require('./general/index').get);

    app.get('/query',require('./general/query').get);

    app.get('/login',require('./general/login').get);

    app.post('/login',require('./general/login').post);

    app.get('/register',require('./user/register').get);

    app.post('/register',require('./user/register').post);

    app.get('/statements',require('./statements').get);

    app.post('/statements',require('./statements').post);

    app.put('/statements',require('./statements').put);

    app.delete('/statements',require('./user/statements').delete);

    app.get('/statements/add',require('./user/add').get);

    app.post('/statements/add',require('./user/add').post);

    app.get('/statements/:id',require('./user/report').get);

    app.get('/employees',require('./admin/employees').get);

    app.delete('/employees',require('./admin/employees').delete);

    app.get('/employees/add',require('./admin/add').get);

    app.post('/employees/add',require('./admin/add').post);

    app.get('/about',(req,res)=>{res.render('about')});

    app.get('/contacts',(req,res)=>{res.render('contacts')});

    app.get('/profile',require('./user/profile').get);

    app.post('/profile',require('./user/profile').post);

    app.get('/statistics',require('./admin/statistics').get);

    app.get('*',(req,res,next)=>{next(404)});
};