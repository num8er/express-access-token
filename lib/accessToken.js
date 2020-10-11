module.exports = function (req, res, next) {
  let authorization = req.headers && req.headers.authorization ? req.headers.authorization : '';
  if (authorization) {
    authorization = authorization.split(' ').map(v => v.trim()).filter(v => !v.match(/(bearer)/i));
    if (authorization.length) {
      req.accessToken = authorization[0];
      next();
      return;
    }
  }

  req.accessToken = [
    req.cookies ? req.cookies.accessToken : null,
    req.query ? req.query.accessToken : null,
  ].find(token => typeof token === 'string');

  next();
};
