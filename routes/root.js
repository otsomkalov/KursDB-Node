let CheckLogin=(req,res,next)=>{
    "use strict";
    if (req.session.type){
        next()
    }
    else{
        res.redirect('/')
    }
};

module.exports=(app)=>{

    app.delete('/logout',require('./general/logout'));

    app.get('/',require('./general/index').get);

    app.get('/query',require('./general/query').get);

    app.get('/login',require('./general/login').get);

    app.post('/login',require('./general/login').post);

    app.get('/register',require('./user/register').get);

    app.post('/register',require('./user/register').post);

    app.get('/statements',CheckLogin,require('./statements').get);

    app.post('/statements',CheckLogin,require('./statements').post);

    app.put('/statements',CheckLogin,require('./statements').put);

    app.delete('/statements',CheckLogin,require('./user/statements').delete);

    app.get('/statements/add',CheckLogin,require('./user/add').get);

    app.post('/statements/add',CheckLogin,require('./user/add').post);

    app.get('/statements/:id',CheckLogin,require('./user/report').get);

    app.get('/employees',CheckLogin,require('./admin/employees').get);

    app.delete('/employees',CheckLogin,require('./admin/employees').delete);

    app.get('/employees/add',CheckLogin,require('./admin/add').get);

    app.post('/employees/add',CheckLogin,require('./admin/add').post);

    app.get('/employees/edit/:id',CheckLogin,require('./admin/edit').get);

    app.post('/employees/edit/:id',CheckLogin,require('./admin/edit').post);

    app.get('/about',(req,res)=>{res.render('./general/about')});

    app.get('/contacts',(req,res)=>{res.render('./general/contacts')});

    app.get('/profile',require('./user/profile').get);

    app.get('/logout',require('./general/logout'));

    app.post('/profile',CheckLogin,require('./user/profile').post);

    app.get('/statistics',CheckLogin,require('./admin/statistics').get);

    app.get('*',(req,res,next)=>{next(404)});
};