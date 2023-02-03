const services = require('../services/detailsService');
let userDetails;

exports.detailsController = async (req, res) => {
  const urlLink = req.body.urlLink;
  const result = await services.postDetails(urlLink);
  console.log(result);
  res.status(200).json(result);
}

exports.getCompanies = async (req, res) => {
  const sector = req.query.sector;
  const result = await services.getCompanies(sector);
  res.status(200).json(result);
}

