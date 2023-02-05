const { sectorValidator, updateDetailsValidator } = require('../../src/middlewares/middleware');

describe('sectorValidator', () => {
  it('should return 400 when sector is not provided', () => {
    const req = {
      query: {
        sector: '',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    sectorValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '"sector" is not allowed to be empty' });
  });
  it('should return 400 when sector is not a string', () => {
    const req = {
      query: {
        sector: 123,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    sectorValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '"sector" must be a string' });
  });
});

describe('updateDetailsValidator', () => {
  it('should return 400 when ceo is not provided', () => {
    const req = {
      body: {
        ceo: '',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    updateDetailsValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '"ceo" is not allowed to be empty' });
  });
  it('should return 400 when ceo is not a string', () => {
    const req = {
      body: {
        ceo: 123,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    updateDetailsValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '"ceo" must be a string' });
  });
  it('should return 400 when id is not provided', () => {
    const req = {
      body: {
        ceo: 'John Doe',
        id: ''
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    updateDetailsValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '"id" is not allowed to be empty' });
  });
  it('should return 400 when id is not a string', () => {
    const req = {
      body: {
        ceo: 'John Doe',
        id: 123
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    updateDetailsValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '"id" must be a string' });
  });
});

