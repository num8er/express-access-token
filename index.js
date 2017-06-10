'use strict';

module.exports = (req, res, next) => {
    const [left, right] = req.headers.authorization ? req.headers.authorization.split(' ') : [];
    if(left === 'Bearer') {
        req.accessToken = right;
        return next();
    }

    req.accessToken = [
        req.cookies.accessToken,
        req.query.accessToken,
        req.body.accessToken
    ].find(token => typeof token === 'string');

    
    next();
};
