const validateEntries = (req, res, next) => {
  const { entries } = req.body;

  if (!entries) return next();

  // if not array, send error
  if (!Array.isArray(entries)) {
    return res.status(400).send({
      error: "Entries must be an array"
    });
  }

  // if entries does not have accountId, type or amount, send error
  for (let e of entries) {
    if (!e.accountId || !e.type || !e.amount) {
      return res.status(400).send({
        error: `Entry is missing required fields (accountId, type, amount)`,
        entry: e
      });
    }
  }

  next();
};

export default validateEntries;