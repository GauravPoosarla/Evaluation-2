const router = require('express').Router();
const detailsController = require('../controllers/detailsController');
const { urlValidator, sectorValidator, updateDetailsValidator } = require('../middlewares/middleware');

router.post('/api/save', urlValidator, detailsController.postDetails);
router.get('/api/companies', sectorValidator ,detailsController.getCompanies);
router.put('/api/update', updateDetailsValidator, detailsController.updateDetails);

module.exports = router;
