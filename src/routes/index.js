const router = require('express').Router();
const detailsController = require('../controllers/detailsController');

router.post('/api/save', detailsController.detailsController);
router.get('/api/companies', detailsController.getCompanies);
router.put('/api/update', detailsController.updateDetails);
module.exports = router;
