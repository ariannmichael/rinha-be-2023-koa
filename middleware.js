const _ = require('lodash');
const { parse } = require('date-fns');

module.exports.validateDate = (dateString) => {
    return !isNaN(parse(dateString, 'yyyy-MM-dd', new Date()));
}

module.exports.validateBody = (req) => {
    const { apelido, nome, nascimento, stack } = req.body;

    if (typeof apelido !== 'string' || apelido.length > 32) {
        return false;
    }

    if (typeof nome !== 'string' || nome.length > 100) {
        return false;
    }

    if (typeof nascimento !== 'string' || this.validateDate(nascimeto)) {
        return false;
    }

    if (!_.isUndefined(stack) && !Array.isArray(stack)) {
        req.body.stack = [];
    }

    if (stack && stack.length) {
        req.body.stack = stack.filter((s) => !_.isString(s) || s === "" || s.length > 32);
    }

    return true;
}

module.exports.validateRequest = (ctx, next) => {
    if (this.validateBody(ctx.request)) {
        next();
    }
    
    return ctx.res.status(422).end();
}