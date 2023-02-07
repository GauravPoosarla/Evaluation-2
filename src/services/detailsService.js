const axios = require('axios');
const utils = require('../utils/detailUtils.js');
const db = require('../../database/models/index.js');
const HTTPError = require('../../errors/httpError.js');

exports.postDetails = async (url) => {
  const result = await axios.get(url);
  const data = utils.convertCSVtoJSON(result.data);

  const companies = [];
  const sectors = [];
  const companiesPromiseArray = data.map((item) => axios.get(`http://54.167.46.10/company/${item.company_id}`));
  const companyValues = await Promise.all(companiesPromiseArray);

  for (const item of companyValues) {
    const companySpecificDetails = item.data;
    const company_id = companySpecificDetails.id;
    const name = companySpecificDetails.name;
    const ceo = companySpecificDetails.ceo;
    const numOfEmployees = 15000; // no data on employees fetched from api
    const sector = data.filter((item) => item.company_id === company_id)[0].company_sector;
    const score = 0;
    const company = { company_id, name, numOfEmployees, ceo, sector, score };
    companies.push(company);
  }

  for (const item of data) {
    if (!sectors.includes(item.company_sector)) {
      sectors.push(item.company_sector);
    }
  }

  const sectorPromiseArray = sectors.map((sector) => axios.get(`http://54.167.46.10/sector?name=${sector}`));
  const sectorValues = await Promise.all(sectorPromiseArray);

  for (const sector of sectorValues) {
    const sectorData = sector.data;

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
  }
  
  const dbResult = await db.Company.bulkCreate(companies, { updateOnDuplicate: ['score'] });
  if(dbResult.length === 0) {
    throw new Error('Error in creating companies', 500);
  }
  
  const createdCompanies = await db.Company.findAll({
    attributes: ['company_id', 'name', 'score']
  });
  return createdCompanies;
};

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
  }
  return companies;
};

exports.updateDetails = async (ceo, name, id) => {
  const company = await db.Company.update({ ceo: ceo, name: name}, { where: { company_id: id } });
  if (company[0] === 0) {
    throw new HTTPError('Company not found', 404);
  }

  const updatedCompany = await db.Company.findOne({
    where: { company_id: id },
    attributes: ['company_id', 'name', 'ceo', 'score']
  });
  return updatedCompany;
};