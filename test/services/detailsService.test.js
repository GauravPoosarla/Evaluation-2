const db = require('../../database/models/index.js');
const services = require('../../src/services/detailsService.js');
const HttpError = require('../../errors/httpError.js');

describe('postDetails', () => {
  it('should create new entries', async () => {
    const url = 'https://store-0001.s3.amazonaws.com/input.csv';
    jest.spyOn(db.Company, 'findAll').mockResolvedValue([
      {
        'id': 842,
        'company_id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'score': 15.784075000000001
      },
      {
        'id': 843,
        'company_id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
        'name': 'Apple',
        'score': 29.987724999999998
      }]);

    const result = await services.postDetails(url);
    expect(result).toEqual([
      {
        'id': 842,
        'company_id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'score': 15.784075000000001
      },
      {
        'id': 843,
        'company_id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
        'name': 'Apple',
        'score': 29.987724999999998
      }]);
  });
});

describe('getCompanies', () => {
  it('should return companies in a sector', async () => {
    const returnValue = [
      {
        'dataValues': {
          'company_id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
          'company_name': 'Apple',
          'ceo': 'Dr. Christina Batz',
          'score': 26.17
        }
      }];
    jest.spyOn(db.Company, 'findAll').mockResolvedValue(returnValue);
    const companiesBySector = await services.getCompanies('Software');
    expect(companiesBySector).toEqual(returnValue);
  });

  it('should throw an error when sector does not exist', async () => {
    const err = new HttpError('Sector not found', 404);
    jest.spyOn(db.Company, 'findAll').mockResolvedValue([]);
    await expect(services.getCompanies('design')).rejects.toThrow(err);
  });
});

describe('updateDetails', () => {
  it('should update the details of a company', async () => {
    const returnValue = [

    ];
    jest.spyOn(db.Company, 'update').mockResolvedValue(returnValue);
    const updateDetails = await services.updateDetails('Gaurav', 'McKinsey & Company', '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc');
    expect(updateDetails).toEqual(returnValue);
  });

  it('should throw an error when company does not exist', async () => {
    const err = new HttpError('Company not found', 404);
    jest.spyOn(db.Company, 'update').mockResolvedValue([0]);
    await expect(services.updateDetails('Dr. Christina Batz', 'Google', '46e1d061-e39d-4d5c-8e0e-3fa5d453212')).rejects.toThrow(err);
  });
});
