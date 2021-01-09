const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quotes');

router.get('/', quoteController.getAll);
router.post('/', quoteController.create);
router.get('/:quoteId', quoteController.getById);
router.put('/:quoteId', quoteController.updateById);
router.delete('/:quoteId', quoteController.deleteById);

module.exports = router;