const services = require('../../src/services/detailsService.js');
const controllers = require('../../src/controllers/detailsController');

describe('post details', () => {
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