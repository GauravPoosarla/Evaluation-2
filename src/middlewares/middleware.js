const schema = require('./schema');

exports.urlValidator = (req, res, next) => {
  const { error } = schema.urlValidatorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.sectorValidator = (req, res, next) => {
  const { error } = schema.sectorValidatorSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

exports.updateDetailsValidator = (req, res, next) => {
  const { error } = schema.updateTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};