const axios = require('axios');
const utils = require('../utils/detailUtils.js');
const db = require('../../database/models/index.js');
const HTTPError = require('../../errors/httpError.js');

exports.postDetails = async (url) => {
  const result = await axios.get(url);
  const data = utils.convertCSVtoJSON(result.data);

  const companies = [];
  const sectors = [];
  for (const item of data) {
    const companySpecificDetails = await axios.get(`http://54.167.46.10/company/${item.company_id}`);
    const company_id = companySpecificDetails.data.id;
    const name = companySpecificDetails.data.name;
    const ceo = companySpecificDetails.data.ceo;
    const numOfEmployees = 15000; // no data on employees fetched from api
    const companyDetailsFromPost = data.filter((item) => item.company_id === company_id);
    const sector = companyDetailsFromPost[0].company_sector;
    const score = 0;
    const company = { company_id, name, numOfEmployees, ceo, sector, score };
    companies.push(company);
  };

  for (const item of data) {
    if (!sectors.includes(item.company_sector)) {
      sectors.push(item.company_sector);
    }
  };

  for (const sector of sectors) {
    const sectorDetails = await axios.get(`http://54.167.46.10/sector?name=${sector}`);
    const sectorData = sectorDetails.data;

    sectorData.forEach((item) => {
      const id = item.companyId;
      const cpi = item.performanceIndex.filter((item) => item.key === 'cpi')[0].value;
      const cf = item.performanceIndex.filter((item) => item.key === 'cf')[0].value;
      const mau = item.performanceIndex.filter((item) => item.key === 'mau')[0].value;
      const roic = item.performanceIndex.filter((item) => item.key === 'roic')[0].value;

      const score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
      companies.forEach((company) => {
        if (company.company_id === id) {
          company.score = score;
        }
      });
    });
  };
  const dbResult = await db.Company.bulkCreate(companies);
  const createdCompanies = await db.Company.findAll({
    attributes: ['id', 'company_id', 'name', 'score']
  });
  return createdCompanies;
}

exports.getCompanies = async (sector) => {
  const companies = await db.Company.findAll({
    where: { sector: sector },
    attributes: ['company_id', 'name', 'ceo', 'score'],
    order: [['score', 'DESC']]
  });

  for (let i = 0; i < companies.length; i++) {
    companies[i].dataValues.rank = i + 1;
  }

  if (companies.length === 0) {
    throw new HTTPError('Sector not found', 404);
  };
  return companies;
}

exports.updateDetails = async (ceo, id) => {
  const company = await db.Company.update({ ceo: ceo }, { where: { company_id: id } });
  if (company[0] === 0) {
    throw new HTTPError('Company not found', 404);
  };
  return company;
}