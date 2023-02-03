const joi = require('joi');

exports.sectorValidatorSchema = joi.object({
  sector: joi.string().required(),
});

exports.updateTaskSchema = joi.object({
  ceo: joi.string().required(),
  id: joi.number().required(),
});
