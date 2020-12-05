const express = require('express');
const userContrller = require('./../controllers/userController');

const router = express.Router();

// User Routes
router
    .route('/')
    .get(userContrller.getAllUsers)
    .post(userContrller.createUser);

router
    .route('/:id')
    .get(userContrller.getUser)
    .patch(userContrller.updateUser)
    .delete(userContrller.deleteUser);

module.exports = router;