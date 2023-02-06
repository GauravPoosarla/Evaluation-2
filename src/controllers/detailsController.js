const services = require('../services/detailsService');
const httpError = require('../../errors/httpError');
exports.postDetails = async (req, res) => {
  const urlLink = req.body.urlLink;
  try {
    const result = await services.postDetails(urlLink);
    res.status(201).json(result);
  }
  catch (err) {
    if(err instanceof httpError) {
      res.status(err.statusCode).json({ message: err.message });
    }
    else {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.getCompanies = async (req, res) => {
  const sector = req.query.sector;
  try {
    const result = await services.getCompanies(sector); 
    res.status(200).json(result);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateDetails = async (req, res) => {
  const ceo = req.body.ceo;
  const id = req.body.id;
  try {
    const result = await services.updateDetails(ceo, id);
    res.status(200).json(result);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
};