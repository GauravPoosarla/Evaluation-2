const router = require('express').Router();
const detailsController = require('../controllers/detailsController');

router.post('/api/save', detailsController.detailsController);
router.get('/api/companies', detailsController.getCompanies);
module.exports = router;
