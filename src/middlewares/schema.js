const joi = require('joi');

exports.urlValidatorSchema = joi.object({
  urlLink: joi.string().valid('https://store-0001.s3.amazonaws.com/input.csv').required(),
});

exports.sectorValidatorSchema = joi.object({
  sector: joi.string().required(),
});

exports.updateTaskSchema = joi.object({
  ceo: joi.string().required(),
  id: joi.string().required(),
  name: joi.string().required(),
});
