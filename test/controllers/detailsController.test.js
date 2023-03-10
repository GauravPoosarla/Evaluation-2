const services = require('../../src/services/detailsService.js');
const controllers = require('../../src/controllers/detailsController');
const httpError = require('../../errors/httpError');

describe('detailsController', () => {
  it('should create new entries in the database', async () => {
    const resolvedValue =
      [
        {
          'id': 842,
          'company_id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
          'name': 'Volkswagen',
          'score': 15.784075000000001
        }
      ];
    jest.spyOn(services, 'postDetails').mockResolvedValue(resolvedValue);
    const mockReq = {
      body: {
        urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controllers.postDetails(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
  });
  it('should throw an error when url is invalid', async () => {
    const err = new httpError('Invalid url', 400);
    jest.spyOn(services, 'postDetails').mockRejectedValue(err);
    const mockReq = {
      body: {
        urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controllers.postDetails(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({message: 'Invalid url'});
  });
  it('should throw an error when database is down', async () => {
    const err = new httpError('Database down', 500);
    jest.spyOn(services, 'postDetails').mockRejectedValue(err);
    const mockReq = {
      body: {
        urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controllers.postDetails(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({message: 'Database down'});
  });
});

describe('getCompanies', () => {
  it('should return companies in a particular sector', async () => {
    const resolvedValue = [
      {
        'company_id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'ceo': 'Faith Jenkins',
        'score': 15.784075000000001
      }
    ];
    jest.spyOn(services, 'getCompanies').mockResolvedValue(resolvedValue);
    const mockReq = {
      query: {
        sector: 'Automobile'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controllers.getCompanies(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
  });

  it('should return an error message if sector is not found', async () => {
    const err = new httpError('Sector not found', 404);
    jest.spyOn(services, 'getCompanies').mockRejectedValue(err);
    const mockReq = {
      query: {
        sector: 'Design'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controllers.getCompanies(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: err.message });
  });
});

describe('updateDetails', () => {
  it('should update the details of a company', async () => {
    const resolvedValue = [1];
    jest.spyOn(services, 'updateDetails').mockResolvedValue(resolvedValue);
    const mockReq = {
      body: {
        ceo: 'Faith Jenkins',
        id: '95b5a067-808a-44a9-a490-b4ef8a045f61'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controllers.updateDetails(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
  });

  it('should return an error message if company is not found', async () => {
    const err = new httpError('Company not found', 404);
    jest.spyOn(services, 'updateDetails').mockRejectedValue(err);
    const mockReq = {
      body: {
        ceo: 'Gaurav Poosarla',
        id: '95b5a067-808a-44a9-a490-b4ef8a043789'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controllers.updateDetails(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: err.message });
  });
});