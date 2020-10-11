const accessTokenMiddleware = require('../../lib/accessToken');
const crypto = require("crypto");

const next = jest.fn();
const res = Object.freeze({});

describe('lib/accessToken', () => {
  it('calls next function', () => {
    const req = {};
    
    accessTokenMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  if('does not create accessToken in req context if token is empty', () => {
    const token = '';
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      query: {accessToken: token},
      cookies: {accessToken: token},
    };
   
    expect(req.accessToken).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });

  it('extracts token from "Authorization: TOKEN" header', () => {
    const token = crypto.randomBytes(32).toString('hex');
    const req = {
      headers: {
        authorization: token,
      },
      query: {},
      cookies: {},
    };

    accessTokenMiddleware(req, res, next);

    expect(req.accessToken).toEqual(token);
    expect(next).toHaveBeenCalled();
  });

  it('extracts token from "Authorization: Bearer TOKEN" header', () => {
    const token = crypto.randomBytes(32).toString('hex');
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      query: {},
      cookies: {},
    };

    accessTokenMiddleware(req, res, next);

    expect(req.accessToken).toEqual(token);
    expect(next).toHaveBeenCalled();
  });

  it('extracts token from "Authorization: bearer TOKEN" header', () => {
    const token = crypto.randomBytes(32).toString('hex');
    const req = {
      headers: {
        authorization: `bearer ${token}`,
      },
      query: {},
      cookies: {},
    };

    accessTokenMiddleware(req, res, next);

    expect(req.accessToken).toEqual(token);
    expect(next).toHaveBeenCalled();
  });

  it('extracts token from cookies', () => {
    const accessToken = crypto.randomBytes(32).toString('hex');
    const req = {
      headers: {},
      query: {},
      cookies: {accessToken},
    };

    accessTokenMiddleware(req, res, next);

    expect(req.accessToken).toEqual(accessToken);
    expect(next).toHaveBeenCalled();
  });

  it('extracts token from query string', () => {
    const accessToken = crypto.randomBytes(32).toString('hex');
    const req = {
      headers: {},
      query: {accessToken},
      cookies: {},
    };

    accessTokenMiddleware(req, res, next);

    expect(req.accessToken).toEqual(accessToken);
    expect(next).toHaveBeenCalled();
  });

  it('extracts token from cookies prior to query string', () => {
    const accessTokenInQuery = crypto.randomBytes(32).toString('hex');
    const accessTokenInCookies = crypto.randomBytes(32).toString('hex');
    const req = {
      headers: {},
      query: {accessToken: accessTokenInQuery},
      cookies: {accessToken: accessTokenInCookies},
    };

    accessTokenMiddleware(req, res, next);

    expect(req.accessToken).toEqual(accessTokenInCookies);
    expect(next).toHaveBeenCalled();
  });
});
