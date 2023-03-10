const { urlValidator, sectorValidator, updateDetailsValidator } = require('../../src/middlewares/middleware');

describe('urlValidator', () => {
  it('should call the next function when url is provided', () => {
    const req = {
      body: {
        urlLink: 'https://store-0001.s3.amazonaws.com/input.csv',
      },
    };
    const res = {
    };
    const next = jest.fn();
    urlValidator(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 when url is not provided', () => {
    const req = {
      body: {
        urlLink: '',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    urlValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '\"urlLink\" is not allowed to be empty' });
  });
  it('should return 400 when url is not valid', () => {
    const req = {
      body: {
        urlLink: 'https//www.google',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    urlValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '\"urlLink\" must be a valid uri' });
  });
});

describe('sectorValidator', () => {
  it('should call the next function when sector is provided', () => {
    const req = {
      query: {
        sector: 'Technology',
      },
    };
    const res = {

    };
    const next = jest.fn();
    sectorValidator(req, res, next);
    expect(next).toHaveBeenCalled();
  });
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
  it('should call the next function when ceo and id are provided', () => {
    const req = {
      body: {
        ceo: 'Elon Musk',
        name: 'Tesla',
        id: '5f9f1b9b0b1b9c0b8c8c8c8c',
      },
    };
    const res = {
      
    };
    const next = jest.fn();
    updateDetailsValidator(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  
  it('should return 400 when ceo is not provided', () => {
    const req = {
      body: {
        ceo: '',
        name: 'Tesla',
        id: '5f9f1b9b0b1b9c0b8c8c8c8c',
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
        name: 'Tesla',
        id: '5f9f1b9b0b1b9c0b8c8c8c8c',
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
        name: 'Tesla',
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
        name: 'Tesla',
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
  it('should return 400 when name is not provided', () => {
    const req = {
      body: {
        ceo: 'John Doe',
        name: '',
        id: '5f9f1b9b0b1b9c0b8c8c8c8c',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    updateDetailsValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '"name" is not allowed to be empty' });
  });
  it('should return 400 when name is not a string', () => {
    const req = {
      body: {
        ceo: 'John Doe',
        name: 123,
        id: '5f9f1b9b0b1b9c0b8c8c8c8c',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    updateDetailsValidator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '"name" must be a string' });
  });
});