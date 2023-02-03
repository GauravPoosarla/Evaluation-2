const services = require('../services/detailsService');
let userDetails;

exports.detailsController = async (req, res) => {
  const urlLink = req.body.urlLink;
  const result = await services.postDetails(urlLink);
  const finalResult = [];
  result.map((item) => (finalResult.push({id: item.id, name: item.name, score: item.score  })));
  res.status(200).json(finalResult);
}

exports.getCompanies = async (req, res) => {
  const sector = req.query.sector;
  const result = await services.getCompanies(sector);
  const finalResult = [];
  result.map((item) => (finalResult.push({id: item.id, name: item.name, ceo: item.ceo, score: item.score  })));
  res.status(200).json(finalResult);
}

exports.updateDetails = async (req, res) => {
  const ceo = req.body.ceo;
  const id = req.body.id;
  const result = await services.updateDetails(ceo, id);
  res.status(200).json(result);
}