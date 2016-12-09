module.exports=(app)=>{
    app.delete('/logout',require('./general/logout'));

    app.get('/',require('./general/index').get);

    app.get('/query',require('./general/query').get);

    app.post('/query',require('./general/query').post);

    app.get('/login',require('./general/login').get);

    app.post('/login',require('./general/login').post);

    app.get('/register',require('./user/register').get);

    app.post('/register',require('./user/register').post);

    app.get('/statements',require('./user/statements').get);

    app.get('/statements/add',require('./user/add').get);

    app.post('/statements/add',require('./user/add').post);

    app.get('/statements/:id',require('./user/report').get);

    app.delete('/statements',require('./user/statements').delete);

    app.put('/statements',require('./user/statements').put);

    app.get('/employee',require('./admin/employees').get);

    app.delete('/employee',require('./admin/employees').delete);

    app.get('/about',(req,res)=>{res.render('about')});

    app.get('/contacts',(req,res)=>{res.render('contacts')});

    app.get('/profile',require('./user/profile').get);

    app.get('/statistics',require('./admin/statistics').get);

    app.get('*',(req,res,next)=>{next(404)});
};