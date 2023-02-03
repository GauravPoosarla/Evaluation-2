const schema = require('./schema');
const Joi = require('joi');

exports.sectorValidator = (req, res, next) => {
  const { error } = schema.updateTaskSchema.validate(req.query.sector);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

exports.updateDetailsValidator = (req, res, next) => {
  const { error } = schema.updateTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}