const Koa = require('koa');
const Router = require('@koa/router');
const { bodyParser } = require("@koa/bodyparser");
const { logger } = require('./logger');
const { validateRequest } = require('./middleware');
const { v4: uuidv4 } = require('uuid');

const app = new Koa();
const router = new Router();
app.use(bodyParser());

router.post('/pessoas', validateRequest, (ctx, next) => {
    const id = uuidv4();
    insertPerson(id, ctx.request.body)
        .then(() => {
            ctx.response.status = 201;
            ctx.response.location = `/pessoas/${id}`;
        })
        .catch(() => {
            ctx.response.status = 422;
        });
    
    next();
});

const serverApp = app
                    .use(router.routes())
                    .use(router.allowedMethods())
                    .listen(8080);