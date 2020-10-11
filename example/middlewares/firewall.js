const accessTokens = [
  '6d7f3f6e-269c-4e1b-abf8-9a0add479511',
  '110546ae-627f-48d4-9cf8-fd8850e0ac7f',
  '04b90260-3cb3-4553-a1c1-ecca1f83a381',
];

module.exports = (req, res, next) => {
  const authorized = accessTokens.includes(req.accessToken);
  if (!authorized) return res.status(403).send('Forbidden');
  next();
};
