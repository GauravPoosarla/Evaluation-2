const services = require('../services/detailsService');

exports.detailsController = async (req, res) => {
  const urlLink = req.body.urlLink;
  const result = await services.postDetails(urlLink);
  res.status(201).json(result);
}

exports.getCompanies = async (req, res) => {
  const sector = req.query.sector;
  try {
    const result = await services.getCompanies(sector); 
    res.status(200).json(result);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
}

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
}