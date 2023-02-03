const db = require('../../database/models/index.js');
const services = require('../../src/services/detailsService.js');

describe('post task', () => {
  it('post task', async () => {
    jest.spyOn(db.Company, 'bulkCreate').mockResolvedValue([{
      id: 1,
      name: 'company1',
      score: 0
    },
    {
      id: 2,
      name: 'company2',
      score: 0
    }]);
    const mockreq = {};
    const mockres = {
      json: jest.fn()
    };
    const result = await services.postDetails(mockreq, mockres);
    expect(result).toEqual([{
      id: 1,
      name: 'company1',
      score: 0
    },
    {
      id: 2,
      name: 'company2',
      score: 0
    }]);
  })
});

describe('get task', () => {
  it('get task', async () => {
    jest.spyOn(db.Company, 'findAll').mockResolvedValue([{
      id: 1,
      name: 'company1',
      score: 0
    },
    {
      id: 2,
      name: 'company2',
      score: 0
    }]);
    const mockreq = {};
    const mockres = {
      json: jest.fn()
    };
    const result = await services.getCompanies(mockreq, mockres);
    expect(result).toEqual([{
      id: 1,
      name: 'company1',
      score: 0
    },
    {
      id: 2,
      name: 'company2',
      score: 0
    }]);
  })
});
