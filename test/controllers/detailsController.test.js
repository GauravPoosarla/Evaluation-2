const services = require('../../src/services/detailsService.js');
const controllers = require('../../src/controllers/detailsController');

describe('details controller', () => {
  it('should return all new companies', async () => {
    jest.spyOn(services, 'postDetails').mockResolvedValue([{
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
    await controllers.detailsController(mockreq, mockres);
    expect(mockres.json).toHaveBeenCalledWith([{
      id: 1,
      name: 'company1',
      score: 0
    },
    {
      id: 2,
      name: 'company2',
      score: 0
    }]);
  });
});

describe('post details', () => {
  it('should return an error', async () => {
    jest.spyOn(services, 'postDetails').mockRejectedValue('error');
    const mockreq = {};
    const mockres = {
      json: jest.fn()
    };
    await controllers.detailsController(mockreq, mockres);
    expect(mockres.json).toHaveBeenCalledWith('error');
  });
});

describe('get companies', () => {
  it('should return all companies in a sector', async () => {
    jest.spyOn(services, 'getCompanies').mockResolvedValue([{
      id: 1,
      name: 'company1',
      score: 0
    },
    {
      id: 2,
      name: 'company2',
      score: 0
    }]);
    const mockreq = {
      query: {
        sector: 'sector1'
      }
    };
    const mockres = {
      json: jest.fn()
    };
    await controllers.getCompanies(mockreq, mockres);
    expect(mockres.json).toHaveBeenCalledWith([{
      id: 1,
      name: 'company1',
      score: 0
    },
    {
      id: 2,
      name: 'company2',
      score: 0
    }]);
  });
});

describe('get companies', () => {
  it('should return an error', async () => {
    jest.spyOn(services, 'getCompanies').mockRejectedValue('error');
    const mockreq = {
      query: {
        sector: 'sector1'
      }
    };
    const mockres = {
      json: jest.fn()
    };
    await controllers.getCompanies(mockreq, mockres);
    expect(mockres.json).toHaveBeenCalledWith('error');
  });
});
