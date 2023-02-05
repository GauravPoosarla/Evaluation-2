const router = require('express').Router();
const detailsController = require('../controllers/detailsController');
const { sectorValidator, updateDetailsValidator } = require('../middlewares/middleware');

router.post('/api/save', detailsController.postDetails);
router.get('/api/companies', sectorValidator ,detailsController.getCompanies);
router.put('/api/update', updateDetailsValidator, detailsController.updateDetails);

module.exports = router;
