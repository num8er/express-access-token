'use strict';

module.exports = (req, res, next) => {
    const [left, right] = req.headers.authorization ? req.headers.authorization.split(' ') : [];
    if(left === 'Bearer') {
        req.accessToken = right;
        return next();
    }

    req.accessToken = [
        req.cookies ? req.cookies.accessToken : null,
        req.query.accessToken
    ].find(token => typeof token === 'string');

    
    next();
};
