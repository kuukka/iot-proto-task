const express = require('express');

const router = express.Router();

const bookCtrl = require('../controllers/book.controller');
const authToken = require('../middleware/authToken');

router.get('/', bookCtrl.findAllBooks);

router.get('/:id', bookCtrl.findOneBook);

router.post('/', [authToken.verifyToken], bookCtrl.createBook);

router.put('/:id', [authToken.verifyToken], bookCtrl.updateBook);

router.delete('/:id', [authToken.verifyToken], bookCtrl.deleteBook);

module.exports = router;