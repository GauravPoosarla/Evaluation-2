const joi = require('joi');

exports.updateTaskSchema = joi.object({
  ceo: joi.string().required(),
  id: joi.number().required(),
});

exports.sectorValidatorSchema = joi.object({
  sector: joi.string().required(),
});
